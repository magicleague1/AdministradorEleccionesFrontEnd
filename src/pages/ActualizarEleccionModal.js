import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import Snackbar from "@mui/material/Snackbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MuiAlert from '@mui/material/Alert';

const ModalContainer = styled("div")({
  position: "absolute",
  width: 550,
  backgroundColor: "#fff",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  padding: "20px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  "& .ActualizarTitulo": {
    color: "rgb(0,57,116)",
    marginBottom: "40px",
    textAlign: "center",
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
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState('success');
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
      setSnackbarType('error');
      setSnackbarMessage('Llene correctamente los datos');
      setSnackbarOpen(true);
      return;
    }

    if (
      new Date(formData.fechaFin) <= new Date(formData.fechaInicio) ||
      new Date(formData.fechaElecciones) <= new Date(formData.fechaFin)
    ) {
      setSnackbarType('error');
      setSnackbarMessage('Las fechas no son válidas. Asegúrese de que la fecha de inicio sea anterior a la fecha de fin y la fecha de elecciones sea posterior a la fecha de fin.');
      setSnackbarOpen(true);
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
        setSnackbarType('success');
        setSnackbarMessage('El proceso electoral se ha actualizado con éxito!');
        setSnackbarOpen(true);
        navigate("/home");
      })
      .catch((error) => {
        setSnackbarType('error');
        setSnackbarMessage('Ocurrió un error al actualizar el proceso electoral');
        setSnackbarOpen(true);
      });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    closeModal();
  };
  const handleVolverAtras = () => {
    closeModal();
    navigate("/home");
  };

  return (
    <>
      <Modal open={isOpen} onClose={() => {}} aria-labelledby="Actualizar Elección" BackdropProps={{
        style: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        invisible: false,
      }}>
        <ModalContainer>
          <h3 className="ActualizarTitulo">ACTUALIZAR PROCESO ELECTORAL</h3>
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
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
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

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity={snackbarType}
          sx={{ width: '100%', maxWidth: '600px', fontSize: '1.2rem', padding: '20px' }}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default ActualizarEleccionModal;