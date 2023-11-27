import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import axios from "axios";

const AgregarFrenteModal = ({ isOpen, closeModal, eleccionId }) => {
  const [listaFrentesP, setListaFrentesP] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_VARURL}obtener_frentes_por_eleccion/${eleccionId}`);
        setListaFrentesP(response.data.frentes);
      } catch (error) {
        console.log('Error al obtener los frentes');
      }
    };

    fetchData();
  }, [eleccionId]);

  const handleClose = () => {
    closeModal();
  };

  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
      aria-labelledby="Frentes politicos"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <div className="modalFrente" style={{ backgroundColor: '#fff', padding: '20px', width: '400px' }}>
        <h3 className="tituloPfrente" style={{ color: 'black' }}>FRENTES POLÍTICOS</h3>
        <List>
          {listaFrentesP.map((frente, index) => (
            <ListItem key={index} className="titulofrente">
              <ListItemText primary={frente.NOMBRE_FRENTE} style={{ color: 'black',textAlign: 'center' }} />
            </ListItem>
          ))}
        </List>
        <Button className="botonvfrente" onClick={handleClose} variant="contained" color="primary">
          Cerrar
        </Button>
      </div>
    </Modal>
  );
};

export default AgregarFrenteModal;


