import React, { useState } from 'react';
import axios from 'axios';
import CheckIcon from '@mui/icons-material/Check';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const AgregarPermiso = ({ cod_sis, cod_comite }) => {
  const [motivo, setMotivo] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarType, setSnackbarType] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const agregarPermiso = async () => {
    try {
      const response = await axios.post(process.env.REACT_APP_VARURL + 'permisos', {
        cod_sis,
        cod_comite,
        motivo,
      });

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
      <div>
        <TextField
          label="Motivo"
          variant="outlined"
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
          style={{ width: '50%', marginRight: '10px', marginBottom: '10px' }}
        />
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