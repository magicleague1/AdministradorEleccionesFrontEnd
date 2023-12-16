import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import GetAppOutlinedIcon from '@mui/icons-material/GetAppOutlined';
import "../css/HomePage.css";

const PublicarConvocatoriaList = () => {
  const navigate = useNavigate();
  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    // Llamada a la API para obtener las publicaciones de convocatorias
    fetch(process.env.REACT_APP_VARURL+'publicar_convocatoria_lista')
      .then(response => response.json())
      .then(data => setPublicaciones(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);


  const handleConvPublic = (id) => {
   navigate(`/pdfPublicado/${id}`);
   console.log('------',id);
  
  };


  return (
    <div className="container" style={publicaciones.length > 0 ? {} : { display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    {publicaciones.length > 0 ? (
      publicaciones.map((publicacion) => (
        <div className="card1" key={publicacion.id}>
          <div className="title">{publicacion.titulo}</div>
          <div className="content">{publicacion.motivo_eleccion}</div>
          <div className="date">{publicacion.fecha_publicacion} </div>
          <div className="buttons">
            <IconButton
              color="primary"
              aria-label="descargar"
              onClick={() => handleConvPublic(publicacion.id_convocatoria)}
            >
              <GetAppOutlinedIcon />
            </IconButton>
          </div>
        </div>
      ))
    ) : (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>No hay convocatorias publicadas.</div>
    )}
  </div>
  );
};

export default PublicarConvocatoriaList;
