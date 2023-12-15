import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Container } from "@mui/material";
import AsignarCandidatoModal from "./AgregarCandidatoModal";
import AgregarFrenteModal from "./AgregarFrenteModal.js";
import AsignarFrente from "./AsignarFrente";
import CrearPartidosPoliticos from "./CrearPartidosPoliticos";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import CachedIcon from '@mui/icons-material/Cached';
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import CandidatoPorFrentes from "./CandidatosPorFrentes.js";
import ReasignarCandidatoModal from "./ReasignarCandidatoModal.js";

const VerPartidosPoliticos = ({ lista }) => {

  const [modalAC, setModalAC] = useState(false);
  const [modalIF, setModalIF] = useState(false);
  const [modalVC, setModalVC] = useState(false);
  const[modalRCA,setModalRCA]=useState(false);
  const [selectedFrenteId, setSelectedFrenteId] = useState(null);
  const [selectedEleccionId, setSelectedEleccionId] = useState(null);
  const [listaElecciones, setListaElecciones] = useState([]);
  const [modalAddFP, setModalADDFP] = useState(false);
  const [modalAFP, setModalAFP] = useState(false);
  const url = process.env.REACT_APP_VARURL;
  

  const openModalAC = (id) => {
    setSelectedFrenteId(id);
    setModalAC(true);
  };

  const closeModalAC = () => {
    setModalAC(false);
  };
  useEffect(() => {
    axios.get(url + "elecciones_index").then((response) => {
      setListaElecciones(response.data);
    });
  }, []);
  //Inscripcion de un nuevo frente
  const handleDetallesClick = (id) => {
    setSelectedEleccionId(id);
    setModalIF(true);
  };

  const closeModalIF = () => {
    setModalIF(false);
    setSelectedEleccionId(null);
  };
  //frentes por eleccion
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
  //Ver Candidatos
  const openModalVC = (id) => {
    setSelectedEleccionId(id);
    setModalVC(true);
  };

  const closeModalVC = () => {
    setModalVC(false);
  };
  //Reasignar Candidatos
  const openModalRCA = (id) => {
    setSelectedEleccionId(id);
    setModalRCA(true);
  };
  const closeModalRCA = () => {
    setModalRCA(false);
  };
  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom style={{ marginTop: "40px", marginBottom: "30px" }}>
        FRENTES POLITICOS
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="custom-header" style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>ELECCION</TableCell>
              <TableCell className="custom-header" style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}> REGISTRO </TableCell>
              <TableCell className="custom-header" style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>FRENTES</TableCell>
              <TableCell className="custom-header" style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>CANDIDATOS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listaElecciones.map((eleccion) => (
              <TableRow key={eleccion.COD_ELECCION} className="custom-row">
                <TableCell >{eleccion.MOTIVO_ELECCION}</TableCell>
                <TableCell style={{ width: '23%', textAlign: 'center' }}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<AddIcon />}
                    onClick={() => handleDetallesClick(eleccion.COD_ELECCION)}
                    className="custom-button"
                  >
                    Registro de Partido
                  </Button>
                </TableCell>
                <TableCell style={{ width: '18%', textAlign: 'center' }}>
                <Button
                variant="outlined"
                size="small"
                startIcon={<ListAltOutlinedIcon />}
                onClick={() => openModalADDFP(eleccion.COD_ELECCION)}
              >
                Ver Frentes
              </Button>
            </TableCell>
            <TableCell style={{ width: '29%', textAlign: 'center' }}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<PersonAddAltOutlinedIcon />}
                onClick={() => openModalAC(eleccion.COD_ELECCION)}
                sx={{ marginRight: '15px' }}
              >
                Asignar
              </Button>
              <Button
                variant="outlined"
                size="small"
                startIcon={<ListAltOutlinedIcon />}
                onClick={() => openModalVC(eleccion.COD_ELECCION)}
              >
                Ver Candidatos
              </Button> 
              <Button
                variant="outlined"
                size="small"
                startIcon={<CachedIcon />}
                onClick={() => openModalRCA(eleccion.COD_ELECCION)}
              >
                Reasignar Candidatos
              </Button>




                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CrearPartidosPoliticos isOpen={modalIF} closeModal={closeModalIF} eleccionId={selectedEleccionId} />
      <AsignarFrente isOpen={modalAFP} closeModal={closeModalAFP} eleccionId={selectedEleccionId} />
      <AgregarFrenteModal isOpen={modalAddFP} closeModal={closeModalADDFP} eleccionId={selectedEleccionId} />
      <AsignarCandidatoModal isOpen={modalAC} closeModal={closeModalAC} frenteId={selectedFrenteId} />
      <CandidatoPorFrentes isOpen={modalVC} closeModal={closeModalVC} eleccionId={selectedEleccionId}/>   
      <ReasignarCandidatoModal isOpen={modalRCA} closeModal={closeModalRCA} eleccionId={selectedEleccionId}/>  
    </Container>
  );
};

export default VerPartidosPoliticos;