import React, { useEffect, useState } from "react";
import "../css/MenuVertical.css";
import "../css/botones2.css";
import "../css/iconos.css";
import axios from "axios";
import ConvocatoriaCrear from "./ConvocatoriaCrear.js";
import ConvocatoriaModificar from "./ConvocatoriaModificar.js";
import GenerarPdfPreview from "./GenerarPdfPreview.js";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const VerConvocatoria = ({ lista }) => {
  //const numRows = 4; // Número de filas
 
const [selectedEleccionId, setSelectedEleccionId] = useState(null); // Nuevo estado para almacenar el ID de la elección seleccionada
const url = process.env.REACT_APP_VARURL;
const [listaElecciones,setListaElecciones] = useState([])
const [isVisible, setIsVisible] = useState(false);
const [mostrarCrearConvocatoria, setMostrarCrearConvocatoria] = useState(false);
const [mostrarModificarConvocatoria, setModificarMostrarCrearConvocatoria] = useState(false);
const [eleccionMId, setEleccionMId] = useState(0);
const [mostrarListaElecciones, setMostrarListaElecciones] = useState(true);
const [mostrarPdfConvocatoria, setMostrarPdfConvocatoria] = useState(false);


  useEffect(() => {
    axios.get(url + "elecciones_index").then(response => {
      setListaElecciones(response.data)
    })
  }, [lista]);
  

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
    setEleccionMId(id); // Establecer el ID para pasarlo al componente ConvocatoriaCrear
    setModificarMostrarCrearConvocatoria(true);
    setMostrarCrearConvocatoria(false);
    setMostrarListaElecciones(false);
  };

  const handleConvocatoriaVerClick = (id) => {
  
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
    setIsVisible(false);
  };

  const handleMostrarAtrasClick = () => {
    // Cambiar el estado para hacer visible el botón
    setIsVisible(true);
  };
  return (
    <>
    <div className="ver-elecciones">
     
      {isVisible &&  <button className="icono" onClick={handleAtrasClick}>
          <ArrowBackIcon fontSize="large" />
        </button>}{ ""}
      <h3>CONVOCATORIAS</h3>
   
      <div className="ContenedorTabla" style={{ display: mostrarListaElecciones ? 'block' : 'none' }}>
    <table>
      <thead>
        <tr>
          <th>CARGO(S) A ELECCION</th>
          <th>FECHA</th>
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
                      <button className="icono" onClick={() => {
                                                  handleConvocatoriaClick(eleccion.COD_ELECCION);
                                                  handleMostrarAtrasClick();
                                                }}
                      >
                                            <AddCircleIcon fontSize="large" />
                      </button>
                      <button className="icono" onClick={() => {handleConvocatoriaModificarClick(eleccion.COD_ELECCION);
                                                                handleMostrarAtrasClick();}}>
                      <EditIcon fontSize="large" />
                      </button>
                      <button className="icono" onClick={() => {handleConvocatoriaVerClick(eleccion.COD_ELECCION);
                                                                handleMostrarAtrasClick();}}>
                      <VisibilityIcon fontSize="large" />
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
        <><ConvocatoriaCrear eleccionId={selectedEleccionId} />    
        </>
      )}
      
       </div>
    

<div className="SegundoDivMenu" style={{ display: mostrarModificarConvocatoria ? 'block' : 'none' }}>
    

{mostrarModificarConvocatoria && (
        <ConvocatoriaModificar eleccionId={eleccionMId} />
      )}
    </div>

    <div className="SegundoDivMenu" style={{ display: mostrarPdfConvocatoria ? 'block' : 'none' }}>
      {mostrarPdfConvocatoria && (
          <GenerarPdfPreview eleccionId={selectedEleccionId} />
        
      )}
    </div>
    </div>
    
    </>
    
  );
};

export default VerConvocatoria;
