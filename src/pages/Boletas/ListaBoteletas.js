import React, { useState, useEffect } from 'react';
import axios from "axios";

const ListaBoteletas = ({ eleccionId }) => {
  const [pdfSrc, setPdfSrc] = useState(null);

  useEffect(() => {
    const generarPDF = async () => {
      try {
        // Realiza la solicitud para generar el PDF
        const response = await fetch(`${process.env.REACT_APP_VARURL}generarBoletasPDF/12`);

        // Verifica si la solicitud fue exitosa (código de respuesta 200)
        if (response.ok) {
          // Obtiene los datos del PDF en formato base64
          const data = await response.json();

          // Actualiza el estado con el PDF
          if (data && data.pdf) {
            setPdfSrc(data.pdf);
          } else {
            console.error('No se recibió el PDF esperado en la respuesta.');
          }
        } else {
          console.error(`Error al generar el PDF. Código de respuesta: ${response.status}`);
        }
      } catch (error) {
        console.error('Error al generar el PDF:', error);
      }
    };

    // Llama a la función para generar el PDF cuando el componente se monta
    generarPDF();
  }, []); // El segundo parámetro [] asegura que useEffect se ejecute solo una vez al montar el componente

  return (
    <div>
      <h1>Generar PDF</h1>

      {pdfSrc && (
        <iframe
          title="Visor de PDF"
          src={`data:application/pdf;base64,${pdfSrc}`}
          width="100%"
          height="600px"
        ></iframe>
      )}
    </div>
  );
};

export default ListaBoteletas;
