import React, { useState,useEffect } from "react";
import "../css/MenuVertical.css";
import "../css/botones.css"
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
    const [showModal, setShowModal] = useState(false);



    const [facultades, setFacultades] = useState([]);
  const [carreras, setCarreras] = useState([]);


  const [selectedFacultad, setSelectedFacultad] = useState('');
  const [selectedCarrera, setSelectedCarrera] = useState('');

  const [tipoEleccionselect, setTipoEleccionselect] = useState('');

  console.log(tipoEleccionselect);

  console.log(selectedFacultad);
  console.log(selectedCarrera);

    // Obtener lista de facultades
    useEffect(() => {
      fetch(process.env.REACT_APP_VARURL+'facultades')
        .then(response => response.json())
        .then(data => setFacultades(data))
        .catch(error => console.error('Error fetching data:', error));
    }, []);
  
    // Función para obtener carreras por facultad
    const fetchCarrerasByFacultad = codFacultad => {
      fetch(`${process.env.REACT_APP_VARURL}carreras/${codFacultad}`)
        .then(response => response.json())
        .then(facultades => setCarreras(facultades))
        .catch(error => console.error('Error fetching data:', error));
    };
  
    const url = process.env.REACT_APP_VARURL;
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


    const opcionesMotivo = [
      { value: 'select', label: '-----Selecciones una Eleccion-----' },
      { value: 'universitaria', label: 'Rector, Vicerrector' },
      { value: 'facultativa', label: 'Decano, Director Académico' },
      { value: 'carrera', label: 'Director de carrera' },
    ];

    const handleInputChange = (e) => {
      const { name, value } = e.target;
    
    
      setFormData((prevData) => {
        // Obtener el texto asociado al valor seleccionado
        const textoSeleccionado = opcionesMotivo.find(
          (opcion) => opcion.value === value
        )?.label;

        console.log('namesss',name);
    
        // Actualizar el estado de tipoEleccionselect solo si no estás cambiando la fecha
        if (name !==  'fechaInicio' && name!=='fechaFin'&& name!=='fechaElecciones') {
          setTipoEleccionselect(textoSeleccionado);
        }
         
    
        return {
          ...prevData,
          [name]: value,
          tipoElecciones: textoSeleccionado, // Añadir el textoSeleccionado a formData
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
        COD_ADMIN: "", // Reemplaza con el código de administrador adecuado
        COD_FRENTE: 0, // Reemplaza con el código de frente adecuado
        COD_TEU: 0, // Reemplaza con el código de TEU adecuado
        COD_COMITE: 0, // Reemplaza con el código de comité adecuado
        MOTIVO_ELECCION: formData.motivoEleccion,
        TIPO_ELECCION: tipoEleccionselect,
        FECHA_ELECCION: formData.fechaElecciones,
        FECHA_INI_CONVOCATORIA: formData.fechaInicio,
        FECHA_FIN_CONVOCATORIA: formData.fechaFin,
        ELECCION_ACTIVA: true,
        cod_facultad: selectedFacultad, // Datos adicionales
        cod_carrera: selectedCarrera // Datos adicionales
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
    <div className="form-group1">
          <label className="LabelCrear" >Motivo:</label>
          <select
  className="InputCrear"
  name="motivoEleccion"
  value={formData.motivoEleccion}
  onChange={handleInputChange}
>
  {opcionesMotivo.map(opcion => (
    <option key={opcion.value} value={opcion.value}>{opcion.label}</option>
  ))}
</select>

       {formData.motivoEleccion === "facultativa" && (
      <div>
        <label className="LabelCrear" htmlFor="facultad">Selecciona una facultad:</label>
        <select className="InputCrear" id="facultad" onChange={handleFacultadChange}>
          <option value={0}>Seleccione una facultad</option>
          {facultades.map(facultad => (
            <option key={facultad.COD_FACULTAD} value={facultad.COD_FACULTAD}>
              {facultad.NOMBRE_FACULTAD}
            </option>
          ))}
        </select>
      </div>
    )}

    {formData.motivoEleccion === "carrera" && (
      <div>
        <label className="LabelCrear" htmlFor="facultad">Selecciona una facultad:</label>
        <select className="InputCrear" id="facultad" onChange={handleFacultadChange}>
          <option value={0}>Seleccione una facultad</option>
          {facultades.map(facultad => (
            <option key={facultad.COD_FACULTAD} value={facultad.COD_FACULTAD}>
              {facultad.NOMBRE_FACULTAD}
            </option>
          ))}
        </select>

        <label className="LabelCrear" htmlFor="carrera">Selecciona una carrera:</label>
        <select className="InputCrear" id="carrera" onChange={handleCarreraChange}>
          <option value={0}>Seleccione una carrera</option>
          {carreras.map(carrera => (
            <option key={carrera.COD_CARRERA} value={carrera.COD_CARRERA}>
              {carrera.NOMBRE_CARRERA}
            </option>
          ))}
        </select>
      </div>
    )}
  </div>




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