import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Container,
} from "@mui/material";
import axios from "axios";


const VerUsuarios = ({ lista }) => {

  const url = process.env.REACT_APP_VARURL;

  const [datos, setDatos] = useState([]);

  useEffect(() => {
    // Llamada a la API para obtener los datos
    axios.get(`${url}obtenerTodosLosDatos`)
      .then(response => setDatos(response.data.datos))
      .catch(error => console.error('Error al obtener datos', error));
  }, []);

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom style={{marginTop:'40px', marginBottom:'30px'}}>
        LISTA DE USUARIOS 
      </Typography>
      <TableContainer component={Paper}>
        <Table >
          <TableHead style={{backgroundColor:'#3E5F8A'}}>
            <TableRow>
              <TableCell className="custom-header" style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>NOMBRE</TableCell>
              <TableCell className="custom-header" style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>APELLIDO</TableCell>
              <TableCell className="custom-header" style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>CARNET IDENTIDAD</TableCell>
              <TableCell className="custom-header" style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>USUARIO</TableCell>
              <TableCell className="custom-header" style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>PASSWORD</TableCell>
              <TableCell className="custom-header" style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>CODIGO SIS</TableCell>
                         
            </TableRow>
          </TableHead>
          <TableBody>
          {datos.map((fila, index) => (
              <TableRow key={index} className="custom-row">
                <TableCell style={{textAlign: 'center' }}>{fila.nombre}</TableCell>
                <TableCell style={{textAlign: 'center' }}>{fila.apellido}</TableCell>
                <TableCell style={{textAlign: 'center' }}>{fila.cod_carnet_identidad}</TableCell>
                <TableCell style={{textAlign: 'center' }}>{fila.usuario}</TableCell>
                <TableCell style={{textAlign: 'center' }}>{fila.password}</TableCell>
                <TableCell style={{textAlign: 'center' }}>{fila.CODSIS}</TableCell>                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
    </Container>
  );
};

export default VerUsuarios;