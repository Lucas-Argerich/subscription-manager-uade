// @mui material components
import Card from '@mui/material/Card'

// Material Dashboard 2 React components
import MDBox from '~components/MDBox'
import MDTypography from '~components/MDTypography'
import MDInput from '~components/MDInput'
import MDButton from '~components/MDButton'

// Authentication layout components
import CoverLayout from '~layouts/authentication/components/CoverLayout'

// Images
import bgImage from '~assets/images/bg-reset-cover.jpeg'
import { useState } from 'react'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '~/firebase'
import { Check } from '@mui/icons-material'

function Cover() {
  const [email, setEmail] = useState('')

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [isSent, setIsSent] = useState(false)

  const handleResetPassword = async (e) => {
    e.preventDefault()

    if (isSubmitted) return
    setIsSubmitted(true)
    setError('')
 
    try {
      await sendPasswordResetEmail(auth, email, {
        url: 'http://localhost:5173/authentication/sign-in'
      })
      setIsSent(true)
    }
    catch (err) {
      setError(err.message)
    }
    finally {
      setIsSubmitted(false)
    }
  }

  return (
    <CoverLayout coverHeight="50vh" image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          py={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h3" fontWeight="medium" color="white" mt={1}>
            Reset Password
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1} mx={2}>
            You will receive an e-mail, only if you own an account
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleResetPassword}>
            <MDBox mb={4}>
              <MDInput type="email" label="Email" variant="standard" fullWidth onChange={(e) => setEmail(e.target.value)} disabled={isSubmitted || isSent} />
            </MDBox>
            {error && (
              <MDBox>
                <MDTypography fontSize="0.75rem" color="error">
                  {error}
                </MDTypography>
              </MDBox>
            )}
            <MDBox mt={6} mb={1}>
              <MDButton variant="gradient" color="info" type="submit" fullWidth disabled={!email || isSubmitted || isSent} >
                {isSent ? <Check/> : 'reset'}
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  )
}

export default Cover
