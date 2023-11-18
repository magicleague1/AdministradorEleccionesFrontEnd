import React, {  useEffect, useState } from "react";
import Modal from "react-modal";
import "../css/AsignarFrente.css";
import Swal from 'sweetalert2';
import axios from "axios";

Modal.setAppElement("#root");

const AsignarFrente = ({ isOpen, closeModal, eleccionId}) => {
  const [listaFrentesP, setListaFrentesP] = useState([]);
  const [frentesAsignados, setFrentesAsignados] = useState([]);

  
  useEffect(() => {
    const fetchFrentes = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_VARURL+'frentes');
        setListaFrentesP(response.data);
      } catch (error) {
        console.error('Error al obtener frentes:', error);
      }
    };

    fetchFrentes();
  }, []);

  useEffect(() => {
    const fetchFrentesAsignados = async () => {
      try {
        if (eleccionId) {
          const response = await axios.get(
            `${process.env.REACT_APP_VARURL}eleccionesAsignadas/${eleccionId}`
          );
          setFrentesAsignados(response.data);
        }
      } catch (error) {
        console.error('Error al obtener frentes asignados:', error);
      }
    };

    fetchFrentesAsignados();
  }, [eleccionId]);

  const toogleCancelar = () => {
    closeModal();
  };
  const handleFrenteSelection = (frenteId) => { 
    // Buscar si el frente ya está asignado
    const frenteAsignado = frentesAsignados.find((f) => f.COD_FRENTE === frenteId);

    if (frenteAsignado) {
      // Si ya está asignado, se quita de la lista
      const updatedFrentes = frentesAsignados.filter((f) => f.COD_FRENTE !== frenteId);
      setFrentesAsignados(updatedFrentes);
    } else {
      // Si no está asignado, se agrega a la lista
      const frenteSeleccionado = listaFrentesP.find((f) => f.COD_FRENTE === frenteId);
      if (frenteSeleccionado) {
        const updatedFrentes = [...frentesAsignados, frenteSeleccionado];
        setFrentesAsignados(updatedFrentes);
      }
    }
  };
  const validarYRegistrar = async () => {
    
      // if (selectedFrentes.length === 0) {
      //   Swal.fire({
      //     icon: 'error',
      //     title: 'Error',
      //     text: 'Debes seleccionar al menos un frente para registrar.',
      //   });
      // } 
      try {
      const data = frentesAsignados.map((listaFrentesP) => ({
        COD_ELECCION: eleccionId, // ID de la elección seleccionada
        COD_FRENTE: listaFrentesP.COD_FRENTE, // ID del frente asignado
      }));
      console.log(data)
      // Realizar la petición al backend para guardar los cambios
      await axios.post(process.env.REACT_APP_VARURL+'actualizar_frentes', data)
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: 'Frentes registrados correctamente',
          text: 'Los Frentes se han registrado con éxito!',
        }).then(() => {
          toogleCancelar();
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar los frente politico',
          text: `Nos puede registrar sin ningun cantidato`
        });
      });   
  
  }catch (error) {
    console.error('Error al guardar los cambios:', error);
  }
};
  return (
    <Modal
      className="modalFrente1"
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Frentes políticos"
      shouldCloseOnOverlayClick={true}
    >
      <h3 className="tituloPfrente1">FRENTES POLÍTICOS</h3>
      <ul>
        {listaFrentesP.map((frente) => (
          <li key={frente.COD_FRENTE}>
            <label className="ListaFrente">
             {frente.NOMBRE_FRENTE} 
             <input
              className="checkbox1"
              type="checkbox"
              checked={frentesAsignados.some((f) => f.COD_FRENTE === frente.COD_FRENTE)}
              onChange={() => handleFrenteSelection(frente.COD_FRENTE)}
            />
            </label>
          </li>
        ))}
      </ul>
      <br />
      <button className="custom-btn botonv1frente1" onClick={validarYRegistrar}>
        Registrar
      </button>
      <button className="custom-btn botonvfrente1" onClick={toogleCancelar}>
        Cancelar
      </button>
    </Modal>
  );
};

export default AsignarFrente;