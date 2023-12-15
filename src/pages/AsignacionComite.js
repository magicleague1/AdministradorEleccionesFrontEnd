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
} from "@mui/material";
import SustitucionDeVocal from "./SustitucionDeVocal ";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ViewListIcon from "@mui/icons-material/ViewList";
import SyncIcon from "@mui/icons-material/Sync";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Swal from "sweetalert2";
import ListaVocalesComite from "./ListaVocalesComite";


const AsignacionComite = ({ lista }) => {
  const [proceso, setProceso] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpen1, setModalIsOpen1] = useState(false);
  const [codComite, setCodComite] = useState(null);
  const [codComiteActualizar, setCodComiteActualizar] = useState(null);
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
        Swal.fire({
          icon: "error",
          title: "Asignacion incorrecta",
          text: "Ya se asigno Vocales de comité electoral",
        });
        return;
      }

      await axios.put(`${url}asignar-comite/${COD_ELECCION}`);
      await axios.post(`${url}asignar-vocales/${COD_COMITE}`);

      Swal.fire({
        icon: "success",
        title: "Asignación exitosa",
        text:  "La asignacion del comité y vocales se realizó con éxito",
      }).then(() => {
        setCodComite(COD_COMITE);
        setModalIsOpen(true);
      });
    } catch (error) {
      console.error("Error en la asignación:", error);
      Swal.fire({
        icon: "error",
        title: "Error en la asignación",
        text: "Ocurrió un error en la asignación del comité y vocales.",
      });
    }
  };
  const enviarCorreo = async (COD_COMITE) => {
    await axios.post(`${url}'/mensajeComiteElectoral/{$COD_COMITE}`);
    Swal.fire({
      icon: "success",
      title: "Asignación exitosa",
      html:  "Se envió un correo a todos los vocales asignados",
    }).then(() => {
      Swal.fire({
        icon: "error",
        title: "Error en la asignación",
        text: "Ocurrió un error al enviar el correo.",
      });
      setModalIsOpen(true);
    });
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

 
  

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom style={{ marginTop: '40px', marginBottom: '30px' }}>
         VOCALES DEL COMITE ELECTORAL
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
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
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<MailOutlineIcon/>}
                    onClick={() => enviarCorreo(elemento.codComite)}
                    style={{marginLeft:'12px'}}
                  >
                    Enviar correo
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={modalIsOpen}
        onClose={closeModal}
        aria-labelledby="Lista comite"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="modalFrente" style={{ backgroundColor: '#fff', padding: '20px', width: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="h5" gutterBottom>
        Lista de Comite Electoral
      </Typography>
      <div className="ContenedorVocales" style={{width:'550px'}}>
        {codComite !== null && <ListaVocalesComite idComite={codComite} />}
      </div>
      <Button
        variant="outlined"
        color="primary"
        onClick={closeModal}
        style={{ marginTop: "20px" }}
      >
        Cerrar
      </Button>
    </div>
      </Modal>
      <Modal
        open={modalIsOpen1}
        onClose={closeModal1}
        aria-labelledby="Reasignacion Comite"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="modalFrente" style={{ backgroundColor: '#fff', padding: '20px', width: '900px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h5" gutterBottom style={{ marginBottom: '20px' }}>
        Reasignacion de Lista de Comite
      </Typography>
      <div className="ContenedorVocales">
        {codComiteActualizar !== null && (
          <SustitucionDeVocal codComite={codComiteActualizar} />
        )}
      </div>
      <Button
        variant="outlined"
        color="primary"
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