import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";

const EliminarFrenteModal = ({ isOpen, closeModal, frenteId }) => {
  const initialState = {
    motivoEliminacion: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const url = process.env.REACT_APP_VARURL;

  const handleSnackbarOpen = (severity, message) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleEliminarClick = () => {
    if (!formData.motivoEliminacion) {
      handleSnackbarOpen("error", "Ingrese un motivo");
      return;
    }

    const eliminacion = {
      MOTIVO: formData.motivoEliminacion,
    };

    axios
      .put(`${url}frentes/delete/${frenteId}`, eliminacion)
      .then((response) => {
        handleSnackbarOpen("success", "Frente político eliminado correctamente");
        handleVolverAtras();
        setFormData(initialState);
      })
      .catch((error) => {
        handleSnackbarOpen("error", "Ocurrió un error al eliminar el frente político");
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
    <>
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
        <Box sx={{ ...modalStyle, width: "500px" }}>
          <Typography variant="h6" component="h2" sx={{ display: "flex", justifyContent: "center", marginBottom: "12px" }}>
            ELIMINACION DE FRENTE POLITICO
          </Typography>

          <Typography variant="body1" gutterBottom sx={{ display: "flex", justifyContent: "center" }}>
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

          <Box sx={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
            <Button variant="contained" color="error" onClick={handleEliminarClick} style={{ marginRight: "12px" }}>
              Eliminar
            </Button>
            <Button variant="contained" color="primary" onClick={handleVolverAtras}>
              Cancelar
            </Button>
          </Box>
        </Box>
      </Modal>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%', maxWidth: '600px', fontSize: '1.2rem', padding: '20px' }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default EliminarFrenteModal;