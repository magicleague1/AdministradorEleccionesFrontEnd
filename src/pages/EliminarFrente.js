import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../css/EliminacionFrente.css"
import Swal from 'sweetalert2';
Modal.setAppElement("#root");

const ActualizarFrenteModal = ({ isOpen, closeModal, eleccionId }) => {
  const { id } = useParams();
  const initialState = {
    nombre: "",
    sigla: "",
    fechaInscripcion: "",
    Logo: "",
  };

  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const[modalIsOpen, setModalIsOpen] = useState(false);
  const url = "http://localhost:8000/";
  console.log(url + `obtener_id/${eleccionId}`);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url + `obtener_id/${eleccionId}`);
        const eleccion = response.data;
        setFormData({
          nombre: eleccion.MOTIVO_ELECCION,
          sigla: eleccion.FECHA_INI_CONVOCATORIA,
          fechaInscripcion: eleccion.FECHA_FIN_CONVOCATORIA,
          Logo: eleccion.FECHA_ELECCION,
        });
      } catch (error) {
        console.error("Error al obtener los datos del frente politico:", error);
      }
    };

    fetchData();
  }, [eleccionId]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleActualizarClick = () => {
    if (!formData.nombre || !formData.sigla || !formData.fechaInscripcion|| !formData.logo) {
      Swal.fire({
        icon: 'error',
        title: 'Error al actualizar el frente politico',
        text: `Llene correctamente los datos `
      });
      return;
    }

    if (new Date(formData.fechaFin) <= new Date(formData.fechaInicio) || new Date(formData.fechaElecciones) <= new Date(formData.fechaFin)) {
      Swal.fire({
        icon: 'error',
        title: 'Error al crear el proceso electoral',
        text: ` Las fechas no son válidas. Asegúrese de que la fecha de inicio sea anterior a la fecha de fin y la fecha de elecciones sea posterior a la fecha de fin. `
      });
      return;
    }
    axios
      .put(url + `eleccionesUpdate/${eleccionId}`, {
        nombre: formData.motivoEleccion,
        sigla: formData.fechaInicio,
        fechaInscripcion: formData.fechaFin,
        logo: formData.fechaElecciones,
      })
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: 'Frente politico eliminado',
          text: `El frente politico se ha eliminado correctamente!`
        }).then(() => {
          handleVolverAtras();
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error de eliminacion frente politico',
          text: `Ocurrió un error al eliminar el frente politico`
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
      className={"Cuerpo2"}
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Actualizar Elección"
    >
      <div className="Titulopolitico">
      <h3 className="ActualizarTituloEliminar">ELIMINACION DE FRENTE POLITICO</h3>
      </div>
      
      <div className="form-group">
        <label className="LabelCrearEliminar">¿Deseas eliminar el frente politivo ?</label>
      </div>
      <div className="d-flex align-items-center justify-content-center">
      <button className ="custom-btn btn-17 d-flex align-items-center justify-content-center" onClick={handleActualizarClick}>
        Eliminar
      </button>
      <button className ="custom-btn btn-18 d-flex align-items-center justify-content-center" onClick={handleVolverAtras}>
        Cancelar
      </button>
      </div>
    </Modal>
    </>
   
  );
};

export default ActualizarFrenteModal;