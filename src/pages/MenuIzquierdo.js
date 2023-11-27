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
import CrearElecciones from './CrearElecciones';
import Inicio from './Inicio';
import VerElecciones from './VerElecciones';
import AsignacionComite from "./AsignacionComite";
import PartidosPoliticos from "./CrearPartidosPoliticos";
import VerPartidosPoliticos from "./VerPartidosPoliticos";
import AsignacionMesas from "./AsignacionMesas";
import VerConvocatoria from "./VerConvocatoria";
import AsignacionPermisosC from "./AsignacionPermiso";
const drawerWidth = 320;
function MenuIzquierdo() {
  const [openProcesoElectoral, setOpenProcesoElectoral] = useState(false);
  const [openComiteElectoral, setOpenComiteElectoral] = useState(false);
  const [openPartidosPoliticos, setOpenPartidosPoliticos] = useState(false);

  

  const [mostrarCrearEleccion, setMostrarCrearEleccion] = useState(false);
  const [mostrarInicio, setMostrarInicio] = useState(true);
  const [mostrarVerElecciones, setMostrarVerElecciones] = useState(false);
  const [mostrarVerComite, setMostrarVerComite] = useState(false);
  const [mostrarCrearPartido, setMostrarCrearPartido] = useState(false);
  const [mostrarVerPartido, setMostrarVerPartido] = useState(false);
  const [mostrarAsignacion, setMostrarAsignacion] = useState(false);
  const [mostrarVerConvocatoria, setMostrarVerConvocatoria] = useState(false);
  const [mostrarAsignacionP, setMostrarAsignacionP] = useState(false);

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
        setOpenPartidosPoliticos(!openPartidosPoliticos);
        break;
      case "Asignacion de Mesas":
        handleAsignarMesaClick();
        break;
      case "Crear Convocatoria":
        handleVerConvocatoria();
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
    setMostrarCrearPartido(false);
    setMostrarVerPartido(false);
    setMostrarAsignacion(false);
    setMostrarVerConvocatoria(false);
    setMostrarAsignacionP(false);
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
      case "Crear Partido Politico":
        handleCrearPartidoClick();
        break;
      case "Frentes Politicos Activos":
        handleVerPartidoClick();
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
    setMostrarCrearPartido(false);
    setMostrarVerPartido(false);
    setMostrarAsignacion(false);
    setMostrarVerConvocatoria(false);
    setMostrarAsignacionP(false);
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
    setMostrarAsignacionP(false);
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
    setMostrarAsignacionP(false);
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
    setMostrarAsignacionP(false);
  };

  const handleVerPartidoClick = () => {
    setMostrarCrearEleccion(false);
    setMostrarInicio(false);
    setMostrarVerElecciones(false);
    setMostrarVerComite(false);
    setMostrarCrearPartido(false);
    setMostrarVerPartido(true);
    setMostrarAsignacion(false);
    setMostrarVerConvocatoria(false);
    setMostrarAsignacionP(false);
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
    setMostrarAsignacionP(false);
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
    setMostrarAsignacionP(false);
  };

  const handleAsignarPermisos = () => {
    setMostrarCrearEleccion(false);
    setMostrarInicio(false);
    setMostrarVerElecciones(false);
    setMostrarVerComite(false);
    setMostrarCrearPartido(false);
    setMostrarVerPartido(false);
    setMostrarVerConvocatoria(false);
    setMostrarAsignacion(false);
    setMostrarAsignacionP(true);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Drawer variant="permanent" style={{ width: drawerWidth}}>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px' }}>
          <img src={Logo} alt="profile_picture" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
          <h3 style={{ color: 'black', fontSize: '22px', marginTop: '8px' }}>Administrador de elecciones </h3>
          <b style={{ color: 'black', marginTop: '4px',fontSize: '22px' }}> FCyT </b>
        </div>
        <List>
          <ListItem button onClick={() => handleDrawerItemClick("Inicio")} style={{ backgroundColor: mostrarInicio ? 'lightgray' : 'inherit' }}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
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
              <ListItem button onClick={() => handleDrawerItemSubClick("Crear Proceso Electoral")} className="Ocultos">
                <ListItemIcon>
                  <CreateIcon />
                </ListItemIcon>
                <ListItemText primary="Crear Proceso Electoral" />
              </ListItem>
              <ListItem button onClick={() => handleDrawerItemSubClick("Procesos Electorales Activos")} className="Ocultos">
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
              <ListItem button onClick={() => handleDrawerItemSubClick("Lista de Comite Electoral")} className="Ocultos">
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Lista de Comite Electoral" />
              </ListItem>
              <ListItem button onClick={() => handleDrawerItemSubClick("Asignacion de Permisos")} className="Ocultos">
                <ListItemIcon>
                  <AssignmentIndIcon />
                </ListItemIcon>
                <ListItemText primary="Asignacion de Permisos" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem button onClick={() => handleDrawerItemClick("Partidos Politicos")}>
            <ListItemIcon>
              <AccountBalanceIcon />
            </ListItemIcon>
            <ListItemText primary="Partidos Politicos" />
            {openPartidosPoliticos ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openPartidosPoliticos} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button onClick={() => handleDrawerItemSubClick("Crear Partido Politico")} className="Ocultos">
                <ListItemIcon>
                  <CreateIcon />
                </ListItemIcon>
                <ListItemText primary="Crear Partido Politico" />
              </ListItem>
              <ListItem button onClick={() => handleDrawerItemSubClick("Frentes Politicos Activos")} className="Ocultos">
                <ListItemIcon>
                  <BallotIcon />
                </ListItemIcon>
                <ListItemText primary="Frentes Politicos Activos" />
              </ListItem>
            </List>
          </Collapse>
          
          <ListItem button onClick={() => handleDrawerItemClick("Asignacion de Mesas")} style={{ backgroundColor: mostrarAsignacion ? 'lightgray' : 'inherit' }} >
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Asignacion de mesas" />
          </ListItem>
          
          
          <ListItem button onClick={() => handleDrawerItemClick("Crear Convocatoria")} >
            <ListItemIcon>
              <CreateIcon />
            </ListItemIcon>
            <ListItemText primary="Crear Convocatoria" />
          </ListItem>
        </List>
      </Drawer>
      <div style={{width: '100%', height: '100vh'}}>
        {mostrarCrearEleccion && <CrearElecciones />}
        {mostrarInicio && <Inicio />}
        {mostrarVerElecciones && <VerElecciones lista={mostrarVerElecciones} />}
        {mostrarVerComite && <AsignacionComite />}
        {mostrarCrearPartido && <PartidosPoliticos />}
        {mostrarVerPartido && <VerPartidosPoliticos />}
        {mostrarAsignacion && <AsignacionMesas />}
        {mostrarVerConvocatoria && <VerConvocatoria lista={mostrarVerConvocatoria} />}
        {mostrarAsignacionP && <AsignacionPermisosC />}
      </div>
    </div>
  );
}

export default MenuIzquierdo;