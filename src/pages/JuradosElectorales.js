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
import ListIcon from "@mui/icons-material/List";
import AsignacionJurados from "./AsignacionJurados";

function AsignacionJuradosEl({ lista }) {
  const [proceso, setProceso] = useState([]);
  const [modalIsOpenAsi, setModalIsOpenAsi] = useState(false);
  const [selectedEleccionId, setSelectedEleccionId] = useState(null);

  const url = process.env.REACT_APP_VARURL;

  useEffect(() => {
    axios.get(url + "elecciones_index").then((response) => {
      setProceso(response.data);
    });
  }, [lista]);

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
            <TableHead style={{backgroundColor:'#3E5F8A'}}>
              <TableRow>
              <TableCell  style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>ID</TableCell>
                <TableCell  style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>ELECCION</TableCell>
                <TableCell  style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>MESA</TableCell>
                            
              </TableRow>
            </TableHead>
            <TableBody>
              {proceso.map((elemento) => (
                <TableRow key={elemento.COD_ELECCION}>
                   <TableCell style={{textAlign: 'center' }}>{elemento.COD_ELECCION}</TableCell>
                  <TableCell style={{textAlign: 'center' }}>{elemento.MOTIVO_ELECCION}</TableCell>
                  <TableCell style={{ width:'28%',textAlign: 'center'  }}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<ListIcon />}
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
        
      <Modal open={modalIsOpenAsi} 
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
       }}>
        <div className="modalFrente" style={{ backgroundColor: '#fff', padding: '20px', width: '700px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
          <CardContent>
            <Typography variant="h5" style={{ color: "black", textAlign: "center", marginBottom: "15px" }}>ASIGNACION DE JURADOS</Typography>
            <AsignacionJurados eleccionId={selectedEleccionId}/>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
              <Button
                variant="contained"
                color="secondary"
                className="custom-btn btn-8"
                onClick={closeModalAsi}
              >
                Cerrar
              </Button>
            </Box>
          </CardContent>
  
        </div>
      </Modal> 
    </>
  );
}

export default AsignacionJuradosEl;