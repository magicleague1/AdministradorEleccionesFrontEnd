import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "../css/AgregarFrenteModal.css";
import Swal from 'sweetalert2';
import axios from "axios";
Modal.setAppElement("#root");

const AgregarCandidatoModal  = ({ isOpen, closeModal, frenteId}) =>{
    const initialState = {
        codFrente:"",
        carnetIdentidad: "",
        cargoPostulado: "",
 
      };
    
    const [selectedOption, setSelectedOption] = useState("Seleccionar Cargo");
    const [ci,setCi] = useState("");
    const [formData, setFormData] = useState(initialState);
    const url = process.env.REACT_APP_VARURL;
    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value); // Actualiza el estado cuando se selecciona una opción
    };
    const handleCi = (event) => {
        setCi(event.target.value);
    }
    const toogle = () =>{
        setCi("");
        setSelectedOption("Seleccionar Cargo");
        closeModal();
    }
    const handleGuardar = () => {
        // Verificar que el Carnet de Identidad solo contenga caracteres numéricos
        const regex = /^[0-9]+$/;
        if (formData.carnetIdentidad == "" ) {
            Swal.fire({
                icon: 'error',
                title: 'Error al guardar el candidato',
                text: `El carnet de identidad No puede estar en blanco`
              });
              return;// No continúa con la acción si no es válido
        }
        //  if (!regex.test(formData.carnetIdentidad)){
        //        Swal.fire({
        //          icon: 'error',
        //          title: 'Error al guardar el candidato',
        //          text: `El carnet de identidad solo debe tener números`
        //        });
        //        return;// No continúa con la acción si no es válido
        //  } 
         if (formData.cargo == "" ) {
            Swal.fire({
                icon: 'error',
                title: 'Error al guardar el candidato',
                text: `El cargo No puede estar en blanco`
              });
              return;
            }
            const nuevoCantidato = {
                COD_FRENTE: frenteId,
                CARNETIDENTIDAD: formData.carnetIdentidad,
                CARGO_POSTULADO: formData.cargo,
            
              };
              console.log(nuevoCantidato);
            axios.post(url + "frentes/asignarCandidatos", nuevoCantidato)
            .then((response) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Candidato guardado correctamente',
                    text: `El candidato se ha actualizado con éxito!`
                  }).then(() => {
                closeModal();
                setFormData(initialState);
              });
            })
            .catch((error) => {
              Swal.fire({
                icon: 'error',
                title: 'Error al agregar un candidato ',
                text: `Ocurrió un error al agregar un candidato al frente politico: ${error}`
              });
            });

        ///if(selectedOption == "Seleccionar Cargo"){
        //     Swal.fire({
        //         icon: 'error',
        //         title: 'Error al guardar el candidato',
        //         text: `Seleccione un cargo`
        //       });
        //       return;// No continúa con la acción si no es válido
        // }
       
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    return(
        <Modal 
            className={"modalFrente"}
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Frentes politicos"
            shouldCloseOnOverlayClick={true}
        >
            <h3 className="tituloPfrente">AGREGAR CANDIDATO</h3>
            <div className="contenedorCandidatos">
                <h2 className="tituloOpciones">Carnet de Identidad</h2>
                <input
                    className="entradaOpciones"
                    type="text"
                    name="carnetIdentidad"
                    value={formData.carnetIdentidad}
                    onChange={handleInputChange}
                />
                {/* <input className="entradaOpciones"value={formData.carnetIdentidad} onChange={handleCi}/> */}
                <h2 className="tituloOpciones">Cargo</h2>
                <input
                    className="entradaOpciones"
                    type="text"
                    name="cargo"
                    value={formData.cargo}
                    onChange={handleInputChange}
                />
                {/* <select className="entradaOpciones" value={selectedOption} onChange={handleSelectChange}>
                    <option className="entradaOpciones" defaultValue="Seleccionar Cargo" hidden>Seleccionar Cargo</option>
                    {listaOpciones.map((opcion, index) => (
                        <option className="entradaOpciones" key={index} value={opcion}>
                            {opcion}
                        </option>
                    ))}
                </select> */}
                <button className="custom-btn botonGuardarC" onClick={handleGuardar}>
                    Guardar
                </button>
                <button className="custom-btn botonvfrente" onClick={() => toogle()}>
                    Cancelar
                </button>
            </div>
        </Modal>
    )
}
export default AgregarCandidatoModal;