import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Card,
  CardContent,
  Typography,
  styled,
  Button,
  Box
} from '@mui/material';

const StyledButton = styled(Button)({
  marginLeft: '20px',
  width: '20%'
});

const StyledButtonGroup = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  margin: 'auto',
  width: '100%',
  marginBottom: '12px'
});

const VisualizacionBoletas = ({ isOpen, closeModal, eleccionId }) => {
  const [eleccionBoleta, setEleccionBoleta] = useState([]);
  const url = process.env.REACT_APP_VARURL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url + `obtener_id/${eleccionId}`);
        setEleccionBoleta(response.data);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, [url, eleccionId]);

  const handleVolverAtras = () => {
    closeModal();
  };

  return (
    <Dialog open={isOpen} onClose={closeModal} fullWidth maxWidth={"lg"}>
      <DialogTitle style={{display: 'flex', justifyContent: 'center'}}>{eleccionBoleta?.MOTIVO_ELECCION?.toUpperCase()} </DialogTitle>
      <DialogContent>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'stretch', border: '1px solid #000', width: '100%' }}>
        <Card style={{ flex: '0 0 calc(33.33% - 2rem)', margin: '1rem', backgroundColor: '#b5bac9' }}>
          <CardContent>
            <Typography variant="h6" style={{ display: 'flex', justifyContent: 'center' }}>PAPITAS</Typography>
            <Typography variant="h6" style={{ display: 'flex', justifyContent: 'center' }}>PPP</Typography>
            <Typography>Candidatos:</Typography>
            <div>
              <Typography>Perez Sanchez maria jose - Rector</Typography>
              <Typography>Perez maria jose - Vicerrector</Typography>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', height: '120px' }}>
              <div style={{ margin: 'auto', border: '1px solid #000', width: '50px', height: '50px' }}>
                {/* Contenido del div interno */}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card style={{ flex: '0 0 calc(33.33% - 2rem)', margin: '1rem', backgroundColor: '#b5bac9' }}>
          <CardContent>
            <Typography variant="h6" style={{ display: 'flex', justifyContent: 'center' }}>PAPITAS</Typography>
            <Typography variant="h6" style={{ display: 'flex', justifyContent: 'center' }}>PPP</Typography>
            <Typography>Candidatos:</Typography>
            <div>
              <Typography>Perez Sanchez maria jose - Rector</Typography>
              <Typography>Perez maria jose - Vicerrector</Typography>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', height: '120px' }}>
              <div style={{ margin: 'auto', border: '1px solid #000', width: '50px', height: '50px' }}>
                {/* Contenido del div interno */}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card style={{ flex: '0 0 calc(33.33% - 2rem)', margin: '1rem', backgroundColor: '#b5bac9' }}>
          <CardContent>
            <Typography variant="h6" style={{ display: 'flex', justifyContent: 'center' }}>PAPITAS</Typography>
            <Typography variant="h6" style={{ display: 'flex', justifyContent: 'center' }}>PPP</Typography>
            <Typography>Candidatos:</Typography>
            <div>
              <Typography>Perez Sanchez maria jose - Rector</Typography>
              <Typography>Perez maria jose - Vicerrector</Typography>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', height: '120px' }}>
              <div style={{ margin: 'auto', border: '1px solid #000', width: '50px', height: '50px' }}>
                {/* Contenido del div interno */}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card style={{ flex: '0 0 calc(33.33% - 2rem)', margin: '1rem', backgroundColor: '#b5bac9' }}>
          <CardContent>
            <Typography variant="h6" style={{ display: 'flex', justifyContent: 'center' }}>PAPITAS</Typography>
            <Typography variant="h6" style={{ display: 'flex', justifyContent: 'center' }}>PPP</Typography>
            <Typography>Candidatos:</Typography>
            <div>
              <Typography>Perez Sanchez maria jose - Rector</Typography>
              <Typography>Perez maria jose - Vicerrector</Typography>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', height: '120px' }}>
              <div style={{ margin: 'auto', border: '1px solid #000', width: '50px', height: '50px' }}>
                {/* Contenido del div interno */}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card style={{ flex: '0 0 calc(33.33% - 2rem)', margin: '1rem', backgroundColor: '#b5bac9' }}>
          <CardContent>
            <Typography variant="h6" style={{ display: 'flex', justifyContent: 'center' }}>PAPITAS</Typography>
            <Typography variant="h6" style={{ display: 'flex', justifyContent: 'center' }}>PPP</Typography>
            <Typography>Candidatos:</Typography>
            <div>
              <Typography>Perez Sanchez maria jose - Rector</Typography>
              <Typography>Perez maria jose - Vicerrector</Typography>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', height: '120px' }}>
              <div style={{ margin: 'auto', border: '1px solid #000', width: '50px', height: '50px' }}>
                {/* Contenido del div interno */}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card style={{ flex: '0 0 calc(33.33% - 2rem)', margin: '1rem', backgroundColor: '#b5bac9' }}>
          <CardContent>
            <Typography variant="h6" style={{ display: 'flex', justifyContent: 'center' }}>PAPITAS</Typography>
            <Typography variant="h6" style={{ display: 'flex', justifyContent: 'center' }}>PPP</Typography>
            <Typography>Candidatos:</Typography>
            <div>
              <Typography>Perez Sanchez maria jose - Rector</Typography>
              <Typography>Perez maria jose - Vicerrector</Typography>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', height: '120px' }}>
              <div style={{ margin: 'auto', border: '1px solid #000', width: '50px', height: '50px' }}>
                {/* Contenido del div interno */}
              </div>
            </div>
          </CardContent>
        </Card>
</div>
      </DialogContent>
      <StyledButtonGroup>
        <StyledButton
          variant="contained"
          color="secondary"
          className="custom-btn btn-8"
          onClick={handleVolverAtras}
        >
          Cerrar
        </StyledButton>
      </StyledButtonGroup>
    </Dialog>
  );
};

export default VisualizacionBoletas;