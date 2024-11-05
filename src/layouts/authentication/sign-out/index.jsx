import { getAuth, signOut } from 'firebase/auth'
import React, { useEffect } from 'react'

export default function SignOut() {
  const auth = getAuth()

  useEffect(() => {
    if (!auth) return
    signOut(auth)
  }, [auth])

  return <div></div>
}
