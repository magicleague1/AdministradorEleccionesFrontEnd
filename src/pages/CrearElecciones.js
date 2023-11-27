import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Box,
  Paper,
  styled,
} from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";

const StyledContainer = styled(Container)({
  paddingTop: '32px',
  paddingBottom: '32px',
  width:'100%',
  height:'100%',
  backgroundColor:'rgba(0, 56, 116, 0.564)',
});

const StyledPaper = styled(Paper)({
  padding: '32px',
  flexDirection: 'column',
    justifyContent: 'center',
    margin: 'auto',
    marginTop:'90px',
    width:'80%'
});

const StyledFormControl = styled(FormControl)({
  width: '100%',
  marginBottom: '28px',
});

const StyledButtonGroup = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  margin: 'auto',
  marginLeft: '100%',
  width:'100%'
});

const StyledButton = styled(Button)({
  marginLeft: '20px',
});

const CrearElecciones = () => {

    const initialState = {
      nuevoTipoEleccion: "",
      motivoEleccion: "",
      motivoPersonalizado: "",
      fechaInicio: "",
      fechaFin: "",
      fechaElecciones: "",
    } 
  
    const [formData, setFormData] = useState(initialState);
    const [showModal, setShowModal] = useState(false);



    const [facultades, setFacultades] = useState([]);
  const [carreras, setCarreras] = useState([]);


  const [selectedFacultad, setSelectedFacultad] = useState('');
  const [selectedCarrera, setSelectedCarrera] = useState('');

  const [tipoEleccionselect, setTipoEleccionselect] = useState('');

  console.log(tipoEleccionselect);

  console.log(selectedFacultad);
  console.log(selectedCarrera);

    
    useEffect(() => {
      fetch(process.env.REACT_APP_VARURL+'facultades')
        .then(response => response.json())
        .then(data => setFacultades(data))
        .catch(error => console.error('Error fetching data:', error));
    }, []);
  
   
    const fetchCarrerasByFacultad = codFacultad => {
      fetch(`${process.env.REACT_APP_VARURL}carreras/${codFacultad}`)
        .then(response => response.json())
        .then(facultades => setCarreras(facultades))
        .catch(error => console.error('Error fetching data:', error));
    };
  
    const url = process.env.REACT_APP_VARURL;
   
    const opcionesMotivo = [
      { value: 'universitaria', label: 'Rector, Vicerrector' },
      { value: 'facultativa', label: 'Decano, Director Académico' },
      { value: 'carrera', label: 'Director de carrera' },
    ];

    const handleInputChange = (e) => {
      const { name, value } = e.target;
    
    
      setFormData((prevData) => {
        
        const textoSeleccionado = opcionesMotivo.find(
          (opcion) => opcion.value === value
        )?.label;

        console.log('namesss',name);
    
        
        if (name !==  'fechaInicio' && name!=='fechaFin'&& name!=='fechaElecciones') {
          setTipoEleccionselect(textoSeleccionado);
        }
         
    
        return {
          ...prevData,
          [name]: value,
          tipoElecciones: textoSeleccionado, 
        };
      });
    };
    const handleGuardarClick = () => {
     console.log(formData.motivoEleccion)
     
   
      if (!formData.motivoEleccion || !formData.fechaInicio || !formData.fechaFin || !formData.fechaElecciones) {
        Swal.fire({
          icon: 'error',
          title: 'Error al crear el proceso electoral',
          text: `Llene correctamente los datos `
        });
        return;
      }
  
      if (new Date(formData.fechaFin) <= new Date(formData.fechaInicio) || new Date(formData.fechaElecciones) <= new Date(formData.fechaFin)) {
        Swal.fire({
          icon: 'error',
          title: 'Error al crear el proceso electoral',
          text: ` Las fechas no son válidas. Asegúrese de que la fecha de inicio sea anterior a la fecha de fin y la fecha de elecciones sea posterior a la fecha de fin. `
        });

        return;
      }
     
      const nuevoProceso = {
        COD_ADMIN: "", 
        COD_FRENTE: 0, 
        COD_TEU: 0, 
        COD_COMITE: 0, 
        MOTIVO_ELECCION: formData.motivoEleccion,
        TIPO_ELECCION: tipoEleccionselect,
        FECHA_ELECCION: formData.fechaElecciones,
        FECHA_INI_CONVOCATORIA: formData.fechaInicio,
        FECHA_FIN_CONVOCATORIA: formData.fechaFin,
        ELECCION_ACTIVA: true,
        cod_facultad: selectedFacultad, 
        cod_carrera: selectedCarrera 
      };

      console.log('----->>>',nuevoProceso);

  
      axios.post(url + "elecciones_data", nuevoProceso)
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: 'Proceso registrado correctamente',
          text: `El proceso electoral se ha creado con éxito para el motivo: ${formData.motivoEleccion}`
        }).then(() => {
          setShowModal(true);
          setFormData(initialState);
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al crear el proceso electoral',
          text: `Ocurrió un error al crear el proceso electoral: ${error}`
        });
      });
    };
    const handleVolverAtras = () => {
      setShowModal(true);
          setFormData(initialState);
    }

    const handleFacultadChange = (e) => {
      const selectedCodFacultad = e.target.value;
      setSelectedFacultad(selectedCodFacultad);
      setSelectedCarrera('');
      fetchCarrerasByFacultad(selectedCodFacultad);
    };

    const handleCarreraChange = (e) => {
      setSelectedCarrera(e.target.value);
    };
  


 
    return (
      <StyledContainer  >
        <StyledPaper >
        <Typography variant="h4" gutterBottom style={{textAlign:'center', marginBottom: '28px'}}>
          NUEVO PROCESO ELECTORAL
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <StyledFormControl>
            <FormControl fullWidth>
              <InputLabel htmlFor="motivoEleccion" >Motivo:</InputLabel>
              <Select
                label="Motivo:"
                name="motivoEleccion"
                value={formData.motivoEleccion}
                onChange={handleInputChange}
                inputProps={{
                  name: 'motivoEleccion',
                  id: 'motivoEleccion',
                }}
              >
                <MenuItem value="" disabled>
                  -----Seleccione una Eleccion-----
                </MenuItem>
                {opcionesMotivo.map((opcion) => (
                  <MenuItem key={opcion.value} value={opcion.value}>
                    {opcion.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            </StyledFormControl>

            {formData.motivoEleccion === "facultativa" && (
              <StyledFormControl>
                <FormControl fullWidth>
                <InputLabel>Selecciona una facultad:</InputLabel>
                <Select
                  label="Selecciona una facultad:"
                  value={selectedFacultad}
                  onChange={handleFacultadChange}
                  fullWidth
                >
                  <MenuItem value={0}>Seleccione una facultad</MenuItem>
                  {facultades.map((facultad) => (
                    <MenuItem
                      key={facultad.COD_FACULTAD}
                      value={facultad.COD_FACULTAD}
                    >
                      {facultad.NOMBRE_FACULTAD}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              </StyledFormControl>
              
            )}

            {formData.motivoEleccion === "carrera" && (
              <>
               <StyledFormControl>
               <FormControl fullWidth>
                  <InputLabel>Selecciona una facultad:</InputLabel>
                  <Select
                    value={selectedFacultad}
                    onChange={handleFacultadChange}
                    fullWidth
                  >
                    <MenuItem value={0}>Seleccione una facultad</MenuItem>
                    {facultades.map((facultad) => (
                      <MenuItem
                        key={facultad.COD_FACULTAD}
                        value={facultad.COD_FACULTAD}
                      >
                        {facultad.NOMBRE_FACULTAD}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

               </StyledFormControl>
               <StyledFormControl>
               <FormControl fullWidth>
                  <InputLabel>Selecciona una carrera:</InputLabel>
                  <Select
                    value={selectedCarrera}
                    onChange={handleCarreraChange}
                    fullWidth
                  >
                    <MenuItem value={0}>Seleccione una carrera</MenuItem>
                    {carreras.map((carrera) => (
                      <MenuItem
                        key={carrera.COD_CARRERA}
                        value={carrera.COD_CARRERA}
                      >
                        {carrera.NOMBRE_CARRERA}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
               </StyledFormControl>
                
              </>
            )}
          </Grid>

  
            <Grid item xs={12} md={6}>
            <StyledFormControl>
              <TextField
                label="Fecha inicio de convocatoria:"
                type="date"
                name="fechaInicio"
                value={formData.fechaInicio}
                min={new Date().toISOString().split("T")[0]}
                onChange={handleInputChange}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </StyledFormControl>

            <StyledFormControl>
              
              <TextField
                label="Fecha fin de convocatoria:"
                type="date"
                name="fechaFin"
                value={formData.fechaFin}
                min={formData.fechaInicio}
                onChange={handleInputChange}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </StyledFormControl>

            <StyledFormControl>
              <TextField
                label="Fecha de las elecciones:"
                type="date"
                name="fechaElecciones"
                value={formData.fechaElecciones}
                min={formData.fechaFin}
                onChange={handleInputChange}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </StyledFormControl>
            </Grid>
            <Grid>
            <StyledButtonGroup>
              <StyledButton
                variant="contained"
                color="primary"
                onClick={handleGuardarClick}
              >
                Guardar
              </StyledButton>
              <StyledButton
                variant="contained"
                color="secondary"
                onClick={handleVolverAtras}
              >
                Cancelar
              </StyledButton>
            </StyledButtonGroup>
            </Grid>
        </Grid>
      </StyledPaper>
    </StyledContainer>
  );
};

export default CrearElecciones;