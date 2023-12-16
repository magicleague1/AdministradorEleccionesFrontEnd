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
  IconButton
} from '@mui/material';
import '../css/Asignacion.css';
import ClearIcon from '@mui/icons-material/Clear';

function ListaVocalesComite({ idComite }) {
  const [titulares, setTitulares] = useState([]);
  const [suplentes, setSuplentes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
   
    axios
      .get(`${process.env.REACT_APP_VARURL}ver-lista-comite/${idComite}`)
      .then((response) => {
        console.log(response.data);
        const data = response.data;
        setTitulares(data.titulares);
        setSuplentes(data.suplentes);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de comité:', error);
      });
  }, [idComite]);

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const filteredTitulares = titulares.filter((titular) =>
    titular.CARNETIDENTIDAD.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSuplentes = suplentes.filter((suplente) =>
    suplente.CARNETIDENTIDAD.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      {filteredTitulares.length > 0 ? (
        <div>
          <Typography variant="h5" style={{ marginLeft: '10px' }}>
            Titulares:
          </Typography>
          <List>
            {filteredTitulares.map((titular, index) => (
              <div key={titular.CARNETIDENTIDAD}>
                <ListItem>
                  <ListItemText
                    primary={`${titular.NOMBRE} ${titular.APELLIDO}`}
                    secondary={`CI: ${titular.CARNETIDENTIDAD} - ${
                      titular.ESTUDIANTE === 1 ? 'Estudiante' : 'Docente'
                    }`}
                  />
                </ListItem>
                {index !== filteredTitulares.length - 1 && <Divider />}
              </div>
            ))}
          </List>
        </div>
      ) : (
        
        <Typography variant="body1" style={{ marginLeft: '10px' }}>
          Titulares:
          No hay titulares asignados.
        </Typography>
      )}

      {filteredSuplentes.length > 0 ? (
        <div>
          <Typography variant="h5" style={{ marginLeft: '10px' }}>
            Suplentes:
          </Typography>
          <List>
            {filteredSuplentes.map((suplente, index) => (
              <div key={suplente.CARNETIDENTIDAD}>
                <ListItem>
                  <ListItemText
                    primary={`${suplente.NOMBRE} ${suplente.APELLIDO}`}
                    secondary={`CI: ${suplente.CARNETIDENTIDAD} - ${
                      suplente.ESTUDIANTE === 1 ? 'Estudiante' : 'Docente'
                    }`}
                  />
                </ListItem>
                {index !== filteredSuplentes.length - 1 && <Divider />}
              </div>
            ))}
          </List>
        </div>
      ) : (
        <Typography variant="body1" style={{ marginLeft: '10px' }}>
         Suplentes:  No hay suplentes asignados.
        </Typography>
      )}
    </div>
  </Paper>
  );
}

export default ListaVocalesComite;
