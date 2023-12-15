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
import { hover } from '@testing-library/user-event/dist/hover';
import ReasiganarJurados from './ReasignarJurados';
import Swal from "sweetalert2";
const buttonStyle = {
  backgroundColor: hover ? '#ff4081' : '', // Cambia el color de fondo al pasar el mouse sobre el botón
  color: hover ? '#ffffff' : '', // Cambia el color del texto al pasar el mouse sobre el botón
  // Otros estilos adicionales cuando el cursor está sobre el botón
};

function AsignacionDeJurados({ eleccionId }) {
  const [Mesas, setMesas] = useState([]);
  const [selectedCodMesa, setSelectedCodMesa] = useState(null);
  const[openModalAJ,setOpenModalAJ]=useState(false);
  const[openModalRJ,setOpenModalRJ]=useState(false);
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

  

  //Asignacion Jurados
  const openModalASJ = (cod_mesa, event) => {
    // Evitar que el evento se propague al contenedor padre
    event.stopPropagation();
       //axios.post(`${url}mesa/{$cod_mesa}/jurado`);
  
        Swal.fire({
          icon: "success",
          title: "Asignación exitosa",
          text:  "Se envio correo a todos los jurados asignados",
        }).then(() => {
            Swal.fire({
                icon: "error",
                title: "Error en la asignación",
                text: "Ocurrió un error en la asignación de Jurados.",
              });
          setOpenModalAJ(true);
        });
     
      
  };
  const closeModalASJ = () => {
    
    setSelectedCodMesa(null);
    setOpenModalAJ(false);
  };
  //ReAsignacion Jurados
  const openModalRASJ = (cod_mesa, event) => {
    // Evitar que el evento se propague al contenedor padre
    event.stopPropagation();
    setSelectedCodMesa(cod_mesa);
    setOpenModalRJ(true);
  };
  const closeModalRASJ = () => {
    setSelectedCodMesa(null);
    setOpenModalRJ(false);
  };

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
                                  onClick={(event) => openModalASJ(mesaCarrera.cod_mesa, event)}
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
                                  Asignacion Jurados
                                </Button>
                                <Button
                                  variant="outlined"
                                  className="BotonComiteModal"
                                  onClick={(event) => openModalRASJ(mesaCarrera.cod_mesa, event)}
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
                                  Reasignacion Jurados
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
       <ReasiganarJurados
      isOpen={openModalRJ}
      closeModal={closeModalRASJ}
      codMesa={selectedCodMesa}
      />
    </div>
  );
}

export default AsignacionDeJurados;