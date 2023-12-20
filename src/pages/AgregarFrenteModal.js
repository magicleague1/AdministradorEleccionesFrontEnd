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
        const response = await axios.get(`${process.env.REACT_APP_VARURL}obtenerFrentesYCandidatos/${eleccionId}`);
        setListaFrentesP(response.data.frentes);
        console.log(listaFrentesP);
      } catch (error) {
        console.log("Error al obtener los frentes");
      }
    };

    fetchData();
  }, [eleccionId]);

  const handleActualizarClick = (id) => {
    console.log(listaFrentesP);
    console.log(id);
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
            FRENTES POLÍTICOS
          </h3>

          {listaFrentesP.length > 0 ? (
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
                    startIcon={<DriveFileRenameOutlineOutlinedIcon />}
                    onClick={() => handleActualizarClick(frente.COD_FRENTE)}
                    style={{ marginRight: "12px" }}
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
          ) : (
            <p style={{ textAlign: "center" }}>No hay frentes inscritos.</p>
          )}

          <div style={{ textAlign: "center" }}>
            <Button
              onClick={handleClose}
              variant="contained"
              color="secondary"
              className="custom-btn btn-8"
            >
              Cerrar
            </Button>
          </div>
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


