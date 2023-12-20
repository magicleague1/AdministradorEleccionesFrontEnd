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
  Box,
  List,
  ListItemText
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
  const [frentesBoleta, setFrentesBoleta] = useState([]);

  const url = process.env.REACT_APP_VARURL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseEleccion = await axios.get(url + `obtener_id/${eleccionId}`);
        setEleccionBoleta(responseEleccion.data);
      } catch (error) {
        console.error('Error al obtener datos de elección:', error);
      }
    };

    const fetchDataFrentes = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_VARURL}obtenerFrentesYCandidatos/${eleccionId}`);
        setFrentesBoleta(response.data.frentes);
        console.log(response.data.frentes);  // Imprime la información actualizada
      } catch (error) {
        console.error('Error al obtener los frentes:', error);
      }
    };

    fetchData();
    fetchDataFrentes();
  }, [eleccionId]);

  const handleVolverAtras = () => {
    closeModal();
  };

  return (
    <Dialog open={isOpen} onClose={() => {}} fullWidth maxWidth={"lg"} BackdropProps={{
      style: { backgroundColor: "rgba(0, 0, 0, 0.5)" },  
      invisible: false,  
    }}>
      <DialogTitle style={{ display: 'flex', justifyContent: 'center' }}>{eleccionBoleta?.MOTIVO_ELECCION?.toUpperCase()} </DialogTitle>
      <DialogContent>
        {frentesBoleta.length === 0 ? (
          <Typography variant="body1" style={{ display: 'flex', justifyContent: 'center' }}>
            No se puede generar las boletas porque no hay frentes y candidatos registrados.
          </Typography>
        ) : (
          frentesBoleta.map((frente, index) => (
            <Card key={index} style={{ flex: '0 0 80%', margin: '1rem', backgroundColor: '#b5bac9', justifyContent: 'center', textAlign: 'center' }}>
              <CardContent>
                <Typography variant="h6" style={{ display: 'flex', justifyContent: 'center' }}>{frente.NOMBRE_FRENTE}</Typography>
                <Typography variant="h6" style={{ display: 'flex', justifyContent: 'center' }}>{frente.SIGLA_FRENTE}</Typography>
                <Typography style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '12px' }}>Candidatos:</Typography>
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '22px' }}>
                  {frente.candidatos.length > 0 ? (
                    <List>
                      {frente.candidatos.map((candidato, index) => (
                        <ListItemText
                          key={index}
                          primary={`${candidato.NOMBRE} ${candidato.APELLIDO}`}
                          secondary={`Carnet: ${candidato.CARNETIDENTIDAD}`}
                          style={{ color: "black" }}
                        />
                      ))}
                    </List>
                  ) : (
                    <p style={{ textAlign: "center" }}>No hay candidatos para este frente.</p>
                  )}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%', height: '120px' }}>
                  <div style={{ margin: 'auto', border: '1px solid #000', width: '50px', height: '50px' }}></div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
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