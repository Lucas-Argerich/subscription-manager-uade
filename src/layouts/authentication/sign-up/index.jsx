// react-router-dom components
import { Link, useNavigate } from 'react-router-dom'

// @mui material components
import Card from '@mui/material/Card'
import Checkbox from '@mui/material/Checkbox'

// Material Dashboard 2 React components
import MDBox from '~components/MDBox'
import MDTypography from '~components/MDTypography'
import MDInput from '~components/MDInput'
import MDButton from '~components/MDButton'

// Authentication layout components
import CoverLayout from '~layouts/authentication/components/CoverLayout'

// Images
import bgImage from '~assets/images/bg-sign-up-cover.jpeg'
import { useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, deleteUser } from 'firebase/auth'
import { auth, db } from '~/firebase'
import { doc, updateDoc } from 'firebase/firestore'
import useUser from '~/hooks/useUser'
import PaymentForm from './components/PaymentForm' // Import the PaymentForm component

function Cover() {
  const navigate = useNavigate()
  const user = useUser()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [isPaymentStep, setIsPaymentStep] = useState(false) // New state for payment step

  useEffect(() => {
    if (user && !isPaymentStep) {
      navigate('dashboard')
    }
  }, [user, navigate])

  const handleRegister = async (e) => {
    e.preventDefault()

    if (isSubmitted) return
    
    setError('')
    if (!name || !email || !password) {
      setError('Complete all inputs to sign up.')
      return
    }

    setIsSubmitted(true)

    let credential = null
    try {
      credential = await createUserWithEmailAndPassword(auth, email, password)
      
      setTimeout(async () => {
        await updateDoc(doc(db, 'users', credential.user.uid), {
          displayName: name
        })
      }, 3000)

      setIsPaymentStep(true) // Trigger the payment step after registration
    } catch (err) {
      switch (err.code) {
        case 'auth/email-already-in-use': {
          setError('An account with this email already exists.')
          break
        }
        default: {
          setError(err.message.replace('Firebase: ', ''))
          break
        }
      }

      if (credential !== null) await deleteUser(credential.user)
    } finally {
      setIsSubmitted(false)
    }
  }

  return (
    <CoverLayout image={bgImage}>
      <Card>
        {isPaymentStep ? (
          // Render the payment form if registration was successful
          <PaymentForm email={email} />
        ) : (
          // Render the registration form
          <>
            <MDBox
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="success"
              mx={2}
              mt={-3}
              p={3}
              mb={1}
              textAlign="center"
            >
              <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                Únete a nosotros hoy
              </MDTypography>
              <MDTypography display="block" variant="button" color="white" my={1} mx={2}>
                Ingresa tu email y contraseña para registrarte
              </MDTypography>
            </MDBox>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox component="form" role="form">
                <MDBox mb={2}>
                  <MDInput
                    type="text"
                    label="Nombre"
                    variant="standard"
                    fullWidth
                    onChange={(e) => setName(e.target.value)}
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput
                    type="email"
                    label="Email"
                    variant="standard"
                    fullWidth
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput
                    type="password"
                    label="Contraseña"
                    variant="standard"
                    fullWidth
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </MDBox>
                {error && (
                  <MDBox>
                    <MDTypography fontSize="0.75rem" color="error">
                      {error}
                    </MDTypography>
                  </MDBox>
                )}
                <MDBox display="flex" alignItems="center" ml={-1}>
                  <Checkbox />
                  <MDTypography
                    variant="button"
                    fontWeight="regular"
                    color="text"
                    sx={{ cursor: 'pointer', userSelect: 'none', ml: -1 }}
                  >
                    &nbsp;&nbsp;Acepto los&nbsp;
                  </MDTypography>
                  <MDTypography
                    component="a"
                    href="#"
                    variant="button"
                    fontWeight="bold"
                    color="info"
                    textGradient
                  >
                    Términos y Condiciones
                  </MDTypography>
                </MDBox>
                <MDBox mt={4} mb={1}>
                  <MDButton
                    variant="gradient"
                    color="info"
                    fullWidth
                    onClick={handleRegister}
                    disabled={isSubmitted}
                  >
                    Registrarte
                  </MDButton>
                </MDBox>
                <MDBox mt={3} mb={1} textAlign="center">
                  <MDTypography variant="button" color="text" display="flex" flexDirection="column">
                    ¿Ya tienes una cuenta?
                    <MDTypography
                      component={Link}
                      to="/authentication/sign-in"
                      variant="button"
                      color="info"
                      fontWeight="medium"
                      textGradient
                    >
                      Iniciar Sesión
                    </MDTypography>
                  </MDTypography>
                </MDBox>
              </MDBox>
            </MDBox>
          </>
        )}
      </Card>
    </CoverLayout>
  )
}

export default Cover
