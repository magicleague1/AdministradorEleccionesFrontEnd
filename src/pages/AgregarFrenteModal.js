import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "../css/AgregarFrenteModal.css";
import axios from "axios";
Modal.setAppElement("#root");


const AgregarFrenteModal = ({ isOpen, closeModal, eleccionId }) => {
  console.log(eleccionId)
  const [listaFrentesP, setListaFrentesP] = useState([]); // Lista de Frentes Politicos, esto debe proporcionarlo el backend

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/obtener_frentes_por_eleccion/${eleccionId}`);
        setListaFrentesP(response.data.frentes);
      } catch (error) {
        console.log('Error al obtener los frentes');
      }
    };

    fetchData();
  }, [eleccionId]);
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
            {listaFrentesP.map((frente) => (
              <li className="titulofrente" >
                {frente.NOMBRE_FRENTE} 
              </li>
            ))}
            <br/>
        <button className ="custom-btn botonvfrente" onClick={()=> toogle()}>
          Cerrar
        </button>
    </Modal>
  );
}
export default AgregarFrenteModal;



