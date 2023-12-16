import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, styled } from "@mui/system";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const ModalContainer = styled("div")({
  position: "absolute",
  width: 550,
  backgroundColor: "#fff",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  padding: "20px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  "& .ActualizarTitulo": {
    color: "rgb(0, 57, 116)",
    marginBottom: "35px",
  },
});

const InputField = styled(TextField)({
  marginBottom: "28px",
});

const CustomButton = styled(Button)({
  marginRight: "10px",
});

const ActualizarFrenteModal = ({ isOpen, closeModal, frenteId }) => {
  const initialState = {
    nombre: "",
    sigla: "",
    Logo: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState('success');

  const url = process.env.REACT_APP_VARURL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url + `frentes/${frenteId}`);
        const frente = response.data;
        setFormData({
          nombre: frente.NOMBRE_FRENTE,
          sigla: frente.SIGLA_FRENTE,
        });
      } catch (error) {
        console.error("Error al obtener los datos del frente político:", error);
      }
    };

    fetchData();
  }, [frenteId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleActualizarClick = () => {
    if (!formData.nombre || !formData.sigla) {
      setSnackbarType('error');
      setSnackbarMessage("Llene correctamente los datos");
      setSnackbarOpen(true);
      return;
    }

    axios
      .put(url + `frentes/${frenteId}`, {
        NOMBRE_FRENTE: formData.nombre,
        SIGLA_FRENTE: formData.sigla,

      })
      .then((response) => {
        setSnackbarType('success');
        setSnackbarMessage("Frente político actualizado con éxito!");
        setSnackbarOpen(true);
      })
      .catch((error) => {
        setSnackbarType('error');
        setSnackbarMessage("Ocurrió un error al actualizar el frente político");
        setSnackbarOpen(true);
      });
  };

  const handleVolverAtras = () => {
    closeModal();
  };

  const handleCloseSnackbar = () => {
    closeModal();
    setSnackbarOpen(false);
  };
  
  return (
    <Modal
      open={isOpen}
      onClose={() => {}}
      aria-labelledby="Actualizar Frente"
      BackdropProps={{
        style: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        invisible: false,
      }}
    >
      <ModalContainer>
        <h3 style={{ marginBottom: "19px" }}>ACTUALIZAR FRENTE POLÍTICO</h3>
        <InputField
          label="Nombre"
          variant="outlined"
          name="nombre"
          value={formData.nombre}
          onChange={handleInputChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <InputField
          label="Sigla"
          variant="outlined"
          name="sigla"
          value={formData.sigla}
          onChange={handleInputChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />

        <Box sx={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
          <CustomButton
            variant="contained"
            color="primary"
            className="custom-btn btn-9"
            onClick={handleActualizarClick}
          >
            Actualizar
          </CustomButton>
          <CustomButton
            variant="contained"
            color="secondary"
            className="custom-btn btn-8"
            onClick={handleVolverAtras}
          >
            Volver
          </CustomButton>
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
            sx={{ width: '100%', maxWidth: '600px', fontSize: '1.2rem', padding: '20px' }}
          >
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </ModalContainer>
    </Modal>
  );
};

export default ActualizarFrenteModal;