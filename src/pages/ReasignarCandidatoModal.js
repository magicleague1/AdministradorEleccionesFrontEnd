import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, Snackbar } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';

const ReasignarCandidatoModal = ({ isOpen, closeModal }) => {
  const initialState = {
    carnetIdentidadAntiguo: '',
    carnetIdentidadNuevo: '',
    motivo: '',
  };

  const [formData, setFormData] = useState(initialState);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
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
        Swal.fire({
          icon: 'success',
          title: 'Candidato reasignado correctamente',
          text: response.data.success,
          onClose: () => {
            closeModal();
            setFormData(initialState);
          },
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error al reasignar candidato',
          text: response.data.error,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error al reasignar candidato',
        text: `Ocurrió un error al reasignar el candidato: ${error}`,
      });
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
        <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose} message={snackbarMessage} />
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
