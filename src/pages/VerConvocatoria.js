import React, { useEffect, useState } from "react";
import "../css/MenuVertical.css";
import "../css/botones2.css";
import "../css/iconos.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import ActualizarEleccionModal from "../pages/ActualizarEleccionModal";
import PdfConvocatoria from "./pdfConvocatoria";
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined'; //importa el icono de user-plus icono
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined'; //importar el icono de list
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined'; //importar icono editar
import AgregarFrenteModal from './AgregarFrenteModal.js'; //importar el modal Agregar frente 
import AsignarFrente from "./AsignarFrente";
import EdicionAsigFrentes from "./EdicionAsigFrentes"
import ConvocatoriaCrear from "./ConvocatoriaCrear.js";
import ConvocatoriaModificar from "./ConvocatoriaModificar.js";
import GenerarPdfPreview from "./GenerarPdfPreview.js";
import { fa0 } from "@fortawesome/free-solid-svg-icons";


const VerConvocatoria = ({ lista }) => {
  //const numRows = 4; // Número de filas
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false); // Nuevo estado para controlar el modal
  const [modalConvo, setModalConvo] = useState(false);
  const [selectedEleccionId, setSelectedEleccionId] = useState(null); // Nuevo estado para almacenar el ID de la elección seleccionada
  const url = process.env.REACT_APP_VARURL;

  const [modalAddFP, setModalADDFP] = useState(false); // Nuevo estado para controlar el modal agregar frentes politicos a elecciones activas
  const [modalAFP, setModalAFP] = useState(false);
  const [modalEAFP, setModalEAFP] = useState(false);
  const [listaElecciones,setListaElecciones] = useState([])


  const [mostrarCrearConvocatoria, setMostrarCrearConvocatoria] = useState(false);

  const [mostrarModificarConvocatoria, setModificarMostrarCrearConvocatoria] = useState(false);
  const [eleccionMId, setEleccionMId] = useState(0);
const [mostrarListaElecciones, setMostrarListaElecciones] = useState(true);
const [mostrarPdfConvocatoria, setMostrarPdfConvocatoria] = useState(false);



  //controladores del modal frentes de elecciones activas
  const openModalADDFP = (id) =>{
    setSelectedEleccionId(id);
      setModalADDFP(true);
  };
  const closeModalADDFP = () =>{
      setModalADDFP(false);
  };

  const openModalAFP = (id) =>{
    setSelectedEleccionId(id);
    setModalAFP(true);
};
const closeModalAFP = () =>{
    setModalAFP(false);
};

const openModalEAFP = () =>{
  setModalEAFP(true);
};
const closeModalEAFP = () =>{
  setModalEAFP(false);
};
  useEffect(() => {
    axios.get(url + "elecciones_index").then(response => {
      setListaElecciones(response.data)
    })
  }, [lista]);
  const handleDetallesClick = (id) => {
    // Al hacer clic en "Detalles de la Elección," establece el ID de la elección seleccionada y abre el modal.
    setSelectedEleccionId(id);
    console.log(id);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    // Cierra el modal y restablece el ID de la elección seleccionada.
    setModalIsOpen(false);
    setSelectedEleccionId(null);
  };
  const closeModal1 = () => {
    // Cierra el modal y restablece el ID de la elección seleccionada.
    setModalConvo(false);
    setSelectedEleccionId(null);
  };

 // const handleConvocatoriaClick = (id) => {
    // Redireccionar o realizar alguna acción al hacer clic en "Convocatoria"
    // Puedes usar react-router-dom o alguna otra biblioteca de enrutamiento si es necesario
    //setSelectedEleccionId(id);
   // console.log(id);
   // setModalConvo(true);
 // };
//convocatoria

const handleConvocatoriaClick = async (id) => {
  try {
    // Hacer una petición al backend para obtener la información de la convocatoria
    const response = await axios.get(`${process.env.REACT_APP_VARURL}verificar_convocatoria/${id}`);
    const convocatoria = response.data;

    console.log('------->',convocatoria);
    if (convocatoria==true) {
      // Ya existe una convocatoria, muestra un mensaje o realiza alguna acción
      alert('Ya has creado una convocatoria para esta elección.');
    } else {
      // No existe una convocatoria, puedes proceder a mostrar el formulario de creación
      setSelectedEleccionId(id);
      setMostrarCrearConvocatoria(true);
      setModificarMostrarCrearConvocatoria(false);
      setMostrarListaElecciones(false);
    }
  } catch (error) {
    console.error('Error al obtener la información de la convocatoria', error);
    // Maneja el error según tus necesidades
  }
};

  
  const handleConvocatoriaModificarClick = (id) => {
    // Redireccionar o realizar alguna acción al hacer clic en "Convocatoria"
    // Puedes usar react-router-dom o alguna otra biblioteca de enrutamiento si es necesario
    //setSelectedEleccionId(id);
    //console.log(id);
    //setModalConvo(true);
    setEleccionMId(id); // Establecer el ID para pasarlo al componente ConvocatoriaCrear
    setModificarMostrarCrearConvocatoria(true);
    setMostrarCrearConvocatoria(false);
    setMostrarListaElecciones(false);
  };

  const handleConvocatoriaVerClick = (id) => {
    // Redireccionar o realizar alguna acción al hacer clic en "Convocatoria"
    // Puedes usar react-router-dom o alguna otra biblioteca de enrutamiento si es necesario
    //setSelectedEleccionId(id);
    //console.log(id);
    //setModalConvo(true);
    //setEleccionPDFId(id);

    setSelectedEleccionId(id);
    setModificarMostrarCrearConvocatoria(false);
    setMostrarCrearConvocatoria(false);
    setMostrarListaElecciones(false);
    setMostrarPdfConvocatoria(true);
    //navigate(`/pdf/${id}`);
 
  };


  const handleAtrasClick = () => {
   
    setMostrarCrearConvocatoria(false);
    setModificarMostrarCrearConvocatoria(false);
    setMostrarListaElecciones(true);
    setMostrarPdfConvocatoria(false);
  };


  return (
    <>
    <div className="ver-elecciones">
      <h3>ELECCIONES ACTIVAS</h3>
      <div className="ContenedorTabla" style={{ display: mostrarListaElecciones ? 'block' : 'none' }}>
    <table>
      <thead>
        <tr>
          <th>CARGO(S) A ELECCION</th>
          <th>FECHA</th>
          <th>DETALLE</th>
          <th>CONVOCATORIA</th>
      
        </tr>
      </thead>
      <tbody>
        { listaElecciones.length > 0 &&
        listaElecciones.map((eleccion) => {
          return(
            <tr className="trVerEleccion" key={eleccion.COD_ELECCION}>
                <td className="especialtd">{eleccion.MOTIVO_ELECCION}</td>
                <td className="tdNormal">{eleccion.FECHA_ELECCION}</td>
                <td className="tdNormal">
                      <button className ="custom-btn btn-4" onClick={() => handleDetallesClick(eleccion.COD_ELECCION)}>
                             Detalles de la Elección
                      </button>
                
                </td>

                <td className="tdNormal">
                      <button className="custom-btn btn-18" onClick={() => handleConvocatoriaClick(eleccion.COD_ELECCION)}>
                            crear
                      </button>
                      <button className="custom-btn btn-18" onClick={() => handleConvocatoriaModificarClick(eleccion.COD_ELECCION)}>
                            modificar
                      </button>
                      <button className="custom-btn btn-18" onClick={() => handleConvocatoriaVerClick(eleccion.COD_ELECCION)}>
                            ver
                      </button>
                </td>
                
            
           </tr>
          )
          
        })}
        
      </tbody>
    </table>

   

   
    </div>
    
   

    <div className="SegundoDivMenu" style={{ display: mostrarCrearConvocatoria ? 'block' : 'none' }}>
    {mostrarCrearConvocatoria && (
        <ConvocatoriaCrear eleccionId={selectedEleccionId} />

      )}
      <button onClick={handleAtrasClick}>Atrás</button>

</div>

<div className="SegundoDivMenu" style={{ display: mostrarModificarConvocatoria ? 'block' : 'none' }}>
    

{mostrarModificarConvocatoria && (
        <ConvocatoriaModificar eleccionId={eleccionMId} />
      )}
   <button onClick={handleAtrasClick}>Atrás</button>

    </div>

    <div className="SegundoDivMenu" style={{ display: mostrarPdfConvocatoria ? 'block' : 'none' }}>
      {mostrarPdfConvocatoria && (
          <GenerarPdfPreview eleccionId={selectedEleccionId} />
        
      )}
      <button onClick={handleAtrasClick}>Atrás</button>
    </div>
    </div>
    <ActualizarEleccionModal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        eleccionId={selectedEleccionId} // Pasa el ID seleccionado al modal
      />
      <PdfConvocatoria
          isOpen={modalConvo}
          closeModal={closeModal1}
          eleccionId={selectedEleccionId}
      />
      <AgregarFrenteModal
        isOpen={modalAddFP}
        closeModal={closeModalADDFP}
        eleccionId={selectedEleccionId}
      />
       <AsignarFrente
        isOpen={modalAFP}
        closeModal={closeModalAFP}
        eleccionId={selectedEleccionId}
      />
       <EdicionAsigFrentes
        isOpen={modalEAFP}
        closeModal={closeModalEAFP}
      />
    </>
    
  );
};

export default VerConvocatoria;
