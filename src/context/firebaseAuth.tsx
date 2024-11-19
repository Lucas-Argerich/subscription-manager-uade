// FirebaseAuthContext.tsx
import { getAuth, User } from 'firebase/auth'
import { createContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

type ContextState = { user: User | null | undefined }

const FirebaseAuthContext = createContext<ContextState | undefined>(undefined)

const FirebaseAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const auth = getAuth()
  const [user, setUser] = useState<User | null | undefined>(undefined)

  useEffect(() => {
    return auth.onAuthStateChanged(setUser)
  }, [auth])

  useEffect(() => {
    if (
      user === null &&
      location.pathname !== '/' &&
      location.pathname !== '/authentication/sign-in' &&
      location.pathname !== '/authentication/sign-up'
    )
      navigate('/authentication/sign-in')
  }, [location, navigate, user])

  return <FirebaseAuthContext.Provider value={{user}}>{children}</FirebaseAuthContext.Provider>
}

export { FirebaseAuthContext, FirebaseAuthProvider }
