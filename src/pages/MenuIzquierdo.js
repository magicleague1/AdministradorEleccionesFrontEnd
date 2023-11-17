import React,{useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import "../css/MenuIzquierdo.css"
import Logo from '../assets/logo.png';
import CrearElecciones from './CrearElecciones';
import Inicio from './Inicio';
import VerElecciones from './VerElecciones';
import AsignacionComite from "./AsignacionComite";
import PartidosPoliticos from "./CrearPartidosPoliticos";
import VerPartidosPoliticos from "./VerPartidosPoliticos";
import AsignacionMesas from "./AsignacionMesas";
import VerConvocatoria from "./VerConvocatoria";


function MenuIzquierdo() {
    const [mostrarCrearEleccion, setMostrarCrearEleccion] = useState(false);
    const [mostrarInicio, setMostrarInicio] = useState(true);  // Mostrar Inicio por defecto
    const [mostrarVerElecciones, setMostrarVerElecciones] = useState(false);  // Estado para mostrar VerElecciones
    const [mostrarVerComite, setMostrarVerComite] = useState(false);
    const [mostrarCrearPartido, setMostrarCrearPartido] = useState(false);
    const [mostrarVerPartido, setMostrarVerPartido] = useState(false);
    const [mostrarAsignacion, setMostrarAsignacion] = useState(false);

    const [menuDesplegableCrearEleccion, setMenuDesplegableCrearEleccion] = useState(false);
    const [menuDesplegableCrearPartido, setMenuDesplegableCrearPartido] = useState(false);
    const [mostrarVerConvocatoria, setMostrarVerConvocatoria] = useState(false); 
    
    const handleCrearEleccionClick = () => {
      setMostrarCrearEleccion(true);
      setMostrarInicio(false);
      setMostrarVerElecciones(false);  // Oculta VerElecciones al hacer clic en Crear Elección
      setMostrarVerComite(false); 
      setMostrarCrearPartido(false);  
      setMostrarVerPartido(false); 
      setMostrarAsignacion(false);
      setMostrarVerConvocatoria(false)
    };

    const handleInicioClick = () => {
      setMostrarCrearEleccion(false);
      setMostrarInicio(true);
      setMostrarVerElecciones(false);  // Oculta VerElecciones al hacer clic en Inicio
      setMostrarVerComite(false);
      setMostrarCrearPartido(false);
      setMostrarVerPartido(false); 
      setMostrarAsignacion(false);
      setMostrarVerConvocatoria(false)
    };

    const handleVerEleccionesClick = () => {
      setMostrarCrearEleccion(false);
      setMostrarInicio(false);
      setMostrarVerElecciones(true);
      setMostrarVerComite(false);
      setMostrarCrearPartido(false);
      setMostrarVerPartido(false); 
      setMostrarAsignacion(false);
      setMostrarVerConvocatoria(false);
        // Muestra VerElecciones al hacer clic en Ver Elecciones Activas
    };
    const handleVerComiteClick = () => {
        setMostrarCrearEleccion(false);
        setMostrarInicio(false);
        setMostrarVerElecciones(false);
        setMostrarVerComite(true);
        setMostrarCrearPartido(false);
        setMostrarVerPartido(false); 
        setMostrarAsignacion(false);
        setMostrarVerConvocatoria(false);
          // Muestra VerElecciones al hacer clic en Ver Elecciones Activas
      };
      const handleCrearPartidoClick = () => {
        setMostrarCrearEleccion(false);
        setMostrarInicio(false);
        setMostrarVerElecciones(false);
        setMostrarVerComite(false);
        setMostrarCrearPartido(true);
        setMostrarVerPartido(false);
        setMostrarAsignacion(false); 
        setMostrarVerConvocatoria(false);
          // Muestra VerElecciones al hacer clic en Ver Elecciones Activas
      };
      const handleVerPartidoClick = () => {
        setMostrarCrearEleccion(false);
        setMostrarInicio(false);
        setMostrarVerElecciones(false);
        setMostrarVerComite(false);
        setMostrarCrearPartido(false);
        setMostrarVerPartido(true); 
        setMostrarVerConvocatoria(false);
        setMostrarAsignacion(false);
          // Muestra VerElecciones al hacer clic en Ver Elecciones Activas
      };
      const handleAsignarMesaClick = () => {
        setMostrarCrearEleccion(false);
        setMostrarInicio(false);
        setMostrarVerElecciones(false);
        setMostrarVerComite(false);
        setMostrarCrearPartido(false);
        setMostrarVerPartido(false);
        setMostrarVerConvocatoria(false);
        setMostrarAsignacion(true); 
          // Muestra VerElecciones al hacer clic en Ver Elecciones Activas
      };

      const handleVerConvocatoria = () => {
        setMostrarCrearEleccion(false);
        setMostrarInicio(false);
        setMostrarVerElecciones(false);
        setMostrarVerComite(false);
        setMostrarCrearPartido(false);
        setMostrarVerPartido(false); 
        setMostrarVerConvocatoria(true);
        setMostrarAsignacion(false);
          // Muestra VerElecciones al hacer clic en Ver Elecciones Activas
      };

      const toggleMenuDesplegable = (opcion) => {
        switch (opcion) {
          
          case 'Proceso Electoral':
            setMenuDesplegableCrearEleccion(!menuDesplegableCrearEleccion);
            break;
          case 'Partidos Politicos':
              setMenuDesplegableCrearPartido(!menuDesplegableCrearPartido);
              break;
          default:
            break;
        }
      };
    return(
        <div class="wrapper">
            <div class="sidebar">
                <div class="profile">
                    <img src={Logo} alt="profile_picture"/>
                    <h3>Administrador de elecciones  </h3>
                    <b> FCyT </b>

                </div>
                
                    <ul className='listaSidebar' >

                                        <li  className="row" id={ mostrarInicio ? "active" : ""}
                                        onClick=
                                            {handleInicioClick}
                                        >
                                            
                                                <span class="icon"><i class="fas fa-home"></i></span>
                                                <span class="item">Inicio</span>
                                                
                                        </li>
                                        <li className="row nav-link dropdown-toggle" onClick={() => toggleMenuDesplegable('Proceso Electoral')}>
                                      
                                            <span className="item">Proceso Electoral</span>
                                        </li>
                                        {menuDesplegableCrearEleccion && (
                                            <div className="submenu">
                                            
                                            <li  className="Ocultos" id={ mostrarCrearEleccion ? "active" : ""}
                                                   onClick={() => {
                                                    handleCrearEleccionClick();
                                                    toggleMenuDesplegable('Proceso Electoral');
                                                  }}

                                            >
                                            
                                                <span class="icon"><i class="fas fa-home"></i></span>
                                                <span class="item">Crear Proceso Electoral</span>
                                                
                                        </li>
                                        <li  className="Ocultos" id={ mostrarVerElecciones ? "active" : ""}
                                        onClick={() => {
                                            handleVerEleccionesClick();
                                            toggleMenuDesplegable('Proceso Electoral');
                                          }}
                                        >
                                            
                                                <span class="icon"><i class="fas fa-home"></i></span>
                                                <span class="item">Procesos Electorales Activos</span>
                                                
                                        </li>
                                            </div>
                                        )}
                                       
                                        <li  className="row" id={ mostrarVerComite ? "active" : ""}
                                        onClick=
                                            {handleVerComiteClick}
                                        >
                                            
                                                <span class="icon"><i class="fas fa-home"></i></span>
                                                <span class="item">Comite Electoral</span>
                                                
                                        </li>
                                        <li className= "row nav-link dropdown-toggle" onClick={() => toggleMenuDesplegable('Partidos Politicos')}>
                                            <span className="icon"><i className="fas fa-home"></i></span>
                                            <span className="item">Partidos Politicos</span>
                                        </li>
                                        {menuDesplegableCrearPartido && (
                                            <div className="submenu">
                                            
                                            <li  className="Ocultos" id={ mostrarCrearEleccion ? "active" : ""}
                                                   onClick={() => {
                                                    handleCrearPartidoClick();
                                                    toggleMenuDesplegable('Partidos Politicos');
                                                  }}

                                            >
                                            
                                                <span class="icon"><i class="fas fa-home"></i></span>
                                                <span class="item">Crear Partido Politico</span>
                                                
                                        </li>
                                       
                                        <li  className="Ocultos" id={ mostrarVerElecciones ? "active" : ""}
                                        onClick={() => {
                                            handleVerPartidoClick();
                                            toggleMenuDesplegable('Partidos Politicos');
                                          }}
                                        >
                                            
                                                <span class="icon"><i class="fas fa-home"></i></span>
                                                <span class="item">Frentes Politicos Activos</span>
                                                
                                        </li>
                                            </div>
                                        )}
                                         <li  className="row" id={ mostrarVerComite ? "active" : ""}
                                        onClick=
                                            {handleAsignarMesaClick}
                                        >
                                            
                                                <span class="icon"><i class="fas fa-home"></i></span>
                                                <span class="item">Asignacion de Mesas</span>
                                                
                                        </li>
                                        <li  className="row" id={ mostrarVerConvocatoria ? "active" : ""}
                                        onClick=
                                            {handleVerConvocatoria}
                                        >
                                            
                                                <span class="icon"><i class="fas fa-home"></i></span>
                                                <span class="item">Crear Convocatoria</span>
                                                
                                        </li>
                                    
                        
                    </ul>
                
                
            </div>
            <div className="SegundoDivMenu">
                    {mostrarCrearEleccion && <CrearElecciones />}
                    {mostrarInicio && <Inicio />}
                    {mostrarVerElecciones && <VerElecciones lista = {mostrarVerElecciones}/>} 
                    {mostrarVerComite && <AsignacionComite/>}
                    {mostrarCrearPartido && <PartidosPoliticos/>}
                    {mostrarVerPartido && <VerPartidosPoliticos/>}
                    {mostrarAsignacion && <AsignacionMesas/>}
                    
                    {mostrarVerConvocatoria && <VerConvocatoria lista = {mostrarVerConvocatoria}/>} 
                    
            </div>
        
        </div>
         
        

    );
}

export default MenuIzquierdo;    