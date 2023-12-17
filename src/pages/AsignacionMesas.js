import React, { useEffect, useState } from "react";
import {
  Paper,
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
  Box,
  Snackbar,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ListIcon from "@mui/icons-material/List";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from "axios";
import ListaMesas from "./ListadeMesas";
import PublicacionListaVotantes from "./PublicacionListaVotantes";
import MuiAlert from '@mui/material/Alert';

function AsignacionMesas({ lista }) {
  const [proceso, setProceso] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEleccionId, setSelectedEleccionId] = useState(null);
  const [modalListaMesasIsOpen, setModalListaMesasIsOpen] = useState(false);
  const [modalPublicacionIsOpen, setModalPublicacionIsOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState("");


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
      // const existeAsignacion = await verificarAsociacionMesas(COD_ELECCION);

      // if (existeAsignacion) {
      //   setSnackbarType('error');
      //   setSnackbarMessage('Ya se asignaron mesas a ese proceso electoral');
      //   setSnackbarOpen(true);
      //   return;
      // }
  
      await axios.post(`${url}asignar_mesas_carrera/${COD_ELECCION}`);
  
      setSnackbarType('success');
      setSnackbarMessage('La asignación de mesas se realizó con éxito.');
      setSnackbarOpen(true);
      
      setModalIsOpen(true);
    } catch (error) {
      console.error("Error en la Generación:", error);
      setSnackbarType('error');
      setSnackbarMessage(`Ocurrió un error en la asignación de mesas: ${error.message}`);
      setSnackbarOpen(true);
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

//Generacion de boletas
  const handleGetListaVotantes = async ( eleccionId) => {
    try {
     
      await axios.post(`${url}generarListasVotantes/${eleccionId}`);
  
      setSnackbarType("success");
      setSnackbarMessage("La generación de Lista de votantes se realizó con éxito.");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error en la Generación:", error);
  
      if (axios.isCancel(error)) {
        // El request fue cancelado, no es necesario mostrar un mensaje de error
        return;
      }
  
      setSnackbarType("error");
      setSnackbarMessage("Ocurrió un error en la generación de Lista de votantes.");
      setSnackbarOpen(true);
    }
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  return (
    <>
      <Container>
        <Typography variant="h4" align="center" gutterBottom style={{marginTop:'40px', marginBottom:'30px'}}>
          ASIGNACION DE MESAS
        </Typography>
        <TableContainer component={Paper} className="TablaAsignacion">
          <Table>
            <TableHead style={{backgroundColor:'#3E5F8A'}}>
              <TableRow>
                <TableCell  style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>ID</TableCell>
                <TableCell  style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>PROCESO</TableCell>
                <TableCell  style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>MESAS</TableCell> 
                <TableCell  style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>LISTAR VOTANTES</TableCell> 
                <TableCell  style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>PUBLICACION</TableCell>            
              </TableRow>
            </TableHead>
            <TableBody>
              {proceso.map((elemento) => (
                <TableRow key={elemento.COD_ELECCION}>
                  <TableCell style={{textAlign: 'center' }}>{elemento.COD_ELECCION}</TableCell>
                  <TableCell style={{textAlign: 'center' }}>{elemento.MOTIVO_ELECCION}</TableCell>
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
                      onClick={() => handleGetListaVotantes(elemento.COD_ELECCION)}
                      startIcon={<CloudDownloadIcon />}
                      sx={{ marginRight: '13px' }}
                    >
                      Generar Boletas
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

      <Modal open={modalListaMesasIsOpen} onClose={() => {}}  style={{
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'center',
       }}
       BackdropProps={{
         style: { backgroundColor: "rgba(0, 0, 0, 0.5)" },  
         invisible: false,  
       }}>
      <div className="modalFrente" style={{ backgroundColor: '#fff', padding: '20px', width: '700px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
          <CardContent>
            <Typography variant="h5" style={{ color: "black", textAlign: "center", marginBottom: "15px" }}>LISTA DE ASIGNACION DE MESAS</Typography>
            <ListaMesas eleccionId={selectedEleccionId} />
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
              <Button
                variant="contained"
                color="secondary"
                className="custom-btn btn-8"
                onClick={closeModalListaMesas}
              >
                Cerrar
              </Button>
            </Box>
          </CardContent>
        </div>
      </Modal>

      <PublicacionListaVotantes isOpen={modalPublicacionIsOpen} closeModal={closeModalPublicacion} eleccionId={selectedEleccionId}/>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity={snackbarType} sx={{ width: '100%', maxWidth: '600px', fontSize: '1.2rem', padding: '20px' }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
}

export default AsignacionMesas;