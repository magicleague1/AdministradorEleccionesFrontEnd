import React, { useState } from 'react';
import axios from "axios";
import ListaBoteletas from './ListaBoteletas';

const GenerarPDF = ({ eleccionId }) => {
  const [pdfSrc, setPdfSrc] = useState(null);

  const [mostrarListaBoletas,setmostrarListaBoletas ] = useState(false);
  
  

  const generarPDF = async () => {
    try {

      const response2 = await axios.post(
        `${process.env.REACT_APP_VARURL}generar_boletas/12` // Reemplaza 94 con tu idEleccion
      );

      if (response2.status === 200) {
        // Puedes realizar acciones adicionales si es necesario

        console.log('Boletas generadas exitosamente.');

        // Puedes actualizar el estado o realizar otras acciones según tu lógica de la aplicación
      } else {
        console.error(`Error al generar boletas. Código de respuesta: ${response.status}`);
      }

      // Realiza la solicitud para generar el PDF
      const response = await fetch(`${process.env.REACT_APP_VARURL}generarBoletasPDF/94`);
      
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


  const VERLISTABoletas = async () => {
    setmostrarListaBoletas(true);
  };

  return (
    <div>
      <h1>Generar PDF</h1>
      <button onClick={generarPDF}>Generar PDF</button>

      <h1>VER LISTA BOLETAS PDF</h1>
      <button onClick={VERLISTABoletas}>LISTA GenerarBoletas PDF</button>

      {pdfSrc && (
        <iframe
          title="Visor de PDF"
          src={`data:application/pdf;base64,${pdfSrc}`}
          width="100%"
          height="600px"
        ></iframe>
      )}


<div className="SegundoDivMenu" style={{ display: mostrarListaBoletas ? 'block' : 'none' }}>
        {mostrarListaBoletas && (
          <ListaBoteletas eleccionId={eleccionId} />
        )}
      </div>
    </div>
  );
};

export default GenerarPDF;
