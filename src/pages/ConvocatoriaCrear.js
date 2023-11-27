import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  Box,
  Paper,
  styled,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import Swal from 'sweetalert2';



const StyledFormControl = styled(FormControl)({
  width: '100%',
  marginBottom: '18px',
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

const ConvocatoriaCrear = ({  isOpen, closeModal ,eleccionId,}) => {
  const [convocatoria, setConvocatoria] = useState({
    fecha_inicio: '',
    fecha_fin: '',
    motivo: '',
    descripcion: '',
    requisitos: '',
    tipo: '',
    candidatos: '',
    estado: '',
    restricciones: '',
    contacto: '',
    lugar: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConvocatoria({ ...convocatoria, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(process.env.REACT_APP_VARURL+'convocatorias_crear', { ...convocatoria, id_eleccion: eleccionId })
      .then((response) => {
        console.log(response.data);
        Swal.fire({
          icon: 'success',
          title: 'Creación de convocatoria correctamente',
          text: `La convocatoria del proceso se creó con éxito!`
        })
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al crear la convocatoria',
          text: `Ocurrió un error al crear la convocatoria del proceso electoral`
        });
        console.error(error);
      });
  };
  const handleVolverAtras = () => {
    closeModal();
  };
  return (
    <Dialog open={isOpen} onClose={closeModal} fullWidth maxWidth="md">

        <DialogTitle>
          <Typography variant="h4" gutterBottom style={{ textAlign: 'center', marginBottom: '28px' }}>
            CREAR CONVOCATORIA
          </Typography>
        </DialogTitle>
        <DialogContent>
        <form onSubmit={handleSubmit}>
            <StyledFormControl>
              <Typography variant="h6" gutterBottom sx={{ marginBottom: '20px' }}>
                Fecha inscripciones de frentes
              </Typography>
              <div style={{ display: 'flex', marginBottom: '5px' }}>
                <TextField
                  type="date"
                  name="fecha_inicio"
                  label="Fecha inicio de inscripcion"
                  onChange={handleChange}
                  required
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ marginRight: '15px' }}
                />
                <TextField
                  type="date"
                  name="fecha_fin"
                  label="Fecha fin de inscripcion"
                  onChange={handleChange}
                  required
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
            </StyledFormControl>

            <StyledFormControl>
              <Typography variant="h6" gutterBottom>
                Motivo, Tipo y Lugar
              </Typography>
              <div style={{ display: 'flex', marginBottom: '20px' }}>
                <TextField
                  type="text"
                  name="motivo"
                  label="Motivo"
                  onChange={handleChange}
                  required
                  sx={{ width: '33%', marginRight: '15px' }}
                />
                <TextField
                  type="text"
                  name="tipo"
                  label="Tipo"
                  onChange={handleChange}
                  required
                  sx={{ width: '33%', marginRight: '15px' }}
                />
                <TextField
                  type="text"
                  name="lugar"
                  label="Lugar"
                  onChange={handleChange}
                  required
                  sx={{ width: '33%' }}
                />
              </div>
            </StyledFormControl>

            <StyledFormControl>
              <Typography variant="h6" gutterBottom>
                Descripción, Requisitos y Restricciones
              </Typography>
              <div style={{ display: 'flex' }}>
                <TextField
                  multiline
                  rows={4}
                  name="descripcion"
                  label="Descripción"
                  onChange={handleChange}
                  required
                  sx={{ width: '33%', marginRight: '15px' }}
                />
                <TextField
                  multiline
                  rows={4}
                  name="requisitos"
                  label="Requisitos"
                  onChange={handleChange}
                  required
                  sx={{ width: '33%', marginRight: '15px' }}
                />
                <TextField
                  multiline
                  rows={4}
                  name="restricciones"
                  label="Restricciones"
                  onChange={handleChange}
                  required
                  sx={{ width: '33%' }}
                />
              </div>
            </StyledFormControl>

            <StyledButtonGroup>
              <StyledButton
              variant="contained"
                color="primary"
                className="custom-btn btn-9" 
                type="submit"
                sx={{marginRight:'12px'}}>
                Guardar
              </StyledButton>
              <StyledButton variant="contained"
            color="secondary"
            className="custom-btn btn-8" onClick={handleVolverAtras} >
          Cerrar
        </StyledButton>
            </StyledButtonGroup>
          </form>
        </DialogContent>

    </Dialog>
  );
};

export default ConvocatoriaCrear;