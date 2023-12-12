import React, { useState } from 'react';
import axios from 'axios';

const ListaVotantesPDF = ({ mesaCodigo }) => {
    const [pdfSrc, setPdfSrc] = useState('');

  
    const [mostrarModificarConvocatoria, setModificarMostrarCrearConvocatoria] = useState(false);
    const [eleccionMId, setEleccionMId] = useState(0);
  
  
  
  
    const handleGetPDF = async () => {
  
  
  
  
      //usa convocatoriaEleccionesController
      //console.log(`${process.env.REACT_APP_VARURL}generarPDFActaMesa/${eleccionId }`)
      const response = await fetch(`${process.env.REACT_APP_VARURL}obtenerDatosPorMesaYGenerarPDF/254`);
      const data = await response.json();
  
      if (data && data.pdf) {
        setPdfSrc(data.pdf);
      }
    };
  
   
  
    return (
      <div className="container">
        <button className="custom-btn btn-50" onClick={handleGetPDF}>Obtener PDF</button> 
       
        {pdfSrc && (
        <iframe
          title="Visor de PDF"
          src={`data:application/pdf;base64,${pdfSrc}`}
          width="100%" // Ocupa el ancho completo del contenedor
          height="600px" // Establece la altura según tus necesidades
          style={{ border: 'none' }} // Elimina el borde del iframe
        ></iframe>
      )}
  
        <div>
        
      
        
        </div>
      </div>
    );
};

export default ListaVotantesPDF;
