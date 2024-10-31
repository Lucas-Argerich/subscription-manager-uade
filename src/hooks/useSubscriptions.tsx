import { useContext } from 'react'
import { SubscriptionContext } from '~/context/subscription'

const useSubscriptions = () => {
  return useContext(SubscriptionContext)
}

export default useSubscriptions
