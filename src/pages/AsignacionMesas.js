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
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from "axios";
import ListaMesas from "./ListadeMesas";
import Swal from "sweetalert2";
import "../css/Comite.css";
import "../css/AsignacionMesas.css";
import PublicacionListaVotantes from "./PublicacionListaVotantes";


function AsignacionMesas({ lista }) {
  const [proceso, setProceso] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEleccionId, setSelectedEleccionId] = useState(null);
  const [modalListaMesasIsOpen, setModalListaMesasIsOpen] = useState(false);
  const [modalPublicacionIsOpen, setModalPublicacionIsOpen] = useState(false);

  const url = process.env.REACT_APP_VARURL;

  useEffect(() => {
    axios.get(url + "elecciones_index").then((response) => {
      setProceso(response.data);
    });
  }, [lista]);

  const verificarAsociacionMesas = async (COD_ELECCION) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_VARURL}listarMesasAsignadasPorEleccion/${COD_ELECCION}`);
        return response.data.asignacionExistente;
    } catch (error) {
        console.error("Error al verificar la existencia de la asignación de mesas:", error);
        return false;
    }
};
  
  const handleAsociarClick = async (COD_ELECCION) => {
    try {
      const existeAsignacion = await verificarAsociacionMesas(COD_ELECCION);
      console.log("Soy comprobacion", existeAsignacion);
      if (existeAsignacion) {
        Swal.fire({
          icon: "error",
          title: "Asignación incorrecta",
          text: "Ya se asignaron mesas a ese proceso electoral",
        });
        return;
      }
  
      await axios.post(`${url}asignar_mesas_carrera/${COD_ELECCION}`);
  
      Swal.fire({
        icon: "success",
        title: "Asignación exitosa",
        text: "La asignación de mesas se realizó con éxito.",
      }).then(() => {
        setModalIsOpen(true);
      });
    } catch (error) {
      console.error("Error en la Generación:", error);
      Swal.fire({
        icon: "error",
        title: "Error en la asignación de mesas",
        text: `Ocurrió un error en la asignación de mesas: ${error.message}`,
      });
    }
  };

  const handleVerListaClick = (ideleciciones) => {
    setSelectedEleccionId(ideleciciones);
    setModalListaMesasIsOpen(true);
  };

  const closeModalListaMesas = () => {
    setModalListaMesasIsOpen(false);
  };
 
  const handlePublicarClick = (ideleciciones) => {
    setSelectedEleccionId(ideleciciones);
    setModalPublicacionIsOpen(true);
  };

  const closeModalPublicacion = () => {
    setModalPublicacionIsOpen(false);
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
                <TableCell  style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>PUBLICACION</TableCell>            
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
                  <TableCell style={{ width:'20%',textAlign: 'center'  }}>
                    
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<CloudUploadIcon/>}
                        onClick={() =>
                          handlePublicarClick(elemento.COD_ELECCION)
                        }
                      >
                        Publicar Lista
                      </Button>
                    
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Container>

        <Modal open={modalListaMesasIsOpen} onClose={closeModalListaMesas}>
        <Card className="CuerpoComite" onClick={closeModalListaMesas}>
          <CardContent>
            <Typography variant="h5" style={{ color: "black", textAlign: "center", marginBottom: "15px" }}>LISTA DE ASIGNACION DE MESAS</Typography>
            <ListaMesas eleccionId={selectedEleccionId} />
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
              <Button
                variant="outlined"
                className="BotonComiteModal"
                onClick={closeModalListaMesas}
              >
                Cerrar
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Modal>
      <PublicacionListaVotantes isOpen={modalPublicacionIsOpen} closeModal={closeModalPublicacion} eleccionId={selectedEleccionId}/>
    </>
  );
}

export default AsignacionMesas;