import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import DoneIcon from '@mui/icons-material/Done';
import ActualizarEleccionModal from "../pages/ActualizarEleccionModal";
import AgregarFrenteModal from "./AgregarFrenteModal.js";
import AsignarFrente from "./AsignarFrente";
import EdicionAsigFrentes from "./EdicionAsigFrentes";
import axios from "axios";

const VerElecciones = ({ lista }) => {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEleccionId, setSelectedEleccionId] = useState(null);
  const [modalAddFP, setModalADDFP] = useState(false);
  const [modalAFP, setModalAFP] = useState(false);
  const [modalEAFP, setModalEAFP] = useState(false);
  const [listaElecciones, setListaElecciones] = useState([]);
  const url = process.env.REACT_APP_VARURL;

  const openModalADDFP = (id) => {
    setSelectedEleccionId(id);
    setModalADDFP(true);
  };

  const closeModalADDFP = () => {
    setModalADDFP(false);
  };

  const openModalAFP = (id) => {
    setSelectedEleccionId(id);
    setModalAFP(true);
  };

  const closeModalAFP = () => {
    setModalAFP(false);
  };


  const closeModalEAFP = () => {
    setModalEAFP(false);
  };

  useEffect(() => {
    axios.get(url + "elecciones_index").then((response) => {
      setListaElecciones(response.data);
    });
  }, [lista]);

  const handleDetallesClick = (id) => {
    setSelectedEleccionId(id);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedEleccionId(null);
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom style={{marginTop:'40px', marginBottom:'30px'}}>
        ELECCIONES ACTIVAS
      </Typography>
      <TableContainer component={Paper}>
        <Table >
          <TableHead>
            <TableRow>
              <TableCell className="custom-header" style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>ELECCION</TableCell>
              <TableCell className="custom-header" style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>TIPO ELECCION</TableCell>
              <TableCell className="custom-header" style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>FECHA</TableCell>
              <TableCell className="custom-header" style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>DETALLE</TableCell>
              <TableCell className="custom-header" style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>FRENTES</TableCell>
              <TableCell className="custom-header" style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>CONCLUSION</TableCell>            
            </TableRow>
          </TableHead>
          <TableBody>
            {listaElecciones.map((eleccion) => (
              <TableRow key={eleccion.COD_ELECCION} className="custom-row">
                <TableCell color="white">{eleccion.MOTIVO_ELECCION}</TableCell>
                <TableCell>{eleccion.TIPO_ELECCION}</TableCell>
                <TableCell>{eleccion.FECHA_ELECCION}</TableCell>
                <TableCell style={{textAlign: 'center' }}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<InfoOutlinedIcon />}
                    onClick={() => handleDetallesClick(eleccion.COD_ELECCION)}
                    className="custom-button"
                  >
                    Detalles
                  </Button>
                </TableCell>
                <TableCell style={{width:'22%',textAlign: 'center' }}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<PersonAddAltOutlinedIcon />}
                    onClick={() => openModalAFP(eleccion.COD_ELECCION)}
                    style={{marginLeft: '12px', marginRight: '12px'}}
                  >
                    Agregar Frentes
                  </Button>
                </TableCell>
                <TableCell style={{width:'22%',textAlign: 'center' }}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<DoneIcon />}
                    onClick={() => openModalAFP(eleccion.COD_ELECCION)}
                    style={{marginLeft: '12px', marginRight: '12px'}}
                  >
                    Terminar Eleccion
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ActualizarEleccionModal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        eleccionId={selectedEleccionId}
      />
      <AgregarFrenteModal
        isOpen={modalAddFP}
        closeModal={closeModalADDFP}
        eleccionId={selectedEleccionId}
      />
      <AsignarFrente
        isOpen={modalAFP}
        closeModal={closeModalAFP}
        eleccionId={selectedEleccionId}
      />
      <EdicionAsigFrentes isOpen={modalEAFP} closeModal={closeModalEAFP} />
    </Container>
  );
};

export default VerElecciones;