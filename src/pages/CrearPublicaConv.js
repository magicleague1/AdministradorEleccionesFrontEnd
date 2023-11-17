import React, { useState ,useEffect } from 'react';
import axios from 'axios';

const CrearPublicaConv = ({  eleccionId }) => {
  const fechaActual = new Date().toISOString().split('T')[0];
 

  const [data, setData] = useState({
    id_convocatoria: '', // Valor inicial id_convocatoria
    fecha_publicacion: fechaActual, // Valor inicial fecha_publicacion
    titulo: '',
    contenido: ''
  });

  useEffect(() => {
    obtenerIdConvocatoria(eleccionId); // Llama a la función para obtener la ID de convocatoria cuando cambie eleccionId
  }, [eleccionId]);

  const obtenerIdConvocatoria = async (eleccionId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_VARURL}obtener_id_convocatoria/${eleccionId}`);
      setData({ ...data, id_convocatoria: response.data.id_convocatoria });
    } catch (error) {
      console.error('Error al obtener la convocatoria:', error);
    }
  };


  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   


    try {
      const response = await axios.post(process.env.REACT_APP_VARURL+'publicar_convocatorias_crear', data); // Reemplaza 'URL_DEL_BACKEND' con tu URL de la API

      console.log('Datos enviados:', response.data);
      // Realiza acciones adicionales según la respuesta del backend
    } catch (error) {
      console.error('Error al enviar datos:', error);
      // Manejo de errores
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Título:</label>
        <input
          type="text"
          name="titulo"
          value={data.titulo}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Contenido:</label>
        <textarea
          name="contenido"
          value={data.contenido}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Enviar Datos</button>
    </form>
  );
};

export default CrearPublicaConv;
