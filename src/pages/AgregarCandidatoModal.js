import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "../css/AgregarFrenteModal.css";
import Swal from 'sweetalert2';
Modal.setAppElement("#root");

const AgregarCandidatoModal  = ({ isOpen, closeModal }) =>{
    const listaOpciones =["opcion 1","opcion 2", "opcion 3", "opcion 4"];
    const [selectedOption, setSelectedOption] = useState("Seleccionar Cargo");
    const [ci,setCi] = useState("");
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
        if (ci == "" ) {
            Swal.fire({
                icon: 'error',
                title: 'Error al guardar el candidato',
                text: `El carnet de identidad No puede estar en blanco`
              });
              return;// No continúa con la acción si no es válido
        }else if (!regex.test(ci)){
              Swal.fire({
                icon: 'error',
                title: 'Error al guardar el candidato',
                text: `El carnet de identidad solo debe tener números`
              });
              return;// No continúa con la acción si no es válido
        }else if(selectedOption == "Seleccionar Cargo"){
            Swal.fire({
                icon: 'error',
                title: 'Error al guardar el candidato',
                text: `Seleccione un cargo`
              });
              return;// No continúa con la acción si no es válido
        }
        Swal.fire({
            icon: 'success',
            title: 'Candidato guardado correctamente',
            text: `El candidato se ha actualizado con éxito!`
          })
        // Aquí puedes realizar la acción de guardar si la validación es exitosa
        toogle();
    }

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
                <input className="entradaOpciones"value={ci} onChange={handleCi}/>
                <h2 className="tituloOpciones">Cargo</h2>
                <select className="entradaOpciones" value={selectedOption} onChange={handleSelectChange}>
                    <option className="entradaOpciones" defaultValue="Seleccionar Cargo" hidden>Seleccionar Cargo</option>
                    {listaOpciones.map((opcion, index) => (
                        <option className="entradaOpciones" key={index} value={opcion}>
                            {opcion}
                        </option>
                    ))}
                </select>
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