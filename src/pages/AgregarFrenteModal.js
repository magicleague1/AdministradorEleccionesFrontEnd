import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "../css/AgregarFrenteModal.css";
Modal.setAppElement("#root");


const AgregarFrenteModal = ({ isOpen, closeModal }) => {
  const [listaFrentesP, setListaFrentesP] = useState(["NOMBRE 1","NOMBRE 2","NOMBRE 3","NOMBRE 4","NOMBRE 5","NOMBRE 6","NOMBRE 7","NOMBRE 8","NOMBRE 9"]); // Lista de Frentes Politicos, esto debe proporcionarlo el backend
  const toogle =()=>{
    closeModal();
  }
  return (
    <Modal
      className={"modalFrente"}
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Frentes politicos"
      shouldCloseOnOverlayClick={true}
    >
        <h3 className="tituloPfrente">FRENTES POLÍTICOS</h3>
            {listaFrentesP.map((frente, index) => (
              <li className="titulofrente" key={index}>{frente}</li>
            ))}
            <br/>
        <button className ="custom-btn botonvfrente" onClick={()=> toogle()}>
          Volver
        </button>
    </Modal>
  );
}
export default AgregarFrenteModal;



