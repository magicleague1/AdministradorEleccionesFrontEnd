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
  Modal,
  Container,
} from "@mui/material";
import ViewListIcon from "@mui/icons-material/ViewList";
import SyncIcon from "@mui/icons-material/Sync";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import PermisoDeVocal from "./PermisoDeVocal";
import ListaVocalesComite from "./ListaVocalesComite";
import SustitucionDeVocal from "./SustitucionDeVocal ";

const AsignacionPermiso = ({ lista }) => {
  const [proceso, setProceso] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpen1, setModalIsOpen1] = useState(false);
  const [modalIsOpen2, setModalIsOpen2] = useState(false);
  const [codComite, setCodComite] = useState(null);
  const [codComiteActualizar, setCodComiteActualizar] = useState(null);

  const url = process.env.REACT_APP_VARURL;

  useEffect(() => {
    axios.get(`${url}elecciones_index`).then((response) => {
      setProceso(response.data);
    });
  }, [lista]);

  const handleVerListaClick = (eleccionId) => {
    setCodComite(eleccionId);
    setModalIsOpen(true);
  };

  const handlePermiso = (codComite) => {
    setCodComiteActualizar(codComite);
    setModalIsOpen2(true);
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
  const closeModal2 = () => {
    setModalIsOpen2(false);
  };

  return (
    <>
      <Container>
      <Typography variant="h4" align="center" gutterBottom style={{ marginTop: '40px', marginBottom: '30px' }}>
      GESTION DE PERMISOS Y REASIGNACION DE VOCALES
      </Typography>
        <div className="ContenedorTabla">
          <TableContainer component={Paper}>
            <Table>
              <TableHead style={{backgroundColor:'#3E5F8A'}}>
                <TableRow>
                  <TableCell style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>ID</TableCell>
                  <TableCell style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>ELECCION</TableCell>
                  <TableCell style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>PERMISOS</TableCell>
                  <TableCell style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>REASIGNACION</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {proceso.map((elemento) => (
                  <TableRow key={elemento.COD_ELECCION}>
                    <TableCell style={{textAlign: 'center' }}>{elemento.COD_ELECCION}</TableCell>
                    <TableCell style={{textAlign: 'center' }}>{elemento.MOTIVO_ELECCION}</TableCell>
                    <TableCell style={{ width:'36%', textAlign: 'center' }}>
                    <Button
                        variant="outlined"
                        size="small"
                        startIcon={<ViewListIcon />}
                        onClick={() =>
                          handleVerListaClick(elemento.COD_COMITE)
                        }
                        style={{ marginRight: "12px" }}
                      >
                        Ver Lista
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<AssignmentTurnedInIcon />}
                        onClick={() =>
                          handlePermiso(elemento.COD_COMITE)
                        }
                      >
                        Asignar Permiso
                      </Button>
                     
                    </TableCell>
                    <TableCell style={{ width:'36%', textAlign: 'center' }}>
                    <Button
                    variant="outlined"
                    size="small"
                    startIcon={<SyncIcon />}
                    onClick={() => handleActualizar(elemento.COD_COMITE)}
                    style={{marginLeft:'12px'}}
                  >
                    Reasignar Vocal
                  </Button>  
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
        <div className="modalFrente" style={{ backgroundColor: '#fff', padding: '20px', width: '600px' }}>
          <Typography variant="h5" gutterBottom style={{ textAlign: 'center' }}>
          VOCALES ASIGNADOS AL COMITÉ ELECTORAL
          </Typography>
          <div className="ContenedorVocales">
            {codComite !== null && <ListaVocalesComite idComite={codComite} />}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <Button
               variant="contained"
               color="secondary"
               className="custom-btn btn-8"
              onClick={closeModal}
            >
              Cerrar
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        open={modalIsOpen2}
        onClose={() => {}}  
        aria-labelledby="Reasignacion Comite"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        BackdropProps={{
          style: { backgroundColor: "rgba(0, 0, 0, 0.5)" },  
          invisible: false,  
        }}
      >
        <div className="modalFrente" style={{ backgroundColor: "#fff", padding: "20px", width: "900px" }}>
          <Typography variant="h5" gutterBottom style={{ textAlign: 'center' }}>
          GESTIÓN DE PERMISOS PARA VOCALES 
          </Typography>
          <div className="ContenedorVocales">
            {codComite !== null && (
              <PermisoDeVocal codComite={codComiteActualizar} />
            )}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Button
             variant="contained"
             color="secondary"
             className="custom-btn btn-8"
            onClick={closeModal2}
            style={{ marginTop: "20px" }}
          >
            Cerrar
          </Button>
          </div>
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
        REASIGNACION DE VOCALES DEL COMITE ELECTORAL
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
        </div>
        </Container>
    </>
  );
};

export default AsignacionPermiso;