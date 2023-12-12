import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";

import "../../css/GenerarPdf.css"


const GenerarPdfActaCierreMesa = ({ eleccionId }) => {
  const [pdfSrc, setPdfSrc] = useState('');

  const { id } = useParams(); // Obteniendo el parámetro 'id' desde la URL

  const [mostrarModificarConvocatoria, setModificarMostrarCrearConvocatoria] = useState(false);
  const [eleccionMId, setEleccionMId] = useState(0);




  const handleGetPDF = async () => {




    //usa convocatoriaEleccionesController
    //console.log(`${process.env.REACT_APP_VARURL}generarPDFActaMesa/${eleccionId }`)
    const response = await fetch(`${process.env.REACT_APP_VARURL}generarPDFActaCierreMesas/199`);
    const data = await response.json();

    if (data && data.pdf) {
      setPdfSrc(data.pdf);
    }
  };

  const handleConvPublic = (id) => {   
    setEleccionMId(id); // Establecer el ID para pasarlo al componente ConvocatoriaCrear
    setModificarMostrarCrearConvocatoria(true);
  
  };

  return (
    <div className="container">
      <button className="custom-btn btn-50" onClick={handleGetPDF}>Obtener PDF</button> 
      
      {pdfSrc && (
            <iframe
                title="Visor de PDF"
                src={`data:application/pdf;base64,${pdfSrc}`}
                style={{ width: '100%', height: '800px' }} // Ajusta la altura según tus necesidades
            ></iframe>
        )}

      <div>
      
    
      
      </div>
    </div>
  );
};

export default GenerarPdfActaCierreMesa;
