import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import GetAppOutlinedIcon from '@mui/icons-material/GetAppOutlined';
import "../css/HomePage.css";

const PublicarListaVotantes = () => {
  const navigate = useNavigate();
  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    // Llamada a la API para obtener las publicaciones de convocatorias
    fetch(process.env.REACT_APP_VARURL+'listaPublicarMesa')
      .then(response => response.json())
      .then(data => setPublicaciones(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);


  const handleConvPublic = (id) => {
   navigate(`/pdfPublicadoLista/${id}`);
   console.log('------',id);
  
  };


  return (
    <div className="container" style={publicaciones.length > 0 ? {} : { display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    {publicaciones.length > 0 ? (
      publicaciones.map((publicacion) => (
        <div className="card1" key={publicacion.id_eleccion_mesa}>
          <div className="title">{publicacion.titulo}</div>
          <div className="content">{publicacion.contenido}</div>
          <div className="date">{publicacion.fecha_publicacion} </div>
          <div className="buttons">
            <IconButton
              color="primary"
              aria-label="descargar"
              onClick={() => handleConvPublic(publicacion.id_eleccion_mesa)}
            >
              <GetAppOutlinedIcon />
            </IconButton>
          </div>
        </div>
      ))
    ) : (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>No hay publicaciones .</div>
    )}
  </div>
  );
};

export default PublicarListaVotantes;
