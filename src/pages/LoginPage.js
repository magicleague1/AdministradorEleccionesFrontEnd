import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  CssBaseline,
  Modal,
} from '@mui/material';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { styled } from '@mui/system';
import imagen from '../img/UMSS.png';
import { useAuth } from '../AuthContext';

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
  const { login } = useAuth();
  const [formData, setFormData] = useState({ name: '', password: '' });
  const [errors, setErrors] = useState({ name: false, password: false });
  const [openModal, setOpenModal] = useState(false);
  const url = process.env.REACT_APP_VARURL;
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const LoginClick = async (e) => {
    e.preventDefault();

    const { name, password } = formData;
    const newErrors = { name: name.length === 0, password: password.length === 0 };
    setErrors(newErrors);

    if (!newErrors.name && !newErrors.password) {
      try {
        const response = await axios.get(`${url}verificarAdministrador/${name}`);
        const administrador = response.data;
 
        if (administrador) {
          if (password === administrador.CONTRASENAADMINISTRADOR) {
            navigate('/home');
          } else {
            alert('Contraseña incorrecta');
          }
        } else {
          alert('No existe administrador');
        }
        login();
      } catch (error) {
        alert('Usuario Incorrecto');
      }
    }
  };

  const CapturaContenido = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  return (
    <Container component="main" disableGutters sx={styles}>
      <CssBaseline />
      <Paper elevation={5} sx={{ padding: 2, width: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h4" gutterBottom sx={{ fontSize: '25px' }}>
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
            error={errors.name}
            helperText={errors.name && 'Por favor ingrese un nombre'}
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
            error={errors.password}
            helperText={errors.password && 'Por favor ingrese una contraseña'}
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
      <Modal open={openModal} onClose={handleCloseModal}>
        <ModalContainer>
          <h3 style={{ marginBottom: '16px', fontSize: '1.3rem', fontWeight: 'bold', textAlign: 'center' }}>
            Recuperación de Contraseña
          </h3>
          <Typography variant="body1" sx={{ mb: 2, fontSize: '0.9rem', textAlign: 'justify' }}>
            Se enviará la contraseña asignada a su dirección de correo electrónico.
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={handleCloseModal} sx={{ fontSize: '0.8rem' }}>
              Cerrar
            </Button>
          </div>
        </ModalContainer>
      </Modal>
    </Container>
  );
};

export default LoginPage;