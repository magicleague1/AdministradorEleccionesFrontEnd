import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

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
    axios.get(`${process.env.REACT_APP_VARURL}convocatorias/${eleccionId}`)
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
      .put(`${process.env.REACT_APP_VARURL}convocatorias/${eleccionId}`, convocatoria)
      .then((response) => {
        // Manejar la respuesta después de actualizar la convocatoria
        console.log(response.data);
        Swal.fire({
          icon: 'success',
          title: 'Actualizacion de convocatoria correctamente',
          text: `La convocatoria del proceso se actualizo con éxito!`
        })
      })
      .catch((error) => {
        // Manejar errores
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizacion la convocatoria',
          text: `Ocurrió un error al actualizar la convocatoria del proceso electoral`
        });
        console.error(error);
      });
  };

  return (
    <div className="crear-Convocatoria">
    <div className="NuevoCrearCREar" >
      <form onSubmit={handleSubmit}>
      <label className="LabelCrear">Fecha inscripciones de frentes</label>
      <div className='juntos'>
        <label className="LabelCrear">Fecha inicio de inscripcion:</label>
        <input className="InputCrearConvocatoria" type="date" name="fecha_inicio" value={convocatoria.fecha_inicio} onChange={handleChange} required />

        <label className="LabelCrear">Fecha fin de inscripcion:</label>
        <input className="InputCrearConvocatoria" type="date" name="fecha_fin" value={convocatoria.fecha_fin} onChange={handleChange} required />
      </div>
      <div className='juntos'>
        <label className="LabelCrear">Motivo:</label>
        <input className="InputCrearConvocatoria" type="text" name="motivo" value={convocatoria.motivo} onChange={handleChange} required />
         
        <label className="LabelCrear">Tipo:</label>
        <input className="InputCrearConvocatoria" type="text" name="tipo" value={convocatoria.tipo} onChange={handleChange} required />
        
        <label className="LabelCrear">Lugar:</label>
        <input className="InputCrearConvocatoria" type="text" name="lugar" value={convocatoria.lugar} onChange={handleChange} required />
      </div>

      <div className='juntos1'>
      <label className="LabelCrear">Descripción:</label>
        <textarea className="InputCrearConvocatoriaTexto" name="descripcion" value={convocatoria.descripcion} onChange={handleChange} required />

        <label className="LabelCrear">Requisitos:</label>
        <textarea className="InputCrearConvocatoriaTexto" name="requisitos" value={convocatoria.requisitos} onChange={handleChange} required />
        
        <label className="LabelCrear">Restricciones:</label>
        <textarea className="InputCrearConvocatoriaTexto" name="restricciones" value={convocatoria.restricciones} onChange={handleChange} required />

      </div>
      <div className="BotonesDivCrear">
      <button className ="custom-btn btn-6" type="submit">Actualizar</button>
      </div>
        
      </form>
    </div>
    </div>
  );
};

export default ConvocatoriaModificar;
