import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import { Box, styled } from "@mui/system";
import axios from "axios";
import Swal from "sweetalert2";

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
const FileInputContainer = styled("div")({
  marginBottom: "2rem",
});

const ActualizarFrenteModal = ({ isOpen, closeModal, frenteId }) => {

  const initialState = {
    nombre: "",
    sigla: "",
    Logo: "",
  };


  const [formData, setFormData] = useState(initialState);
  const [selectedFile, setSelectedFile] = useState(null);
  const url = process.env.REACT_APP_VARURL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url + `frentes/${frenteId}`);
        const frente = response.data;
        setFormData({
          nombre: frente.NOMBRE_FRENTE,
          sigla: frente.SIGLA_FRENTE,
          Logo: "",
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
    if (!formData.nombre || !formData.sigla ) {
      Swal.fire({
        icon: 'error',
        title: 'Error al actualizar el frente politico',
        text: `Llene correctamente los datos `
      });
      return;
    }

    axios
      .put(url + `frentes/${frenteId}`, {
        NOMBRE_FRENTE: formData.nombre,
        SIGLA_FRENTE: formData.sigla,
        ARCHIVADO: "",
      })
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: 'Frente politico actualizado',
          text: `El frente politico se ha actualizado con éxito!`
        }).then(() => {
          handleVolverAtras();
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar frente politico',
          text: `Ocurrió un error al actualizar el frente politico`
        });
      });
  };
  const handleVolverAtras = () => {
    closeModal();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  return (
    <Modal open={isOpen} onClose={closeModal} aria-labelledby="Actualizar Frente">
      <ModalContainer>
        <h3 style={{marginBottom:'19px'}} >ACTUALIZAR FRENTE POLÍTICO</h3>
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
         <FileInputContainer>
          <label style={{ fontSize: "1rem", marginBottom: "1rem" }}>Logo:</label>
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            fullWidth
          />
        </FileInputContainer>
        {selectedFile && (
          <div>
            <Typography variant="body1">
              Archivo seleccionado: {selectedFile.name}
            </Typography>
          </div>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
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
      </ModalContainer>
    </Modal>
  );
};

export default ActualizarFrenteModal;