import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const GenerarPdfPreviewPublic = () => {
  const [pdfSrc, setPdfSrc] = useState('');
  const { id } = useParams(); // Obteniendo el parámetro 'id' desde la URL



  const handleGetPDF = async () => {
    console.log('<<<<<<<<<<',id);
    //usa convocatoriaEleccionesController
    const response = await fetch(`${process.env.REACT_APP_VARURL}generar_pdf_publicado/${id}`);
    const data = await response.json();

    if (data && data.pdf) {
      setPdfSrc(data.pdf);
    }
  };

  useEffect(() => {
    if (id) {
      handleGetPDF(); // Llama a la función cuando 'id' cambie
    }
  }, [id]);

  return (
    <div>
      <h1>Convocatoria {id}</h1>
      {pdfSrc && (
        <embed src={`data:application/pdf;base64,${pdfSrc}`} type="application/pdf" width="100%" height="1000px" />
      )}
    </div>
  );
};

export default GenerarPdfPreviewPublic;
