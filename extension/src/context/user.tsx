import { getAuth, onAuthStateChanged, User } from 'firebase/auth'
import { createContext, useEffect, useState } from 'react'

type ContextState = { user: User | null }

const UserContext = createContext<ContextState | undefined>(undefined)

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = getAuth()
  const [user, setUser] = useState<User | null | undefined>(undefined)
  const value = { user: user ?? null }

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Store user data in chrome storage
        chrome.storage.local.set({ user: JSON.stringify(currentUser) });
      } else {
        chrome.storage.local.remove("user");
      }
    });
    return () => unsubscribe();
  }, [auth])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export { UserContext, UserProvider }
