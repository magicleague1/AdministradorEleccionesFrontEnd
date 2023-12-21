import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {
  MenuItem,
  Select,
  styled,
  FormControl,
  InputLabel,
} from '@mui/material';

const StyledFormControl = styled(FormControl)({
  width: '100%',
  marginRight: '12px',
});
const AgregarCandidatoModal = ({ isOpen, closeModal, eleccionId}) => {
  const initialState = {
    codFrente: "",
    carnetIdentidad: "",
    cargoPostulado: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [fronts, setFronts] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");
  const [motivo, setMotivo] = useState('');

  const url = process.env.REACT_APP_VARURL;
  
  const [opcionesMotivo, setOpcionesMotivo] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseEleccion = await axios.get(`${url}obtener_id/${eleccionId}`);
        const eleccion = responseEleccion.data;
        if (eleccion.MOTIVO_ELECCION === 'universitaria') {
          setOpcionesMotivo(opcionesRector);
        } else if (eleccion.MOTIVO_ELECCION === 'facultativa') {
          setOpcionesMotivo(opcionesDecano);
        } else if (eleccion.MOTIVO_ELECCION === 'carrera') {
          setOpcionesMotivo(opcionesCarrera);
        }
      } catch (error) {
        console.error("Error al obtener los datos de la elección:", error);
      }
    };

    const fetchData1 = async () => {
      try {
        const response = await axios.get(`${url}obtenerFrentesYCandidatos/${eleccionId}`);
        setFronts(response.data.frentes);
      } catch (error) {
        console.log("Error al obtener los frentes");
      }
    };
    fetchData();
    fetchData1();
    
  }, [eleccionId]);

  const opcionesRector = [
    { value: 'Rector', label: 'Rector' },
    { value: 'Vicerector', label: 'Vicerector' },
  ];
  const opcionesDecano = [
    { value: 'Rector', label: 'Decano' },
    { value: 'Director Academico', label: 'Director Academico' },
  ];
  const opcionesCarrera = [
    { value: 'Director de Carrera', label: 'Director de Carrera' },
  ];
  const handleGuardar = () => {
    if (formData.carnetIdentidad === "" || formData.cargoPostulado === "") {
      setSnackbarType("error");
      setSnackbarMessage("Complete correctamente los datos.");
      setSnackbarOpen(true);
      return;
    }
  
    const nuevoCandidato = {
      COD_FRENTE: formData.codFrente,
      CARNETIDENTIDAD: formData.carnetIdentidad,
      CARGO_POSTULADO: formData.cargoPostulado,
    };
  
    axios
      .get(`${url}candidatos/verificarExistencia`, {
        params: {
          carnetIdentidad: nuevoCandidato.CARNETIDENTIDAD,
        },
      })
      .then((response) => {
        const existeCandidato = response.data.existeCandidato;
        console.log(existeCandidato);
        if (existeCandidato) {
          setSnackbarType("error");
          setSnackbarMessage("Este candidato ya está registrado.");
          setSnackbarOpen(true);
        } else {
          axios
            .post(`${url}frentes/asignarCandidatos`, nuevoCandidato)
            .then((response) => {
              setSnackbarType("success");
              setSnackbarMessage("Candidato guardado correctamente");
              setSnackbarOpen(true);
              setFormData(initialState);
            })
            .catch((error) => {
              setSnackbarType("error");
              setSnackbarMessage(
                `Ocurrió un error al agregar un candidato al frente político: ${error}`
              );
              setSnackbarOpen(true);
            });
        }
      })
      .catch((error) => {
        console.error("Error al verificar la existencia del candidato:", error);
      });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    const textoSeleccionado = opcionesMotivo.find((opcion) => opcion.value === value)?.label;
    setMotivo(textoSeleccionado);
  };
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    closeModal();
  };

  const handleCloseModal = () => {
    closeModal();
    setFormData(initialState);
  };

  return (
    <Modal
      open={isOpen}
      onClose={() => {}}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      BackdropProps={{
        style: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        invisible: false,
      }}
    >
      <Box sx={{ ...modalStyle, width: "400px" }}>
        <Typography variant="h6" component="h2" sx={{marginBottom:'15px', textAlign:'center'}}>
          AGREGAR CANDIDATO
        </Typography>
        
        <Select
        value={formData.codFrente}
        onChange={handleInputChange}
        name="codFrente"
        fullWidth
        margin="normal"
        displayEmpty
        InputLabelProps={{ shrink: true }}
        inputProps={{ 'aria-label': 'Elegir un frente político' }}
      >
        <MenuItem value="" disabled>
          Elegir un frente político
        </MenuItem>
        {fronts.map((front) => (
          <MenuItem key={front.COD_FRENTE} value={front.COD_FRENTE}>
            {front.NOMBRE_FRENTE}
          </MenuItem>
        ))}
      </Select>
      <TextField
        label="Carnet de Identidad"
        type="text"
        name="carnetIdentidad"
        value={formData.carnetIdentidad}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <StyledFormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="motivoPermiso">Cargos a Postular:</InputLabel>
            <Select
              label="Cargos a Postular"
              name="motivoPermiso"
              value={motivo}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            >
              <MenuItem value="" disabled>
                -----Seleccione un Tipo de cargo-----
              </MenuItem>
              {opcionesMotivo.map((opcion) => (
                <MenuItem key={opcion.value} value={opcion.value}>
                  {opcion.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </StyledFormControl>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "16px",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleGuardar}
            style={{ marginRight: "12px" }}
          >
            Guardar
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCloseModal}
          >
            Cancelar
          </Button>
        </Box>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
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
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default AgregarCandidatoModal;
