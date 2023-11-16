import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';


const PublicarConvocatoriaList = () => {
  const navigate = useNavigate();
  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    // Llamada a la API para obtener las publicaciones de convocatorias
    fetch('http://localhost:8000/publicar_convocatoria_lista')
      .then(response => response.json())
      .then(data => setPublicaciones(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);


  const handleConvPublic = (id) => {
    // Redireccionar o realizar alguna acción al hacer clic en "Convocatoria"
    // Puedes usar react-router-dom o alguna otra biblioteca de enrutamiento si es necesario
    //setSelectedEleccionId(id);
    //console.log(id);
    //setModalConvo(true);
    //setEleccionPDFId(id);
   
   // setEleccionMId(id); // Establecer el ID para pasarlo al componente ConvocatoriaCrear
   // setModificarMostrarCrearConvocatoria(true);
   
   navigate(`/pdfPublicado/${id}`);
   console.log('------',id);
  
  };


  return (
    <div>
      <h1>Lista de Publicaciones de Convocatorias</h1>
      <ul>
        {publicaciones.map(publicacion => (
          <li key={publicacion.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3>Título: {publicacion.titulo}</h3>
              <p>Fecha de publicación: {publicacion.fecha_publicacion}</p>
              <p>Motivo de elección: {publicacion.motivo_eleccion}</p>
              {/* Otros campos a mostrar */}
            </div>
  
            <button className="custom-btn btn-5" onClick={() => handleConvPublic(publicacion.id_convocatoria)}>
              Ver Convocatoria
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PublicarConvocatoriaList;
