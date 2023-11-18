import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

const PartidosPoliticos = () => {
  const initialState = {
    NOMBRE_FRENTE: "",
    SIGLA_FRENTE: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [selectedFile, setSelectedFile] = useState(null);


 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleGuardarClick = () => {
    if (!formData.NOMBRE_FRENTE || !formData.SIGLA_FRENTE || !selectedFile ) {
      Swal.fire({
        icon: 'error',
        title: 'Error al crear el frente político',
        text: 'Complete correctamente los datos.',
      });
      return;
    }

    const data = new FormData();
    data.append('NOMBRE_FRENTE', formData.NOMBRE_FRENTE);
    data.append('SIGLA_FRENTE', formData.SIGLA_FRENTE);
    data.append('LOGO', selectedFile);
    data.append('COD_CARRERA', "");

    axios.post(`${process.env.REACT_APP_VARURL}frentes/nuevo`, data)
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: 'Proceso registrado correctamente',
          text: 'El frente político se ha creado con éxito.',
        });
        setFormData(initialState);
        setSelectedFile(null);
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al crear el frente político',
          text: `Ocurrió un error al crear el frente político: ${error}`,
        });
      });
  };

  const handleVolverAtras = () => {
    setFormData(initialState);
    setSelectedFile(null);
  };



  return (
    <div className="crear-elecciones">
      <h3>INSCRIPCIÓN DE UN FRENTE POLÍTICO</h3>
      <div className="NuevoCrear">
        <div className="form-group1">
          <label className="LabelCrear">Nombre:</label>
          <input
            type="text"
            name="NOMBRE_FRENTE"
            value={formData.NOMBRE_FRENTE}
            onChange={handleInputChange}
            placeholder="Ingrese el nombre del frente político"
            className="motivo-input"
          />
        </div>
        <div className="form-group">
          <label className="LabelCrear">Sigla:</label>
          <input
            type="text"
            name="SIGLA_FRENTE"
            value={formData.SIGLA_FRENTE}
            onChange={handleInputChange}
            placeholder="Ingrese la sigla del frente político"
            className="motivo-input"
          />
        </div>
        <div className="form-group">
          <label className="LabelCrear" htmlFor="logo">Logo:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="motivo-input"
          />
        </div>
        {selectedFile && (
          <div>
            <label className="LabelCrear">Archivo seleccionado: {selectedFile.name}</label>
          </div>
        )}
        <div className="BotonesDivCrear">
          <button className="custom-btn btn-6" onClick={handleGuardarClick}>
            Registrar
          </button>{"    "}
          <button className="custom-btn btn-7" onClick={handleVolverAtras}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default PartidosPoliticos;