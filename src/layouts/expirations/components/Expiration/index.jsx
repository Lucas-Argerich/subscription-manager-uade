import { Checkbox } from '@mui/material'
import { doc, updateDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import MDBox from '~/components/MDBox'
import MDButton from '~/components/MDButton'
import { db } from '~/firebase'
import useUser from '~/hooks/useUser'

export default function Expiration({ service, subscription }) {
  const user = useUser()
  const [isUpdating, setIsUpdating] = useState(false)

  const handlePayed = () => {
    if (!user || isUpdating) return
    setIsUpdating(true)
    updateDoc(
      doc(db, 'users', user.uid, 'services', service.id, 'subscriptions', subscription.id),
      { isPayed: true }
    ).then(() => {
      setIsUpdating(false)
    })
  }

  return (
    <MDBox display="flex" flexDirection="column" alignItems="flex-end">
      <Checkbox disabled checked={subscription?.isPayed || isUpdating} p={0} />
      {subscription?.isPayed === false && (
        <MDButton size="small" variant="outlined" color="info" onClick={handlePayed} disabled={isUpdating}>
          Ya fue Pagado
        </MDButton>
      )}
    </MDBox>
  )
}
