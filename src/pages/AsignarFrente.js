import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import axios from "axios";
import Swal from "sweetalert2";

const AsignarFrente = ({ isOpen, closeModal, eleccionId }) => {
  const [listaFrentesP, setListaFrentesP] = useState([]);
  const [frentesAsignados, setFrentesAsignados] = useState([]);

  useEffect(() => {
    const fetchFrentes = async () => {
      try {
        // Fetch available fronts
        const response = await axios.get(`${process.env.REACT_APP_VARURL}getFrentesByEleccion/${eleccionId}`);
        setListaFrentesP(response.data);
      } catch (error) {
        console.error('Error al obtener frentes:', error);
      }
    };

    fetchFrentes();
  }, [eleccionId]);

  useEffect(() => {
    const fetchFrentesAsignados = async () => {
      try {
        // Fetch assigned fronts
        if (eleccionId) {
          const response = await axios.get(`${process.env.REACT_APP_VARURL}eleccionesAsignadas/${eleccionId}`);
          setFrentesAsignados(response.data);
        }
      } catch (error) {
        console.error('Error al obtener frentes asignados:', error);
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
      const frenteSeleccionado = listaFrentesP.find((f) => f.COD_FRENTE === frenteId);
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
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Debes seleccionar al menos un frente para registrar.',
        });
        return;
      }

      // Prepare the data for the backend
      const data = frentesAsignados.map((frente) => ({
        COD_ELECCION: eleccionId,
        COD_FRENTE: frente.COD_FRENTE,
      }));

      // Send a POST request to register the selected fronts
      await axios.post(`${process.env.REACT_APP_VARURL}actualizar_frentes`, data);
      Swal.fire({
        icon: 'success',
        title: 'Frentes registrados correctamente',
        text: 'Los Frentes se han registrado con éxito!',
      }).then(() => {
        handleClose();
      });
    } catch (error) {
      console.error('Error al registrar los frentes políticos:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al registrar los frentes políticos.',
      });
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="Frentes politicos"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="modalFrente" style={{ backgroundColor: '#fff', padding: '20px', width: '400px', borderRadius: '8px', textAlign: 'center' }}>
        <h3 className="tituloPfrente" style={{ color: 'black', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>FRENTES POLÍTICOS DISPONIBLES</h3>
        <List>
          {listaFrentesP.map((frente) => (
            <ListItem key={frente.COD_FRENTE} className="titulofrente" style={{ marginBottom: '10px' }}>
              <label className="ListaFrente" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Checkbox
                  className="checkbox1"
                  checked={frentesAsignados.some((f) => f.COD_FRENTE === frente.COD_FRENTE)}
                  onChange={() => handleFrenteSelection(frente.COD_FRENTE)}
                />
                <ListItemText primary={frente.NOMBRE_FRENTE} style={{ color: 'black', flex: 1, textAlign: 'center'}} />
              </label>
            </ListItem>
          ))}
        </List>
        <div style={{ marginTop: '1rem' }}>
          <Button
            className="botonv1frente1"
            onClick={validarYRegistrar}
            variant="contained"
            color="primary"
            style={{ marginRight: '10px' }}
          >
            Registrar
          </Button>
          <Button
            className="botonvfrente1"
            onClick={handleClose}
            variant="contained"
            color="secondary"
          >
            Cancelar
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AsignarFrente;
