import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Container,
  Modal,
  Snackbar,
  Alert,
} from "@mui/material";
import SustitucionDeVocal from "./SustitucionDeVocal ";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ViewListIcon from "@mui/icons-material/ViewList";
import SyncIcon from "@mui/icons-material/Sync";
import ListaVocalesComite from "./ListaVocalesComite";


const AsignacionComite = ({ lista }) => {
  const [proceso, setProceso] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpen1, setModalIsOpen1] = useState(false);
  const [codComite, setCodComite] = useState(null);
  const [codComiteActualizar, setCodComiteActualizar] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState('success');
  const url = process.env.REACT_APP_VARURL;

  useEffect(() => {
    axios.get(`${url}elecciones_index`).then((response) => {
      setProceso(response.data);
    });
  }, [lista]);

  const verificarExistenciaComite = async (codComite) => {
    try {
      const response = await axios.get(`${url}verificar-comite/${codComite}`);
      return !response.data.existeComite;
    } catch (error) {
      console.error("Error al verificar la existencia del comité:", error);
      return false;
    }
  };

  const handleAsociarClick = async (COD_ELECCION, COD_COMITE) => {
    try {
      const existeComite = await verificarExistenciaComite(COD_COMITE);

      if (!existeComite) {
        setSnackbarType('error');
        setSnackbarMessage('Ya se asignaron vocales de comité electoral.');
        setSnackbarOpen(true);
        return;
      }

      await axios.put(`${url}asignar-comite/${COD_ELECCION}`);
      await axios.post(`${url}asignar-vocales/${COD_COMITE}`);

      setSnackbarType('success');
      setSnackbarMessage('La asignación del comité y vocales se realizó con éxito.');
      setSnackbarOpen(true);

      setCodComite(COD_COMITE);
      setModalIsOpen(true);
    } catch (error) {
      console.error("Error en la asignación:", error);
      setSnackbarType('error');
      setSnackbarMessage('Ocurrió un error en la asignación del comité y vocales.');
      setSnackbarOpen(true);
    }
  };

  const handleVerListaClick = (eleccionId) => {
    setCodComite(eleccionId);
    setModalIsOpen(true);
  };

  const handleActualizar = (codComite) => {
    setCodComiteActualizar(codComite);
    setModalIsOpen1(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const closeModal1 = () => {
    setModalIsOpen1(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom style={{ marginTop: '40px', marginBottom: '30px' }}>
         VOCALES DEL COMITE ELECTORAL
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{backgroundColor:'#3E5F8A'}}>
            <TableRow >
              <TableCell style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>ID</TableCell>
              <TableCell style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>PROCESO</TableCell>
              <TableCell style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }} >ACCIONES</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {proceso.map((elemento) => (
              <TableRow key={elemento.COD_ELECCION}>
                <TableCell>{elemento.COD_ELECCION}</TableCell>
                <TableCell>{elemento.MOTIVO_ELECCION}</TableCell>
                <TableCell style={{ width:'36%' }}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<AssignmentIndIcon />}
                    onClick={() =>
                      handleAsociarClick(
                        elemento.COD_ELECCION,
                        elemento.COD_COMITE
                      )
                    }
                  >
                    Asociar
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<ViewListIcon />}
                    onClick={() => handleVerListaClick(elemento.COD_COMITE)}
                    style={{marginLeft:'12px'}}
                  >
                    Ver Lista
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<SyncIcon />}
                    onClick={() => handleActualizar(elemento.COD_COMITE)}
                    style={{marginLeft:'12px'}}
                  >
                    Actualizar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity={snackbarType}
          sx={{ width: '100%', maxWidth: '400px', fontSize: '1rem' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Modal
        open={modalIsOpen}
        onClose={() => {}}
        aria-labelledby="Lista comite"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        BackdropProps={{
          style: { backgroundColor: "rgba(0, 0, 0, 0.5)" },  
          invisible: false,  
        }}
      >
        <div className="modalFrente" style={{ backgroundColor: '#fff', padding: '20px', width: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="h5" gutterBottom>
        LISTA COMITE ELECTORAL
      </Typography>
      <div className="ContenedorVocales" style={{width:'550px'}}>
        {codComite !== null && <ListaVocalesComite idComite={codComite} />}
      </div>
      <Button
         variant="contained"
         color="secondary"
         className="custom-btn btn-8"
        onClick={closeModal}
        style={{ marginTop: "20px" }}
      >
        Cerrar
      </Button>
    </div>
      </Modal>
      <Modal
        open={modalIsOpen1}
        onClose={() => {}}
        aria-labelledby="Reasignacion Comite"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        BackdropProps={{
          style: { backgroundColor: "rgba(0, 0, 0, 0.5)" },  
          invisible: false,  
        }}
      >
        <div className="modalFrente" style={{ backgroundColor: '#fff', padding: '20px', width: '900px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h5" gutterBottom style={{ marginBottom: '20px' }}>
        REASIGNACION COMITE ELECTORAL
      </Typography>
      <div className="ContenedorVocales">
        {codComiteActualizar !== null && (
          <SustitucionDeVocal codComite={codComiteActualizar} />
        )}
      </div>
      <Button
         variant="contained"
         color="secondary"
         className="custom-btn btn-8"
        onClick={closeModal1}
        style={{ marginTop: "20px" }}
      >
        Cerrar
      </Button>
    </div>
      </Modal>
    </Container>
  );
};

export default AsignacionComite;