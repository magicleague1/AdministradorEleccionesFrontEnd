import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import "../css/MenuIzquierdo.css";
import Logo from '../assets/logo.png';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import CreateIcon from "@mui/icons-material/Create";
import BallotIcon from "@mui/icons-material/Ballot";
import PeopleIcon from "@mui/icons-material/People";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import GroupIcon from "@mui/icons-material/Group";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import CrearElecciones from './CrearElecciones';
import Inicio from './Inicio';
import VerElecciones from './VerElecciones';
import AsignacionComite from "./AsignacionComite";
import VerPartidosPoliticos from "./VerPartidosPoliticos";
import AsignacionMesas from "./AsignacionMesas";
import VerConvocatoria from "./VerConvocatoria";
import AsignacionPermisosC from "./AsignacionPermiso";
import VerBoletasElectorales from "./VerBoletasElectorales";
import JuradoElectorales from "./JuradosElectorales";

function MenuIzquierdo() {
  const [openProcesoElectoral, setOpenProcesoElectoral] = useState(false);
  const [openComiteElectoral, setOpenComiteElectoral] = useState(false);
  const [mostrarCrearEleccion, setMostrarCrearEleccion] = useState(false);
  const [mostrarInicio, setMostrarInicio] = useState(true);
  const [mostrarVerElecciones, setMostrarVerElecciones] = useState(false);
  const [mostrarVerComite, setMostrarVerComite] = useState(false);
  const [mostrarVerPartido, setMostrarVerPartido] = useState(false);
  const [mostrarAsignacion, setMostrarAsignacion] = useState(false);
  const [mostrarVerConvocatoria, setMostrarVerConvocatoria] = useState(false);
  const [mostrarAsignacionP, setMostrarAsignacionP] = useState(false);
  const [mostrarBoletas, setMostrarBoletas] = useState(false);
  const[mostrarJurados, setJurados]=useState(false);

  const handleDrawerItemClick = (item) => {
    switch (item) {
      case "Inicio":
        handleInicioClick();
        break;
      case "Proceso Electoral":
        setOpenProcesoElectoral(!openProcesoElectoral);
        break;
      case "Comite Electoral":
        setOpenComiteElectoral(!openComiteElectoral);
        break;
      case "Partidos Politicos":
        handleVerPartidoClick();
        break;
      case "Asignacion de Mesas":
        handleAsignarMesaClick();
        break;
      case "Crear Convocatoria":
        handleVerConvocatoria();
        break;
      case "Boleta Electorales":
        handleVerConvocatoria();
        break;
        case "Jurados Electorales":
          handleJuradosE();
          break;
      default:
        break;
  

    }
  };

  const handleInicioClick = () => {
    setMostrarCrearEleccion(false);
    setMostrarInicio(true);
    setMostrarVerElecciones(false);
    setMostrarVerComite(false);
    setMostrarVerPartido(false);
    setMostrarAsignacion(false);
    setMostrarVerConvocatoria(false);
    setMostrarAsignacionP(false);
    setMostrarBoletas(false);
    setJurados(false);
  };

  const handleDrawerItemSubClick = (subItem) => {
    switch (subItem) {
      case "Crear Proceso Electoral":
        handleCrearEleccionClick();
        break;
      case "Procesos Electorales Activos":
        handleVerEleccionesClick();
        break;
      case "Lista de Comite Electoral":
        handleVerComiteClick();
        break;
      case "Asignacion de Permisos":
        handleAsignarPermisos();
        break;
      
      default:
        break;
    }
  };

  const handleCrearEleccionClick = () => {
    setMostrarCrearEleccion(true);
    setMostrarInicio(false);
    setMostrarVerElecciones(false);
    setMostrarVerComite(false);
    setMostrarVerPartido(false);
    setMostrarAsignacion(false);
    setMostrarVerConvocatoria(false);
    setMostrarAsignacionP(false);
    setMostrarBoletas(false);
    setJurados(false);
  };

  const handleVerEleccionesClick = () => {
    setMostrarCrearEleccion(false);
    setMostrarInicio(false);
    setMostrarVerElecciones(true);
    setMostrarVerComite(false);
    setMostrarVerPartido(false);
    setMostrarAsignacion(false);
    setMostrarVerConvocatoria(false);
    setMostrarAsignacionP(false);
    setMostrarBoletas(false);
    setJurados(false);
  };

  const handleVerComiteClick = () => {
    setMostrarCrearEleccion(false);
    setMostrarInicio(false);
    setMostrarVerElecciones(false);
    setMostrarVerComite(true);
    setMostrarVerPartido(false);
    setMostrarAsignacion(false);
    setMostrarVerConvocatoria(false);
    setMostrarAsignacionP(false);
    setMostrarBoletas(false);
    setJurados(false);
  };


  const handleVerPartidoClick = () => {
    setMostrarCrearEleccion(false);
    setMostrarInicio(false);
    setMostrarVerElecciones(false);
    setMostrarVerComite(false);
    setMostrarVerPartido(true);
    setMostrarAsignacion(false);
    setMostrarVerConvocatoria(false);
    setMostrarAsignacionP(false);
    setMostrarBoletas(false);
    setJurados(false);
  };

  const handleAsignarMesaClick = () => {
    setMostrarCrearEleccion(false);
    setMostrarInicio(false);
    setMostrarVerElecciones(false);
    setMostrarVerComite(false);
    setMostrarVerPartido(false);
    setMostrarVerConvocatoria(false);
    setMostrarAsignacion(true);
    setMostrarAsignacionP(false);
    setMostrarBoletas(false);
    setJurados(false);
  };

  const handleVerConvocatoria = () => {
    setMostrarCrearEleccion(false);
    setMostrarInicio(false);
    setMostrarVerElecciones(false);
    setMostrarVerComite(false);
    setMostrarVerPartido(false);
    setMostrarVerConvocatoria(true);
    setMostrarAsignacion(false);
    setMostrarAsignacionP(false);
    setMostrarBoletas(false);
    setJurados(false);
  };

  const handleAsignarPermisos = () => {
    setMostrarCrearEleccion(false);
    setMostrarInicio(false);
    setMostrarVerElecciones(false);
    setMostrarVerComite(false);
    setMostrarVerPartido(false);
    setMostrarVerConvocatoria(false);
    setMostrarAsignacion(false);
    setMostrarAsignacionP(true);
    setMostrarBoletas(false);
    setJurados(false);
  };

  const handleBoletasElectorales = () => {
    setMostrarCrearEleccion(false);
    setMostrarInicio(false);
    setMostrarVerElecciones(false);
    setMostrarVerComite(false);
    setMostrarVerPartido(false);
    setMostrarVerConvocatoria(false);
    setMostrarAsignacion(false);
    setMostrarAsignacionP(false);
    setMostrarBoletas(true);
    setJurados(false);
  };
  const handleJuradosE = () => {
    setMostrarCrearEleccion(false);
    setMostrarInicio(false);
    setMostrarVerElecciones(false);
    setMostrarVerComite(false);
    setMostrarVerPartido(false);
    setMostrarVerConvocatoria(false);
    setMostrarAsignacion(false);
    setMostrarAsignacionP(false);
    setMostrarBoletas(false);
    setJurados(true);
  };

  return (
    <div style={{ display: 'flex' }}>
    <Drawer variant="permanent" style={{ width: '320px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px' }}>
        <img src={Logo} alt="profile_picture" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
        <h3 style={{ color: 'black', fontSize: '22px', marginTop: '8px' }}>Administrador de elecciones </h3>
        <b style={{ color: 'black', marginTop: '4px', fontSize: '22px' }}> UMSS </b>
      </div>
      <List>
        <ListItem button onClick={() => handleDrawerItemClick("Inicio")} style={{ backgroundColor: mostrarInicio ? 'lightgray' : 'inherit' }}>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Inicio" />
          </ListItem>
          <ListItem button onClick={() => handleDrawerItemClick("Proceso Electoral")}>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Proceso Electoral" />
            {openProcesoElectoral ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openProcesoElectoral} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button onClick={() => handleDrawerItemSubClick("Crear Proceso Electoral")} style={{ backgroundColor: mostrarCrearEleccion ? 'lightgray' : 'inherit' }}>
                <ListItemIcon>
                  <CreateIcon />
                </ListItemIcon>
                <ListItemText primary="Crear Proceso Electoral" />
              </ListItem>
              <ListItem button onClick={() => handleDrawerItemSubClick("Procesos Electorales Activos")} style={{ backgroundColor: mostrarVerElecciones ? 'lightgray' : 'inherit' }}>
                <ListItemIcon>
                  <BallotIcon />
                </ListItemIcon>
                <ListItemText primary="Procesos Electorales Activos" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem button onClick={() => handleDrawerItemClick("Comite Electoral")}>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Comite Electoral" />
            {openComiteElectoral ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openComiteElectoral} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button onClick={() => handleDrawerItemSubClick("Lista de Comite Electoral")} style={{ backgroundColor: mostrarVerComite ? 'lightgray' : 'inherit' }}>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Lista de Comite Electoral" />
              </ListItem>
              <ListItem button onClick={() => handleDrawerItemSubClick("Asignacion de Permisos")} style={{ backgroundColor: mostrarAsignacionP ? 'lightgray' : 'inherit' }}>
                <ListItemIcon>
                  <AssignmentIndIcon />
                </ListItemIcon>
                <ListItemText primary="Asignacion de Permisos" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem button onClick={() => handleDrawerItemClick("Partidos Politicos")}  style={{ backgroundColor: mostrarVerPartido ? 'lightgray' : 'inherit' }} >
            <ListItemIcon>
              <AccountBalanceIcon />
            </ListItemIcon>
            <ListItemText primary="Partidos Politicos" />
          </ListItem>
          
          
          <ListItem button onClick={() => handleDrawerItemClick("Asignacion de Mesas")} style={{ backgroundColor: mostrarAsignacion ? 'lightgray' : 'inherit' }} >
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Asignacion de mesas" />
          </ListItem>
          
          
          <ListItem button onClick={() => handleDrawerItemClick("Crear Convocatoria")} style={{ backgroundColor: mostrarVerConvocatoria ? 'lightgray' : 'inherit' }}>
            <ListItemIcon>
              <CreateIcon />
            </ListItemIcon>
            <ListItemText primary="Crear Convocatoria" />
          </ListItem>

          <ListItem button onClick={() => handleBoletasElectorales("Boletas Electorales")} style={{ backgroundColor: mostrarBoletas ? 'lightgray' : 'inherit' }}>
            <ListItemIcon>
             <HowToVoteIcon />
            </ListItemIcon>
            <ListItemText primary="Boletas Electorales" />
          </ListItem>

          <ListItem button onClick={() => handleJuradosE("Jurados Electorales")} style={{ backgroundColor: mostrarJurados ? 'lightgray' : 'inherit' }}>
            <ListItemIcon>
             <Diversity3Icon />
            </ListItemIcon>
            <ListItemText primary="Jurados Electorales" />
          </ListItem>

        </List>
      </Drawer>
      <div className="contentContainer">
        {mostrarCrearEleccion && <CrearElecciones />}
        {mostrarInicio && <Inicio />}
        {mostrarVerElecciones && <VerElecciones lista={mostrarVerElecciones} />}
        {mostrarVerComite && <AsignacionComite />}
        {mostrarVerPartido && <VerPartidosPoliticos />}
        {mostrarAsignacion && <AsignacionMesas />}
        {mostrarVerConvocatoria && <VerConvocatoria lista={mostrarVerConvocatoria} />}
        {mostrarAsignacionP && <AsignacionPermisosC />}
        {mostrarBoletas && <VerBoletasElectorales/>}
        {mostrarJurados && <JuradoElectorales/>}
      </div>
    </div>
  );
}

export default MenuIzquierdo;