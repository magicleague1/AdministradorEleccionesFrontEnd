import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Typography,
    Container,
    Modal,
  } from "@mui/material";
  import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";

const AsignacionJuradosElec = ({ lista }) => {
  const [proceso, setProceso] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpen1, setModalIsOpen1] = useState(false);
  const [codJurados, setCodJurados] = useState(null);
  const url = process.env.REACT_APP_VARURL;

//   useEffect(() => {
//     axios.get(`${url}elecciones_index`).then((response) => {
//       setProceso(response.data);
//     });
//   }, [lista]);

//   const verificarExistenciaJurados = async (codJUrados) => {
//     try {
//       const response = await axios.get(`${url}verificar-comite/${codComite}`);
//       return !response.data.existeComite;
//     } catch (error) {
//       console.error("Error al verificar la existencia del comité:", error);
//       return false;
//     }
//   };

  const handleAsignarClick = async () => {
    try {
    //   const existeComite = await verificarExistenciaJurados(COD_COMITE);

    //   if (!existeComite) {
    //     Swal.fire({
    //       icon: "error",
    //       title: "Asignacion incorrecta",
    //       text: "Ya se asigno Vocales de comité electoral",
    //     });
    //     return;
    //   }

    //   await axios.put(`${url}asignar-comite/${COD_ELECCION}`);
    //   await axios.post(`${url}asignar-vocales/${COD_COMITE}`);

      Swal.fire({
        icon: "success",
        title: "Asignación exitosa",
        text:  "Se envio un correo a los jurados asignados",
      }).then(() => {
        setModalIsOpen(true);
      });
    } catch (error) {
      console.error("Error en la asignación:", error);
      Swal.fire({
        icon: "error",
        title: "Error en la asignación",
        text: "Ocurrió un error en la asignación de Jurados",
      });
    }
  };


  const closeModal1 = () => {
    setModalIsOpen1(false);
  };

  return (
    <Button
                    variant="outlined"
                    size="small"
                    startIcon={<PersonAddAltOutlinedIcon />}
                    className="custom-button"
                    onClick={() => handleAsignarClick()}
                    sx={{marginRight:'12px'}}
                >
                    Asignar
                </Button>

  );
};

export default AsignacionJuradosElec;