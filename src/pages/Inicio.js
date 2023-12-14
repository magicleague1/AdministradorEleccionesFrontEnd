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
        <Typography variant="h2" className="Letras2" style={{alignItems: 'center', fontSize: '48px'}}>Bienvenido al sistema de administración de elecciones </Typography>
        <Typography variant="h2" className="Letras1" style={{textAlign: 'center', fontSize: '35px'}}>UNIVERSIDAD MAYOR DE SAN SIMON</Typography>
      </div>
    </Container>
  );
};

export default Inicio;
