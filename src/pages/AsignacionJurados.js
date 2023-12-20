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
  Snackbar,
  Alert as MuiAlert,
} from '@mui/material';
import ReasiganarJurados from './ReasignarJurados';
import VerJurados from './VerJurados';

const AsignacionDeJurados = ({ eleccionId }) => {
  const [mesas, setMesas] = useState([]);
  const [selectedCodMesa, setSelectedCodMesa] = useState(null);
  const [openModalRJ, setOpenModalRJ] = useState(false);
  const [openModalVJ, setOpenModalVJ] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarType, setSnackbarType] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

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

  const openSnackbar = (type, message) => {
    setSnackbarType(type);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };

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
  const verificarExistenciaJurados = async (codMesa) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_VARURL}verificar-jurados/${codMesa}`);
      return !response.data.existeJurados;
    } catch (error) {
      console.error("Error al verificar la existencia del jurados:", error);
      return false;
    }
  };

  const asignarJurados = async (codMesa) => {
    try {
      const existeJurado = await verificarExistenciaJurados(codMesa);
      console.log(existeJurado);
      if (!existeJurado) {
        openSnackbar('error', 'Ya se asignaron jurados a esta mesa.');
        return;
      }
      await axios.post(`${process.env.REACT_APP_VARURL}mesa/${codMesa}`);
  
      openSnackbar('success', 'Asignación exitosa. Se envió correo a todos los jurados asignados.');
    } catch (error) {
      openSnackbar('error', 'Error en la asignación. Ocurrió un error en la asignación de Jurados.');
    }
  };
  if (mesas.length === 0) {
    return (
      <Typography variant="h6" style={{ margin: '20px', textAlign:'center' }}>
        No hay mesas Asignadas.
      </Typography>
    );
  }
  return (
    <div>
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
       <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={closeSnackbar}
          severity={snackbarType}
          sx={{ width: '100%', maxWidth: '400px', fontSize: '1rem' }}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>

      
    </div>
   
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
            variant="contained"
            color="secondary"
            className="custom-btn btn-8"
            onClick={(event) =>{closeModalVJ(event)}}
            style={{ marginTop: '20px' }}
          >
            Cerrar
          </Button>
        </div>
      </Modal>
      <ReasiganarJurados isOpen={openModalRJ} closeModal={closeModalRASJ} codMesa={selectedCodMesa} />
    </div>
  );
};

export default AsignacionDeJurados;
