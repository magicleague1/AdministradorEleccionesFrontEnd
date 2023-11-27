import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/system"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";


const ModalContainer = styled("div")({
  position: "absolute",
  width: 550,
  backgroundColor: "#fff", // Puedes ajustar el color de fondo según tus preferencias
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  padding: "20px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  "& .ActualizarTitulo": {
    color: "rgb(0,57,116)",
    marginBottom: "40px",
  },
});

const InputField = styled(TextField)({
  marginBottom: "28px",
});

const CustomButton = styled(Button)({
  marginRight: "10px",
});

const ActualizarEleccionModal = ({ isOpen, closeModal, eleccionId }) => {
  const initialState = {
    motivoEleccion: "",
    fechaInicio: "",
    fechaFin: "",
    fechaElecciones: "",
  };

  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const url = process.env.REACT_APP_VARURL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url + `obtener_id/${eleccionId}`);
        const eleccion = response.data;
        setFormData({
          motivoEleccion: eleccion.MOTIVO_ELECCION,
          fechaInicio: eleccion.FECHA_INI_CONVOCATORIA,
          fechaFin: eleccion.FECHA_FIN_CONVOCATORIA,
          fechaElecciones: eleccion.FECHA_ELECCION,
        });
      } catch (error) {
        console.error("Error al obtener los datos de la elección:", error);
      }
    };

    fetchData();
  }, [eleccionId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleActualizarClick = () => {
    if (
      !formData.motivoEleccion ||
      !formData.fechaInicio ||
      !formData.fechaFin ||
      !formData.fechaElecciones
    ) {
      Swal.fire({
        icon: "error",
        title: "Error al crear el proceso electoral",
        text: `Llene correctamente los datos `,
      });
      return;
    }

    if (
      new Date(formData.fechaFin) <= new Date(formData.fechaInicio) ||
      new Date(formData.fechaElecciones) <= new Date(formData.fechaFin)
    ) {
      Swal.fire({
        icon: "error",
        title: "Error al crear el proceso electoral",
        text: ` Las fechas no son válidas. Asegúrese de que la fecha de inicio sea anterior a la fecha de fin y la fecha de elecciones sea posterior a la fecha de fin. `,
      });
      return;
    }
    axios
      .put(url + `eleccionesUpdate/${eleccionId}`, {
        MOTIVO_ELECCION: formData.motivoEleccion,
        FECHA_INI_CONVOCATORIA: formData.fechaInicio,
        FECHA_FIN_CONVOCATORIA: formData.fechaFin,
        FECHA_ELECCION: formData.fechaElecciones,
      })
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Proceso se actualizó correctamente",
          text: `El proceso electoral se ha actualizado con éxito!`,
        }).then(() => {
          handleVolverAtras();
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error al actualizar el proceso electoral",
          text: `Ocurrió un error al actualizar el proceso electoral`,
        });
      });
  };
  const handleVolverAtras = () => {
    closeModal();
    navigate("/home");
  };

  return (
    <Modal open={isOpen} onClose={closeModal} aria-labelledby="Actualizar Elección">
      <ModalContainer>
        <h3 className="ActualizarTitulo">Actualizar proceso electoral</h3>
        <InputField
          label="Motivo de Elección"
          variant="outlined"
          className="InputCrearActualizar"
          name="motivoEleccion"
          value={formData.motivoEleccion}
          onChange={handleInputChange}
          fullWidth
        />
        <InputField
          label="Fecha inicio de convocatoria"
          variant="outlined"
          className="InputCrearActualizar"
          type="date"
          name="fechaInicio"
          value={formData.fechaInicio}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleInputChange}
          fullWidth
        />
        <InputField
          label="Fecha fin de convocatoria"
          variant="outlined"
          className="InputCrearActualizar"
          type="date"
          name="fechaFin"
          value={formData.fechaFin}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleInputChange}
          fullWidth
        />
        <InputField
          label="Fecha de las elecciones"
          variant="outlined"
          className="InputCrearActualizar"
          type="date"
          name="fechaElecciones"
          value={formData.fechaElecciones}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleInputChange}
          fullWidth
        />
        <div className="BotonesDivCrearActualizar">
          <CustomButton
            variant="contained"
            color="primary"
            className="custom-btn btn-9"
            onClick={handleActualizarClick}
          >
            Actualizar
          </CustomButton>
          <CustomButton
            variant="contained"
            color="secondary"
            className="custom-btn btn-8"
            onClick={handleVolverAtras}
          >
            Volver
          </CustomButton>
        </div>
      </ModalContainer>
    </Modal>
  );
};

export default ActualizarEleccionModal;