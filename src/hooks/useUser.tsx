import { useContext } from 'react'
import { FirebaseAuthContext } from '~/context/firebaseAuth'


const useUser = () => {
  const context = useContext(FirebaseAuthContext)
  
  return context?.user
}

export default useUser
