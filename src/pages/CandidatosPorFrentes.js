import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import axios from "axios";
import ListaCandidatos from "./ListaCandidatos";

const CandidatosPorFrentes = ({ isOpen, closeModal, eleccionId }) => {
  const [listaFrentesP, setListaFrentesP] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedFrenteId, setSelectedFrenteId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_VARURL}obtener_frentes_por_eleccion/${eleccionId}`
        );

        if (response.data && response.data.frentes) {
          setListaFrentesP(response.data.frentes);
        } else {
          console.log("La respuesta de la API no contiene datos de frentes.");
        }
      } catch (error) {
        console.error("Error al obtener los frentes:", error.message);
      }
    };

    fetchData();
  }, [eleccionId]);

  const handleClose = () => {
    closeModal();
  };

  const handleVerCandidatosClick = (id) => {
    setSelectedFrenteId(id);
    setModalIsOpen(true);
  };

  const closeModal1 = () => {
    setModalIsOpen(false);
    setSelectedFrenteId(null);
  };

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={closeModal}
        aria-labelledby="Candidatos "
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
            {listaFrentesP.map((frente) => (
              <ListItem key={frente.COD_FRENTE} className="titulofrente">
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
                  onClick={() => handleVerCandidatosClick(frente.COD_FRENTE)}
                  style={{ marginRight: '12px' }}
                >
                  Candidatos
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
      <ListaCandidatos
        isOpen={modalIsOpen}
        closeModal={closeModal1}
        frenteId={selectedFrenteId}
      />
    </div>
  );
};

export default CandidatosPorFrentes;