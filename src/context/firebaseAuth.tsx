// FirebaseAuthContext.tsx
import { getAuth, User } from 'firebase/auth'
import { createContext, useEffect, useState } from 'react'

type ContextState = { user: User | null }

const FirebaseAuthContext = createContext<ContextState | undefined>(undefined)

const FirebaseAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = getAuth()
  const [user, setUser] = useState<User | null>(null)
  const value = { user }
  console.log(user)

  useEffect(() => {
    return auth.onAuthStateChanged(setUser)
  }, [auth])

  return <FirebaseAuthContext.Provider value={value}>{children}</FirebaseAuthContext.Provider>
}

export { FirebaseAuthContext, FirebaseAuthProvider }
