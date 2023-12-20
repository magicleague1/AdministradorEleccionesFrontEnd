import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import {
  MenuItem,
  Select,
  styled,
  FormControl,
  InputLabel,
} from '@mui/material';
const StyledFormControl = styled(FormControl)({
  width: '90%',
  marginLeft:'12px',
  marginTop:'8px'
});
const EliminarFrenteModal = ({ isOpen, closeModal, frenteId }) => {
  
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [motivo, setMotivo] = useState('');
  const [mostrarTextField, setMostrarTextField] = useState(false);
  const [motivoAdicional, setMotivoAdicional] = useState('');

  const url = process.env.REACT_APP_VARURL;

  const handleSnackbarOpen = (severity, message) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const opcionesMotivo = [
    { value: 'Inhabilitación por Documentación Incompleta', label: 'Inhabilitación por Documentación Incompleta' },
    { value: 'Incumplimiento del Reglamento de Campañas', label: 'Incumplimiento del Reglamento de Campañas' },
    { value: 'Inhabilitación de Candidatos', label: 'Inhabilitación de Candidatos' },
    { value: 'Otro', label: 'Otro' },
  ];
  const handleInputChange = (e) => {
    const { value } = e.target;
    const textoSeleccionado = opcionesMotivo.find(
      (opcion) => opcion.value === value
    )?.label;

    setMotivo(textoSeleccionado);
    setMostrarTextField(value === 'Otro');
  };
  const handleEliminarClick = () => {
    if (!motivo) {
      handleSnackbarOpen("error", "Ingrese un motivo");
      return;
    }
    const motivoFinal = motivoAdicional || motivo;
    axios
      .put(`${url}frentes/delete/${frenteId}`, {motivo: motivoFinal})
      .then((response) => {
        handleSnackbarOpen("success", "Frente político eliminado correctamente");
        handleCancelarClick();
        setMotivo("");
      })
      .catch((error) => {
        handleSnackbarOpen("error", "Ocurrió un error al eliminar el frente político");
      });
  };

  const handleCancelarClick = () => {
    setMotivo(""); 
    setMostrarTextField(false);
    setMotivoAdicional("");
    closeModal();
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
          <div style={{ display: 'flex', justifyContent: 'center' }}>
          <StyledFormControl >
            <FormControl fullWidth>
              <InputLabel htmlFor="motivoPermiso">Motivo de eliminación:</InputLabel>
              <Select
                label="Motivo de eliminación"
                name="motivoPermiso"
                value={motivo}
                onChange={(e) => {
                  handleInputChange(e);
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              >
                <MenuItem value="" disabled>
                  -----Seleccione un motivo-----
                </MenuItem>
                {opcionesMotivo.map((opcion) => (
                  <MenuItem key={opcion.value} value={opcion.value}>
                    {opcion.label}
                  </MenuItem>
                ))}
              </Select>
                </FormControl>
                {mostrarTextField && (
                  <FormControl>
                  <TextField
                    label="Ingrese otro motivo:"
                    type="text"
                    name="SIGLA_FRENTE"
                    value={motivoAdicional}
                    onChange={(e) => setMotivoAdicional(e.target.value)}
                    placeholder="Ingrese otro motivo"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={{marginTop:'18px'}}
                  />
                  </FormControl>
                )}
          </StyledFormControl>
          </div>

          <Box sx={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
            <Button variant="contained" color="error" onClick={handleEliminarClick} style={{ marginRight: "12px" }}>
              Eliminar
            </Button>
            <Button variant="contained" color="primary" onClick={handleCancelarClick} >
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