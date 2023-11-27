import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, styled } from "@mui/system";
import axios from "axios";
import Swal from "sweetalert2";

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

const CrearPublicaConv = ({ isOpen, closeModal, eleccionId }) => {
  const fechaActual = new Date().toISOString().split("T")[0];

  const [data, setData] = useState({
    id_convocatoria: "",
    fecha_publicacion: fechaActual,
    titulo: "",
    contenido: "",
  });

  useEffect(() => {
    obtenerIdConvocatoria(eleccionId);
  }, [eleccionId]);
  const handleVolverAtras = () => {
    closeModal();
  };
  const obtenerIdConvocatoria = async (eleccionId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_VARURL}obtener_id_convocatoria/${eleccionId}`
      );
      setData({ ...data, id_convocatoria: response.data.id_convocatoria });
    } catch (error) {
      console.error("Error al obtener la convocatoria:", error);
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        process.env.REACT_APP_VARURL + "publicar_convocatorias_crear",
        data
      );

      console.log("Datos enviados:", response.data);
    } catch (error) {
      console.error("Error al enviar datos:", error);
    }
  };

  return (
    <Modal open={isOpen}  onClose={closeModal} aria-labelledby="Crear Convocatoria">
      <ModalContainer>
        <Typography variant="h6" gutterBottom>
          CREAR CONVOCATORIA
        </Typography>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Título"
            variant="outlined"
            name="titulo"
            value={data.titulo}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Contenido"
            variant="outlined"
            name="contenido"
            value={data.contenido}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
          />
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
            <CustomButton
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
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
  );
};

export default CrearPublicaConv;
