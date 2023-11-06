import React, { useState } from "react";
import "../css/MenuVertical.css";
import "../css/botones.css"
import axios from "axios";
import Swal from 'sweetalert2';
import "../css/CreacionModal.css"

const CrearElecciones = () => {

    const initialState = {
      nuevoTipoEleccion: "",
      motivoEleccion: "",
      votanteEleccion:"",
      facultadEleccion:"",
      motivoPersonalizado: "",
      fechaInicio: "",
      fechaFin: "",
      fechaElecciones: "",
    } 
  
    const [formData, setFormData] = useState(initialState);
    const [showModal, setShowModal] = useState(false);
  
    const url = "http://localhost:8000/";
    const handleNuevoTipoEleccionChange = (e) => {
      const nuevoTipoEleccion = e.target.value;
      let motivoEleccion = "";
      let motivoPersonalizado = "";
  
      if (nuevoTipoEleccion === "No") {
        // Si elige "No", limpiamos los valores de motivo y motivoPersonalizado
        motivoEleccion = "";
        motivoPersonalizado = "";
      }
  
      setFormData({
        ...formData,
        nuevoTipoEleccion,
        motivoEleccion,
        motivoPersonalizado,
      });
    };
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
        VOTANTE_ELECCION: formData. votanteEleccion,
        FACULDAD_ELECCION: formData.facultadEleccion,
        FECHA_ELECCION: formData.fechaElecciones,
        FECHA_INI_CONVOCATORIA: formData.fechaInicio,
        FECHA_FIN_CONVOCATORIA: formData.fechaFin,
        ELECCION_ACTIVA: true
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
            <option value="Rector">Rector, Vicerrector</option>
            <option value="Decano">Decano, Director Académico</option>
            <option value="Director de carrera">Director de carrera</option>
            <option value="Consejo de Facultad">Consejeros de Facultad</option>
            <option value="Consejo de carrera">Consejeros de carrera</option>
            <option value="Congreso nacional">
              Congreso nacional de universidades (Delegados docentes y
              estudiantes)
            </option>
            <option value="Conferencias de facultad">
              Conferencias de facultad (Delegados docentes y estudiantes)
            </option>
            <option value="Consejo universitario">
              Honorable consejo universitario (Delegados docentes y estudiantes)
            </option>
            <option value="Congreso universitario">
              Congreso universitario (Delegados docentes y estudiantes)
            </option>
          </select>
        </div>
        <div className="form-group">
          <label className="LabelCrear" >Poblacion Votante:</label>
          <select
            className="InputCrear"
            name="votanteEleccion"
            value={formData.votanteEleccion}
            onChange={handleInputChange}

          >
            <option value="">Seleccione una opción</option>
            <option value="Universitario">Global</option>
            <option value="Facultativo">Facultativo</option>
            <option value="Carrera">Carrera</option>
           
          </select>
        </div>
        {formData.votanteEleccion === 'Facultativo' && (
        <div className="form-group">
          <label className="LabelCrear">Facultad:</label>
          <select
            className="InputCrear"
            name="facultadEleccion"
            value={formData.facultadEleccion}
            onChange={handleInputChange}

          >
            <option value="">Seleccione una opción</option>
            <option value="1">Facultad de Ciencias y tecnologia</option>
            <option value="2">Facultad Medecina</option>
            <option value="3">Facultad de Ciencias Economicas</option>
           
          </select>
        </div>
      )}
      {formData.votanteEleccion === 'Carrera' && (
        <div className="form-group">
          <label className="LabelCrear">Carrera:</label>
          <select
            className="InputCrear"
            name="facultadEleccion"
            value={formData.facultadEleccion}
            onChange={handleInputChange}

          >
            <option value="">Seleccione una opción</option>
            <option value="1">Ingeneria Industrial</option>
            <option value="2">Ingeneria de sistemas</option>
            <option value="3">Ingeneria Quimica</option>
           
          </select>
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