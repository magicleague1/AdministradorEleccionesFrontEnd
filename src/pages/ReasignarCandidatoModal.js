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
    try {
      const response = await axios.put(`${url}reasignarCandidato`, {
        carnetIdentidadAntiguo: formData.carnetIdentidadAntiguo,
        carnetIdentidadNuevo: formData.carnetIdentidadNuevo,
        motivo: formData.motivo,
      });

      if (response.data.success) {
        setSnackbarMessage('Candidato reasignado correctamente');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);

        closeModal();
        setFormData(initialState);
      } else {
        setSnackbarMessage(`Error al reasignar candidato: ${response.data.error}`);
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setSnackbarMessage(`Error al reasignar candidato: ${error}`);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
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
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
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