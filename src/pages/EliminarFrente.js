import Modal from "react-modal";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../css/EliminacionFrente.css"
import Swal from 'sweetalert2';
Modal.setAppElement("#root");

const EliminarFrenteModal = ({ isOpen, closeModal, frenteId }) => {
  const { id } = useParams();
  

  const url = "http://localhost:8000/";
  
  const handleEliminarClick = () => {
  
    axios
      .delete(url + `frentes/${frenteId}`)
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: 'Frente politico eliminado',
          text: `El frente politico se ha eliminado correctamente!`
        }).then(() => {
          handleVolverAtras();
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error de eliminacion frente politico',
          text: `Ocurrió un error al eliminar el frente politico`
        });
      });
  };

  const handleVolverAtras = () => {
    closeModal();
  };

  
  return (
    <>
     <Modal
      className={"Cuerpo2"}
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Actualizar Elección"
    >
      <div className="Titulopolitico">
      <h3 className="ActualizarTituloEliminar">ELIMINACION DE FRENTE POLITICO</h3>
      </div>
      
      <div className="form-group">
        <label className="LabelCrearEliminar">¿Deseas eliminar el frente politivo ?</label>
      </div>
      <div className="d-flex align-items-center justify-content-center">
      <button className ="custom-btn btn-17 d-flex align-items-center justify-content-center" onClick={handleEliminarClick}>
        Eliminar
      </button>
      <button className ="custom-btn btn-18 d-flex align-items-center justify-content-center" onClick={handleVolverAtras}>
        Cancelar
      </button>
      </div>
    </Modal>
    </>
   
  );
};

export default EliminarFrenteModal;