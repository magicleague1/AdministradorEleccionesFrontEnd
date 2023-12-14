import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ConvocatoriaCrear from "./ConvocatoriaCrear";
import ConvocatoriaModificar from "./ConvocatoriaModificar";
import GenerarPdfPreview from "./GenerarPdfPreview";
import axios from "axios";

const VerConvocatoria = ({ lista }) => {
  const [selectedEleccionId, setSelectedEleccionId] = useState(null);
  const [listaElecciones, setListaElecciones] = useState([]);
  const [modalIsOpenCM, setModalIsOpenCM] = useState(false);
  const [modalIsOpenCN, setModalIsOpenCN] = useState(false);
  const [modalIsOpenPC, setModalIsOpenPC] = useState(false);


  
  ///Modal crear convocatoria
  const openModalCN = (id) => {
    setSelectedEleccionId(id);
    setModalIsOpenCN(true);
  };
  const closeModalCN = () => {
    setModalIsOpenCN(false);
  };
  ///Modal modificar convocatoria
  const openModalCM = (id) => {
    setSelectedEleccionId(id);
    setModalIsOpenCM(true);
  };
  const closeModalCM = () => {
    setModalIsOpenCM(false);
  };
  ///Modal publicar convocatoria
  const openModalPC = (id) => {
    setSelectedEleccionId(id);
    setModalIsOpenPC(true);
  };
  const closeModalPC = () => {
    setModalIsOpenPC(false);
  };
  useEffect(() => {
    axios.get(process.env.REACT_APP_VARURL + "elecciones_index").then((response) => {
      setListaElecciones(response.data);
    });
  }, [lista]);

  
  return (
    <Container>
     
      <Typography variant="h4" align="center" gutterBottom style={{marginTop:'40px', marginBottom:'30px'}}>
        CONVOCATORIAS
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>CARGO(S) A ELECCION</TableCell>
              <TableCell style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>FECHA</TableCell>
              <TableCell style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>CONVOCATORIA</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {listaElecciones.map((eleccion) => (
  <TableRow key={eleccion.COD_ELECCION}>
    <TableCell>{eleccion?.MOTIVO_ELECCION}</TableCell>
    <TableCell>{eleccion?.FECHA_ELECCION}</TableCell>
    <TableCell style={{width:'38%',textAlign: 'center' }}>
      <Button
        variant="outlined"
        size="small"
        startIcon={ <AddCircleIcon  />}
        onClick={() => openModalCN(eleccion?.COD_ELECCION)}
        className="custom-button"
        sx={{marginRight:'12px'}}
      >
        Crear
      </Button>
      <Button
        variant="outlined"
        size="small"
        startIcon={ <EditIcon  />}
        onClick={() => openModalCM(eleccion?.COD_ELECCION)}
        className="custom-button"
        sx={{marginRight:'12px'}}
      >
        Editar
      </Button>
      <Button
        variant="outlined"
        size="small"
        startIcon={ <VisibilityIcon fontSize="large" />}
        onClick={() => openModalPC(eleccion?.COD_ELECCION)}
        className="custom-button"
      >
        Visualizar
      </Button> 
    </TableCell>
  </TableRow>
))}
          </TableBody>
        </Table>
      </TableContainer>

        <ConvocatoriaCrear 
        isOpen={modalIsOpenCN}
        closeModal={closeModalCN}
        eleccionId={selectedEleccionId} />
      
        <ConvocatoriaModificar 
        isOpen={modalIsOpenCM}
        closeModal={closeModalCM}
        eleccionId={selectedEleccionId} />
      
        <GenerarPdfPreview
        isOpen={modalIsOpenPC}
        closeModal={closeModalPC}
        eleccionId={selectedEleccionId} /> 
      
    </Container>
  );
};

export default VerConvocatoria;