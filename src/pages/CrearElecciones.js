import React, { useState,useEffect } from "react";
import "../css/MenuVertical.css";
import "../css/botones.css"
import Modal from "./Modal";
import axios from "axios";
import Swal from 'sweetalert2';
import "../css/CreacionModal.css"

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
    const [tipoPoblacion, setTipoPoblacion] = useState(0);
    const [showModal, setShowModal] = useState(false);



    const [facultades, setFacultades] = useState([]);
  const [carreras, setCarreras] = useState([]);


  const [selectedFacultad, setSelectedFacultad] = useState('');
  const [selectedCarrera, setSelectedCarrera] = useState('');


  console.log(selectedFacultad);
  console.log(selectedCarrera);

    // Obtener lista de facultades
    useEffect(() => {
      fetch('http://localhost:8000/facultades')
        .then(response => response.json())
        .then(data => setFacultades(data))
        .catch(error => console.error('Error fetching data:', error));
    }, []);
    const handleTipoPoblacionChange = (event) => {
      const value = parseInt(event.target.value, 10);
      setTipoPoblacion(value);
    };
    // Función para obtener carreras por facultad
    const fetchCarrerasByFacultad = codFacultad => {
      fetch(`http://localhost:8000/carreras/${codFacultad}`)
        .then(response => response.json())
        .then(facultades => setCarreras(facultades))
        .catch(error => console.error('Error fetching data:', error));
    };
  
    const url = "http://localhost:8000/";
    
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
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
        COD_ADMIN: "", // Reemplaza con el código de administrador adecuado
        COD_FRENTE: 0, // Reemplaza con el código de frente adecuado
        COD_TEU: 0, // Reemplaza con el código de TEU adecuado
        COD_COMITE: 0, // Reemplaza con el código de comité adecuado
        MOTIVO_ELECCION: formData.motivoEleccion,
        FECHA_ELECCION: formData.fechaElecciones,
        FECHA_INI_CONVOCATORIA: formData.fechaInicio,
        FECHA_FIN_CONVOCATORIA: formData.fechaFin,
        ELECCION_ACTIVA: true,
        cod_facultad: selectedFacultad, // Datos adicionales
        cod_carrera: selectedCarrera // Datos adicionales
      };
  
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
      setSelectedCarrera(''); // Reiniciar la selección de carrera
      fetchCarrerasByFacultad(selectedCodFacultad);
    };

    const handleCarreraChange = (e) => {
      setSelectedCarrera(e.target.value);
    };
  


  return (
    <>
    <div className="crear-elecciones">
      <h3>NUEVO PROCESO ELECTORAL</h3>
      <div className="NuevoCrear" >
    
        <div className="form-group">
          <label className="LabelCrear" >Motivo:</label>
          <select
            className="InputCrear"
            name="motivoEleccion"
            value={formData.motivoEleccion}
            onChange={handleInputChange}

          >
            <option value="">Seleccione una opción</option>
            <option value="universitaria">Elecciones Universitarias</option>
            <option value="facultativa">Elecciones Facultativas</option>
            <option value="carrera">Director de carrera</option>
                  
          </select>

        </div>
        <div className="form-group">
        <label className="LabelCrear">Poblacion votante:</label>
        <select className="InputCrear" id="facultad" onChange={handleTipoPoblacionChange}>
          <option value={0}>Seleccione una opción</option>
          <option value={1}>Global</option>
          <option value={2}>Facultativo</option>
          <option value={3}>Carrera</option>
        </select>
      </div>
      {tipoPoblacion === 2 && (
        <div className="form-group">
          <label className="LabelCrear">Seleccione una facultad:</label>
          <select className="InputCrear" id="facultad" onChange={handleFacultadChange}>
            <option value={0}>Seleccione una facultad</option>
            {facultades.map((facultad) => (
              <option key={facultad.COD_FACULTAD} value={facultad.COD_FACULTAD}>
                {facultad.NOMBRE_FACULTAD}
              </option>
            ))}
          </select>
        </div>
      )}

      {tipoPoblacion === 3 && (
        <div>
          <div className="form-group">
            <label className="LabelCrear">Seleccione una facultad:</label>
            <select className="InputCrear" id="facultad" onChange={handleFacultadChange}>
              <option value={0}>Seleccione una facultad</option>
              {facultades.map((facultad) => (
                <option key={facultad.COD_FACULTAD} value={facultad.COD_FACULTAD}>
                  {facultad.NOMBRE_FACULTAD}
                </option>
              ))}
            </select>
          </div>

          {/* Comenta o elimina el bloque de código a continuación si solo quieres mostrar un campo a la vez */}
          <div className="form-group">
            <label className="LabelCrear">Seleccione una carrera:</label>
            <select className="InputCrear" id="carrera" onChange={handleCarreraChange}>
              <option value={0}>Seleccione una carrera</option>
              {carreras.map((carrera) => (
                <option key={carrera.COD_CARRERA} value={carrera.COD_CARRERA}>
                  {carrera.NOMBRE_CARRERA}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
      <div className="form-group">
        <label className="LabelCrear" >Fecha inicio de convocatoria:</label>
        <input
          className="InputCrear"
          type="date"
          name="fechaInicio"
          value={formData.fechaInicio}
          min={new Date().toISOString().split("T")[0]}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label className="LabelCrear" >Fecha fin de convocatoria:</label>
        <input
          className="InputCrear"
          type="date"
          name="fechaFin"
          value={formData.fechaFin}
          min={formData.fechaInicio}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label className="LabelCrear" >Fecha de las elecciones:</label>
        <input
        className="InputCrear"
          type="date"
          name="fechaElecciones"
          value={formData.fechaElecciones}
          min={formData.fechaFin}
          onChange={handleInputChange}
        />
      </div>
      <div className="BotonesDivCrear">
      <button className ="custom-btn btn-6" onClick={handleGuardarClick}>
        Guardar
      </button>{ "    "}
      <button className="custom-btn btn-7" onClick={handleVolverAtras}>Cancelar</button>
      </div>
      </div>
    </div>
   
    </>
  );
};

export default CrearElecciones;