import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Paper,
  TextField,
} from '@mui/material';
import AgregarPermiso from './AgregarPermiso';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

const PermisoDeVocal = ({ codComite }) => {
  const [vocales, setVocales] = useState([]);
  const [vocales2, setVocales2] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (codComite) {
      axios
        .get(`${process.env.REACT_APP_VARURL}ver_lista_comite_id/${codComite}`)
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

  const filterVocales = (vocalesArray) => {
    return vocalesArray.filter(
      (vocal) =>
        vocal.COD_SIS.includes(searchTerm) ||
        vocal.NOMBRE.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vocal.APELLIDO.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <Box style={{ maxHeight: '400px', overflowY: 'auto', width: '90%' }}>
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
      <Paper
        elevation={3}
        style={{
          marginBottom: '16px',
          padding: '16px',
          width: '100%',
          backgroundColor: 'rgba(0, 56, 116, 0.564)',
        }}
      >
        <Box>
          <Typography variant="h6" style={{ color: ' #ffffff' }}>
            Vocales Titulares:
          </Typography>
          {filterVocales(vocales).length > 0 ? (
            <List>
              {filterVocales(vocales).map((vocal, index) => (
                <Box key={index} mb={2}>
                  <Paper elevation={3} style={{ padding: '16px' }}>
                    <ListItem style={{ display: 'flex', flexDirection: 'column' }}>
                      <ListItemText
                        primary={`${vocal.NOMBRE} ${vocal.APELLIDO} (Código SIS: ${vocal.COD_SIS}) ${
                          vocal.ESTUDIANTE === 1 ? 'Estudiante' : 'Docente'
                        }`}
                        style={{ marginBottom: '8px' }}
                      />
                      <Box>
                        <AgregarPermiso cod_sis={vocal.COD_SIS} cod_comite={codComite} />
                      </Box>
                    </ListItem>
                  </Paper>
                </Box>
              ))}
            </List>
          ) : (
            searchTerm.trim() === '' && (
              <Typography variant="body1" style={{ marginLeft: '10px' }}>
                No hay vocales titulares asignados.
              </Typography>
            )
          )}
        </Box>
      </Paper>

      <Paper
        elevation={3}
        style={{
          marginBottom: '16px',
          padding: '16px',
          width: '100%',
          backgroundColor: 'rgba(178,218,250)',
        }}
      >
         <Box>
          <Typography variant="h6">Vocales Suplentes:</Typography>
          {filterVocales(vocales2).length > 0 ? (
            <List>
              {filterVocales(vocales2).map((vocal, index) => (
                <Box key={index} mb={2}>
                  <Paper elevation={3} style={{ padding: '16px' }}>
                    <ListItem style={{ display: 'flex', flexDirection: 'column' }}>
                      <ListItemText
                        primary={`${vocal.NOMBRE} ${vocal.APELLIDO} (Código SIS: ${vocal.COD_SIS}) ${
                          vocal.ESTUDIANTE === 1 ? 'Estudiante' : 'Docente'
                        }`}
                      />
                      <Box>
                        <AgregarPermiso cod_sis={vocal.COD_SIS} cod_comite={codComite} />
                      </Box>
                    </ListItem>
                  </Paper>
                </Box>
              ))}
            </List>
          ) : (
            searchTerm.trim() === '' && (
              <Typography variant="body1" style={{ marginLeft: '10px' }}>
                No hay vocales suplentes asignados.
              </Typography>
            )
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default PermisoDeVocal;