import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Importa jspdf-autotable
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import universityLogo from '../assets/UMSS.png';
import "../css/Convocatoria.css"

Modal.setAppElement('#root');

const PdfConvocatoria = ({ isOpen, closeModal, eleccionId }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [eleccion, setEleccion] = useState({});
  const [descripcion, setDescripcion] = useState('');
  const [requisitos, setRequisitos] = useState('');

  useEffect(() => {
    const obtenerDetallesEleccion = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_VARURL}obtener_id/${eleccionId}`);
        setEleccion(response.data);
      } catch (error) {
        console.error('Error al obtener los detalles de la elección:', error);
      }
    };

    obtenerDetallesEleccion();
  }, [eleccionId]);

  const handleGenerarPDF = () => {
    const doc = new jsPDF();

    // Agregar imagen de encabezado con el logo de la universidad
    doc.addImage(universityLogo, 'JPEG', 10, 10, 40, 40);

    // Establecer título de la elección
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Universidad Mayor de San Simón', 70, 30);

    // Crear una tabla o celdas para organizar la información
    const tableData = [
      ['Motivo de Elección', eleccion.MOTIVO_ELECCION],
      ['Fecha de Elección', eleccion.FECHA_ELECCION],
      ['Fecha Inicio Convocatoria', eleccion.FECHA_INI_CONVOCATORIA],
      ['Fecha Fin Convocatoria', eleccion.FECHA_FIN_CONVOCATORIA],
      ['Descripción', descripcion],
      ['Requisitos', requisitos],
    ];

    doc.autoTable({
      head: [['Título', 'Descripción']],
      body: tableData,
      startY: 70,
      theme: 'grid',
    });

    // Firmas de autoridades
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Firma del Autoridades', 140, doc.autoTable.previous.finalY + 20);
    doc.line(140, doc.autoTable.previous.finalY + 30, 200, doc.autoTable.previous.finalY + 30);

    // Guardar el PDF
    doc.save('Detalles_Eleccion.pdf');
    closeModal();
  };

  const handleDescripcionChange = (e) => {
    setDescripcion(e.target.value);
  };

  const handleRequisitosChange = (e) => {
    setRequisitos(e.target.value);
  };

  const handleAtras = () => {
    closeModal();
    navigate('/home');
  };

  return (
    <Modal
      className="CuerpoConvocatoria"
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Generando PDF"
    >
      <h2 className="ConvocatoriaTitulo">Convocatoria para Elecciones Universitarias</h2>
      <div className='ContenedorConvocatoriaTexto'>
        <div className="LabelCrearConvocatoria">Motivo de Elección:</div>
        <div className="NormalConvocatoria">{eleccion.MOTIVO_ELECCION}</div>
      </div>
      <div className='ContenedorConvocatoriaTexto'>
        <div className="LabelCrearConvocatoria">Fecha de Elección:</div>
        <div className="NormalConvocatoria">{eleccion.FECHA_ELECCION}</div>
      </div>
      <div className='ContenedorConvocatoriaTexto'>
        <div className="LabelCrearConvocatoria">Fecha de Inicio Convocatoria:</div>
        <div className="NormalConvocatoria">{eleccion.FECHA_INI_CONVOCATORIA}</div>
      </div>
      <div className='ContenedorConvocatoriaTexto'>
        <div className="LabelCrearConvocatoria">Fecha de Fin Convocatoria:</div>
        <div className="NormalConvocatoria">{eleccion.FECHA_FIN_CONVOCATORIA}</div>
      </div>
      <div >
        <div className="LabelCrearConvocatoria">Descripción:</div>
        <textarea
          className="TextConvocatoria"
          rows="4"
          cols="50"
          value={descripcion}
          onChange={handleDescripcionChange}
        ></textarea>
      </div>
      <div>
        <div className="LabelCrearConvocatoria">Requisitos:</div>
        <textarea
          className="TextConvocatoria"
          rows="4"
          cols="50"
          value={requisitos}
          onChange={handleRequisitosChange}
        ></textarea>
      </div>
      <div className="BotonesDivCrearConvocatoria">
        <button className="custom-btn btn-10" onClick={handleGenerarPDF}>
          Generar PDF
        </button>
        <button className="custom-btn btn-11" onClick={handleAtras}>
          Cerrar
        </button>
      </div>
    </Modal>
  );
};

export default PdfConvocatoria;