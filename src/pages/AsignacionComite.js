import React, { useEffect, useState } from "react";
import "../css/Comite.css";
import "bootstrap/dist/css/bootstrap.css";
import "styled-components";
import axios from "axios";
import Modal from "react-modal";
import ListaVocalesComite from "./ListaVocalesComite";
import Swal from 'sweetalert2';

function AsignacionComite({ lista }) {
  const [proceso, setproceso] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalAbrir, setmodalAbrir] = useState(false);
  const [codComite, setCodComite] = useState(null);
  const [existeComite, setExisteComite] = useState(false); // Estado para verificar la existencia del comité
  const url = "http://localhost:8000/";
  useEffect(() => {
    axios.get(url + "elecciones_index").then(response => {
      setproceso(response.data)
    })
  }, [lista]);


  // Función para verificar la existencia del comité
  const verificarExistenciaComite = (codComite) => {
    // Realiza una solicitud GET al servidor de Laravel para verificar la existencia del comité
    axios
      .get(`http://localhost:8000/verificar-comite/${codComite}`)
      .then((response) => {
        
        // La respuesta debe ser un objeto JSON con el campo "existeComite"
        if (response.data.existeComite) {
          // Si el comité no existe, establece setExisteComite en true
          setExisteComite(true);
          console.log("El comité no existe");
        } else {
          // Si el comité existe, puedes realizar otras acciones aquí
          setExisteComite(false);
          console.log("El comité existe");
        }
      })
      .catch((error) => {
        console.error("Error al verificar la existencia del comité:", error);
      });
  };

  
  const handleAsociarClick = (COD_ELECCION, COD_COMITE) => {
    // Antes de asociar el comité, verifica si existe
    verificarExistenciaComite(COD_COMITE);

    
  
    // Realiza la asignación solo si el comité existe
    if (!existeComite) {
      console.log(!existeComite)
      //elecciones/asignar_comite/  AQUI CAMBIAR RUTA----------------ruta asi cambiar
      // Realizar una solicitud PUT para asociar el comité a la elección
      axios
        .put(`http://localhost:8000/asignar-comite/${COD_ELECCION}`)
        .then((responseComite) => {
          console.log("Asignación de comité exitosa:", responseComite.data);

          // Luego, realizar una solicitud POST para asignar vocales al comité
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
    } else {
      Swal.fire({
        icon: 'error',
        title: 'No se puede asignar el comité',
        text: 'El comité no existe, no se puede realizar la asignación.'
      });
    }
  };

  const handleVerListaClick = (eleccionId) => {
    // Aquí puedes realizar una acción para ver la lista de titulares y suplentes
    // Puedes abrir un modal o redirigir a una página para ver la lista
    setCodComite(eleccionId);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const cerrarModal = () => {
    setmodalAbrir(false);
  };
  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
    <div className="divComite">
      <h1 className="titleC"> COMITE ELECTORAL</h1>
      <div className="ContenedorTabla">
        <table className="TablaComite">
          <thead >
            <tr>
              <th> ID </th>
              <th> NAME </th>
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
                    Asignar
                  </button>{" "}
                  <button class="custom-btn btn-14" onClick={() => handleVerListaClick(elemento.COD_COMITE)}>Ver Lista</button>
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