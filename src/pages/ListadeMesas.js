import React, { useEffect, useState } from 'react';
import axios from 'axios';
import  "../css/Asignacion.css"


function ListaMesas({ idComite }) {
  const [titulares, setTitulares] = useState([]);
  const [suplentes, setSuplentes] = useState([]);

  useEffect(() => {
    // Realizar una solicitud GET para obtener los datos de titulares y suplentes
    axios.get(`http://localhost:8000/ver-lista-comite/${idComite}`)
      .then((response) => {
        console.log(response.data)
        const data = response.data;
        setTitulares(data.titulares);
        setSuplentes(data.suplentes);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de comité:', error);
      });
  }, [idComite]);
  
  return (
    <div className="ListaComitePadre">
            <div>
            <div className='ContenedorConvocatoriaTexto'>
                <div className="LabelCrearConvocatoriaM">Facultad:</div>
                <div className="NormalConvocatoriaM">Facultad Ciencias y Tecnologia</div>
            </div>
            <div className='ContenedorConvocatoriaTexto'>
                <div className="LabelCrearConvocatoriaM">Fecha de la eleccion:</div>
                <div className="NormalConvocatoriaM">2023/02/23</div>
            </div>
            <div>
              <h3 className='H3LISTA'>Carreras:</h3>
              <ul>
                {suplentes.map((suplente) => (
                  <li key={suplente.CARNETIDENTIDAD}>
                   <div className='ContenedorConvocatoriaTexto'>
                        <div className="LabelCrearConvocatoriaM">Nombre de la carrera:</div>
                        <div className="NormalConvocatoriaM">Ingeneria de sistemas</div>
                    </div>
                    <div className='ContenedorConvocatoriaTexto'>
                        <div className="LabelCrearConvocatoriaM">Total de mesas:</div>
                        <div className="NormalConvocatoriaM">3</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            </div>

    </div>
     
  );
}

export default ListaMesas;
