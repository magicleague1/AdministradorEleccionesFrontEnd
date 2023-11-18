import React, { useState } from 'react';
import axios from 'axios';
import '../css/FormStyles.css';
import "../css/ConvocatoriaCrear.css";
import Swal from 'sweetalert2';


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
        Swal.fire({
          icon: 'success',
          title: 'Creacion de convocatoria correctamente',
          text: `La convocatoria del proceso se creo con éxito!`
        })
      })
      .catch((error) => {
        // Manejar errores
        Swal.fire({
          icon: 'error',
          title: 'Error al crear la convocatoria',
          text: `Ocurrió un error al crear la convocatoria del proceso electoral`
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
        <input className="InputCrearConvocatoria" type="date" name="fecha_inicio" onChange={handleChange} required />
        <label className="LabelCrear">Fecha fin de inscripcion:</label>
        <input className="InputCrearConvocatoria" type="date" name="fecha_fin" onChange={handleChange} required />
        </div>
        <div className='juntos'>
        <label className="LabelCrear" >Motivo:</label>
        <input className="InputCrearConvocatoria" type="text" name="motivo" onChange={handleChange} required />
        <label className="LabelCrear">Tipo:</label>
        <input className="InputCrearConvocatoria" type="text" name="tipo" onChange={handleChange} required />
        <label className="LabelCrear">Lugar:</label>
        <input className="InputCrearConvocatoria" type="text" name="lugar" onChange={handleChange} required />
        </div>
        <div className='juntos1'>
        <label className="LabelCrear">Descripción:</label>
        <textarea className="InputCrearConvocatoriaTexto" name="descripcion" onChange={handleChange} required />

        <label className="LabelCrear">Requisitos:</label>
        <textarea className="InputCrearConvocatoriaTexto" name="requisitos" onChange={handleChange} required />
        
        <label className="LabelCrear">Restricciones:</label>
        <textarea className="InputCrearConvocatoriaTexto" name="restricciones" onChange={handleChange} required />
        </div>
       
        <div className="BotonesDivCrear">
      <button className ="custom-btn btn-6" type="submit">
      Guardar
      </button>
    
      </div>
  
      </form>
      </div>
    </div>
   
  );
};

export default ConvocatoriaCrear;
