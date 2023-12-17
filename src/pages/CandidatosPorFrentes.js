import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import axios from "axios";

const CandidatosPorFrentes = ({ isOpen, closeModal, eleccionId }) => {
  const [listaFrentesP, setListaFrentesP] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedFrente, setSelectedFrente] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_VARURL}obtenerFrentesYCandidatos/${eleccionId}`
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

  const handleVerCandidatosClick = (frente) => {
    setSelectedFrente(frente);
    setModalIsOpen(true);
  };

  const closeModal1 = () => {
    setModalIsOpen(false);
    setSelectedFrente(null);
  };

  const closeModal2 = () => {
    closeModal();
  };

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={closeModal2}
        aria-labelledby="Frentes Políticos"
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
          style={{ backgroundColor: "#fff", padding: "20px", width: "600px" }}
        >
          <h3
            className="tituloPfrente"
            style={{
              color: "black",
              textAlign: "center",
              marginBottom: "15px",
            }}
          >
            FRENTES POLÍTICOS
          </h3>

          {listaFrentesP.length > 0 ? (
            <List>
              {listaFrentesP.map((frente) => (
                <ListItem key={frente.COD_FRENTE} className="titulofrente">
                  <ListItemText
                    primary={frente.NOMBRE_FRENTE}
                    secondary={`(${frente.SIGLA_FRENTE})`}
                    style={{ color: "black", textAlign: "center" }}
                  />
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<DriveFileRenameOutlineOutlinedIcon />}
                    onClick={() => handleVerCandidatosClick(frente)}
                    style={{ marginRight: "12px" }}
                  >
                    Candidatos
                  </Button>
                </ListItem>
              ))}
            </List>
          ) : (
            <p style={{ textAlign: "center" }}>No hay frentes inscritos.</p>
          )}
        </div>
      </Modal>

      {/* Modal para mostrar los candidatos del frente seleccionado */}
      {selectedFrente && (
        <Modal
          open={modalIsOpen}
          onClose={closeModal1}
          aria-labelledby="Candidatos del Frente"
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
            style={{ backgroundColor: "#fff", padding: "20px", width: "600px" }}
          >
            <h3
              className="tituloPfrente"
              style={{
                color: "black",
                textAlign: "center",
                marginBottom: "15px",
              }}
            >
              Candidatos del Frente: {selectedFrente.NOMBRE_FRENTE} ({selectedFrente.SIGLA_FRENTE})
            </h3>

            {selectedFrente.candidatos.length > 0 ? (
              <List>
                {selectedFrente.candidatos.map((candidato, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={`${candidato.NOMBRE} ${candidato.APELLIDO}`}
                      secondary={`Carnet: ${candidato.CARNETIDENTIDAD}`}
                      style={{ color: "black" }}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <p style={{ textAlign: "center" }}>No hay candidatos para este frente.</p>
            )}

            <div style={{ textAlign: "center" }}>
              <Button
                onClick={closeModal1}
                variant="contained"
                color="secondary"
                className="custom-btn btn-8"
              >
                Cerrar
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CandidatosPorFrentes;
