
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "../css/AgregarFrenteModal.css";
import { Button, Input, MenuItem, Select, Snackbar, Typography } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const ReasignarCandidatoModal = ({ isOpen, closeModal }) => {
  const listaOpciones = ["opcion 1", "opcion 2", "opcion 3", "opcion 4"];
  const [selectedOption, setSelectedOption] = useState("Seleccionar Cargo");
  const [ci, setCi] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleCi = (event) => {
    setCi(event.target.value);
  };

  const toogle = () => {
    setCi("");
    setSelectedOption("Seleccionar Cargo");
    closeModal();
  };

  const handleGuardar = () => {
    // Verificar que el Carnet de Identidad solo contenga caracteres numéricos
    const regex = /^[0-9]+$/;
    if (ci === "") {
      showSnackbar("error", "El carnet de identidad no puede estar en blanco");
      return; // No continúa con la acción si no es válido
    } else if (!regex.test(ci)) {
      showSnackbar("error", "El carnet de identidad solo debe tener números");
      return; // No continúa con la acción si no es válido
    } else if (selectedOption === "Seleccionar Cargo") {
      showSnackbar("error", "Seleccione un cargo");
      return; // No continúa con la acción si no es válido
    }

    showSnackbar("success", "Candidato guardado correctamente");
    // Aquí puedes realizar la acción de guardar si la validación es exitosa
    toogle();
  };

  const showSnackbar = (severity, message) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Modal
        className={"modalFrente"}
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Frentes politicos"
        shouldCloseOnOverlayClick={true}
      >
        <h3 className="tituloPfrente">REASIGNAR CANDIDATO</h3>
        <div className="contenedorCandidatos">
          <Typography variant="h2" className="tituloOpciones">
            Carnet de Identidad
          </Typography>
          <Input className="entradaOpciones" value={ci} onChange={handleCi} />
          <Typography variant="h2" className="tituloOpciones">
            Cargo
          </Typography>
          <Select
            className="entradaOpciones"
            value={selectedOption}
            onChange={handleSelectChange}
            label="Cargo"
          >
            <MenuItem value="Seleccionar Cargo" disabled>
              Seleccionar Cargo
            </MenuItem>
            {listaOpciones.map((opcion, index) => (
              <MenuItem key={index} value={opcion}>
                {opcion}
              </MenuItem>
            ))}
          </Select>
          <Button className="custom-btn botonGuardarC" onClick={handleGuardar}>
            Guardar
          </Button>
          <Button className="custom-btn botonvfrente" onClick={() => toogle()}>
            Cancelar
          </Button>
        </div>
      </Modal>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default ReasignarCandidatoModal;