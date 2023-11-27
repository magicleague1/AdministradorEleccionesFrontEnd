import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import Swal from 'sweetalert2';

const EliminarFrenteModal = ({ isOpen, closeModal, frenteId }) => {
  const initialState = {
    motivoEliminacion: "",
  };

  const [formData, setFormData] = useState(initialState);
  const url = process.env.REACT_APP_VARURL;

  const handleEliminarClick = () => {
    if (!formData.motivoEliminacion) {
      Swal.fire({
        icon: 'error',
        title: 'Error al eliminar frente político',
        text: `Ingrese un motivo`,
      });
      return;
    }

    const eliminacion = {
      MOTIVO: formData.motivoEliminacion,
    };

    axios.put(`${url}frentes/delete/${frenteId}`, eliminacion)
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: 'Frente político eliminado',
          text: `El frente político se ha eliminado correctamente!`,
        }).then(() => {
          handleVolverAtras();
          setFormData(initialState);
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error de eliminación frente político',
          text: `Ocurrió un error al eliminar el frente político`,
        });
      });
  };

  const handleVolverAtras = () => {
    closeModal();
  };

  const handleMotivoChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, motivoEliminacion: value });
  };

  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...modalStyle, width: '500px' }}>
        <Typography variant="h6" component="h2" sx={{ display: 'flex', justifyContent: 'center', marginBottom:'12px'}} >
          ELIMINACION DE FRENTE POLITICO
        </Typography>

        <Typography variant="body1" gutterBottom sx={{ display: 'flex', justifyContent: 'center'}} >
          ¿Deseas eliminar el frente político?
        </Typography>

        <TextField
          label="Motivo de eliminación"
          type="text"
          name="motivoEliminacion"
          value={formData.motivoEliminacion}
          onChange={handleMotivoChange}
          fullWidth
          margin="normal"
        />

        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
          <Button variant="contained" color="error" onClick={handleEliminarClick} style={{marginRight:'12px'}}>
            Eliminar
          </Button>
          <Button variant="contained" color="primary" onClick={handleVolverAtras}>
            Cancelar
          </Button>
        </Box>
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

export default EliminarFrenteModal;