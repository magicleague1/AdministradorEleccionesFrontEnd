import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import axios from "axios";
import ActualizarFrente from "./ActualizarFrentePolitico";
import EliminarFrente from "./EliminarFrente";

const AgregarFrenteModal = ({ isOpen, closeModal, eleccionId }) => {
  const [listaFrentesP, setListaFrentesP] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalConvo, setModalConvo] = useState(false);
  const [selectedFrenteId, setSelectedFrenteId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_VARURL}obtener_frentes_por_eleccion/${eleccionId}`
        );
        setListaFrentesP(response.data.frentes);
      } catch (error) {
        console.log("Error al obtener los frentes");
      }
    };

    fetchData();
  }, [eleccionId]);

  const handleActualizarClick = (id) => {
    setSelectedFrenteId(id);
    setModalIsOpen(true);
  };

  const closeModal2 = () => {
    setModalIsOpen(false);
    setSelectedFrenteId(null);
  };

  const handleClose = () => {
    closeModal();
  };

  const handleEliminacionClick = (id) => {
    setSelectedFrenteId(id);
    setModalConvo(true);
  };

  const closeModal1 = () => {
    setModalConvo(false);
    setSelectedFrenteId(null);
  };

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={closeModal}
        aria-labelledby="Frentes politicos"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="modalFrente"
          style={{ backgroundColor: "#fff", padding: "20px", width: "400px" }}
        >
          <h3 className="tituloPfrente" style={{ color: "black" }}>
            FRENTES POLÍTICOS 
          </h3>
          <List>
            {listaFrentesP.map((frente, index) => (
              <ListItem key={index} className="titulofrente">
                <ListItemText
                  primary={frente.NOMBRE_FRENTE}
                  style={{ color: "black", textAlign: "center" }}
                />
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={
                    <DriveFileRenameOutlineOutlinedIcon />
                  }
                  onClick={() => handleActualizarClick(frente.COD_FRENTE)}
                  style={{marginRight:'12px'}}
                >
                  Editar
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<DeleteOutlineIcon />}
                  onClick={() => handleEliminacionClick(frente.COD_FRENTE)}
                  sx={{ marginRight: "15px" }}
                >
                  Eliminar
                </Button>
              </ListItem>
            ))}
          </List>
          <Button
            className="botonvfrente"
            onClick={handleClose}
            variant="contained"
            color="primary"
          >
            Cerrar
          </Button>
        </div>
      </Modal>
      <ActualizarFrente
        isOpen={modalIsOpen}
        closeModal={closeModal2}
        frenteId={selectedFrenteId}
      />
      <EliminarFrente
        isOpen={modalConvo}
        closeModal={closeModal1}
        frenteId={selectedFrenteId}
      />
    </div>
  );
};

export default AgregarFrenteModal;


