import React, { useState } from 'react'
import {
  Box,
  Button,
  TextField,
  Modal,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Divider,
  InputAdornment
} from '@mui/material'
import MDBox from '../MDBox'
import useUser from '~/hooks/useUser'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { db } from '~/firebase'
import MDTypography from '../MDTypography'

const SubForm = () => {
  const user = useUser()

  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    service: '',
    domain: '',
    plan: 'free',
    expiration: '',
    fee: '',
    cycle: '',
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleChange = (e) => {
    const { name, value } = e.target

    const changes = { [name]: value }

    if (name === 'plan' && value === 'free') {
      changes.fee = ''
      changes.billing = ''
    }

    setFormData({ ...formData, ...changes })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (isSubmitted) return
    setIsSubmitted(true)
    setError('')

    if (
      !user ||
      !formData.service ||
      !formData.domain ||
      !formData.plan ||
      !formData.expiration ||
      (!formData.fee && formData.plan !== 'free') ||
      (!formData.cycle && formData.plan !== 'free') ||
      !formData.email ||
      !formData.password
    ) {
      setError('Please. Complete all the inputs.')
      return
    }

    try {
      const domain = formData.domain.replace('www.', '')
      
      await setDoc(doc(db, 'users', user.uid, 'services', domain), {
        serviceName: formData.service,
        domain,
        username: formData.email,
        passwordEncrypted: formData.password, //to do
      })

      await addDoc(collection(db, 'users', user.uid, 'services', domain, 'subscriptions'), {
        plan: formData.plan,
        price: formData.fee,
        cycle: formData.cycle,
        expiresAt: formData.expiration,
        isPayed: false
      })      

      handleClose()
      e.reset()
    }
    catch (err) {
      setError(err.message)
    }
    finally {
      setIsSubmitted(false)
    }

  }

  return (
    <>
      <Button variant="contained" onClick={handleOpen} style={{ color: 'white' }}>
        Cargar Suscripción
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            width: 400,
            margin: 'auto',
            mt: '3%',
            height: 'auto'
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Load Subscription
          </Typography>
          {error && (
            <MDBox>
              <MDTypography fontSize="0.75rem" color="error">
                {error}
              </MDTypography>
            </MDBox>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Service/Platform"
              name="service"
              value={formData.service}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Domain (ex. subtrack.com)"
              name="domain"
              value={formData.domain}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <Divider />
            <MDBox display="flex" gap="20px">
              <FormControl fullWidth margin="normal">
                <InputLabel id="planLabel" required>
                  Subscription Plan
                </InputLabel>
                <Select
                  name="plan"
                  labelId="planLabel"
                  label="Subscription Plan"
                  value={formData.plan}
                  onChange={handleChange}
                  fullWidth
                  required
                >
                  <MenuItem value="free">Free</MenuItem>
                  <MenuItem value="basic">Basic</MenuItem>
                  <MenuItem value="standard">Standard</MenuItem>
                  <MenuItem value="premium">Premium</MenuItem>
                  <MenuItem value="family">Family</MenuItem>
                  <MenuItem value="enterprise">Enterprise</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Expiration"
                name="expiration"
                type="date"
                value={formData.expiration}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                InputLabelProps={{
                  shrink: true
                }}
              />
            </MDBox>
            <MDBox display="flex" gap="20px">
              <TextField
                label="Fee"
                name="fee"
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                value={formData.fee}
                onChange={handleChange}
                fullWidth
                margin="normal"
                disabled={formData.plan === 'free'}
                required={formData.plan !== 'free'}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start" disableTypography sx={{ mr: 0 }}>
                        $
                      </InputAdornment>
                    )
                  }
                }}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel id="cycleLabel" required={formData.plan !== 'free'}>
                  Billing Cycle
                </InputLabel>
                <Select
                  name="cycle"
                  labelId="cycleLabel"
                  label="Billing Cycle"
                  value={formData.cycle}
                  onChange={handleChange}
                  disabled={formData.plan === 'free'}
                  required={formData.plan !== 'free'}
                  fullWidth
                >
                  <MenuItem value="monthly">Monthly</MenuItem>
                  <MenuItem value="quarterly">Quarterly</MenuItem>
                  <MenuItem value="annually">Annually</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                </Select>
              </FormControl>
            </MDBox>
            <Divider />
            <Typography type="h4" variant="h6">
              Credentials
            </Typography>
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              style={{ color: 'white' }}
              disabled={isSubmitted}
            >
              Enviar
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  )
}

export default SubForm
