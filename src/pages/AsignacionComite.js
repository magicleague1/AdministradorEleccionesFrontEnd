import React, { useEffect, useState } from "react";
import "../css/Comite.css";
import "bootstrap/dist/css/bootstrap.css";
import "styled-components";
import axios from "axios";
import Modal from "react-modal";
import ListaVocalesComite from "./ListaVocalesComite";
import Swal from 'sweetalert2';
import SustitucionDeVocal from "./SustitucionDeVocal ";



function AsignacionComite({ lista }) {
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
  
  const handleAsociarClick = (COD_ELECCION, COD_COMITE) => {
    // Antes de asociar el comité, verifica si existe  
    
    verificarExistenciaComite(COD_COMITE)
    .then((existeComite) => {
      if (!existeComite) {
        // Si el comité no existe, muestra un mensaje de error
        Swal.fire({
          icon: 'error',
          title: 'Asignacion incorrecta',
          text: 'Ya se asigno Vocales de comite electoral'
        });
        return;
      }

      // Si el comité existe, procede con la asignación
      console.log("El comité existe, procediendo con la asignación...");

      // Realizar una solicitud PUT para asociar el comité a la elección
      //para poblacion 
      axios
        .put(`http://localhost:8000/asignar-comite/${COD_ELECCION}`)
        .then((responseComite) => {
          console.log("Asignación de comité exitosa:", responseComite.data);

          // Luego, realizar una solicitud POST para asignar vocales al comité
          //para poblacion en aqui lee y divide en docentes y estudiante y usa la tabla
          //asociat titular suplente para guradar datos 
            axios
              .post(`http://localhost:8000/asignar-vocales/${COD_COMITE}`)
              .then((responseVocales) => {
                // Muestra una alerta de éxito
                Swal.fire({
                  icon: 'success',
                  title: 'Asignación exitosa',
                  text: 'La asignación del comité y vocales se realizó con éxito.'
                }).then(() => {
                  setCodComite(COD_COMITE);
                  setmodalAbrir(true);
                });
              })
              .catch((errorVocales) => {
                // Muestra una alerta de error
                Swal.fire({
                  icon: 'error',
                  title: 'Error en la asignación de vocales',
                  text: `Ocurrió un error en la asignación de vocales: ${errorVocales}`
                });
              });
          })
          .catch((errorComite) => {
            // Muestra una alerta de error
            Swal.fire({
              icon: 'error',
              title: 'Error en la asignación de comité',
              text: `Ocurrió un error en la asignación de comité: ${errorComite}`
            });
          });
        })
        .catch((error) => {
           
      }); 
      
  };

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
                  <button
                    className="botonComite1"
                    class="custom-btn btn-13"
                    onClick={() =>
                      handleAsociarClick(elemento.COD_ELECCION, elemento.COD_COMITE)
                    }
                  >
                    Asignacion
                  </button>{" "}
                  <button class="custom-btn btn-14" onClick={() => handleVerListaClick(elemento.COD_COMITE)}>Ver Lista</button>
                  <button class="custom-btn btn-14" onClick={() => handleActualizar(elemento.COD_COMITE)}>Actualizar</button>
              
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
      <SustitucionDeVocal codComite={codComiteActualizar} />
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

export default AsignacionComite;