// FirebaseAuthContext.tsx
import { Unsubscribe } from 'firebase/auth'
import { collection, onSnapshot } from 'firebase/firestore'
import { createContext, useEffect, useState } from 'react'
import { db } from '~/firebase'
import { LoginDocument, SubscriptionDocument, ServiceDocument } from '~/firebase/types'
import useUser from '~/hooks/useUser'

type ContextState = ServiceDocument[] | null

const ServiceContext = createContext<ContextState | undefined>(undefined)

const ServiceProvider = ({ children }: { children: React.ReactNode }) => {
  const user = useUser()
  const [services, setServices] = useState<ServiceDocument[] | null>(null)

  useEffect(() => {
    if (!user) return

    const servicesUnsubscribes: Unsubscribe[] = []

    const fetchServices = () => {
      const servicesCollection = collection(db, 'users', user.uid, 'services')
      const unsubscribeServices = onSnapshot(servicesCollection, (serviceSnapshots) => {
        const updatedServices: ServiceDocument[] = []

        serviceSnapshots.forEach((serviceDoc) => {
          const serviceData = { id: serviceDoc.id, ...(serviceDoc.data() as ServiceDocument) }
          updatedServices.push(serviceData)

          // Set up listeners for each service’s subcollections and details
          subscribeToSubCollections(serviceDoc.id)
        })

        setServices(updatedServices)
      })

      servicesUnsubscribes.push(unsubscribeServices)
    }

    const subscribeToSubCollections = (serviceId: string) => {
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
        })).sort((a, b) => a.payedAt.seconds - b.payedAt.seconds)

        setServices(
          (prev) =>
            prev?.map((service) =>
              service.id === serviceId
                ? { ...service, subscriptions: updatedSubscriptions }
                : service
            ) ?? null
        )
      })

      const loginsCollection = collection(db, 'users', user.uid, 'services', serviceId, 'loginLogs')
      const unsubscribeLogins = onSnapshot(loginsCollection, (logSnapshots) => {
        const updatedLogins = logSnapshots.docs.map((log) => ({
          id: log.id,
          ...(log.data() as LoginDocument)
        })).sort((a, b) => a.timestamp.seconds - b.timestamp.seconds)

        setServices(
          (prev) =>
            prev?.map((service) =>
              service.id === serviceId ? { ...service, logins: updatedLogins } : service
            ) ?? null
        )
      })

      servicesUnsubscribes.push(unsubscribeSubscriptions, unsubscribeLogins)
    }

    fetchServices()

    return () => {
      servicesUnsubscribes.forEach((unsubscribe) => unsubscribe())
    }
  }, [user])

  return (
    <ServiceContext.Provider value={services}>{children}</ServiceContext.Provider>
  )
}

export { ServiceContext, ServiceProvider }
