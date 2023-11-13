import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ConvocatoriaModificar = ({ eleccionId }) => {
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

  useEffect(() => {
    // Realiza una llamada para obtener los datos de la convocatoria a modificar
    axios.get(`http://localhost:8000/convocatorias/${eleccionId}`)
      .then((response) => {
        setConvocatoria(response.data); // Establece los datos de la convocatoria en el estado

        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [eleccionId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConvocatoria({ ...convocatoria, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/convocatorias/${eleccionId}`, convocatoria)
      .then((response) => {
        // Manejar la respuesta después de actualizar la convocatoria
        console.log(response.data);
      })
      .catch((error) => {
        // Manejar errores
        console.error(error);
      });
  };

  return (
    <div className="container">
      <h2>Modificar Convocatoria</h2>
      <form onSubmit={handleSubmit}>
        <label>Fecha de Inicio:</label>
        <input type="date" name="fecha_inicio" value={convocatoria.fecha_inicio} onChange={handleChange} required />

        <label>Fecha de Fin:</label>
        <input type="date" name="fecha_fin" value={convocatoria.fecha_fin} onChange={handleChange} required />

        <label>Motivo:</label>
        <input type="text" name="motivo" value={convocatoria.motivo} onChange={handleChange} required />

        <label>Descripción:</label>
        <textarea name="descripcion" value={convocatoria.descripcion} onChange={handleChange} required />

        <label>Requisitos:</label>
        <textarea name="requisitos" value={convocatoria.requisitos} onChange={handleChange} required />

        <label>Tipo:</label>
        <input type="text" name="tipo" value={convocatoria.tipo} onChange={handleChange} required />

        <label>Cantidad de Candidatos:</label>
        <input type="number" name="candidatos" value={convocatoria.candidatos} onChange={handleChange} required />

        <label>Estado:</label>
        <input type="text" name="estado" value={convocatoria.estado} onChange={handleChange} required />

        <label>Restricciones:</label>
        <textarea name="restricciones" value={convocatoria.restricciones} onChange={handleChange} required />

        <label>Contacto:</label>
        <input type="text" name="contacto" value={convocatoria.contacto} onChange={handleChange} required />

        <label>Lugar:</label>
        <input type="text" name="lugar" value={convocatoria.lugar} onChange={handleChange} required />

        <button type="submit">Modificar Convocatoria</button>
      </form>
    </div>
  );
};

export default ConvocatoriaModificar;
