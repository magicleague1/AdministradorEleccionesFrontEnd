import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

const ReasignarCandidatoModal = ({ isOpen, closeModal }) => {
  const initialState = {
    carnetIdentidadAntiguo: '',
    carnetIdentidadNuevo: '',
    motivo: '',
  };

  const [formData, setFormData] = useState(initialState);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // You can set the initial severity as needed
  
  const url = process.env.REACT_APP_VARURL;

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleReasignarCandidato = async () => {
    if (formData.carnetIdentidadAntiguo === "" || formData.carnetIdentidadNuevo === "" || formData.motivo ==="") {
      setSnackbarSeverity("error");
      setSnackbarMessage("Complete correctamente los datos.");
      setSnackbarOpen(true);
      return;
    }
    axios
      .get(`${url}candidatos/verificarExistencia`, {
        params: {
          carnetIdentidad: formData.carnetIdentidadAntiguo,
        },
      })
      .then((response) => {
        const existeCandidato = response.data.existeCandidato;

        if (existeCandidato) {
          setSnackbarSeverity("error");
          setSnackbarMessage("Este candidato ya está registrado.");
          setSnackbarOpen(true);
        } else {
          axios
          .put(`${url}reasignarCandidato`, {
            carnetIdentidadAntiguo: formData.carnetIdentidadAntiguo,
            carnetIdentidadNuevo: formData.carnetIdentidadNuevo,
            motivo: formData.motivo,
          })
            .then((response) => {
              setSnackbarSeverity("success");
              setSnackbarMessage("Candidato registrado correctamente");
              setSnackbarOpen(true);
              setFormData(initialState);
            })
            .catch((error) => {
              setSnackbarSeverity("error");
              setSnackbarMessage(
                `Ocurrió un error al reasignar un candidato al frente político: ${error}`
              );
              setSnackbarOpen(true);
            });
        }
      })
      .catch((error) => {
        console.error("Error al verificar la existencia del candidato:", error);
      });
 
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCloseModal = () => {
    closeModal();
    setFormData(initialState);
  };

  return (
    <Modal
      open={isOpen}
      onClose={() => {}}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      BackdropProps={{
        style: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        invisible: false,
      }}
    >
      <Box sx={{ ...modalStyle, width: '400px' }}>
        <Typography variant="h6" component="h2">
          REASIGNAR CANDIDATOS
        </Typography>
        <TextField
          label="Carnet de Identidad Antiguo"
          type="text"
          name="carnetIdentidadAntiguo"
          value={formData.carnetIdentidadAntiguo}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Carnet de Identidad Nuevo"
          type="text"
          name="carnetIdentidadNuevo"
          value={formData.carnetIdentidadNuevo}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Motivo"
          type="text"
          name="motivo"
          value={formData.motivo}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleReasignarCandidato}
            style={{ marginRight: '12px' }}
          >
            Guardar
          </Button>
          <Button variant="contained" color="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
        </Box>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            elevation={6}
            variant="filled"
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
            sx={{ width: '100%', maxWidth: '600px', fontSize: '1.2rem', padding: '20px' }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default ReasignarCandidatoModal;
