// FirebaseAuthContext.tsx
import { Unsubscribe } from 'firebase/auth'
import { collection, onSnapshot } from 'firebase/firestore'
import { createContext, useEffect, useState } from 'react'
import { db } from '~/firebase'
import { LoginDocument, SubscriptionDocument } from '~/firebase/types'
import useUser from '~/hooks/useUser'

type ContextState = SubscriptionDocument[] | null

const SubscriptionContext = createContext<ContextState | undefined>(undefined)

const SubscriptionProvider = ({ children }: { children: React.ReactNode }) => {
  const user = useUser()
  const [subscriptions, setSubscriptions] = useState<SubscriptionDocument[] | null>(null)

  useEffect(() => {
    if (!user) return

    const servicesUnsubscribes: Unsubscribe[] = []

    const fetchServices = () => {
      // Listen for changes in services collection
      const servicesCollection = collection(db, 'users', user.uid, 'services')
      const unsubscribeServices = onSnapshot(servicesCollection, (serviceSnapshots) => {
        const updatedServices: (SubscriptionDocument & { id: string })[] = []

        serviceSnapshots.forEach((serviceDoc) => {
          const serviceData = { id: serviceDoc.id, ...(serviceDoc.data() as SubscriptionDocument) }
          updatedServices.push(serviceData)

          // Set up listeners for each service’s subcollections
          subscribeToSubCollections(serviceDoc.id)
        })

        setSubscriptions(updatedServices)
      })

      servicesUnsubscribes.push(unsubscribeServices)
    }

    const subscribeToSubCollections = (serviceId: string) => {
      // Listen for changes in the subscriptions subcollection
      const subscriptionsCollection = collection(
        db,
        'users',
        user.uid,
        'services',
        serviceId,
        'subscriptions'
      )
      const unsubscribeSubscriptions = onSnapshot(subscriptionsCollection, (subSnapshots) => {
        const updatedSubscriptions = subSnapshots.docs.map((sub) => ({
          id: sub.id,
          ...(sub.data() as SubscriptionDocument)
        }))

        setSubscriptions((prev) =>
          prev?.map((service) =>
            service.id === serviceId ? { ...service, subscriptions: updatedSubscriptions } : service
          ) ?? null
        )
      })

      // Listen for changes in the loginLogs subcollection
      const loginsCollection = collection(db, 'users', user.uid, 'services', serviceId, 'loginLogs')
      const unsubscribeLogins = onSnapshot(loginsCollection, (logSnapshots) => {
        const updatedLogins = logSnapshots.docs.map((log) => ({
          id: log.id,
          ...(log.data() as LoginDocument)
        }))

        setSubscriptions((prev) =>
          prev?.map((service) =>
            service.id === serviceId ? { ...service, logins: updatedLogins } : service
          ) ?? null
        )
      })

      // Store unsubscribe functions for cleanup
      servicesUnsubscribes.push(unsubscribeSubscriptions, unsubscribeLogins)
    }

    // Fetch services initially
    fetchServices()

    // Clean up all listeners when component unmounts or user changes
    return () => {
      servicesUnsubscribes.forEach((unsubscribe) => unsubscribe())
    }
  }, [user])

  return (
    <SubscriptionContext.Provider value={subscriptions}>{children}</SubscriptionContext.Provider>
  )
}

export { SubscriptionContext, SubscriptionProvider }
