import React, { useEffect, useState } from "react";
import "../css/Comite.css";
import "bootstrap/dist/css/bootstrap.css";
import "styled-components";
import axios from "axios";
import Modal from "react-modal";
import ListaVocalesComite from "./ListaVocalesComite";
import Swal from 'sweetalert2';
import PermisoDeVocal from "./PermisoDeVocal";
import ViewListIcon from '@mui/icons-material/ViewList'; 
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';


function AsignacionPermiso({ lista }) {
  const [proceso, setproceso] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpen1, setModalIsOpen1] = useState(false);
  const [codComite, setCodComite] = useState(null);
  const [codComiteActualizar, setcodComiteActualizar] = useState(null);
  const url = process.env.REACT_APP_VARURL;
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
    setModalIsOpen1(true);
    console.log(':-..-..',codComiteActualizar);
    //setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const closeModal1 = () => {
    setModalIsOpen1(false);
  };
  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
    <div className="divComite">
      <h1 className="titleC"> ASIGNACION DE PERMISOS</h1>
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
                 <button className="icono" onClick={() => handleVerListaClick(elemento.COD_COMITE)}>
                  <ViewListIcon fontSize="large"/>
                  </button>
                  <button className="icono" onClick={() => handleActualizar(elemento.COD_COMITE)}>
                  <AssignmentTurnedInIcon fontSize="large" />
                  </button>
              
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
      
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
      <Modal
        isOpen={modalIsOpen1}
        onRequestClose={closeModal1}
        contentLabel="Reasignacion Comite"
        className={"CuerpoComite"}
        onClick={handleModalClick} // Cierra el modal al hacer clic fuera de él
      >
        <h2 className="ComiteTitulo">Sustitucion de Vocales</h2>
        <div className="ContenedorVocales">
        {codComite !== null && <PermisoDeVocal codComite={codComiteActualizar} />}
        </div>
        <button
          className="BotonComiteModal"
          class="custom-btn btn-1"
          onClick={closeModal1}
        >
          Cerrar
        </button>
      </Modal>
      
      
      </>
  );
}

export default AsignacionPermiso;