import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import Swal from 'sweetalert2';

const ReasiganarJurados = ({ isOpen, closeModal }) => {
  const initialState = {
   carnetIdentidad:"",
    motivo: ""
  };

  const [formData, setFormData] = useState(initialState);

  const url = process.env.REACT_APP_VARURL;

  const handleGuardar = () => {
    if (formData.carnetIdentidad === "" || formData.motivo === "") {
      Swal.fire({
        icon: 'error',
        title: 'Error al reasignar jurado',
        text: `Complete correctamente los datos.`,
      });
      return;
    }

    const nuevoCandidato = {
      CARNETIDENTIDAD: formData.carnetIdentidad
    };

    axios.post(`${url}mesa/{cod_mesa}/jurado}`)
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: 'Jurados guardados correctamente',
          text: `Los jurados se han actualizado con éxito!`
        }).then(() => {
          closeModal();
          setFormData(initialState);
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al agregar jurados',
          text: `Ocurrió un error al reasignar los jurados: ${error}`
        });
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
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...modalStyle, width: '400px' }}>
        <Typography variant="h6" component="h2">
          REASIGNAR JURADOS
        </Typography>
        <TextField
          label="Carnet de Identidad"
          type="text"
          name="carnetIdentidad"
          value={formData.carnetIdentidad}
          onChange={handleInputChange}
          onClick={(e) => e.stopPropagation()}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Motivo"
          type="text"
          name="motivo"
          value={formData.motivo}
          onChange={handleInputChange}
          onClick={(e) => e.stopPropagation()}
          fullWidth
          margin="normal"
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
        <Button variant="contained" color="primary" onClick={handleGuardar} style={{marginRight:'12px'}}>
          Guardar
        </Button>
        <Button variant="contained" color="secondary" onClick={handleCloseModal}>
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

export default ReasiganarJurados;