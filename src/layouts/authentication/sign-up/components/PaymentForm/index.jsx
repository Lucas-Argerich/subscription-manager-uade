import React, { useState } from 'react'
import MDBox from '~components/MDBox'
import MDTypography from '~components/MDTypography'
import MDInput from '~components/MDInput'
import MDButton from '~components/MDButton'
import { useNavigate } from 'react-router-dom'

function PaymentForm({ email }) {
  const navigate = useNavigate()
  const [cardNumber, setCardNumber] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvc, setCvc] = useState('')
  const [error, setError] = useState('')

  const handlePayment = (e) => {
    e.preventDefault()
    setError('')

    if (!cardNumber || !expiryDate || !cvc) {
      setError('Por favor completa todos los campos de pago.')
      return
    }

    // Simulación del procesamiento del pago
    console.log('Procesando pago de $3 para:', email)
    navigate('dashboard')
  }

  return (
    <MDBox pt={4} pb={3} px={3}>
      <MDTypography variant="h5" fontWeight="medium" color="text" textAlign="center">
        Información de Pago
      </MDTypography>
      <MDTypography variant="body2" color="text" textAlign="center" my={2}>
        Este es un pago mensual de <strong>$3 dólares</strong> para la suscripción.
      </MDTypography>
      <MDBox component="form" role="form" onSubmit={handlePayment}>
        <MDBox mb={2}>
          <MDInput
            type="text"
            label="Número de Tarjeta"
            variant="standard"
            fullWidth
            onChange={(e) => setCardNumber(e.target.value)}
          />
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            type="text"
            label="Fecha de Expiración (MM/AA)"
            variant="standard"
            fullWidth
            onChange={(e) => setExpiryDate(e.target.value)}
          />
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            type="text"
            label="CVC"
            variant="standard"
            fullWidth
            onChange={(e) => setCvc(e.target.value)}
          />
        </MDBox>
        {error && (
          <MDBox>
            <MDTypography fontSize="0.75rem" color="error">
              {error}
            </MDTypography>
          </MDBox>
        )}
        <MDBox mt={4} mb={1}>
          <MDButton variant="gradient" color="info" fullWidth type="submit">
            SUSCRIBIRSE
          </MDButton>
        </MDBox>
      </MDBox>
    </MDBox>
  )
}

export default PaymentForm
