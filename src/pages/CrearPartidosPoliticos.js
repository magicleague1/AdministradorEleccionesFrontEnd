import React, { useState } from "react";
import "../css/MenuVertical.css";
import "../css/botones.css"
import axios from "axios";
import Swal from 'sweetalert2';
import "../css/CreacionModal.css"

const PartidosPoliticos = () => {

    const initialState = {
      nuevoTipoEleccion: "",
      motivoEleccion: "",
      motivoPersonalizado: "",
      fechaInicio: "",
      fechaFin: "",
      fechaElecciones: "",
    } 
  
    const [formData, setFormData] = useState(initialState);
    const [selectedFile, setSelectedFile] = useState(null);
    const [showModal, setShowModal] = useState(false);
  
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
          title: 'Error al crear el frente politico',
          text: `Llene correctamente los datos `
        });
        return;
      }
  
      if (new Date(formData.fechaFin) <= new Date(formData.fechaInicio) || new Date(formData.fechaElecciones) <= new Date(formData.fechaFin)) {
        Swal.fire({
          icon: 'error',
          title: 'Error al crear el frente politico',
          text: ` La fecha no es válidas. Asegúrese de introducir una fecha valida. `
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
        ELECCION_ACTIVA: true
      };
  
      axios.post(url + "elecciones_data", nuevoProceso)
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: 'Proceso registrado correctamente',
          text: `El frente politico se ha creado con éxito`
        }).then(() => {
          setShowModal(true);
          setFormData(initialState);
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al crear el frente politico',
          text: `Ocurrió un error al crear el frente politico: ${error}`
        });
      });
    };
    const handleVolverAtras = () => {
      setShowModal(true);
          setFormData(initialState);
    }
    const handleFileChange = (e) => {
      const file = e.target.files[0]; // Obtiene el primer archivo seleccionado
      setSelectedFile(file);
    };
  return (
    <>
    <div className="crear-elecciones">
      <h3>INSCRIPCION DE UN FRENTE POLITICO</h3>
      <div className="NuevoCrear" >
      
      
        <div className="form-group1">
          <label className="LabelCrear">Nombre:</label>
          <input
            type="text"
            name="motivoEleccion"
            value={formData.motivoEleccion}
            onChange={handleInputChange}
            placeholder="Ingrese el nombre del frente politico"
            className="motivo-input"
          />
        </div>
        <div className="form-group">
          <label className="LabelCrear">Sigla:</label>
          <input
            type="text"
            name="motivoEleccion"
            value={formData.motivoEleccion}
            onChange={handleInputChange}
            placeholder="Ingrese la sigla del frente politico"
            className="motivo-input"
          />
        </div>
     
      <div className="form-group">
        <label className="LabelCrear" >Fecha de inscripcion:</label>
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
          <label className="LabelCrear">Logo:</label>
          <input
           type="file"
           accept="image/*"
           onChange={handleFileChange}
          value={formData.motivoEleccion}
          />
        </div>
        {selectedFile && (
        <div>
          <p>Archivo seleccionado: {selectedFile.name}</p>
        </div>
      )}
      
      <div className="BotonesDivCrear">
      <button className ="custom-btn btn-6" onClick={handleGuardarClick}>
        Registrar
      </button>{ "    "}
      <button className="custom-btn btn-7" onClick={handleVolverAtras}>Cancelar</button>
      </div>
      </div>
    </div>
   
    </>
  );
};

export default PartidosPoliticos;