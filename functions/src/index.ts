import * as admin from 'firebase-admin'
import { getFirestore } from 'firebase-admin/firestore'
import { auth, logger } from 'firebase-functions'
import { getFunctions } from 'firebase-admin/functions'
import { onDocumentWritten } from 'firebase-functions/v2/firestore'
import { onTaskDispatched } from 'firebase-functions/v2/tasks'

admin.initializeApp()

export const createUserDocument = auth.user().onCreate((user) => {
  getFirestore()
    .collection('users')
    .doc(user.uid)
    .create({ email: user.email, displayName: user.displayName, createdAt: new Date() })
})

export const subscriptionRenewalQueue = onTaskDispatched(
  {
    retryConfig: {
      maxAttempts: 5,
      minBackoffSeconds: 60
    },
    rateLimits: {
      maxConcurrentDispatches: 6
    }
  },
  async (req) => {
    try {
      const { userId, serviceId, subscriptionId } = req.data

      const subscriptions = await getFirestore()
        .collection('users')
        .doc(userId)
        .collection('services')
        .doc(serviceId)
        .collection('subscriptions')
        .get()

      const latest = subscriptions.docs
        .sort((a, b) => new Date(b.data().expiresAt).getTime() - new Date(a.data().expiresAt).getTime())[0]
        .data() /* as SubscriptionDocument */

      const newDate = new Date(latest.expiresAt)

      switch (latest.cycle) {
        case 'monthly': {
          newDate.setMonth(newDate.getMonth() + 1)
          break
        }
        case 'quarterly': {
          newDate.setMonth(newDate.getMonth() + 3)
          break
        }
        case 'annually': {
          newDate.setMonth(newDate.getMonth() + 12)
          break
        }
        case 'weekly': {
          newDate.setDate(newDate.getDate() + 7)
          break
        }
        default: {
          newDate.setMonth(newDate.getMonth() + 1)
          break
        }
      }

      const newSubscriptionData /* : SubscriptionDocument */ = {
        ...latest,
        expiresAt: newDate.toLocaleDateString('en-CA')
      }

      await getFirestore()
        .collection(`users/${userId}/services/${serviceId}/subscriptions`)
        .add(newSubscriptionData)

      logger.info(`Successfully renewed subscription: ${subscriptionId} for user: ${userId} => ${newDate.toLocaleDateString('en-CA')}`)
    } catch (error) {
      logger.error('Error processing subscription renewal:', error)
      throw new Error('Subscription renewal failed')
    }
  }
)

export const setSubscriptionRenewal = onDocumentWritten(
  'users/{userId}/services/{serviceId}/subscriptions/{subscriptionId}',
  async (event) => {
    const { userId, serviceId, subscriptionId } = event.params
    const data = event.data?.after?.data() /* as SubscriptionDocument */

    if (!data) {
      logger.info('Subscription document was deleted, no task enqueued.')
      return
    }

    const renewalDate = new Date(data.expiresAt)
    const scheduleDelaySeconds = Math.max((renewalDate.getTime() - Date.now()) / 1000, 0) // Delay until the renewal date

    const queue = getFunctions().taskQueue('subscriptionRenewalQueue')

    // Enqueue a task to handle the subscription renewal at the specified date
    await queue.enqueue(
      {
        userId,
        serviceId,
        subscriptionId
      },
      { scheduleDelaySeconds }
    )

    logger.info(`Scheduled renewal for subscription ${subscriptionId} at ${renewalDate}`)
  }
)
