import React, { useEffect, useState } from "react";
import "../css/MenuVertical.css";
import "../css/BotonesPartidos.css"
import axios from "axios";
import ActualizarFrenteModal from "../pages/ActualizarFrentePolitico";
import EliminarFrente from "../pages/EliminarFrente";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import ReasignarCandidatoModal from "./AgregarCandidatoModal";
const VerPartidosPoliticos = ({ lista }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false); // Nuevo estado para controlar el modal
  const [modalConvo, setModalConvo] = useState(false);
  const [selectedFrenteId, setSelectedFrenteId] = useState(null); // Nuevo estado para almacenar el ID de la elección seleccionada
  const url = "http://localhost:8000/";

  const [listaFrentesPoliticos,setListaFrentesPoliticos] = useState([])

  const [modalAC, setModalAC] = useState(false);

  useEffect(() => {
    axios.get(url + "frentes").then(response => {
      setListaFrentesPoliticos(response.data)
    })
  }, [lista]);
  const handleActualizarClick = (id) => {
    // Al hacer clic en "Detalles de la Elección," establece el ID de la elección seleccionada y abre el modal.
    setSelectedFrenteId(id);
    console.log(id);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    // Cierra el modal y restablece el ID de la elección seleccionada.
    setModalIsOpen(false);
    setSelectedFrenteId(null);
  };
  const closeModal1 = () => {
    // Cierra el modal y restablece el ID de la elección seleccionada.
    setModalConvo(false);
    setSelectedFrenteId(null);
  };

  const handleEliminacionClick = (id) => {
    // Redireccionar o realizar alguna acción al hacer clic en "Convocatoria"
    // Puedes usar react-router-dom o alguna otra biblioteca de enrutamiento si es necesario
    setSelectedFrenteId(id);
    console.log(id);
    setModalConvo(true);
  };

  const openModalAC = (id) =>{
    setSelectedFrenteId(id);
    setModalAC(true);
  };
  const closeModalAC = () =>{
    setModalAC(false);
  };


  return (
    <>
    <div className="ver-elecciones">
      <h3>FRENTES POLITICOS</h3>
      <div className="ContenedorTabla">
    <table>
      <thead>
        <tr>
          <th>NOMBRE</th>
          <th>SIGLA</th>
          <th>FECHA INSCRIPCION</th>
          <th>ACCIONES</th>
        </tr>
      </thead>
      <tbody>
        { listaFrentesPoliticos.length > 0 &&
        listaFrentesPoliticos.map((frentes) => {
          return(
            <tr className="trVerEleccion" key={frentes.COD_FRENTE}>
                <td className="especialtd">{frentes.NOMBRE_FRENTE}</td>
                <td className="tdNormal">{frentes.SIGLA_FRENTE}</td>
                <td className="tdNormal">{frentes.FECHA_INSCRIPCION}</td>
                <td className="tdNormalPartidoPolitico">
                <div className="d-flex">
                    <button className="custom-btn btn-15 d-flex align-items-center justify-content-center" onClick={() => handleActualizarClick(frentes.COD_FRENTE)}>
                        <FontAwesomeIcon icon={faEdit} style={{ fontSize: '24px' }} />
                    </button>
                    <button className="custom-btn btn-16 btn-delete d-flex align-items-center justify-content-center" onClick={() => handleEliminacionClick(frentes.COD_FRENTE)}>
                        <FontAwesomeIcon icon={faTrash} style={{ fontSize: '24px' }} />
                    </button>
                    <button className="custom-btn btn-25 btn-agregar d-flex align-items-center justify-content-center" onClick={() => openModalAC(frentes.COD_FRENTE)}>
                        <FontAwesomeIcon icon={faUserPlus} style={{ fontSize: '24px' }} />
                    </button>
                    </div>
                </td>
           </tr>
          )
          
        })}
        
      </tbody>
    </table>
    </div>
    </div>
    <ActualizarFrenteModal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        frenteId={selectedFrenteId} // Pasa el ID seleccionado al modal
      />
      <EliminarFrente
          isOpen={modalConvo}
          closeModal={closeModal1}
          frenteId={selectedFrenteId}
      />
       <ReasignarCandidatoModal
        isOpen={modalAC}
        closeModal={closeModalAC}
        frenteId={selectedFrenteId}
      />
        
    </>
    
  );
};

export default VerPartidosPoliticos;