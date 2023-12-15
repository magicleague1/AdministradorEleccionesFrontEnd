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
  Modal,
} from '@mui/material';
import Swal from 'sweetalert2';
import ReasiganarJurados from './ReasignarJurados';
import VerJurados from './VerJurados';

const AsignacionDeJurados = ({ eleccionId }) => {
  const [mesas, setMesas] = useState([]);
  const [selectedCodMesa, setSelectedCodMesa] = useState(null);
  const [openModalRJ, setOpenModalRJ] = useState(false);
  const [openModalVJ, setOpenModalVJ] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_VARURL}listarMesasAsignadasPorEleccion/${eleccionId}`)
      .then((response) => {
        const data = response.data.mesasasignadas;
        setMesas(data);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de mesas:', error);
      });
  }, [eleccionId]);

  const openModalRASJ = (codMesa, event) => {
    event.stopPropagation();
    setSelectedCodMesa(codMesa);
    setOpenModalRJ(true);
  };

  const closeModalRASJ = () => {
    setSelectedCodMesa(null);
    setOpenModalRJ(false);
  };

  const openModalVerJ = (codMesa, event) => {
    event.stopPropagation();
    setSelectedCodMesa(codMesa);
    setOpenModalVJ(true);
  };

  const closeModalVJ = (event) => {
    event.stopPropagation();
    setSelectedCodMesa(null);
    setOpenModalVJ(false);
  };

  const asignarJurados = (codMesa) => {
    axios
      .post(`${process.env.REACT_APP_VARURL}mesa/${codMesa}`)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Asignación exitosa',
          text: 'Se envió correo a todos los jurados asignados',
        }).then(() => {
          setOpenModalRJ(true);
        });
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Error en la asignación',
          text: 'Ocurrió un error en la asignación de Jurados.',
        });
      });
  };

  return (
    <div style={{ overflowY: 'auto', maxHeight: '400px', width: '600px' }}>
      {Array.isArray(mesas) &&
        mesas.map((mesa, indexMesa) => (
          <Card key={indexMesa} style={{ marginBottom: '20px' }} elevation={3}>
            <CardContent>
              <Typography variant="h6" style={{ marginBottom: '10px' }}>
                {mesa.motivo}
              </Typography>
              <Typography variant="body1">Fecha de la elección: {mesa.fecha_eleccion}</Typography>
              <Divider style={{ margin: '10px 0' }} />
              <div>
                <Typography variant="h6" style={{ marginBottom: '10px' }}>
                  Facultades:
                </Typography>
                <List>
                  {mesa.facultades.map((facultad, indexFacultad) => (
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
                              {facultad.carreras[nombreCarrera].mesas.map((mesaCarrera, indexMesaCarrera) => (
                                <Box key={indexMesaCarrera} sx={{ border: 'solid rgba(0, 56, 116, 0.564)', marginBottom: '25px' }}>
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
                                      onClick={() => asignarJurados(mesaCarrera.cod_mesa)}
                                      style={{
                                        width: '150px',
                                        backgroundColor: '#3498db',
                                        color: 'white',
                                        marginRight: '5px',
                                        borderRadius: '8px',
                                        border: '2px solid #3498db',
                                        padding: '6px 6px',
                                        fontSize: '12px',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                      }}
                                    >
                                      Asignación Jurados
                                    </Button>
                                    <Button
                                      variant="outlined"
                                      className="BotonComiteModal"
                                      onClick={(event) => openModalRASJ(mesaCarrera.cod_mesa, event)}
                                      style={{
                                        width: '150px',
                                        backgroundColor: '#3498db',
                                        color: 'white',
                                        marginRight: '5px',
                                        borderRadius: '8px',
                                        border: '2px solid #3498db',
                                        padding: '6px 6px',
                                        fontSize: '12px',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                      }}
                                    >
                                      Reasignación Jurados
                                    </Button>
                                    <Button
                                      variant="outlined"
                                      className="BotonComiteModal"
                                      onClick={(event) => openModalVerJ(mesaCarrera.cod_mesa, event)}
                                      style={{
                                        width: '150px',
                                        height:'60px',
                                        backgroundColor: '#3498db',
                                        color: 'white',
                                        marginRight: '5px',
                                        borderRadius: '8px',
                                        border: '2px solid #3498db',
                                        padding: '6px 6px',
                                        fontSize: '12px',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                      }}
                                    >
                                      Ver Jurados
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
      <ReasiganarJurados isOpen={openModalRJ} closeModal={closeModalRASJ} codMesa={selectedCodMesa} />
      <Modal
        open={openModalVJ}
        onClose={closeModalVJ}
        aria-labelledby="Ver Jurados"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="modalFrente" style={{ backgroundColor: '#fff', padding: '20px', width: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Ver Jurados
          </Typography>
          <VerJurados isOpen={openModalVJ} closeModal={closeModalVJ} codMesa={selectedCodMesa} />
          <Button
            variant="outlined"
            color="primary"
            onClick={(event) =>{closeModalVJ(event)}}
            style={{ marginTop: '20px' }}
          >
            Cerrar
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default AsignacionDeJurados;
