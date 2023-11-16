import React, { useEffect, useState } from "react";
import "../css/Comite.css";
import "bootstrap/dist/css/bootstrap.css";
import "styled-components";
import axios from "axios";
import Modal from "react-modal";
import ListaVocalesComite from "./ListaVocalesComite";
import Swal from 'sweetalert2';
import PermisoDeVocal from "./PermisoDeVocal";



function AsignacionPermiso({ lista }) {
  const [proceso, setproceso] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalAbrir, setmodalAbrir] = useState(false);
  const [codComite, setCodComite] = useState(null);
  const [codComiteActualizar, setcodComiteActualizar] = useState(null);
  const url = "http://localhost:8000/";
  useEffect(() => {
    axios.get(url + "elecciones_index").then(response => {
      setproceso(response.data)
    })
  }, [lista]);


  // Función para verificar la existencia del comité
 
  
  const handleVerListaClick = (eleccionId) => {
    // Aquí puedes realizar una acción para ver la lista de titulares y suplentes
    // Puedes abrir un modal o redirigir a una página para ver la lista
    setCodComite(eleccionId);
    setModalIsOpen(true);
  };

  const handleActualizar = (codComite) => {
    // Aquí puedes realizar una acción para ver la lista de titulares y suplentes
    // Puedes abrir un modal o redirigir a una página para ver la lista
    setcodComiteActualizar(codComite);
    console.log(':-..-..',codComiteActualizar);
    //setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
    <div className="divComite">
      <h1 className="titleC"> LISTA DE VOCALES DEL COMITE ELECTORAL</h1>
      <div className="ContenedorTabla">
        <table className="TablaComite">
          <thead >
            <tr>
              <th> ID </th>
              <th> PROCESO </th>
              <th> ACCIONES </th>
            </tr>
          </thead>
          <tbody >
            {proceso.map((elemento) => (
              <tr className="trVerComite" key={elemento.COD_ELECCION}>
                <td className="especialtd">{elemento.COD_ELECCION}</td>
                <td  className="tdNormal">{elemento.MOTIVO_ELECCION}</td>
                <td className="tdNormalBoton" >
                 {" "}
                  <button class="custom-btn btn-14" onClick={() => handleVerListaClick(elemento.COD_COMITE)}>Ver Lista</button>
                  <button class="custom-btn btn-14" onClick={() => handleActualizar(elemento.COD_COMITE)}>ASIGNAR PERMISO</button>
              
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
      <PermisoDeVocal codComite={codComiteActualizar} />
    </div>
         </div>
        </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Lista Comite"
        className={"CuerpoComite"}
        onClick={handleModalClick} // Cierra el modal al hacer clic fuera de él
      >
        <h2 className="ComiteTitulo">Lista de Comite Electoral</h2>
        <div className="ContenedorVocales">
        {codComite !== null && <ListaVocalesComite idComite={codComite} />}
        </div>
        <button
          className="BotonComiteModal"
          class="custom-btn btn-1"
          onClick={closeModal}
        >
          Cerrar
        </button>
      </Modal>
      
      </>
  );
}

export default AsignacionPermiso;