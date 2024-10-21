import React, { useState } from 'react'

import { Box, Button, TextField, Modal, Typography, MenuItem, Select, InputLabel } from '@mui/material'

const MDAddCard = ({ open, onClose }) => {

  const [formData, setFormData] = useState({
    numTarjeta: '',
    nombre: '',
    vencimiento: '',
    operador: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Carga realizada:', formData)
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          width: 300,
          margin: 'auto',
          mt: '3%',          
        }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            label="Numero de Tarjeta"
            name="numTarjeta"
            value={formData.numTarjeta}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <InputLabel shrink htmlFor="vencimiento">
            Vencimiento
          </InputLabel>
          <TextField
            id="vencimiento"
            name="vencimiento"
            type="date"
            value={formData.vencimiento}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <InputLabel shrink htmlFor="Operador">
            Operador
          </InputLabel>
          <Select
            label="Operador"
            name="operador"
            value={formData.operador}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          >
            <MenuItem value="mastercard">Mastercard</MenuItem>
            <MenuItem value="visa">Visa</MenuItem>
          </Select>
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }} style={{ color: 'white' }}>
            Enviar
          </Button>
        </form>
      </Box>
    </Modal>
  )
}

export default MDAddCard
