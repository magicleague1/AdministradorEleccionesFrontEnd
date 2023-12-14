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
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import SyncIcon from "@mui/icons-material/Sync";
import ReasiganarJurados from "./ReasignarJurados";
import AsignacionJurados from "./AsignacionJurados";

function AsignacionJuradosEl({ lista }) {
  const [proceso, setProceso] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpenRea, setModalIsOpenRea] = useState(false);
  const [modalIsOpenAsi, setModalIsOpenAsi] = useState(false);

  const url = process.env.REACT_APP_VARURL;

  useEffect(() => {
    axios.get(url + "elecciones_index").then((response) => {
      setProceso(response.data);
    });
  }, [lista]);


  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openModalRea = () => {
    setModalIsOpenRea(true);
  };
  const closeModalRea = () => {
    setModalIsOpenRea(false);
  };

  const openModalAsi = () => {
    setModalIsOpenAsi(true);
  };
  const closeModalAsi = () => {
    setModalIsOpenAsi(false);
  };
  return (
    <>
      <Container>
      <Typography variant="h4" align="center" gutterBottom style={{marginTop:'40px', marginBottom:'30px'}}>
        ASIGNACION DE JURADOS
      </Typography>
        <TableContainer component={Paper} className="TablaAsignacionJurados">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell  style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>PROCESO</TableCell>
                <TableCell  style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>MESA</TableCell>
                <TableCell  style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>ASIGNACION</TableCell>
                <TableCell  style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>LISTA</TableCell>              
              </TableRow>
            </TableHead>
            <TableBody>
              {proceso.map((elemento) => (
                <TableRow key={elemento.MOTIVO_ELECCION}>
                  <TableCell>{elemento.MOTIVO_ELECCION}</TableCell>
                  <TableCell style={{ width:'28%',textAlign: 'center'  }}></TableCell> 
                  <TableCell style={{ width:'18%',textAlign: 'center'  }}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<PersonAddAltOutlinedIcon />}
                    className="custom-button"
                    onClick={() => openModalAsi()}
                    sx={{marginRight:'12px'}}
                >
                    Asignar
                </Button>
                <Button
                    variant="outlined"
                    size="small"
                    startIcon={<SyncIcon />}
                    className="custom-button"
                    onClick={() => openModalRea()}
                    sx={{marginRight:'12px'}}
                >
                    Reasignar
                </Button>
                    
                     </TableCell>
                 
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Container>
        <ReasiganarJurados
        isOpen={modalIsOpenRea}
        closeModal={closeModalRea} /> 
      <Modal open={modalIsOpen} onClose={closeModal}>
        <Card className="CuerpoComite" onClick={closeModal}> </Card>
      </Modal>
      <AsignacionJurados
        isOpen={modalIsOpenAsi}
        closeModal={closeModalAsi} /> 
      <Modal open={modalIsOpen} onClose={closeModal}>
        <Card className="CuerpoComite" onClick={closeModal}> </Card>
      </Modal>
    </>
  );
}

export default AsignacionJuradosEl;