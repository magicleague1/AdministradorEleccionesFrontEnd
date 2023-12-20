import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper, CssBaseline,Snackbar } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MuiAlert from "@mui/material/Alert";
// import { useUser } from './DiferenciarUsuarios';//agregue esto

const styles = {
  minHeight: '102vh',
  display: 'center',
  alignItems: 'center',
  justifyContent: 'center',

};
const RegistrarUsuario = () => {
    // const { login } = useUser();//agregue esto
  const [showErrorNombre, setshowErrorName] = useState(false);
  const [showErrorCorreo, setshowErrorCorreo] = useState(false);
  const [showErrorContraseña, setshowErrorContraseña] = useState(false);
  const [userData, setUserData] = useState({ name: '', email: '', password: '' });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

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
        //   login({ name: userData.name, role: 'user' });//agregue esto
          handleSnackbarOpen('success', 'Usuario registrado correctamente');
          navigate('/home');
        })
        .catch((error) => {
          console.error('Error al registrar usuario:', error);
          handleSnackbarOpen('error', 'Error al registrar', `Ocurrió un error al registrar al usuario: ${error}`);
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

  const handleCancel = () => {
    navigate('/');
  };
//Mensajes de alerta
const handleSnackbarOpen = (severity, message) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <Container component="main" disableGutters sx={styles}>
      <CssBaseline />
      <Paper elevation={5} sx={{ padding: 3, width: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h4" gutterBottom sx={{ fontSize: '25px' }}>
          Registro de Tribunales
        </Typography>
        <form onSubmit={handleRegister} style={{ width: '100%' }}>
          <TextField
            label="Carnet de Identidad"
            variant="outlined"
            placeholder="Ingresa el primer carnet"
            margin="normal"
            fullWidth
            type="text"
            name="name"
            onChange={handleInputChange}
            error={showErrorNombre}
            helperText={showErrorNombre && 'Por favor ingrese un carnet'}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Carnet de Identidad"
            variant="outlined"
            placeholder="Ingresa el segundo carnet"
            margin="normal"
            fullWidth
            type="text"
            name="name"
            onChange={handleInputChange}
            error={showErrorNombre}
            helperText={showErrorNombre && 'Por favor ingrese un carnet'}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Carnet de Identidad"
            variant="outlined"
            placeholder="Ingresa el tercer carnet"
            margin="normal"
            fullWidth
            type="text"
            name="name"
            onChange={handleInputChange}
            error={showErrorNombre}
            helperText={showErrorNombre && 'Por favor ingrese un carnet'}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Carnet de Identidad"
            variant="outlined"
            placeholder="Ingresa el cuarto carnet"
            margin="normal"
            fullWidth
            type="text"
            name="name"
            onChange={handleInputChange}
            error={showErrorNombre}
            helperText={showErrorNombre && 'Por favor ingrese un carnet'}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Carnet de Identidad"
            variant="outlined"
            placeholder="Ingresa el quinto carnet"
            margin="normal"
            fullWidth
            type="text"
            name="name"
            onChange={handleInputChange}
            error={showErrorNombre}
            helperText={showErrorNombre && 'Por favor ingrese un carnet'}
            InputLabelProps={{
              shrink: true,
            }}
          />
           <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
            <Button type="submit" variant="contained" fullWidth>
              Registrar
            </Button>
            <Button type="button" variant="contained" fullWidth onClick={handleCancel}>
              Cancelar
            </Button>
          </div>
        </form>
      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: '100%', maxWidth: '600px', fontSize: '1.2rem', padding: '20px' }}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};
export default RegistrarUsuario;