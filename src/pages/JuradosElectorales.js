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
import AsignacionJurados from "./AsignacionJurados";

function AsignacionJuradosEl({ lista }) {
  const [proceso, setProceso] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpenRea, setModalIsOpenRea] = useState(false);
  const [modalIsOpenAsi, setModalIsOpenAsi] = useState(false);
  const [selectedEleccionId, setSelectedEleccionId] = useState(null);

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

  const openModalAsi = (id) => {
    setSelectedEleccionId(id);
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
                <TableCell  style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>LISTA</TableCell>              
              </TableRow>
            </TableHead>
            <TableBody>
              {proceso.map((elemento) => (
                <TableRow key={elemento.COD_ELECCION}>
                  <TableCell>{elemento.MOTIVO_ELECCION}</TableCell>
                  <TableCell style={{ width:'28%',textAlign: 'center'  }}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<PersonAddAltOutlinedIcon />}
                    className="custom-button"
                    onClick={() => openModalAsi(elemento.COD_ELECCION)}
                    sx={{marginRight:'12px'}}
                >
                    Ver Lista Mesas
                </Button>
                    </TableCell> 
                 
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Container>
        
      <Modal open={modalIsOpenAsi} onClose={closeModalAsi}>
        <Card className="JuradoElectorales" onClick={closeModalAsi}>
          <CardContent>
            <Typography variant="h5" style={{ color: "black", textAlign: "center", marginBottom: "15px" }}>LISTA DE ASIGNACION DE MESAS</Typography>
            <AsignacionJurados eleccionId={selectedEleccionId}/>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
              <Button
                variant="outlined"
                className="BotonComiteModal"
                onClick={closeModalAsi}
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

export default AsignacionJuradosEl;