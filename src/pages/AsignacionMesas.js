import React, { useEffect, useState } from "react";
import "../css/Comite.css";
import "../css/AsignacionMesas.css"
import "bootstrap/dist/css/bootstrap.css";
import "styled-components";
import axios from "axios";
import Modal from "react-modal";
import ListaMesas from "./ListadeMesas";
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faFile } from '@fortawesome/free-solid-svg-icons';

function AsignacionMesas({ lista }) {
  const [proceso, setproceso] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalAbrir, setmodalAbrir] = useState(false);
  const [codComite, setCodComite] = useState(null);
  const url = "http://localhost:8000/";
  useEffect(() => {
    axios.get(url + "elecciones_index").then(response => {
      setproceso(response.data)
    })
  }, [lista]);


  // Función para verificar la existencia del comité
  const verificarExistenciaComite = async (codComite) => {
    try {
      // Realiza una solicitud GET al servidor de Laravel para verificar la existencia del comité
      const response = await axios.get(`http://localhost:8000/verificar-comite/${codComite}`);
  
      // La respuesta debe ser un objeto JSON con el campo "existeComite"
      if (response.data.existeComite) {
        // Si el comité existe, devuelve false
        console.log("El comité existe");
        return false;
      } else {
        // Si el comité no existe, devuelve true
        console.log("El comité no existe");
        return true;
      }
    } catch (error) {
      console.error("Error al verificar la existencia del comité:", error);
      // En caso de error, puedes manejarlo adecuadamente, como lanzar una excepción o manejarlo según tus necesidades.
      // En este ejemplo, lo he dejado como un error en la consola.
      return false; // O devolver false en caso de error si lo prefieres
    }
  };
  
  const handleAsociarClick = (COD_ELECCION) => {
    // Antes de asociar el comité, verifica si existe  
    
    // verificarExistenciaComite(COD_COMITE)
    // .then((existeComite) => {
    //   if (!existeComite) {
    //     // Si el comité no existe, muestra un mensaje de error
    //     Swal.fire({
    //       icon: 'error',
    //       title: 'Asignacion incorrecta',
    //       text: 'Ya se asigno mesas al proceso electoral'
    //     });
    //     return;
    //   }

    //   // Realizar una solicitud PUT para asociar el comité a la elección
    //   axios
    //     .put(`http://localhost:8000/asignar-comite/${COD_ELECCION}`)
    //     .then((responseComite) => {
    //       console.log("Asignación de comité exitosa:", responseComite.data);

          // Luego, realizar una solicitud POST para asignar vocales al comité
        
         
          axios.post(`${url}asignar_mesas_carrera/${COD_ELECCION}`)
              .then((responseVocales) => {
                // Muestra una alerta de éxito
                Swal.fire({
                  icon: 'success',
                  title: 'Asignación exitosa',
                  text: 'La asignación de mesas se realizó con éxito.'
                }).then(() => {
                  setmodalAbrir(true);
                });
              })
              .catch((errorVocales) => {
                // Muestra una alerta de error
                Swal.fire({
                  icon: 'error',
                  title: 'Error en la asignación de mesas',
                  text: `Ocurrió un error en la asignación de mesas: ${errorVocales}`
                });
              });
  
      //     .catch((errorComite) => {
      //       // Muestra una alerta de error
      //       Swal.fire({
      //         icon: 'error',
      //         title: 'Error en la asignación de mesas',
      //         text: `Ocurrió un error en la asignación de mesas: ${errorComite}`
      //       });
      //     });
      //   })
      //   .catch((error) => {
           
      // }); 
      
    };

  const handleVerListaClick = () => {
    // Aquí puedes realizar una acción para ver la lista de titulares y suplentes
    // Puedes abrir un modal o redirigir a una página para ver la lista

    setModalIsOpen(true);
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
      <h1 className="titleC"> ASIGNACION DE MESAS</h1>
      <div className="ContenedorTablaMesa">
        <table className="TablaAsignacion">
          <thead >
            <tr>
              <th> ID </th>
              <th> PROCESO </th>
              <th> MESAS </th>
            </tr>
          </thead>
          <tbody >
            {proceso.map((elemento) => (
              <tr className="trVerComite" key={elemento.COD_ELECCION}>
                <td className="especialtdAsignacionM">{elemento.COD_ELECCION}</td>
                <td  className="tdNormalAsignacion">{elemento.MOTIVO_ELECCION}</td>
                <td className="tdNormalBotonM" >
                <div className="d-flex">
                <button
                    className="custom-btn btn-19 btn-19 d-flex align-items-center justify-content-center"
                    onClick={() =>
                    handleAsociarClick(elemento.COD_ELECCION)
                    }
                >
                    <div className="round-icon">
                         <FontAwesomeIcon icon={faPlus} className="plus-icon" /> {/* Ícono de "más" */}
                    </div>
                </button>{" "}
                <button class="custom-btn btn-20 d-flex align-items-center justify-content-center" onClick={() => handleVerListaClick()}>
                  <FontAwesomeIcon icon={faFile} className="add-icon" />
                </button>
                </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Lista Comite"
        className={"CuerpoComite"}
        onClick={handleModalClick} // Cierra el modal al hacer clic fuera de él
      >
        <h2 className="ComiteTitulo">Lista de Asignacion de Mesas</h2>
        <div className="ContenedorVocales">
        { <ListaMesas />}
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

export default AsignacionMesas;