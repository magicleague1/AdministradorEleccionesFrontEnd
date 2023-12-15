import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  TextField,
  IconButton,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

function VerJuradosE({ idComite }) {
  const [jurados, setJurados] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Realizar una solicitud GET para obtener los datos de los jurados
    axios
      .get(`${process.env.REACT_APP_VARURL}ver-lista-comite/${idComite}`)
      .then((response) => {
        console.log(response.data);
        const data = response.data;
        setJurados(data?.jurados || []); // Ensure data.jurados is defined, otherwise default to an empty array
      })
      .catch((error) => {
        console.error('Error al obtener la lista de comité:', error);
      });
  }, [idComite]);

  // Ensure jurados is defined before filtering
  const filteredJurados = jurados ? jurados.filter((jurado) =>
    jurado.CARNETIDENTIDAD.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <Paper className="ListaComitePadre" elevation={3} style={{ padding: '10px', textAlign: 'center' }}>
      <TextField
        label="Buscar por carnet de identidad"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: '70%', marginLeft: 'auto', marginRight: 'auto' }}
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
      <div>
        <Typography variant="h5" style={{ marginLeft: '10px' }}>
          Jurados:
        </Typography>
        <List>
          {filteredJurados.map((jurado, index) => (
            <div key={jurado.CARNETIDENTIDAD}>
              <ListItem>
                <ListItemText
                  primary={`${jurado.NOMBRE} ${jurado.APELLIDO}`}
                  secondary={`CI: ${jurado.CARNETIDENTIDAD} - ${
                    jurado.ESTUDIANTE === 1 ? 'Estudiante' : 'Docente'
                  }`}
                />
              </ListItem>
              {index !== filteredJurados.length - 1 && <Divider />}
            </div>
          ))}
        </List>
      </div>
    </Paper>
  );
}

export default VerJuradosE;
