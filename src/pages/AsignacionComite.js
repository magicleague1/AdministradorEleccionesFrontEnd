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

import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ViewListIcon from "@mui/icons-material/ViewList";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ListaVocalesComite from "./ListaVocalesComite";


const AsignacionComite = ({ lista }) => {
  const [proceso, setProceso] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [codComite, setCodComite] = useState(null);
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
  
      // Mover la actualización del estado aquí
      setCodComite(COD_COMITE);
      setSnackbarType('success');
      setSnackbarMessage('La asignación del comité con sus vocales se realizó con éxito.');
      setSnackbarOpen(true);

    } catch (error) {

      setSnackbarType('error');
      setSnackbarMessage('Ocurrió un error en la asignación del comité y vocales.');
      setSnackbarOpen(true);
    }
  };
  const enviarCorreo = async (COD_COMITE) => {
    try{
      axios.post(`${url}mensajeComiteElectoral/${COD_COMITE}`);
      setSnackbarType('success');
        setSnackbarMessage('Se envió un correo a todos los vocales asignados');
        setSnackbarOpen(true);
    } catch(error){
   
      setSnackbarType('error');
      setSnackbarMessage('Ocurrió un error al enviar el correo');
      setSnackbarOpen(true);
    }
};

  const handleVerListaClick = (eleccionId) => {
    setCodComite(eleccionId);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom style={{ marginTop: '40px', marginBottom: '30px' }}>
          COMITE ELECTORAL
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{backgroundColor:'#3E5F8A'}}>
            <TableRow >
              <TableCell style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>ID</TableCell>
              <TableCell style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>ELECCION</TableCell>
              <TableCell style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }} >VOCALES</TableCell>
              <TableCell style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }} >CORREO ELECTRONICO</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {proceso.map((elemento) => (
              <TableRow key={elemento.COD_ELECCION}>
                <TableCell style={{textAlign: 'center' }}>{elemento.COD_ELECCION}</TableCell>
                <TableCell style={{textAlign: 'center'}}>{elemento.MOTIVO_ELECCION}</TableCell>
                <TableCell style={{ width:'36%', textAlign: 'center'  }}>
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
                  
                </TableCell>
                <TableCell style={{ width: '36%', textAlign: 'center' }}>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<MailOutlineIcon />}
                  onClick={() => enviarCorreo(elemento.COD_COMITE)}
                  style={{ marginLeft: '12px' }}
                >
                  Enviar correo
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
      VOCALES ASIGNADOS AL COMITÉ ELECTORAL
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
      
    </Container>
  );
};

export default AsignacionComite;