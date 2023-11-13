import React, { useEffect, useState } from "react";
import "../css/Comite.css";
import "../css/AsignacionMesas.css"
import "bootstrap/dist/css/bootstrap.css";
import "styled-components";
import axios from "axios";
import Modal from "react-modal";
import ListaMesas from "./ListadeMesas";
import Swal from 'sweetalert2';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';


function AsignacionMesas({ lista }) {
  const [proceso, setproceso] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalAbrir, setmodalAbrir] = useState(false);
  const [asignacionRealizada, setAsignacionRealizada] = useState({});

  const url = "http://localhost:8000/";
  useEffect(() => {
    axios.get(url + "elecciones_index").then(response => {
      setproceso(response.data)
      setAsignacionRealizada({});
    })
  }, [lista]);
  
  const handleAsociarClick = (COD_ELECCION) => {
    // Antes de asociar el comité, verifica si ya se ha asignado
    if (asignacionRealizada[COD_ELECCION]) {
      Swal.fire({
        icon: 'error',
        title: 'Asignación incorrecta',
        text: 'Ya se asignaron mesas para este proceso electoral.'
      });
      return;
    }

    // Realizar la asignación de mesas
    axios.post(`${url}asignar_mesas_carrera/${COD_ELECCION}`)
      .then(() => {
        // Actualizar el estado para indicar que se ha realizado la asignación
        setAsignacionRealizada(prevState => ({
          ...prevState,
          [COD_ELECCION]: true
        }));

        // Muestra una alerta de éxito
        Swal.fire({
          icon: 'success',
          title: 'Asignación exitosa',
          text: 'La asignación de mesas se realizó con éxito.'
        }).then(() => {
          setmodalAbrir(true);
        });
      })
      .catch((error) => {
        // Muestra una alerta de error
        Swal.fire({
          icon: 'error',
          title: 'Error en la asignación de mesas',
          text: `Ocurrió un error en la asignación de mesas: ${error}`
        });
      });
  };

  const handleVerListaClick = () => {
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
                <div className="centrar-contenedor">
                      <div className="d-flex">
                        <button
                          className="icono"
                          onClick={() => handleAsociarClick(elemento.COD_ELECCION)}
                          disabled={asignacionRealizada[elemento.COD_ELECCION]}
                        >
                          <AddCircleOutlineIcon fontSize="large" />
                        </button>

                        <button
                          className="icono"
                          onClick={() => handleVerListaClick()}
                        >
                          <InsertDriveFileIcon fontSize="large" />
                        </button>
                      </div>
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