import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import   {MenuItem, Select, styled, FormControl, InputLabel, } from '@mui/material';

const StyledFormControl = styled(FormControl)({
  width: '100%',
  marginTop:'8px'
});


const ReasiganarJurados = ({ isOpen, closeModal }) => {
  const initialState = {
    carnetIdentidad: "",
    motivo: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarType, setSnackbarType] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [motivoR, setMotivo] = useState('');

  const url = process.env.REACT_APP_VARURL;
  


  const handleGuardar = () => {
    if (formData.carnetIdentidad === "" || formData.motivo === "") {
      openSnackbar("error", "Complete correctamente los datos.");
      return;
    }

    axios
      .put(`${url}jurado/${formData.carnetIdentidad}`, {carnetIdentidad: formData.carnetIdentidad, motivo: motivoR })
      .then((response) => {
        openSnackbar("success", "Jurados guardados correctamente");
        closeModal();
        setFormData(initialState);
      })
      .catch((error) => {
        openSnackbar("error", `Error al agregar jurados: ${error}`);
      });
  };
  const opcionesMotivo = [
    { value: 'Enfermedad de base', label: 'Enfermedad de base' },
    { value: 'Estado de gestacion', label: 'Estado de gestacion' },
    { value: 'Accidentes de tránsito', label: 'Accidentes de tránsito' },
    { value: 'Viaje al exterior del país', label: 'Viaje al exterior del país' },
  ];
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'motivoPermiso') {
      setMotivo(value);
    }
  };

  const handleCloseModal = (event) => {
    event.stopPropagation();
    setMotivo(""); 
    closeModal();
    setFormData(initialState);
  };

  const openSnackbar = (type, message) => {
    setSnackbarType(type);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...modalStyle, width: "400px" }}>
        <Typography variant="h6" component="h2" style={{ textAlign: "center" }}>
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
        <StyledFormControl >
            <FormControl fullWidth>
              <InputLabel htmlFor="motivoPermiso">Motivo de reasignacion:</InputLabel>
              <Select
                label="Motivo de reasignacion"
                name="motivoPermiso"
                value={motivoR}
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
        </StyledFormControl>
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
          <Button variant="contained" color="primary" onClick={handleGuardar} style={{ marginRight: "12px" }}>
            Guardar
          </Button>
          <Button variant="contained" color="secondary" onClick={(event) => handleCloseModal(event)}>
            Cancelar
          </Button>
        </Box>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={closeSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={closeSnackbar}
            severity={snackbarType}
            sx={{ width: "100%", maxWidth: "600px", fontSize: "1rem" }}
          >
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </Box>
    </Modal>
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

export default ReasiganarJurados;