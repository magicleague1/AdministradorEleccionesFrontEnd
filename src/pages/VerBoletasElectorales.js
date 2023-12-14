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
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FileOpenOutlinedIcon from '@mui/icons-material/FileOpenOutlined';
import VisualizarBoletas from "./VisualizarBoletas"
import GenerarPdfBoletas from "./GenerarPdfBoletas";


const VerBoletasElectorales = ({ lista }) => {
  const [selectedEleccionId, setSelectedEleccionId] = useState(null);
  const [listaElecciones, setListaElecciones] = useState([]);
  const [modalIsOpenVB, setModalIsOpenVB] = useState(false);
  const [modalIsOpenGB, setModalIsOpenGB] = useState(false);
  const [isVisualizarBoletasActive, setIsVisualizarBoletasActive] = useState(false);
  const url = process.env.REACT_APP_VARURL;

  useEffect(() => {
    axios.get(process.env.REACT_APP_VARURL + "elecciones_index").then((response) => {
      setListaElecciones(response.data);
    });
  }, [lista]);

  ///Modal visualizacion boletas
  const openModalVB = (id) => {
    console.log("Estoy en la otra vista", id)
    setSelectedEleccionId(id);
    setModalIsOpenVB(true);
    setIsVisualizarBoletasActive(true); // Activar VisualizarBoletas
  };
  const closeModalVB = () => {
    setModalIsOpenVB(false);
    setIsVisualizarBoletasActive(false); // Desactivar VisualizarBoletas
  };

  ///Modal generacion de boletas
  const openModalGB = (id) => {
    
    setSelectedEleccionId(id);
    setModalIsOpenGB(true);
  };
  const closeModalCM = () => {
    setModalIsOpenGB(false);
  };
 
  return (
    <Container>
     
      <Typography variant="h3" align="center" gutterBottom style={{marginTop:'40px', marginBottom:'30px'}}>
        BOLETAS ELECTORALES
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>CARGO(S) A ELECCION</TableCell>
              <TableCell style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>FECHA ELECCIONES</TableCell>
              <TableCell style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>ACCIONES</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {listaElecciones.map((eleccion) => (
            <TableRow key={eleccion.COD_ELECCION}>
                <TableCell>{eleccion?.MOTIVO_ELECCION}</TableCell>
                <TableCell>{eleccion?.FECHA_ELECCION}</TableCell>
                <TableCell style={{width:'28%',textAlign: 'center' }}>
                <Button
                    variant="outlined"
                    size="small"
                    startIcon={ <VisibilityIcon fontSize="large" />}
                    onClick={() => openModalVB(eleccion?.COD_ELECCION)}
                    className="custom-button"
                    sx={{marginRight:'12px'}}
                >
                    Visualizar
                </Button>
                <Button
                    variant="outlined"
                    size="small"
                    startIcon={ <FileOpenOutlinedIcon />}
                    onClick={() => openModalGB(eleccion?.COD_ELECCION)}
                    className="custom-button"
                    
                >
                    Generar
                </Button>
                
                </TableCell>
            </TableRow>
        ))}
          </TableBody>
        </Table>
      </TableContainer>

        {isVisualizarBoletasActive && (
          <VisualizarBoletas
            isOpen={modalIsOpenVB}
            closeModal={closeModalVB}
            eleccionId={selectedEleccionId} />
        )}
      
        <GenerarPdfBoletas 
        isOpen={modalIsOpenGB}
        closeModal={closeModalCM}
        eleccionId={selectedEleccionId} />
      
    </Container>
  );
};

export default VerBoletasElectorales;