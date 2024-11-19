import { onAuthStateChanged, signInWithCustomToken, User } from 'firebase/auth'
import { createContext, useEffect, useState } from 'react'
import { auth } from '../firebase'

type ContextState = User | null

const UserContext = createContext<ContextState | undefined>(undefined)

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null | undefined>(undefined)

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })

    // Listen for changes in Chrome storage
    chrome?.storage?.local.get('subtrack_token', async (result) => {
      console.log(result['subtrack_token'])
      if (result['subtrack_token']) {
        const token = result['subtrack_token']

        await fetch(
          'https://us-central1-subscription-manager-uade.cloudfunctions.net/verifyIdTokenAndCreateCustomToken',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              data: { idToken: token }
            })
          }
        )
          .then((res) => res.json())
          .then((data) => {console.log(data); signInWithCustomToken(auth, data.result.customToken)})
      }
    })

    // Update user state if Chrome storage changes
    const handleStorageChange = async (
      changes: { [name: string]: chrome.storage.StorageChange },
      areaName: string
    ) => {
      console.log(changes, areaName)
      if (areaName === 'local' && changes['subtrack_token']) {
        const token = changes['subtrack_token'].newValue

        if (token) {
          await fetch(
            'https://us-central1-subscription-manager-uade.cloudfunctions.net/verifyIdTokenAndCreateCustomToken',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                data: { idToken: token }
              })
            }
          )
            .then((res) => res.json())
            .then((data) => signInWithCustomToken(auth, data.result.customToken))
        }
      }
    }

    chrome?.storage?.onChanged.addListener(handleStorageChange)

    return () => {
      unsubscribe()
      chrome?.storage?.onChanged.removeListener(handleStorageChange)
    }
  }, [])

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export { UserContext, UserProvider }
