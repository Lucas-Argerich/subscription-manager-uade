import React from 'react'
import BasicLayout from '../authentication/components/BasicLayout'
import MDBox from '~/components/MDBox'
import { Typography, Grid } from '@mui/material'
import MDButton from '~/components/MDButton'

// Importa los íconos o imágenes que usarás para los beneficios
import { CrisisAlert, CurrencyExchange, GppGood, Hub, Flag } from '@mui/icons-material'

export default function Homepage() {
  return (
    <BasicLayout>
      {/* Hero Section */}
      <MDBox
        component="section"
        mt="0px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        px="24px"
        py="48px"
        gap="24px"
        style={{ width: '100%', background: '#473F56', color: '#FFFFFF', borderRadius: '24px' }}
      >
        <img
          src="logo-big.jpeg"
          width="100%"
          style={{ maxWidth: '300px', aspectRatio: 3 / 2, objectFit: 'cover' }}
        />
        <Typography component="h1" variant="h3" color="#FFFFFF" fontWeight="extrabold" textAlign="center">
          ¡Gestiona todas tus Suscripciones en un Solo Lugar!
        </Typography>
        <Typography component="p" textAlign="center">
          La manera más fácil de controlar, optimizar y ahorrar en tus suscripciones con un solo pago.
        </Typography>
        <a href='authentication/sign-up'>
          <MDButton>
            ¡Comienza Ahora!
          </MDButton>
        </a>
      </MDBox>

      {/* Benefits Section */}
      <MDBox
        component="section"
        mt="32px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        px="24px"
        py="48px"
        gap="32px"
        style={{ width: '100%', background: '#FFFFFF', color: '#473F56', borderRadius: '24px' }}
      >
        <Typography component="h2" variant="h4" fontWeight="bold" textAlign="center">
          ¿Por Qué Elegir Subtrack?
        </Typography>
        <Typography component="p" textAlign="center" maxWidth="800px">
          Una única suscripción paga, acceso a una plataforma completa con funcionalidades que te ayudan a ahorrar tiempo y dinero.
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {/* Beneficio 1 */}
          <Grid item xs={12} sm={6} md={4}>
            <MDBox display="flex" flexDirection="column" alignItems="center" textAlign="center" gap="8px">
              <Hub alt="Gestión Centralizada" style={{ width: '40px', height: '40px' }} />
              <Typography variant="h6" fontWeight="bold">Gestión Centralizada</Typography>
              <Typography variant="body2">
                Reúne todas tus suscripciones en un solo lugar.
              </Typography>
            </MDBox>
          </Grid>
          {/* Beneficio 2 */}
          <Grid item xs={12} sm={6} md={4}>
            <MDBox display="flex" flexDirection="column" alignItems="center" textAlign="center" gap="8px">
              <CrisisAlert alt="Alertas de Renovación" style={{ width: '40px', height: '40px' }} />
              <Typography variant="h6" fontWeight="bold">Alertas de Renovación</Typography>
              <Typography variant="body2">
                No más olvidos de pagos automáticos.
              </Typography>
            </MDBox>
          </Grid>
          {/* Beneficio 3 */}
          <Grid item xs={12} sm={6} md={4}>
            <MDBox display="flex" flexDirection="column" alignItems="center" textAlign="center" gap="8px">
              <CurrencyExchange alt="Ahorro de Dinero" style={{ width: '40px', height: '40px' }} />
              <Typography variant="h6" fontWeight="bold">Ahorro de Dinero</Typography>
              <Typography variant="body2">
                Cancela suscripciones no utilizadas y ahorra.
              </Typography>
            </MDBox>
          </Grid>
          {/* Beneficio 4 */}
          <Grid item xs={12} sm={6} md={4}>
            <MDBox display="flex" flexDirection="column" alignItems="center" textAlign="center" gap="8px">
              <GppGood alt="Seguridad y Privacidad" style={{ width: '40px', height: '40px' }} />
              <Typography variant="h6" fontWeight="bold">Seguridad y Privacidad</Typography>
              <Typography variant="body2">
                Gestión segura de tus credenciales.
              </Typography>
            </MDBox>
          </Grid>
          {/* Beneficio 5 */}
          <Grid item xs={12} sm={6} md={4}>
            <MDBox display="flex" flexDirection="column" alignItems="center" textAlign="center" gap="8px">
              <Flag alt="Informe Detallado" style={{ width: '40px', height: '40px' }} />
              <Typography variant="h6" fontWeight="bold">Informe Detallado</Typography>
              <Typography variant="body2">
                Visualiza en gráficos cómo gastas tu dinero.
              </Typography>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>

      {/* Features Section */}
      <MDBox
        component="section"
        mt="32px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        px="24px"
        py="48px"
        gap="32px"
        style={{ width: '100%', background: '#F5F5F5', color: '#473F56', borderRadius: '24px' }}
      >
        <Typography component="h2" variant="h4" fontWeight="bold" textAlign="center">
          Características que Hacen la Diferencia
        </Typography>
        <Typography component="p" textAlign="center" maxWidth="800px">
          Subtrack te ofrece herramientas poderosas para la gestión eficiente de suscripciones, simplificando tu vida.
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {/* Característica 1 */}
          <Grid item xs={12} sm={6} md={4}>
            <MDBox display="flex" flexDirection="column" alignItems="center" textAlign="center" gap="8px">
              <Typography variant="h6" fontWeight="bold">Control en Tiempo Real</Typography>
              <Typography variant="body2">
                Visualiza y administra tus suscripciones en tiempo real.
              </Typography>
            </MDBox>
          </Grid>
          {/* Característica 2 */}
          <Grid item xs={12} sm={6} md={4}>
            <MDBox display="flex" flexDirection="column" alignItems="center" textAlign="center" gap="8px">
              <Typography variant="h6" fontWeight="bold">Cancelación Automática</Typography>
              <Typography variant="body2">
                Cancela de forma sencilla aquellas que no necesitas.
              </Typography>
            </MDBox>
          </Grid>
          {/* Agrega más características según lo necesites */}
        </Grid>
      </MDBox>
    </BasicLayout>
  )
}
