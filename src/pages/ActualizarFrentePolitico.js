import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import "../css/ActualizacionFrente.css";
Modal.setAppElement("#root");

const ActualizarFrenteModal = ({ isOpen, closeModal, frenteId }) => {
  const { id } = useParams();
  const initialState = {
    nombre: "",
    sigla: "",
  };

  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [selectedFile, setSelectedFile] = useState(null);
  const url = process.env.REACT_APP_VARURL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}frentes/${frenteId}`);
        const frente = response.data;
        setFormData({
          nombre: frente.NOMBRE_FRENTE,
          sigla: frente.SIGLA_FRENTE,
        });
      } catch (error) {
        console.error("Error al obtener los datos del frente político:", error);
      }
    };

    fetchData();
  }, [frenteId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleActualizarClick = async (e) => {
    e.preventDefault();
    try {
      
      const formDataToSend = new FormData();
      formDataToSend.append("NOMBRE_FRENTE", formData.nombre);
      formDataToSend.append("SIGLA_FRENTE", formData.sigla);
      if (selectedFile) {
        formDataToSend.append("LOGO", selectedFile);
      }
      console.log(formDataToSend)
      await axios.put(`${url}frentes/${frenteId}`, formDataToSend);

      Swal.fire({
        icon: 'success',
        title: 'Frente político actualizado',
        text: 'El frente político se ha actualizado con éxito!'
      });

      handleVolverAtras();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al actualizar frente político',
        text: 'Ocurrió un error al actualizar el frente político'
      });
    }
  };

  const handleVolverAtras = () => {
    closeModal();
    navigate("/home");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
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
          <label className="LabelCrearActualizar">Logo:</label>
          <input
            className="InputCrearActualizar"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        {selectedFile && (
          <div>
            <label className="LabelCrear">Archivo seleccionado: {selectedFile.name}</label>
          </div>
        )}
        <div className="BotonesDivCrearActualizar">
          <button className="custom-btn btn-9" onClick={handleActualizarClick}>
            Actualizar
          </button>
          <button className="custom-btn btn-8" onClick={handleVolverAtras}>
            Volver
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ActualizarFrenteModal;