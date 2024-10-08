import React, { useState } from "react";
import { Box, Button, TextField, Modal, Typography} from "@mui/material";

const MDForm = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    servicio: "",
    planFamiliar: "",
    costoMensual: "",
    vencimiento: "",
    usuario: "",
    contrasena: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Carga realizada:", formData);
    handleClose();
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen} style={{color:"white"}}>
        Cargar Suscripcion
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            width: 300,
            margin: "auto",
            mt: "20%",
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Cargar Suscripción
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Servicio"
              name="servicio"
              value={formData.servicio}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Plan familiar"
              name="planFamiliar"
              value={formData.planFamiliar}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Costo mensual"
              name="costoMensual"
              value={formData.costoMensual}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Vencimiento"
              name="vencimiento"
              type="date"
              value={formData.vencimiento}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Usuario"
              name="usuario"
              value={formData.usuario}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Contraseña"
              name="contrasena"
              type="password"
              value={formData.contrasena}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }} style={{color:"white"}}>
              Enviar
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default MDForm;
