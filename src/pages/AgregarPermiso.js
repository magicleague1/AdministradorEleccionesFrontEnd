import React, { useState } from 'react';
import axios from 'axios';
import CheckIcon from '@mui/icons-material/Check';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {
  MenuItem,
  Select,
  styled,
  FormControl,
  InputLabel,
} from '@mui/material';

const StyledFormControl = styled(FormControl)({
  width: '60%',
  marginRight: '12px',
});

const AgregarPermiso = ({ cod_sis, cod_comite }) => {
  const [motivo, setMotivo] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarType, setSnackbarType] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const opcionesMotivo = [
    { value: 'Enfermedad de base', label: 'Enfermedad de base' },
    { value: 'Estado de gestacion', label: 'Estado de gestacion' },
    { value: 'Accidentes de tránsito', label: 'Accidentes de tránsito' },
    { value: 'Viaje al exterior del país', label: 'Viaje al exterior del país' },
  ];

  const handleInputChange = (e) => {
    const { value } = e.target;
    const textoSeleccionado = opcionesMotivo.find(
      (opcion) => opcion.value === value
    )?.label;

    setMotivo(textoSeleccionado);
  };

  const agregarPermiso = async () => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_VARURL + 'permisos',
        {
          cod_sis,
          cod_comite,
          motivo,
        }
      );

      const { data } = response;
      console.log(data);

      setSnackbarType('success');
      setSnackbarMessage('La asignación del permiso se realizó con éxito.');
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarType('error');
      setSnackbarMessage('Ocurrió un error en la asignación de permisos');
      setSnackbarOpen(true);
      console.error('Error al agregar permiso:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <div style={{ width: '35vw' }}>
        <StyledFormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="motivoPermiso">Motivo de permiso:</InputLabel>
            <Select
              label="Motivo de permiso"
              name="motivoPermiso"
              value={motivo}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            >
              <MenuItem value="" disabled>
                -----Seleccione una Tipo de permiso-----
              </MenuItem>
              {opcionesMotivo.map((opcion) => (
                <MenuItem key={opcion.value} value={opcion.value}>
                  {opcion.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </StyledFormControl>
        <Button
          variant="contained"
          onClick={agregarPermiso}
          startIcon={<CheckIcon />}
          size="small"
        >
          Agregar Permiso
        </Button>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity={snackbarType}
          sx={{ width: '100%', maxWidth: '400px', fontSize: '1rem' }}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default AgregarPermiso;