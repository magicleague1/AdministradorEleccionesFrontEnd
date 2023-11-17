import React, { useState } from 'react';
import axios from 'axios';
import '../css/FormStyles.css';


const ConvocatoriaCrear = ({ eleccionId }) => {
  const [convocatoria, setConvocatoria] = useState({
    fecha_inicio: '',
    fecha_fin: '',
    motivo: '',
    descripcion: '',
    requisitos: '',
    tipo: '',
    candidatos: '',
    estado: '',
    restricciones: '',
    contacto: '',
    lugar: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConvocatoria({ ...convocatoria, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(process.env.REACT_APP_VARURL+'convocatorias_crear', { ...convocatoria, id_eleccion: eleccionId })
      .then((response) => {
        // Manejar la respuesta después de crear la convocatoria
        console.log(response.data);
      })
      .catch((error) => {
        // Manejar errores
        console.error(error);
      });
  };

  return (
    <div className="container">
      <h2>Crear Convocatoria</h2>
      <form onSubmit={handleSubmit}>
        <label>Fecha publicacion mesas:</label>
        <input type="date" name="fecha_inicio" onChange={handleChange} required />

        <label>Fecha publicacion de comite:</label>
        <input type="date" name="fecha_fin" onChange={handleChange} required />

        <label>Motivo:</label>
        <input type="text" name="motivo" onChange={handleChange} required />

        <label>Descripción:</label>
        <textarea name="descripcion" onChange={handleChange} required />

        <label>Requisitos:</label>
        <textarea name="requisitos" onChange={handleChange} required />

        <label>Tipo:</label>
        <input type="text" name="tipo" onChange={handleChange} required />

        <label>Cantidad de Candidatos:</label>
        <input type="number" name="candidatos" onChange={handleChange} required />

        <label>Estado:</label>
        <input type="text" name="estado" onChange={handleChange} required />

        <label>Restricciones:</label>
        <textarea name="restricciones" onChange={handleChange} required />

        <label>Contacto:</label>
        <input type="text" name="contacto" onChange={handleChange} required />

        <label>Lugar:</label>
        <input type="text" name="lugar" onChange={handleChange} required />

        <button className="b1" type="submit">Crear Convocatoria</button>
      </form>
    </div>
  );
};

export default ConvocatoriaCrear;
