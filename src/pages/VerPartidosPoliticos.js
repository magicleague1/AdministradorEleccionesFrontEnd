import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Container } from "@mui/material";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AsignarCandidatoModal from "./AgregarCandidatoModal";
import ActualizarFrente from "../pages/ActualizarFrentePolitico";
import EliminarFrente from "../pages/EliminarFrente";
import axios from "axios";

const VerPartidosPoliticos = ({ lista }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalConvo, setModalConvo] = useState(false);
  const [modalAC, setModalAC] = useState(false);
  const [selectedFrenteId, setSelectedFrenteId] = useState(null);
  const [listaFrentesPoliticos, setListaFrentesPoliticos] = useState([]);
  const url = process.env.REACT_APP_VARURL;

  useEffect(() => {
    axios.get(url + "frentes").then((response) => {
      setListaFrentesPoliticos(response.data);
    });
  }, [lista]);

  const handleActualizarClick = (id) => {
    setSelectedFrenteId(id);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedFrenteId(null);
  };

  const closeModal1 = () => {
    setModalConvo(false);
    setSelectedFrenteId(null);
  };

  const handleEliminacionClick = (id) => {
    setSelectedFrenteId(id);
    setModalConvo(true);
  };

  const openModalAC = (id) => {
    setSelectedFrenteId(id);
    setModalAC(true);
  };

  const closeModalAC = () => {
    setModalAC(false);
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
              <TableCell className="custom-header" style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>NOMBRE</TableCell>
              <TableCell className="custom-header" style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>SIGLA</TableCell>
              <TableCell className="custom-header" style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>FECHA INSCRIPCION</TableCell>
              <TableCell className="custom-header" style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>ACCIONES</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listaFrentesPoliticos.map((frentes) => (
              <TableRow key={frentes.COD_FRENTE} className="custom-row">
                <TableCell>{frentes.NOMBRE_FRENTE}</TableCell>
                <TableCell>{frentes.SIGLA_FRENTE}</TableCell>
                <TableCell>{frentes.FECHA_INSCRIPCION}</TableCell>
                <TableCell style={{ width:'33%',textAlign: 'center'  }}>
                  <Button variant="outlined" size="small" startIcon={<PersonAddAltOutlinedIcon />} onClick={() => openModalAC(frentes.COD_FRENTE)}
                   sx={{marginRight:'15px'}}
                 >
                    Asignar
                  </Button>
                  <Button variant="outlined" size="small" startIcon={<DeleteOutlineIcon />}onClick={() => handleEliminacionClick(frentes.COD_FRENTE)}
                  sx={{marginRight:'15px'}}>
                    Eliminar
                  </Button>
                  <Button variant="outlined" size="small" startIcon={<DriveFileRenameOutlineOutlinedIcon />}onClick={() => handleActualizarClick(frentes.COD_FRENTE)}>
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ActualizarFrente isOpen={modalIsOpen} closeModal={closeModal} frenteId={selectedFrenteId} />
      <EliminarFrente isOpen={modalConvo} closeModal={closeModal1} frenteId={selectedFrenteId} />
      <AsignarCandidatoModal isOpen={modalAC} closeModal={closeModalAC} frenteId={selectedFrenteId} />
    </Container>
  );
};

export default VerPartidosPoliticos;