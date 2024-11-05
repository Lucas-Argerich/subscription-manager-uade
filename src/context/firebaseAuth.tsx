// FirebaseAuthContext.tsx
import { getAuth, User } from 'firebase/auth'
import { createContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

type ContextState = { user: User | null }

const FirebaseAuthContext = createContext<ContextState | undefined>(undefined)

const FirebaseAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const auth = getAuth()
  const [user, setUser] = useState<User | null | undefined>(undefined)
  const value = { user: user ?? null }

  useEffect(() => {
    return auth.onAuthStateChanged(setUser)
  }, [auth])

  useEffect(() => {
    console.log(location)
    if (
      user === null &&
      location.pathname !== '/' &&
      location.pathname !== '/authentication/sign-in' &&
      location.pathname !== '/authentication/sign-up'
    )
      navigate('/authentication/sign-in')
  }, [location, navigate, user])

  return <FirebaseAuthContext.Provider value={value}>{children}</FirebaseAuthContext.Provider>
}

export { FirebaseAuthContext, FirebaseAuthProvider }
