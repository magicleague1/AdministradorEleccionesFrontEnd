import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CrearPublicaConv from './CrearPublicaConv';
import "../css/GenerarPdf.css"


const GenerarPdfPreview = ({ eleccionId }) => {
  const [pdfSrc, setPdfSrc] = useState('');

  const { id } = useParams(); // Obteniendo el parámetro 'id' desde la URL

  const [mostrarModificarConvocatoria, setModificarMostrarCrearConvocatoria] = useState(false);
  const [eleccionMId, setEleccionMId] = useState(0);




  const handleGetPDF = async () => {




    //usa convocatoriaEleccionesController
    console.log(`${process.env.REACT_APP_VARURL}generar_pdf/${eleccionId }`)
    const response = await fetch(`${process.env.REACT_APP_VARURL}generar_pdf/${eleccionId }`);
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
      <button className="custom-btn btn-5" onClick={() => handleConvPublic(eleccionId )}>
                            PUBLICAR
        </button>
      {pdfSrc && (
        <embed src={`data:application/pdf;base64,${pdfSrc}`} type="application/pdf" width="100%" height="350px" />
      )}

      <div>
      
        {mostrarModificarConvocatoria && (
        <CrearPublicaConv eleccionId={eleccionMId} />
      )}
      
      </div>
    </div>
  );
};

export default GenerarPdfPreview;
