import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "../css/AsignarFrente.css";
import Swal from 'sweetalert2';
Modal.setAppElement("#root");

const AsignarFrente = ({ isOpen, closeModal }) => {
  const [listaFrentesP, setListaFrentesP] = useState(["NOMBRE 1", "NOMBRE 2", "NOMBRE 3", "NOMBRE 4", "NOMBRE 5", "NOMBRE 6", "NOMBRE 7", "NOMBRE 8", "NOMBRE 9"]);
  const [selectedFrentes, setSelectedFrentes] = useState([]);

  const toggleFrente = (frente) => {
    if (selectedFrentes.includes(frente)) {
      setSelectedFrentes(selectedFrentes.filter((f) => f !== frente));
    } else {
      setSelectedFrentes([...selectedFrentes, frente]);
    }
  };

  const toogleCancelar = () => {
    closeModal();
    setSelectedFrentes([]);
  };

  const validarYRegistrar = () => {
    if (selectedFrentes.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debes seleccionar al menos un frente para registrar.',
      });
    } else {
      // Realizar el registro
      Swal.fire({
        icon: 'success',
        title: 'Frentes registrados correctamente',
        text: 'Los Frentes se han registrado con éxito!',
      }).then(() => {
        toogleCancelar();
      });;
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
        {listaFrentesP.map((frente, index) => (
          <li key={index}>
            <label className="ListaFrente">
              {frente}
              <input className="checkbox1"
                type="checkbox"
                checked={selectedFrentes.includes(frente)}
                onChange={() => toggleFrente(frente)}
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