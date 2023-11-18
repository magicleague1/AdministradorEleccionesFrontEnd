import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../css/EliminacionFrente.css";
import Swal from 'sweetalert2';
Modal.setAppElement("#root");

const EliminarFrenteModal = ({ isOpen, closeModal, frenteId }) => {
  const { id } = useParams();

  const initialState = {
    motivoEliminacion: "",
  };

  const [formData, setFormData] = useState(initialState);
  const url = process.env.REACT_APP_VARURL;

  const handleEliminarClick = () => {
    if (!formData.motivoEliminacion) {
      Swal.fire({
        icon: 'error',
        title: 'Error al eliminar frente político',
        text: `Ingrese un motivo`,
      });
      return;
    }

    const eliminacion = {
      MOTIVO: formData.motivoEliminacion,
    };
    console.log(eliminacion)
    axios
      .delete(url + `frentes/${frenteId}`, eliminacion)
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: 'Frente político eliminado',
          text: `El frente político se ha eliminado correctamente!`,
        }).then(() => {
          handleVolverAtras();
          setFormData(initialState);
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error de eliminación frente político',
          text: `Ocurrió un error al eliminar el frente político`,
        });
      });
  };

  const handleVolverAtras = () => {
    closeModal();
  };

  const handleMotivoChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, motivoEliminacion: value });
  };

  return (
    <>
      <Modal
        className={"Cuerpo2"}
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Actualizar Elección"
      >
        <div className="Titulopolitico">
          <h3 className="ActualizarTituloEliminar">ELIMINACION DE FRENTE POLITICO</h3>
        </div>

        <div className="form-group">
          <label className="LabelCrearEliminar">¿Deseas eliminar el frente político?</label>
        </div>
        <label className="LabelCrear">Motivo de eliminación:</label>
        <input
          className="InputCrearConvocatoria"
          type="text"
          name="motivoEliminacion"
          value={formData.motivoEliminacion}
          onChange={handleMotivoChange}
        />
        <div className="d-flex align-items-center justify-content-center">
          <button className="custom-btn btn-17 d-flex align-items-center justify-content-center" onClick={handleEliminarClick}>
            Eliminar
          </button>
          <button className="custom-btn btn-18 d-flex align-items-center justify-content-center" onClick={handleVolverAtras}>
            Cancelar
          </button>
        </div>
      </Modal>
    </>
  );
};

export default EliminarFrenteModal;