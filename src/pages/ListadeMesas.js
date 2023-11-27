import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  Divider,
  Box
} from '@mui/material';
import "../css/Asignacion.css";
import { color } from '@mui/system';

function ListaMesas({ eleccionId }) {
  const [Mesas, setMesas] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_VARURL}listarMesasAsignadasPorEleccion/${eleccionId}`)
      .then((response) => {
        const data = response.data;
        setMesas(data);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de mesas:', error);
      });
  }, [eleccionId]);

  return (
    <div style={{ overflowY: 'auto', maxHeight: '400px', width:'600px'}}>
      {Mesas.map((mesa, index) => (
        <Card key={index} style={{ marginBottom: '20px' }} elevation={3}>
          <CardContent>
            <Typography variant="h6" style={{ marginBottom: '10px' }}>
              {mesa.facultad}
            </Typography>
            <Typography variant="body1">
              Fecha de la elección: {mesa.fecha_eleccion}
            </Typography>
            <Divider style={{ margin: '10px 0' }} />
            <div>
              <Typography variant="h6" style={{ marginBottom: '10px' }}>
                Carreras:
              </Typography>
              <List>
                {mesa.carreras.map((carrera, idx) => (
                  <div key={idx}>
                    <ListItem style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body1">
                        {carrera.nombre_carrera}
                      </Typography>
                      <Typography variant="body2">
                        Total de mesas: {carrera.total_mesas_por_carrera}
                      </Typography>
                    </ListItem>
                    <Divider />
                    <Typography variant="h6" style={{ marginBottom: '10px' }}>
                      Mesas:
                    </Typography>
                    <List >
                      {carrera.mesas.map((mesaCarrera, idxMesa) => (
                        <Box key={idxMesa} sx={{border:'solid rgba(0, 56, 116, 0.564)', marginBottom:'25px'}}>
                          <ListItem style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body1">
                              Número de mesa: {mesaCarrera.numero_mesa}
                            </Typography>
                            <Typography variant="body2">
                              Código de mesa: {mesaCarrera.cod_mesa}
                            </Typography>
                          </ListItem>
                          <ListItem style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2">
                              Apellidos de estudiantes: {mesaCarrera.apellidos_estudiantes}
                            </Typography>
                          </ListItem>
                          
                        </Box>
                      ))}
                    </List>
                  </div>
                ))}
              </List>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default ListaMesas;