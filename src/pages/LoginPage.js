import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper, CssBaseline, Modal,styled } from '@mui/material';
import { useNavigate } from 'react-router';
import axios from 'axios';
import imagen from "../img/UMSS.png"

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

const ModalContainer = styled('div')({
  position: 'absolute',
  width: 350,
  backgroundColor: '#fff',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  padding: '20px',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  '.ActualizarTitulo': {
    color: 'rgb(0, 57, 116)',
    marginBottom: '35px',
  },
});

const LoginPage = () => {
  const [showErrorNombre, setshowErrorName] = useState(false);
  const [showContraseña, setContraseña] = useState(false);
  const [showValorInput, setValorInput] = useState({ name: '', password: '' });
  const [openModal, setOpenModal] = useState(false);
  const [contrasena, setContrasena] = useState('');
  const url = process.env.REACT_APP_VARURL;

  const navigate = useNavigate();
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleSubmit = async (e) => {
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

    if (!showErrorNombre && !showContraseña) {
      try {
        const response = await axios.post(`${url}tribunalLogin`, {
          USUARIO: showValorInput.name,
          CONTRASENA: showValorInput.password,
        });

        const data = response.data;

        if (data.success) {
          // Autenticación exitosa
          alert('Autenticación exitosa');

          // Puedes acceder a la información adicional
          console.log('Usuario:', data.user);
          console.log('Información de población:', data.poblacionInfo);

          const userType = data.user ? data.user.usertype : 'Tipo de usuario no disponible';
          const UserName = data.user ? data.user.usuario : 'Nombre de usuario no disponible';

          // Redirige a la página home con los parámetros en la URL
          navigate(`/home?userType=${userType}&UserName=${UserName}`);
        } else {
          alert('Credenciales inválidas');
        }
      } catch (error) {
        console.error('Error al autenticar', error);
        alert('Error al autenticar');
      }
    }
  };
    
  const CapturaContenido = (e) => {
    const { name, value } = e.target;
    setValorInput({
      ...showValorInput,
      [name]: value,
    });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContrasena({ ...contrasena, [name]: value });
  };
  const recuperacion = async (e) => {
    if (contrasena.length === 0) {
      setshowErrorName(true);
    } else {
      setshowErrorName(false);
    }
  
    if (!showErrorNombre && contrasena.length > 0) {
      try {
        await axios.post(`${url}recuperarUsuarioPassword`, {
          CONTRASENA: contrasena
        });
        alert('Correo enviado exitosamente');
      } catch (error) {
        console.error('Error al recuperar contraseña', error);
        alert('Error al recuperar contraseña');
      }
    }
    setOpenModal(false);
  };
  return (
    <Container component="main" disableGutters sx={styles}>
      <CssBaseline />
      <Paper elevation={5} sx={{ padding: 3, width: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h4" gutterBottom sx={{ fontSize: '25px' }}>
          Bienvenido al Sistema de Elecciones
        </Typography>
        <img src={imagen} alt="Descripción de la imagen" style={{ width: '20%', marginBottom: '20px' }} />
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
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
            helperText={showErrorNombre && 'Por favor ingrese su usuario'}
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
            error={contrasena}
            helperText={contrasena && 'Por favor ingrese un correo'}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Ingresar
          </Button>
          <a href="#" onClick={handleOpenModal} style={{ marginTop: '28px' }}>
            ¿Olvidaste tu contraseña? Recupérala aquí
          </a>
        </form>
      </Paper>
      <Modal open={openModal} >
        <ModalContainer>
          <h3 style={{ marginBottom: '16px', fontSize: '1.3rem', fontWeight: 'bold', textAlign: 'center' }}>
            Recuperación de Contraseña
          </h3>
          <Typography variant="body1" sx={{ mb: 2, fontSize: '0.9rem', textAlign: 'justify' }}>
            Ingrese su correo institucional al cual se le enviara sus credenciales.
          </Typography>
          <TextField
            label="Ingrese correo electronico"
            variant="outlined"
            placeholder="Ingrese correo electronico"
            margin="normal"
            fullWidth
            value={contrasena}
            onChange={handleInputChange}
            error={showContraseña}
            helperText={showContraseña && 'Por favor ingrese una contraseña'}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={recuperacion} sx={{ fontSize: '0.8rem' }}>
              Cerrar
            </Button>
          </div>
        </ModalContainer>
      </Modal>
    </Container>
  );
};

export default LoginPage;
