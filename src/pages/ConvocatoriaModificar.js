import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Typography,
  TextField,
  Button,
  FormControl,
  Box,
  styled,
  Dialog,
  DialogTitle,
  DialogContent,
  Snackbar,
} from "@mui/material";
import MuiAlert from '@mui/material/Alert';

const StyledFormControl = styled(FormControl)({
  width: '100%',
  marginBottom: '18px',
});

const StyledButtonGroup = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  margin: 'auto',
  width: '100%',
});

const StyledButton = styled(Button)({
  marginLeft: '20px',
});

const ConvocatoriaModificar = ({ isOpen, closeModal, eleccionId }) => {
  const [convocatoria, setConvocatoria] = useState({
    fecha_inicio: '',
    fecha_fin: '',
    motivo: '',
    descripcion: '',
    requisitos: '',
    tipo: '',
    candidatos: '',
    estado: '',
    restricciones: '',
    contacto: '',
    lugar: '',
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_VARURL}convocatorias/${eleccionId}`)
      .then((response) => {
        setConvocatoria(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [eleccionId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConvocatoria({ ...convocatoria, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${process.env.REACT_APP_VARURL}convocatorias/${eleccionId}`, convocatoria)
      .then((response) => {
        console.log(response.data);
        setSnackbarSeverity('success');
        setSnackbarMessage('Actualización de convocatoria correctamente');
        setSnackbarOpen(true);
        closeModal();
      })
      .catch((error) => {
        setSnackbarSeverity('error');
        setSnackbarMessage('Error al actualizar la convocatoria');
        setSnackbarOpen(true);
        console.error(error);
      });
  };

  const handleVolverAtras = () => {
    closeModal();
  };
  return (
    <Dialog open={isOpen} onClose={() => {}} fullWidth maxWidth="md" BackdropProps={{
      style: { backgroundColor: "rgba(0, 0, 0, 0.5)" },  
      invisible: false,  
    }}>
      <DialogTitle>
        <Typography variant="h4" gutterBottom style={{ textAlign: 'center', marginBottom: '28px' }}>
          ACTUALIZAR CONVOCATORIA
        </Typography>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <StyledFormControl>
            <Typography variant="h6" gutterBottom sx={{ marginBottom: '20px' }}>
              Fecha inscripciones de frentes
            </Typography>
            <div style={{ display: 'flex', marginBottom: '5px' }}>
              <TextField
                type="date"
                name="fecha_inicio"
                label="Fecha inicio de inscripcion"
                onChange={handleChange}
                required
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                value={convocatoria.fecha_inicio}
                sx={{ marginRight: '15px' }}
              />
              <TextField
                type="date"
                name="fecha_fin"
                label="Fecha fin de inscripcion"
                onChange={handleChange}
                required
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                value={convocatoria.fecha_fin}
              />
            </div>
          </StyledFormControl>

          <StyledFormControl>
            <Typography variant="h6" gutterBottom>
              Motivo, Tipo y Lugar
            </Typography>
            <div style={{ display: 'flex', marginBottom: '20px' }}>
              <TextField
                type="text"
                name="motivo"
                label="Motivo"
                onChange={handleChange}
                required
                fullWidth
                value={convocatoria.motivo}
                sx={{ marginRight: '15px' }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                type="text"
                name="tipo"
                label="Tipo"
                onChange={handleChange}
                required
                fullWidth
                value={convocatoria.tipo}
                sx={{ marginRight: '15px' }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                type="text"
                name="lugar"
                label="Lugar"
                onChange={handleChange}
                required
                fullWidth
                value={convocatoria.lugar}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          </StyledFormControl>

          <StyledFormControl>
            <Typography variant="h6" gutterBottom>
              Descripción, Requisitos y Restricciones
            </Typography>
            <div style={{ display: 'flex' }}>
              <TextField
                multiline
                rows={4}
                name="descripcion"
                label="Descripción"
                onChange={handleChange}
                required
                fullWidth
                value={convocatoria.descripcion}
                sx={{ marginRight: '15px' }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                multiline
                rows={4}
                name="requisitos"
                label="Requisitos"
                onChange={handleChange}
                required
                fullWidth
                value={convocatoria.requisitos}
                sx={{ marginRight: '15px' }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                multiline
                rows={4}
                name="restricciones"
                label="Restricciones"
                onChange={handleChange}
                required
                fullWidth
                value={convocatoria.restricciones}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          </StyledFormControl>

          <StyledButtonGroup>
            <StyledButton variant="contained"
            color="primary"
            className="custom-btn btn-9" 
            type="submit"
            sx={{marginRight:'12px'}}>
              Actualizar
            </StyledButton>
            <StyledButton variant="contained"
            color="secondary"
            className="custom-btn btn-8"onClick={handleVolverAtras} >
          Cerrar
        </StyledButton>
          </StyledButtonGroup>
        </form>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={() => setSnackbarOpen(false)}
            severity={snackbarSeverity}
          >
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </DialogContent>
     
    </Dialog>
  );
};

export default ConvocatoriaModificar;