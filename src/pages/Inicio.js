import React from 'react';
import { Container, Typography } from '@mui/material';
import BackgroundImage from '../img/fcyt.png'; // Asegúrate de importar la imagen correcta
import "../css/inicio.css";

const Inicio = () => {
  const backgroundImageStyle = {
    backgroundImage: `url(${BackgroundImage})`, // Cambia BackgroundImage al nombre de tu importación de la imagen
    backgroundSize: ' 100% 100%',
    backgroundPosition: 'center',
    minHeight: '100vh', // Ajusta según tus necesidades
    display: 'grid',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <Container style={backgroundImageStyle}>
      <div className="LetrasDescripcion">
        <Typography variant="h2" className="Letras2" style={{alignItems: 'center', fontSize: '48px'}}>SISTEMA DE ADMINISTRACION DE ELECCIONES </Typography>   
      </div>
    </Container>
  );
};

export default Inicio;
