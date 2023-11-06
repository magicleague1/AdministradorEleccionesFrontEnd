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
  const [selectedEleccionId, setSelectedEleccionId] = useState(null); // Nuevo estado para almacenar el ID de la elección seleccionada
  const url = "http://localhost:8000/";

  const [listaElecciones,setListaElecciones] = useState([])

  const [modalAC, setModalAC] = useState(false);

  useEffect(() => {
    axios.get(url + "elecciones_index").then(response => {
      setListaElecciones(response.data)
    })
  }, [lista]);
  const handleActualizarClick = (id) => {
    // Al hacer clic en "Detalles de la Elección," establece el ID de la elección seleccionada y abre el modal.
    setSelectedEleccionId(id);
    console.log(id);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    // Cierra el modal y restablece el ID de la elección seleccionada.
    setModalIsOpen(false);
    setSelectedEleccionId(null);
  };
  const closeModal1 = () => {
    // Cierra el modal y restablece el ID de la elección seleccionada.
    setModalConvo(false);
    setSelectedEleccionId(null);
  };

  const handleEliminacionClick = (id) => {
    // Redireccionar o realizar alguna acción al hacer clic en "Convocatoria"
    // Puedes usar react-router-dom o alguna otra biblioteca de enrutamiento si es necesario
    setSelectedEleccionId(id);
    console.log(id);
    setModalConvo(true);
  };

  const openModalAC = () =>{
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
        { listaElecciones.length > 0 &&
        listaElecciones.map((eleccion) => {
          return(
            <tr className="trVerEleccion" key={eleccion.COD_ELECCION}>
                <td className="especialtd">{eleccion.MOTIVO_ELECCION}</td>
                <td className="tdNormal">{eleccion.FECHA_ELECCION}</td>
                <td className="tdNormal">{eleccion.FECHA_ELECCION}</td>
                <td className="tdNormalPartidoPolitico">
                <div className="d-flex">
                    <button className="custom-btn btn-15 d-flex align-items-center justify-content-center" onClick={() => handleActualizarClick(eleccion.COD_ELECCION)}>
                        <FontAwesomeIcon icon={faEdit} style={{ fontSize: '24px' }} />
                    </button>
                    <button className="custom-btn btn-16 btn-delete d-flex align-items-center justify-content-center" onClick={() => handleEliminacionClick(eleccion.COD_ELECCION)}>
                        <FontAwesomeIcon icon={faTrash} style={{ fontSize: '24px' }} />
                    </button>
                    <button className="custom-btn btn-17 btn-agregar d-flex align-items-center justify-content-center" onClick={() => openModalAC()}>
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
        eleccionId={selectedEleccionId} // Pasa el ID seleccionado al modal
      />
      <EliminarFrente
          isOpen={modalConvo}
          closeModal={closeModal1}
          eleccionId={selectedEleccionId}
      />
       <ReasignarCandidatoModal
        isOpen={modalAC}
        closeModal={closeModalAC}
      />
        
    </>
    
  );
};

export default VerPartidosPoliticos;