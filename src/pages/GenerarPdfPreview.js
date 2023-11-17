import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CrearPublicaConv from './CrearPublicaConv';


const GenerarPdfPreview = ({ eleccionId }) => {
  const [pdfSrc, setPdfSrc] = useState('');

  const { id } = useParams(); // Obteniendo el parámetro 'id' desde la URL

  const [mostrarModificarConvocatoria, setModificarMostrarCrearConvocatoria] = useState(false);
  const [eleccionMId, setEleccionMId] = useState(0);




  const handleGetPDF = async () => {




    //usa convocatoriaEleccionesController
    const response = await fetch(`${process.env.REACT_APP_VARURL}generar_pdf/${eleccionId }`);
    const data = await response.json();

    if (data && data.pdf) {
      setPdfSrc(data.pdf);
    }
  };

  const handleConvPublic = (id) => {
    // Redireccionar o realizar alguna acción al hacer clic en "Convocatoria"
    // Puedes usar react-router-dom o alguna otra biblioteca de enrutamiento si es necesario
    //setSelectedEleccionId(id);
    //console.log(id);
    //setModalConvo(true);
    //setEleccionPDFId(id);
   
    setEleccionMId(id); // Establecer el ID para pasarlo al componente ConvocatoriaCrear
    setModificarMostrarCrearConvocatoria(true);
  
  };

  return (
    <div className="container">
      <button onClick={handleGetPDF}>Obtener PDF</button>
      {pdfSrc && (
        <embed src={`data:application/pdf;base64,${pdfSrc}`} type="application/pdf" width="100%" height="500px" />
      )}

      <div>
      <button className="custom-btn btn-5" onClick={() => handleConvPublic(eleccionId )}>
                            PUBLICAR
        </button>
        {mostrarModificarConvocatoria && (
        <CrearPublicaConv eleccionId={eleccionMId} />
      )}
      
      </div>
    </div>
  );
};

export default GenerarPdfPreview;
