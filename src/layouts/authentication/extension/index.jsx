import { Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MDBox from '~/components/MDBox'
import useUser from '~/hooks/useUser'

export default function Extension() {
  const navigate = useNavigate()
  const user = useUser()
  const [isSent, setIsSent] = useState(false)

  useEffect(() => {
    try {
      if (user === undefined) return
      if (user) {
        user.getIdToken(true).then((idToken) => {
          window.postMessage({ type: 'SET_AUTH_STATE', data: idToken })
        })

        setIsSent(true)
      } else {
        navigate('/authentication/sign-in')
      }
    } catch (err) {
      console.error(err)
    }
  }, [user, navigate])
  return (
    <>
      {isSent && (
        <MDBox
          sx={{
            minHeight: '100svh',
            p: 3,
            pb: 8,
            position: 'relative',
            display: 'grid',
            placeItems: 'center'
          }}
        >
          <Typography variant="h3">Ya puedes cerrar esta pestaña!</Typography>
        </MDBox>
      )}
    </>
  )
}
