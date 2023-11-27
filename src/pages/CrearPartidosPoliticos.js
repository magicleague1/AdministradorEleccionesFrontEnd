import React, { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  TextField,
  Button,
  Box,
  Paper,
  styled,
} from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";

const StyledContainer = styled(Container)({
  paddingTop: '32px',
  paddingBottom: '32px',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 56, 116, 0.564)',
});

const StyledPaper = styled(Paper)({
  padding: '32px',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: 'auto',
  marginTop: '90px',
  width: '80%',
});

const StyledFormControl = styled(FormControl)({
  width: '100%',
  marginBottom: '8px',
});

const StyledButtonGroup = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  margin: 'auto',
  width: '100%',
});

const StyledButton = styled(Button)({
  marginLeft: '20px',
});

const PartidosPoliticos = () => {
  const initialState = {
    NOMBRE_FRENTE: "",
    SIGLA_FRENTE: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleGuardarClick = () => {
    if (!formData.NOMBRE_FRENTE || !formData.SIGLA_FRENTE || !selectedFile) {
      Swal.fire({
        icon: 'error',
        title: 'Error al crear el frente político',
        text: 'Complete correctamente los datos.',
      });
      return;
    }

    const data = new FormData();
    data.append('NOMBRE_FRENTE', formData.NOMBRE_FRENTE);
    data.append('SIGLA_FRENTE', formData.SIGLA_FRENTE);
    data.append('LOGO', selectedFile);
    data.append('COD_CARRERA', "");
    console.log(data);
    axios.post(`${process.env.REACT_APP_VARURL}frentes/nuevo`, data)
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: 'Proceso registrado correctamente',
          text: 'El frente político se ha creado con éxito.',
        });
        setFormData(initialState);
        setSelectedFile(null);
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al crear el frente político',
          text: `Ocurrió un error al crear el frente político: ${error}`,
        });
      });
  };

  const handleVolverAtras = () => {
    setFormData(initialState);
    setSelectedFile(null);
  };

  return (
    <StyledContainer>
      <StyledPaper>
        <Typography variant="h4" gutterBottom style={{ textAlign: 'center', marginBottom: '28px' }}>
          INSCRIPCIÓN DE UN FRENTE POLÍTICO
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={15} style={{display: 'flex', alignItems: 'center', }}>
            <StyledFormControl  style={{width:'100%', marginRight:'20px'}}>
              <TextField
                label="Nombre:"
                type="text"
                name="NOMBRE_FRENTE"
                value={formData.NOMBRE_FRENTE}
                onChange={handleInputChange}
                placeholder="Ingrese el nombre del frente político"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
               
              />
            </StyledFormControl>
            <StyledFormControl>
              <TextField
                label="Sigla:"
                type="text"
                name="SIGLA_FRENTE"
                value={formData.SIGLA_FRENTE}
                onChange={handleInputChange}
                placeholder="Ingrese la sigla del frente político"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </StyledFormControl>
           
          </Grid>
          <Grid item xs={12} md={15}>
         
              <InputLabel htmlFor="logo"  style={{ marginBottom: '8px' }}>Logo:</InputLabel>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="motivo-input"
              />
           
            {selectedFile && (
              <Typography variant="body1">
                Archivo seleccionado: {selectedFile.name}
              </Typography>
            )}
          </Grid>
          
          <Grid item xs={12} md={15}>
            <StyledButtonGroup>
              <StyledButton
                variant="contained"
                color="primary"
                onClick={handleGuardarClick}
              >
                Registrar
              </StyledButton>
              <StyledButton
                variant="contained"
                color="secondary"
                onClick={handleVolverAtras}
              >
                Cancelar
              </StyledButton>
            </StyledButtonGroup>
          </Grid>
        </Grid>
      </StyledPaper>
    </StyledContainer>
  );
};

export default PartidosPoliticos;