import { useEffect, useState } from 'react'

// react-router-dom components
import { Link, useNavigate } from 'react-router-dom'

// @mui material components
import Card from '@mui/material/Card'
import Switch from '@mui/material/Switch'
import Grid from '@mui/material/Grid'
import MuiLink from '@mui/material/Link'

// @mui icons
import FacebookIcon from '@mui/icons-material/Facebook'
import GitHubIcon from '@mui/icons-material/GitHub'
import GoogleIcon from '@mui/icons-material/Google'

// Material Dashboard 2 React components
import MDBox from '~components/MDBox'
import MDTypography from '~components/MDTypography'
import MDInput from '~components/MDInput'
import MDButton from '~components/MDButton'

// Images
import bgImage from '~assets/images/bg-sign-in-basic.jpeg'
import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth } from '~/firebase'
import CoverLayout from '../components/CoverLayout'
import useUser from '~/hooks/useUser'

function Basic() {
  const navigate = useNavigate()
  const user = useUser()  

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const [rememberMe, setRememberMe] = useState(false)

  useEffect(() => {
    if (user) {
      navigate('dashboard')
    }
  }, [user, navigate])

  const handleSetRememberMe = () => setRememberMe(!rememberMe)

  const handleError = (err) => {
    switch (err.code) {
      case 'auth/invalid-credential': {
        setError('The email address or password is incorrect.')
        break
      }
      case 'auth/popup-closed-by-user': {
        break
      }
      default: {
        setError(err.message.replace('Firebase: ', ''))
        break
      }
    }  
  }

  const handleLoginWithFacebook = async (e) => {
    e.preventDefault()

    if (isSubmitted) return
    setIsSubmitted(true)
    setError('')

    try {
      await signInWithPopup(auth, new FacebookAuthProvider())

      navigate('/dashboard')
    } catch (err) {
      handleError(err)
    } finally {
      setIsSubmitted(false)
    }
  }

  const handleLoginWithGithub = async (e) => {
    e.preventDefault()

    if (isSubmitted) return
    setIsSubmitted(true)
    setError('')

    try {
      await signInWithPopup(auth, new GithubAuthProvider())

      navigate('/dashboard')
    } catch (err) {
      handleError(err)
    } finally {
      setIsSubmitted(false)
    }
  }

  const handleLoginWithGoogle = async (e) => {
    e.preventDefault()

    if (isSubmitted) return
    setIsSubmitted(true)
    setError('')

    try {
      await signInWithPopup(auth, new GoogleAuthProvider())

      navigate('/dashboard')
    } catch (err) {
      handleError(err)
    } finally {
      setIsSubmitted(false)
    }
  }

  const handleLoginWithEmailAndPassword = async (e) => {
    e.preventDefault() 
    
    if (isSubmitted) return
    console.log(email, password)
    setError('')
    if (!email || !password) {
      setError('Complete all inputs to sign up.')
      return
    }
    
    setIsSubmitted(true)

    try {
      await signInWithEmailAndPassword(auth, email, password)

      navigate('/dashboard')
    } catch (err) {
      handleError(err)  
    } finally {
      setIsSubmitted(false)
    }
  }

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Inicio sesión
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white" onClick={handleLoginWithFacebook}>
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white" onClick={handleLoginWithGithub}>
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white" onClick={handleLoginWithGoogle}>
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="email" label="Email" fullWidth onChange={(e) => setEmail(e.target.value)} />
            </MDBox>
            <MDBox mb={1}>
              <MDInput type="password" label="Contraseña" fullWidth onChange={(e) => setPassword(e.target.value)} />
            </MDBox>
            {error && (
              <MDBox>
                <MDTypography fontSize="0.75rem" color="error">
                  {error}
                </MDTypography>
              </MDBox>
            )}
            <MDBox mb={1}>
              <MDTypography variant="button" color="text">
                <MDTypography
                  component={Link}
                  to="/authentication/reset-password"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  fontSize="0.75rem"
                  textGradient
                >
                  ¿Olvidaste tu contraseña?
                </MDTypography>
              </MDTypography>
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: 'pointer', userSelect: 'none', ml: -1 }}
              >
                &nbsp;&nbsp;Permanecer ingresado
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                color="info"
                fullWidth
                onClick={handleLoginWithEmailAndPassword}
                disabled={isSubmitted}
              >
                Ingresar
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text" display="flex" flexDirection="column">
                ¿No tenes una cuenta?
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Registrate
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  )
}

export default Basic
