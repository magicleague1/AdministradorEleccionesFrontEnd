import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper, CssBaseline } from '@mui/material';
import { useNavigate } from 'react-router';
import axios from 'axios';
import imagen from "../img/UMSS.png"
// import { useUser } from './DiferenciarUsuarios';//agregue esto

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
const LoginPage = () => {
  // const { login } = useUser();//agregue esto nuevo

  const [showErrorNombre, setshowErrorName] = useState(false);
  const [showValorInput, setValorInput] = useState({ name: '', password: '' });
  const [showContraseña, setContraseña] = useState(false);

  const url = process.env.REACT_APP_VARURL;
  const navigate = useNavigate();
//modifique el async y le puse un try
  const LoginClick =  (e) => {
    e.preventDefault();

    if (showValorInput.name.length === 0) {
      setshowErrorName(true);
    } else {
      setshowErrorName(false);
    }

    if (showValorInput.password.length === 0) {
      setContraseña(true);
    } else {
      setContraseña(false);
    }

  //   if (!showErrorNombre && !showContraseña) {
  //     try {
  //       const response = await axios.get(url + 'verificarAdministrador/' + showValorInput.name);
  //       if (response.data) {
  //         const administrador = response.data;

  //         if (showValorInput.password === administrador.CONTRASENAADMINISTRADOR) {
  //           login({ name: showValorInput.name, role: 'admin' });
  //           navigate('/home');
  //         } else {
  //           alert('Contraseña incorrecta');
  //         }
  //       } else {
  //         alert('No existe administrador');
  //       }
  //     } catch (error) {
  //       console.error('Error al verificar administrador:', error);
  //     }
  //   }
  // };
  if (!showErrorNombre && !showContraseña) {
      
    axios.get(url + 'verificarAdministrador/' + showValorInput.name).then((response) => {
      if (response.data) {
        const administrador = response.data;

        if (showValorInput.password === administrador.CONTRASENAADMINISTRADOR) {

          navigate('/home');
        } else {
          alert('Contraseña incorrecta');
        }
      } else {
        alert('No existe administrador');
      }
    });
  }
};

  const CapturaContenido = (e) => {
    const { name, value } = e.target;
    setValorInput({
      ...showValorInput,
      [name]: value,
    });
  };

  return (
    <Container component="main" disableGutters
    sx={styles}>
      <CssBaseline />
      <Paper elevation={5} sx={{ padding: 3, width: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
      
        <Typography component="h1" variant="h4" gutterBottom sx={{fontSize:'25px'}}>
          Bienvenido al Sistema de Elecciones 
        </Typography>
       
        <img src={imagen} alt="Descripción de la imagen" style={{ width: '20%', marginBottom: '20px' }} />
        <form onSubmit={LoginClick} style={{ width: '100%' }}>
          <TextField
            label="Usuario"
            variant="outlined"
            placeholder="Ingresa tu nombre"
            margin="normal"
            fullWidth
            type="text"
            name="name"
            onChange={CapturaContenido}
            error={showErrorNombre}
            helperText={showErrorNombre && 'Por favor ingrese un nombre'}
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
            onChange={CapturaContenido}
            error={showContraseña}
            helperText={showContraseña && 'Por favor ingrese una contraseña'}
            InputLabelProps={{
                shrink: true,
              }}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Ingresar
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginPage;