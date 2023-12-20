import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const AsignarFrente = ({ isOpen, closeModal, eleccionId }) => {
  const [listaElecciones, setListaElecciones] = useState([]);
  const [frentesAsignados, setFrentesAsignados] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_VARURL}obtenerFrentesYCandidatos/${eleccionId}`);
        setListaElecciones(response.data.frentes);
        console.log(listaElecciones);
      } catch (error) {
        console.log("Error al obtener los frentes");
      }
    };

    fetchData();
  }, [eleccionId]);

  useEffect(() => {
    const fetchFrentesAsignados = async () => {
      try {
        if (eleccionId) {
          const response = await axios.get(`${process.env.REACT_APP_VARURL}eleccionesAsignadas/${eleccionId}`);
          setFrentesAsignados(response.data);
        }
      } catch (error) {
        console.error("Error al obtener frentes asignados:", error);
      }
    };

    fetchFrentesAsignados();
  }, [eleccionId]);

  const handleClose = () => {
    closeModal();
  };

  const handleFrenteSelection = (frenteId) => {
    const frenteAsignado = frentesAsignados.find((f) => f.COD_FRENTE === frenteId);

    if (frenteAsignado) {
      // If the front is already assigned, remove it
      const updatedFrentes = frentesAsignados.filter((f) => f.COD_FRENTE !== frenteId);
      setFrentesAsignados(updatedFrentes);
    } else {
      // If the front is not assigned, add it
      const frenteSeleccionado = listaElecciones.find((f) => f.COD_FRENTE === frenteId);
      if (frenteSeleccionado) {
        const updatedFrentes = [...frentesAsignados, frenteSeleccionado];
        setFrentesAsignados(updatedFrentes);
      }
    }
  };

  const validarYRegistrar = async () => {
    try {
      if (frentesAsignados.length === 0) {
        // Show an error if no fronts are selected
        setSnackbarType("error");
        setSnackbarMessage("Debes seleccionar al menos un frente para registrar.");
        setSnackbarOpen(true);
        return;
      }

      // Prepare the data for the backend
      const data = frentesAsignados.map((frente) => ({
        COD_ELECCION: eleccionId,
        COD_FRENTE: frente.COD_FRENTE,
      }));

      // Send a POST request to register the selected fronts
      await axios.post(`${process.env.REACT_APP_VARURL}actualizar_frentes`, data);
      setSnackbarType("success");
      setSnackbarMessage("Frentes registrados correctamente");
      setSnackbarOpen(true);

      handleClose();
    } catch (error) {
      console.error("Error al registrar los frentes políticos:", error);
      setSnackbarType("error");
      setSnackbarMessage("Ocurrió un error al registrar los frentes políticos.");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <>
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
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            width: "400px",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <h3
            className="tituloPfrente"
            style={{
              color: "rgb(0,57,116)",
              marginBottom: "40px",
              textAlign: "center",
            }}
          >
            FRENTES POLITICOS PARTICIPANTES{" "}
          </h3>
          {listaElecciones.length === 0 ? (
            <p>No hay frentes registrados.</p>
          ) : (
            <>
          <List>
            {listaElecciones.map((frente) => (
              <ListItem
                key={frente.COD_FRENTE}
                className="titulofrente"
                style={{ marginBottom: "10px" }}
              >
                <label
                  className="ListaFrente"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Checkbox
                    className="checkbox1"
                    checked={frentesAsignados.some(
                      (f) => f.COD_FRENTE === frente.COD_FRENTE
                    )}
                    onChange={() =>
                      handleFrenteSelection(frente.COD_FRENTE)
                    }
                  />
                  <ListItemText
                    primary={frente.NOMBRE_FRENTE}
                    style={{
                      color: "black",
                      flex: 1,
                      textAlign: "center",
                    }}
                  />
                </label>
              </ListItem>
            ))}
          </List>
          </>
           )}
          <div style={{ marginTop: "1rem" }}>
            <Button
              onClick={validarYRegistrar}
              variant="contained"
              color="primary"
              style={{ marginRight: "10px" }}
              disabled={frentesAsignados.length === 0}
            >
              Registrar
            </Button>
            <Button
              onClick={handleClose}
              variant="contained"
              color="secondary"
            >
              Cancelar
            </Button>
          </div>
           
        </div>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          onClose={handleSnackbarClose}
          severity={snackbarType}
          sx={{ width: '100%', maxWidth: '600px', fontSize: '1.2rem', padding: '20px' }}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default AsignarFrente;