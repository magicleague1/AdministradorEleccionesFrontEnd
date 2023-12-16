import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  Divider,
  Box,
  Button,

} from '@mui/material';
import GenerarPdfListaVotantes from './GenerarPdfListaVotantes';
import GenerarPdfActaCierre from './GenerarPdfActaCierre';
import GenerarPdfActaApertura from './GenerarPdfActaApertura';

function ListaMesas({ eleccionId }) {
  const [Mesas, setMesas] = useState([]);
  const [selectedCodMesa, setSelectedCodMesa] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openModalACL, setOpenModalACL] = useState(false);
  const [openModalAAL, setOpenModalAAL] = useState(false);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_VARURL}listarMesasAsignadasPorEleccion/${eleccionId}`)
      .then((response) => {
        const data = response.data.mesasasignadas;
        setMesas(data);
        console.log(response.data.mesasasignadas);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de mesas:', error);
      });
  }, [eleccionId]);

  const openModalGB = (cod_mesa,event) => {
    // Evitar que el evento se propague al contenedor padre
    event.stopPropagation();
    setSelectedCodMesa(cod_mesa)
    setOpenModal(true);
  };
  const closeModalGB = () => {
    setSelectedCodMesa(null);
    setOpenModal(false);
  };
  //Acta de Apertura
  const openModalAA = (cod_mesa, event) => {
    // Evitar que el evento se propague al contenedor padre
    event.stopPropagation();
    setSelectedCodMesa(cod_mesa);
    setOpenModalAAL(true);
  };
  const closeModalAA = () => {
    setSelectedCodMesa(null);
    setOpenModalAAL(false);
  };

  //Acta de cierre
  const openModalAC = (cod_mesa, event) => {
    // Evitar que el evento se propague al contenedor padre
    event.stopPropagation();
    setSelectedCodMesa(cod_mesa);
    setOpenModalACL(true);
  };
  const closeModalAC = () => {
    setSelectedCodMesa(null);
    setOpenModalACL(false);
  };
  if (Mesas.length === 0) {
    return (
      <Typography variant="h6" style={{ margin: '20px', textAlign:'center' }}>
        No hay mesas Asignadas.
      </Typography>
    );
  }

  return (
    <div style={{ overflowY: 'auto', maxHeight: '400px', width: '600px' }}>
      {Array.isArray(Mesas) && Mesas.map((eleccion, indexEleccion) => (
        <Card key={indexEleccion} style={{ marginBottom: '20px' }} elevation={3}>
          <CardContent>
            <Typography variant="h6" style={{ marginBottom: '10px' }}>
              {eleccion.motivo}
            </Typography>
            <Typography variant="body1">Fecha de la elección: {eleccion.fecha_eleccion}</Typography>
            <Divider style={{ margin: '10px 0' }} />
            <div>
              <Typography variant="h6" style={{ marginBottom: '10px' }}>
                Facultades:
              </Typography>
              <List>
                {eleccion.facultades.map((facultad, indexFacultad) => (
                  <div key={indexFacultad}>
                    <ListItem style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body1">{facultad.nombre_facultad}</Typography>
                    </ListItem>
                    <Divider />
                    <Typography variant="h6" style={{ marginBottom: '10px' }}>
                      Carreras:
                    </Typography>
                    <List>
                      {Object.keys(facultad.carreras).map((nombreCarrera, indexCarrera) => (
                        <div key={indexCarrera}>
                          <ListItem style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body1">{nombreCarrera}</Typography>
                            <Typography variant="body2">
                              Total de mesas: {facultad.carreras[nombreCarrera].total_mesas_por_carrera}
                            </Typography>
                          </ListItem>
                          <Divider />
                          <Typography variant="h6" style={{ marginBottom: '10px' }}>
                            Mesas:
                          </Typography>
                          <List>
                            {facultad.carreras[nombreCarrera].mesas.map((mesaCarrera, indexMesa) => (
                              <Box key={indexMesa} sx={{ border: 'solid rgba(0, 56, 116, 0.564)', marginBottom: '25px' }}>
                                <ListItem style={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <Typography variant="body1">
                                    Número de mesa: {mesaCarrera.numero_mesa}
                                  </Typography>
                                  <Typography variant="body2">Código de mesa: {mesaCarrera.cod_mesa}</Typography>
                                </ListItem>
                                <ListItem style={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <Typography variant="body2">
                                    Apellidos de estudiantes: {mesaCarrera.apellidos_estudiantes}
                                  </Typography>
                                </ListItem>
                                <ListItem style={{ display: 'flex', justifyContent: 'center' }}>
                                <Button
                                  variant="outlined"
                                  className="BotonComiteModal"
                                  onClick={(event) => openModalGB( mesaCarrera.cod_mesa, event)}
                                  style={{
                                    width: '100px', // Ancho reducido
                                    backgroundColor: '#3498db',
                                    color: 'white',
                                    marginRight: '5px',
                                    borderRadius: '8px',
                                    border: '2px solid #3498db',
                                    padding: '6px 6px', // Padding reducido
                                    fontSize: '12px', // Tamaño de fuente reducido
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                  }}
                                >
                                  Ver Votantes
                                </Button>
                                <Button
                                  variant="outlined"
                                  className="BotonComiteModal"
                                  onClick={(event) => openModalAA(mesaCarrera.cod_mesa, event)}
                                  style={{
                                    width: '100px', // Ancho reducido
                                    backgroundColor: '#3498db',
                                    color: 'white',
                                    marginRight: '5px',
                                    borderRadius: '8px',
                                    border: '2px solid #3498db',
                                    padding: '6px 12px', // Padding reducido
                                    fontSize: '12px', // Tamaño de fuente reducido
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                  }}
                                >
                                  Acta Apertura
                                </Button>
                                <Button
                                  variant="outlined"
                                  className="BotonComiteModal"
                                  onClick={(event) => openModalAC(mesaCarrera.cod_mesa, event)}
                                  style={{
                                    width: '100px', // Ancho reducido
                                    backgroundColor: '#3498db',
                                    color: 'white',
                                    borderRadius: '8px',
                                    border: '2px solid #3498db',
                                    padding: '6px 12px', // Padding reducido
                                    fontSize: '12px', // Tamaño de fuente reducido
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                  }}
                                >
                                  Acta Cierre
                                </Button>
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
      <GenerarPdfListaVotantes
      isOpen={openModal}
      closeModal={closeModalGB}
       codmesa={selectedCodMesa}
      />
      <GenerarPdfActaApertura
      isOpen={openModalAAL}
      closeModal={closeModalAA}
      codMesa={selectedCodMesa}
      />
      <GenerarPdfActaCierre
      isOpen={openModalACL}
      closeModal={closeModalAC}
      codMesa={selectedCodMesa}
      />
    </div>
  );
}

export default ListaMesas;