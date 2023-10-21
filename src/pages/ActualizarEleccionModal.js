import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../css/ActualizacionEleccionModal.css"
import Swal from 'sweetalert2';
Modal.setAppElement("#root");

const ActualizarEleccionModal = ({ isOpen, closeModal, eleccionId }) => {
  const { id } = useParams();
  const initialState = {
    motivoEleccion: "",
    fechaInicio: "",
    fechaFin: "",
    fechaElecciones: "",
  };

  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [modalMessage, setModalMessage] = useState("");
  const[modalIsOpen, setModalIsOpen] = useState(false);
  const url = "http://localhost:8000/";
  console.log(url + `obtener_id/${eleccionId}`);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url + `obtener_id/${eleccionId}`);
        const eleccion = response.data;
        setFormData({
          motivoEleccion: eleccion.MOTIVO_ELECCION,
          fechaInicio: eleccion.FECHA_INI_CONVOCATORIA,
          fechaFin: eleccion.FECHA_FIN_CONVOCATORIA,
          fechaElecciones: eleccion.FECHA_ELECCION,
        });
      } catch (error) {
        console.error("Error al obtener los datos de la elección:", error);
      }
    };

    fetchData();
  }, [eleccionId]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleActualizarClick = () => {
    axios
      .put(url + `eleccionesUpdate/${eleccionId}`, {
        MOTIVO_ELECCION: formData.motivoEleccion,
        FECHA_INI_CONVOCATORIA: formData.fechaInicio,
        FECHA_FIN_CONVOCATORIA: formData.fechaFin,
        FECHA_ELECCION: formData.fechaElecciones,
      })
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: 'Proceso se actualizo correctamente',
          text: `El proceso electoral se ha actualizado con éxito!`
        }).then(() => {
          handleVolverAtras();
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar el proceso electoral',
          text: `Ocurrió un error al actualizar el proceso electoral`
        });
      });
  };

  const handleVolverAtras = () => {
    closeModal();
    navigate("/home");
  };
  const cerrarModal= () => {
    setModalIsOpen(false);
  };
  
  return (
    <>
     <Modal
    className={"Cuerpo"}
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Actualizar Elección"
    >
      <h3 className="ActualizarTitulo">Actualizar proceso electoral</h3>
      <div className="form-group">
        <label className="LabelCrearActualizar">Motivo de Elección:</label>
        <input
          className="InputCrearActualizar"
          type="text"
          name="motivoEleccion"
          value={formData.motivoEleccion}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label className="LabelCrearActualizar">Fecha inicio de convocatoria:</label>
        <input
          className="InputCrearActualizar"
          type="date"
          name="fechaInicio"
          value={formData.fechaInicio}
          min={new Date().toISOString().split("T")[0]}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label className="LabelCrearActualizar">Fecha fin de convocatoria:</label>
        <input
          className="InputCrearActualizar"
          type="date"
          name="fechaFin"
          value={formData.fechaFin}
          min={formData.fechaInicio}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label className="LabelCrearActualizar">Fecha de las elecciones:</label>
        <input
          className="InputCrearActualizar"
          type="date"
          name="fechaElecciones"
          value={formData.fechaElecciones}
          min={formData.fechaFin}
          onChange={handleInputChange}
        />
      </div>
      <div className="BotonesDivCrearActualizar">
      <button className ="custom-btn btn-9" onClick={handleActualizarClick}>
        Actualizar
      </button>
      <button className ="custom-btn btn-8" onClick={handleVolverAtras}>
        Volver
      </button>
      </div>
    </Modal>
    </>
   
  );
};

export default ActualizarEleccionModal;