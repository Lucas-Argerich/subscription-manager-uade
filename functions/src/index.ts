import * as admin from 'firebase-admin'
import { getFirestore } from 'firebase-admin/firestore'
import { auth, https, logger } from 'firebase-functions'
import { getFunctions } from 'firebase-admin/functions'
import { onDocumentWritten } from 'firebase-functions/v2/firestore'
import { onTaskDispatched } from 'firebase-functions/v2/tasks'
import serviceAccount from './serviceAccountKey.json'

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
})

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
        expiresAt: newDate.toLocaleDateString('en-CA'),
        isPayed: latest.price == 0
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
    const before = event.data?.before?.data()
    const data = event.data?.after?.data() /* as SubscriptionDocument */

    if (before && (before?.price === data?.price)) return

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

export const verifyIdTokenAndCreateCustomToken = https.onCall(async (data) => {
  // Get the ID token from the request data
  const idToken = data.idToken

  try {
    // Verify the ID token
    const decodedToken = await app.auth().verifyIdToken(idToken)

    const uid = decodedToken.uid

    // Generate a custom token based on the user's UID
    const customToken = await app.auth().createCustomToken(uid)

    // Return the custom token
    return { customToken: customToken }
  } catch (error) {
    // Handle any errors
    console.error('Error verifying ID token or creating custom token:', error)
    throw new https.HttpsError('unauthenticated', 'Invalid ID token')
  }
})
