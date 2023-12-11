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
    <div class="container"  >

        {publicaciones.map(publicacion => (
              
                  <div class="card1"key={publicacion.id}>
                    <div class="title">{publicacion.titulo}</div>
                    
                    <div class="content">{publicacion.motivo_eleccion}</div>
                    <div class="date">{publicacion.fecha_publicacion} </div>
                    <div class="buttons">
                    <IconButton color="primary" aria-label="descargar"  onClick={() => handleConvPublic(publicacion.id_convocatoria)}>
                    <GetAppOutlinedIcon />
                    </IconButton>
                    
                    </div>
                    
                  </div>
        
        ))}
     
    </div>
  );
};

export default PublicarConvocatoriaList;
