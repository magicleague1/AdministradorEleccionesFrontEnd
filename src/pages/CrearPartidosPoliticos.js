import React, { useState } from "react";
import "../css/MenuVertical.css";
import "../css/botones.css"
import axios from "axios";
import Swal from 'sweetalert2';
import "../css/CreacionModal.css"

const PartidosPoliticos = () => {

    const initialState = {
      NOMBRE_FRENTE: "", 
      SIGLA_FRENTE: "", 
      FECHA_INSCRIPCION: "", 
      ARCHIVADO: "", 
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
      if (!formData.NOMBRE_FRENTE || !formData.SIGLA_FRENTE|| !formData.FECHA_INSCRIPCION) {
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
     
      const nuevoPartido = {
        NOMBRE_FRENTE: formData.NOMBRE_FRENTE, 
        SIGLA_FRENTE: formData.SIGLA_FRENTE, 
        FECHA_INSCRIPCION: formData.FECHA_INSCRIPCION, 
        ARCHIVADO:"", 
      };
      console.log(nuevoPartido);
      axios.post(url + "frentes/nuevo", nuevoPartido)

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
            name="NOMBRE_FRENTE"
            value={formData.NOMBRE_FRENTE}
            onChange={handleInputChange}
            placeholder="Ingrese el nombre del frente politico"
            className="motivo-input"
          />
        </div>
        <div className="form-group">
          <label className="LabelCrear">Sigla:</label>
          <input
            type="text"
            name="SIGLA_FRENTE"
            value={formData.SIGLA_FRENTE}
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
          name="FECHA_INSCRIPCION"
          value={formData.FECHA_INSCRIPCION}
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
          value={formData.ARCHIVADO}
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