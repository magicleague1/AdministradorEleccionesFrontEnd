import React from 'react';
import "../css/CreacionModal.css"

const Modal = ({ onClose, mensaje }) => {
  return (
    
     <div class="modal-content">
     <div class="modal-header">
       <div className="ContenedorTituloMo">
       <h5 class="modal-title">DESIGNACION CONFIRMADA</h5>
       </div>
       <button className="close-button" onClick={onClose}>
            X
          </button>
     </div>
     <div class="modal-body">
       <p className="LetraActualizacionConf">{mensaje}</p>
     </div>
     
   </div>
  );
};

export default Modal;