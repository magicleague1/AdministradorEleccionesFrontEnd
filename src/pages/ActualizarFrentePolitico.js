import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../css/ActualizacionFrente.css"
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
  const [selectedFile, setSelectedFile] = useState(null);
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
          title: 'Frente politico actualizado',
          text: `El frente politico se ha actualizado con éxito!`
        }).then(() => {
          handleVolverAtras();
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar frente politico',
          text: `Ocurrió un error al actualizar el frente politico`
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
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Obtiene el primer archivo seleccionado
    setSelectedFile(file);
  };
  return (
    <>
     <Modal
      className={"Cuerpo1"}
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Actualizar Elección"
    >
      <div className="Titulopolitico">
      <h3 className="ActualizarTitulo">ACTUALIZAR FRENTE POLITICO</h3>
      </div>
      
      <div className="form-group">
        <label className="LabelCrearActualizar">Nombre:</label>
        <input
          className="InputCrearActualizar"
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label className="LabelCrearActualizar">Sigla:</label>
        <input
          className="InputCrearActualizar"
          type="text"
          name="sigla"
          value={formData.sigla}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label className="LabelCrearActualizar">Fecha Inscripcion:</label>
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
        <label className="LabelCrearActualizar">Logo:</label>
        <input
           className="InputCrearActualizar"
           type="file"
           accept="image/*"
           onChange={handleFileChange}
          value={formData.motivoEleccion}
          />
        </div>
        {selectedFile && (
        <div>
          <p>Archivo seleccionado: {selectedFile.name}</p>
        </div>
      )}
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

export default ActualizarFrenteModal;