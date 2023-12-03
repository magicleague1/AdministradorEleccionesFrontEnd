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
      {Mesas.map((eleccion, indexEleccion) => (
        <Card key={indexEleccion} style={{ marginBottom: '20px' }} elevation={3}>
          <CardContent>
            <Typography variant="h6" style={{ marginBottom: '10px' }}>
              {eleccion.motivo}
            </Typography>
            <Typography variant="body1">
              Fecha de la elección: {eleccion.fecha_eleccion}
            </Typography>
            <Divider style={{ margin: '10px 0' }} />
            <div>
              <Typography variant="h6" style={{ marginBottom: '10px' }}>
                Facultades:
              </Typography>
              <List>
                {eleccion.facultades.map((facultad, indexFacultad) => (
                  <div key={indexFacultad}>
                    <ListItem style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body1">
                        {facultad.nombre_facultad}
                      </Typography>
                    </ListItem>
                    <Divider />
                    <Typography variant="h6" style={{ marginBottom: '10px' }}>
                      Carreras:
                    </Typography>
                    <List >
                      {Object.keys(facultad.carreras).map((nombreCarrera, indexCarrera) => (
                        <div key={indexCarrera}>
                          <ListItem style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body1">
                              {nombreCarrera}
                            </Typography>
                            <Typography variant="body2">
                              Total de mesas: {facultad.carreras[nombreCarrera].total_mesas_por_carrera}
                            </Typography>
                          </ListItem>
                          <Divider />
                          <Typography variant="h6" style={{ marginBottom: '10px' }}>
                            Mesas:
                          </Typography>
                          <List >
                            {facultad.carreras[nombreCarrera].mesas.map((mesaCarrera, indexMesa) => (
                              <Box key={indexMesa} sx={{border:'solid rgba(0, 56, 116, 0.564)', marginBottom:'25px'}}>
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
