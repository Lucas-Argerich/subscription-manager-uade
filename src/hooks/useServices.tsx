import { useContext } from 'react'
import { ServiceContext } from '~/context/services'

const useServices = () => {
  return useContext(ServiceContext)
}

export default useServices
