import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Box, styled } from "@mui/system";
import axios from "axios";

const ModalContainer = styled("div")({
  position: "absolute",
  width: 400,
  backgroundColor: "#fff",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  padding: "20px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

const InputField = styled(TextField)({
  marginBottom: "20px",
});

const CustomButton = styled(Button)({
  marginRight: "10px",
});

const CrearListaPublicacion = ({ isOpen, closeModal, eleccionId }) => {
  const fechaActual = new Date().toISOString().split("T")[0];

  const [data, setData] = useState({
    id_eleccion_mesa: eleccionId,
    fecha_publicacion: fechaActual,
    titulo: "",
    contenido: "",
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleVolverAtras = () => {
    closeModal();
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(process.env.REACT_APP_VARURL + "publicar_mesa", data);
      handleSnackbarOpen("success", "Publicacion exitosa", "La publicacion de la convocatoria se realizó con éxito.");
      console.log("Datos enviados:", data);
    } catch (error) {
      handleSnackbarOpen("error", "Error en la publicacion", "Ocurrió un error en la publicacion de la convocatoria.");
      console.error("Error al enviar datos:", error);
    }
  };

  const handleSnackbarOpen = (severity, message) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <div>
      <Modal open={isOpen} onClose={closeModal} aria-labelledby="Crear Convocatoria">
        <ModalContainer>
          <Typography variant="h6" gutterBottom>
            PUBLICAR LISTA MESAS
          </Typography>
          <form onSubmit={handleSubmit}>
            <InputField
              label="Título para la publicacion"
              variant="outlined"
              name="titulo"
              value={data.titulo}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Contenido de la publicacion"
              variant="outlined"
              name="contenido"
              value={data.contenido}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <Box sx={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
              <CustomButton variant="contained" color="primary" onClick={handleSubmit}>
                Enviar Datos
              </CustomButton>

              <CustomButton
                variant="contained"
                color="secondary"
                className="custom-btn btn-8"
                onClick={handleVolverAtras}
              >
                Cancelar
              </CustomButton>
            </Box>
          </form>
        </ModalContainer>
      </Modal>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default CrearListaPublicacion;