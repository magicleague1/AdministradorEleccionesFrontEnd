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

function VerJuradosE({ codMesa }) {
  const [jurados, setJurados] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    axios
      .get(`${process.env.REACT_APP_VARURL}obtenerJuradosPorMesa/${codMesa}`)
      .then((response) => {
        console.log(response.data);
        const data = response.data;
        setJurados(data?.resultados || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de comité:', error);
        setError(error);
        setLoading(false);
      });
  }, [codMesa]);

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const filteredJurados = jurados.filter((jurado) =>
    jurado.CARNETIDENTIDAD.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Paper
      className="ListaComitePadre"
      elevation={3}
      style={{ padding: '10px', textAlign: 'center' }}
      onClick={(e) => e.stopPropagation()}
    >
      <TextField
        label="Buscar por carnet de identidad"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        style={{ width: '70%', marginLeft: 'auto', marginRight: 'auto' }}
        InputProps={{
          endAdornment: (
            <IconButton
              onClick={handleClearSearch}
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
        {filteredJurados.length === 0 ? (
          <Typography>Aún no se asignaron jurados en esta mesa</Typography>
        ) : (
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
        )}
      </div>
    </Paper>
  );
}

export default VerJuradosE;
