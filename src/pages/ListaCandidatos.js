import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Typography } from '@mui/material';
import Button from "@mui/material/Button";
import axios from "axios";

const ListaCandidatos = ({ isOpen, closeModal, frenteId}) => {
  const [listaCandidatos, setlistaCandidatos] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get( `${process.env.REACT_APP_VARURL}obtenerCandidatosPorFrente/${frenteId}`
        );
        setlistaCandidatos(response.data);
      } catch (error) {
        console.log("Error al obtener los frentes");
      }
    };

    fetchData();
  }, [frenteId]);

  

  const handleClose = () => {
    closeModal();
  };

 

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={() => {}}
        aria-labelledby="Frentes politicos"
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
        <div
          className="modalFrente"
          style={{ backgroundColor: "#fff", padding: "20px", width: "400px" }}
        >
          <h3
            className="tituloPfrente"
            style={{ color: "black", textAlign: "center", marginBottom: "15px" }}
          >
            LISTA DE CANDIDATOS
          </h3>

          {listaCandidatos.length > 0 ? (
            <List>
              {listaCandidatos.map((candidato, index) => (
                <ListItem key={index} className="titulofrente">
                  <Typography key={index}>
                    {candidato.NOMBRE} {candidato.APELLIDO}- {candidato.CARGO_POSTULADO}
                  </Typography>
                </ListItem>
              ))}
            </List>
          ) : (
            <p style={{ textAlign: "center" }}>No hay candidatos registrados.</p>
          )}

          <div style={{ textAlign: "center" }}>
            <Button
              className="botonvfrente"
              onClick={handleClose}
              variant="contained"
              color="primary"
            >
              Cerrar
            </Button>
          </div>
        </div>
      </Modal>
      
    </div>
  );
};

export default ListaCandidatos;


