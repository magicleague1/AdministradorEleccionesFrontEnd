import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from '@mui/material/InputLabel';
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const AgregarCandidatoModal = ({ isOpen, closeModal }) => {
  const initialState = {
    codFrente: "",
    carnetIdentidad: "",
    cargoPostulado: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [fronts, setFronts] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");
  const url = process.env.REACT_APP_VARURL;
  useEffect(() => {
    // Fetch the list of fronts
    axios.get('${url}frentes')
      .then((response) => {
        setFronts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching fronts:", error);
      });
  }, []);

  

  const handleGuardar = () => {
    if (formData.carnetIdentidad === "" || formData.cargoPostulado === "") {
      setSnackbarType("error");
      setSnackbarMessage("Complete correctamente los datos.");
      setSnackbarOpen(true);
      return;
    }

    const nuevoCandidato = {
      COD_FRENTE: formData.codFrente,
      CARNETIDENTIDAD: formData.carnetIdentidad,
      CARGO_POSTULADO: formData.cargoPostulado,
    };

    axios
      .post(`${url}frentes/asignarCandidatos`, nuevoCandidato)
      .then((response) => {
        setSnackbarType("success");
        setSnackbarMessage("Candidato guardado correctamente");
        setSnackbarOpen(true);
        setFormData(initialState);
      })
      .catch((error) => {
        setSnackbarType("error");
        setSnackbarMessage(
          `Ocurrió un error al agregar un candidato al frente político: ${error}`
        );
        setSnackbarOpen(true);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    closeModal();
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
      <Box sx={{ ...modalStyle, width: "400px" }}>
        <Typography variant="h6" component="h2" sx={{marginBottom:'15px', textAlign:'center'}}>
          AGREGAR CANDIDATO
        </Typography>
        
        <Select
        value={formData.codFrente}
        onChange={handleInputChange}
        name="codFrente"
        fullWidth
        margin="normal"
        displayEmpty
        InputLabelProps={{ shrink: true }}
        inputProps={{ 'aria-label': 'Elegir un frente político' }}
      >
        <MenuItem value="" disabled>
          Elegir un frente político
        </MenuItem>
        {fronts.map((front) => (
          <MenuItem key={front.COD_FRENTE} value={front.COD_FRENTE}>
            {front.NOMBRE_FRENTE}
          </MenuItem>
        ))}
      </Select>
      <TextField
        label="Carnet de Identidad"
        type="text"
        name="carnetIdentidad"
        value={formData.carnetIdentidad}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Cargo"
        type="text"
        name="cargoPostulado"
        value={formData.cargoPostulado}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
   
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "16px",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleGuardar}
            style={{ marginRight: "12px" }}
          >
            Guardar
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCloseModal}
          >
            Cancelar
          </Button>
        </Box>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleCloseSnackbar}
            severity={snackbarType}
            sx={{
              width: "100%",
              maxWidth: "600px",
              fontSize: "1.2rem",
              padding: "20px",
            }}
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

export default AgregarCandidatoModal;
