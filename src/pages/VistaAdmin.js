import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper, CssBaseline } from '@mui/material';
import axios from 'axios';
import imagen from "../img/UMSS.png";
import { useNavigate } from 'react-router-dom';


import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';


const styles = {
  minHeight: '100vh',
  width: '100vw',
  backgroundImage: `url('https://us.123rf.com/450wm/panychev/panychev1611/panychev161100133/66317182-resumen-de-fondo-de-color-azul-oscuro-textura-plana-sitio-web-o-obras-de-arte-tel%C3%B3n-de-fondo.jpg')`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
};
const RegistrarUsuario = () => {
  const [showErrorNombre, setshowErrorName] = useState(false);
  const [showErrorCorreo, setshowErrorCorreo] = useState(false);
  const [showErrorContraseña, setshowErrorContraseña] = useState(false);
  const [userData, setUserData] = useState({ name: '', email: '', password: '' });
  
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Corregido el nombre del estado

  const url = process.env.REACT_APP_VARURL;
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (userData.name.length === 0) {
      setshowErrorName(true);
    } else {
      setshowErrorName(false);
    }

    if (userData.email.length === 0) {
      setshowErrorCorreo(true);
    } else {
      setshowErrorCorreo(false);
    }

    if (userData.password.length === 0) {
      setshowErrorContraseña(true);
    } else {
      setshowErrorContraseña(false);
    }

    // Envío de datos al servidor
    if (!showErrorNombre && !showErrorCorreo && !showErrorContraseña) {
      axios.post(url + 'registrarUsuario', userData)
        .then((response) => {
          console.log('Usuario registrado:', response.data);
          navigate('/home');
        })
        .catch((error) => {
          console.error('Error al registrar usuario:', error);
        });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    navigate('/home');
  };

  return (
    <Container component="main" disableGutters sx={styles}>
      <CssBaseline />
      <Paper elevation={5} sx={{ padding: 3, width: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h4" gutterBottom sx={{ fontSize: '25px' }}>
          Registro de Usuario
        </Typography>
        <img src={imagen} alt="Descripción de la imagen" style={{ width: '20%', marginBottom: '20px' }} />
        <form onSubmit={handleRegister} style={{ width: '100%' }}>
          <TextField
            label="Nombre"
            variant="outlined"
            placeholder="Ingresa tu nombre"
            margin="normal"
            fullWidth
            type="text"
            name="name"
            onChange={handleInputChange}
            error={showErrorNombre}
            helperText={showErrorNombre && 'Por favor ingrese un nombre'}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Correo Electrónico"
            variant="outlined"
            placeholder="Ingresa tu correo electrónico"
            margin="normal"
            fullWidth
            type="email"
            name="email"
            onChange={handleInputChange}
            error={showErrorCorreo}
            helperText={showErrorCorreo && 'Por favor ingrese un correo electrónico válido'}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Contraseña"
            variant="outlined"
            placeholder="Ingresa tu contraseña"
            margin="normal"
            fullWidth
            type="password"
            name="password"
            onChange={handleInputChange}
            error={showErrorContraseña}
            helperText={showErrorContraseña && 'Por favor ingrese una contraseña'}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Registrar
          </Button>
        </form>
      </Paper>
       {/* Modal de éxito */}
       <Dialog open={showSuccessModal} onClose={handleCloseSuccessModal}>
        <DialogTitle>Registrado correctamente</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¡Tu registro ha sido exitoso! Serás redirigido a la página de inicio.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSuccessModal} autoFocus>
            OK
          </Button>
          <Button onClick={() => navigate('/home')} color="primary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default RegistrarUsuario;
