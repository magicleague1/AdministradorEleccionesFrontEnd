import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CachedIcon from '@mui/icons-material/Cached';
import { Typography, Paper, Grid, TextField, IconButton, Box, Divider, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import ClearIcon from '@mui/icons-material/Clear';
import Swal from "sweetalert2";


const SustitucionDeVocal = ({ codComite }) => {
  const [vocales, setVocales] = useState([]);
  const [vocales2, setVocales2] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    // Realizar una solicitud GET para obtener la lista de vocales del comité
    if (codComite) {
      axios.get(`${process.env.REACT_APP_VARURL}ver_lista_comite_id/${codComite}`)
        .then((response) => {
          const data = response.data;
          setVocales(data.titulares);
          setVocales2(data.suplentes);
        })
        .catch((error) => {
          console.error('Error al obtener la lista de vocales:', error);
        });
    }
  }, [codComite]);


  const handleActualizarDatos = (vocal) => {
    axios.get(`${process.env.REACT_APP_VARURL}verificarPermiso/${vocal.COD_SIS}/${codComite}`)
      .then((response) => {
        const tienePermiso = response.data.tiene_permiso;

        if (tienePermiso) {
          axios.post(process.env.REACT_APP_VARURL + 'actualizarDatos', {
            cod_comite_actual: codComite,
            cod_sis_actual: vocal.COD_SIS,
            cod_sis_nuevo: vocal.nuevoCodSis,
          })
            .then((response) => {
              console.log('Datos actualizados correctamente:', response.data);
              setVocales((prevVocales) =>
                prevVocales.map((prevVocal) =>
                  prevVocal.COD_SIS === vocal.COD_SIS
                    ? { ...prevVocal, COD_SIS: vocal.nuevoCodSis }
                    : prevVocal
                )
              );
              showSnackbar('success', 'Asignación exitosa', 'La asignación del comité y vocales se realizó con éxito.');
            })
            .catch((error) => {
              console.error('Error al actualizar los datos:', error);
              showSnackbar('error', 'Error en la asignación de vocales', 'Ocurrió un error en la asignación de vocales');
            });
        } else {
          alert('No tiene permiso para realizar esta acción.');
        }
      })
      .catch((error) => {
        console.error('Error al verificar el permiso:', error);
      });
  };

  const showSnackbar = (severity, message, text) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setSnackbarOpen(true);

    if (text) {
      Swal.fire({
        icon: severity,
        title: message,
        text,
      });
    }
  };
  const VocalItem = ({ vocal, onUpdate }) => (
    <Box mt={2}>
      <Typography variant="body1">
        {vocal.NOMBRE} {vocal.APELLIDO} (Código SIS: {vocal.COD_SIS}){' '}
        {vocal.ESTUDIANTE === 1 ? 'Estudiante' : 'Docente'}
        <IconButton
      onClick={() => handleActualizarDatos(vocal)}
      style={{  color: 'green' }} // Agrega el estilo de color verde
    >
      <CachedIcon fontSize="small" />
    </IconButton>
      </Typography>
      
      <Divider style={{ marginTop: '10px', marginBottom: '10px' }} />
    </Box>
  );
  const onUpdateVocal = (codSis, nuevoCodSis) => {
    // Actualizar localmente la lista de vocales con el nuevo código SIS
    setVocales((prevVocales) =>
      prevVocales.map((prevVocal) =>
        prevVocal.COD_SIS === codSis ? { ...prevVocal, nuevoCodSis } : prevVocal
      )
    );
  };

  const filterVocales = (vocalesArray) => {
    return vocalesArray.filter((vocal) => {
      const codSis = vocal.COD_SIS || '';
      const nombre = vocal.NOMBRE || '';
      const apellido = vocal.APELLIDO || '';
      
      return (
        codSis.includes(searchTerm) ||
        nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apellido.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  };
  return (
    <Paper elevation={3} className="ListaComitePadre" style={{ padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Código del Comité: {codComite}
      </Typography>
      <TextField
        label="Buscar por Código SIS, Nombre o Apellido"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '20px' }}
        InputProps={{
          endAdornment: (
            <IconButton
              onClick={() => setSearchTerm('')}
              style={{ marginRight: '-12px' }}
            >
              <ClearIcon />
            </IconButton>
          ),
        }}
      />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Vocales Titulares:</Typography>
          {filterVocales(vocales).map((vocal, index) => (
            <VocalItem key={index} vocal={vocal} onUpdate={onUpdateVocal} />
          ))}
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6">Vocales Suplentes:</Typography>
          {filterVocales(vocales2).map((vocal, index) => (
            <VocalItem key={index} vocal={vocal} onUpdate={onUpdateVocal} />
          ))}
        </Grid>
      </Grid>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <MuiAlert elevation={6} variant="filled" onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Paper>
  );
};

export default SustitucionDeVocal;