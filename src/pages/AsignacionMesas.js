import React, { useEffect, useState } from "react";
import {
  Paper,
  Card,
  CardContent,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Modal,
  Container,
  Box
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ListIcon from "@mui/icons-material/List";
import axios from "axios";
import ListaMesas from "./ListadeMesas";
import GenerarListaVotantesPDF from "./GenerarListaVotantesPDF";
import Swal from "sweetalert2";
import "../css/Comite.css";
import "../css/AsignacionMesas.css";
import VisibilityIcon from "@mui/icons-material/Visibility";

function AsignacionMesas({ lista }) {
  const [proceso, setProceso] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [botonDeshabilitado, setBotonDeshabilitado] = useState(false);
  const [selectedEleccionId, setSelectedEleccionId] = useState(null);
  const [modalIsOpenLV, setModalIsOpenLV] = useState(false);

  const url = process.env.REACT_APP_VARURL;

  useEffect(() => {
    axios.get(url + "elecciones_index").then((response) => {
      setProceso(response.data);
    });
  }, [lista]);

  
  const handleAsociarClick = (COD_ELECCION) => {
    axios
      .post(`${url}asignar_mesas_carrera/${COD_ELECCION}`)
      .then((responseVocales) => {
        Swal.fire({
          icon: "success",
          title: "Asignación exitosa",
          text: "La asignación de mesas se realizó con éxito.",
        }).then(() => {
          setModalIsOpen(true);
        });
      })
      .catch((errorVocales) => {
        Swal.fire({
          icon: "error",
          title: "Error en la asignación de mesas",
          text: `Ocurrió un error en la asignación de mesas: ${errorVocales}`,
        });
      });

    setBotonDeshabilitado(true);
  };

  const handleVerListaClick = (ideleciciones) => {
    setSelectedEleccionId(ideleciciones);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  ///Modal mostrar Lista Votantes
  const openModalLV = (id) => {
    setSelectedEleccionId(id);
    setModalIsOpenLV(true);
  };
  const closeModalLV = () => {
    setModalIsOpenLV(false);
  };
  return (
    <>
      <Container>
      <Typography variant="h4" align="center" gutterBottom style={{marginTop:'40px', marginBottom:'30px'}}>
        ASIGNACION DE MESAS
      </Typography>
        <TableContainer component={Paper} className="TablaAsignacion">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell  style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>ID</TableCell>
                <TableCell  style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>PROCESO</TableCell>
                <TableCell  style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>MESAS</TableCell>
                <TableCell  style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>LISTA DE VOTANTES</TableCell>              
              </TableRow>
            </TableHead>
            <TableBody>
              {proceso.map((elemento) => (
                <TableRow key={elemento.COD_ELECCION}>
                  <TableCell>{elemento.COD_ELECCION}</TableCell>
                  <TableCell>{elemento.MOTIVO_ELECCION}</TableCell>
                  <TableCell style={{ width:'28%',textAlign: 'center'  }}>
                    
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<AddCircleIcon />}
                        onClick={() =>
                          handleAsociarClick(elemento.COD_ELECCION)
                        }
                        style={{ marginRight:'15px',textAlign: 'center'  }}
                        disabled={botonDeshabilitado}
                      >
                        Asociar
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<ListIcon />}
                        onClick={() =>
                          handleVerListaClick(elemento.COD_ELECCION)
                        }
                      >
                        Ver Lista
                      </Button>
                    
                  </TableCell>
                  <TableCell style={{ width:'18%',textAlign: 'center'  }}>
                    
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={ <VisibilityIcon fontSize="large" />}
                    className="custom-button"
                    onClick={() => openModalLV()}
                    sx={{marginRight:'12px'}}
                >
                    Visualizar
                </Button>
                    
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Container>
        <GenerarListaVotantesPDF
        isOpen={modalIsOpenLV}
        closeModal={closeModalLV}
        eleccionId={selectedEleccionId} /> 
      <Modal open={modalIsOpen} onClose={closeModal}>
        <Card className="CuerpoComite" onClick={closeModal}>
          <CardContent>
            <Typography variant="h5">Lista de Asignacion de Mesas</Typography>
            <ListaMesas eleccionId={selectedEleccionId} />
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
            <Button
              variant="outlined"
              className="BotonComiteModal"
              onClick={closeModal}
            >
              Cerrar
            </Button>
            </Box>
          </CardContent>
        </Card>
      </Modal>
    </>
  );
}

export default AsignacionMesas;