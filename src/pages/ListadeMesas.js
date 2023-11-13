import React, { useEffect, useState } from 'react';
import axios from 'axios';
import  "../css/Asignacion.css"


function ListaMesas({eleccionId}) {
  const [Mesas, setMesas] = useState([]);
  
  console.log('----',eleccionId);
  useEffect(() => {
    // Realizar una solicitud GET para obtener los datos de titulares y suplentes
    axios.get(`http://localhost:8000/listarMesasAsignadasPorEleccion/${eleccionId}`)
      .then((response) => {
        const data = response.data;
        setMesas(data);
        console.log('>>>>>>>',response.data)
      })
      .catch((error) => {
        console.error('Error al obtener la lista de comité:', error);
      });
  }, []);
  
  return (
    <div className="ListaComitePadre">
            {Mesas.map((Mesas1 , index) => (   
              <div key={index}>
            <div className='ContenedorConvocatoriaTexto'>
                <div className="LabelCrearConvocatoriaM">Facultad:</div>
                <div className="NormalConvocatoriaM">{Mesas1.facultad}</div>
            </div>
            <div className='ContenedorConvocatoriaTexto'>
                <div className="LabelCrearConvocatoriaM">Fecha de la eleccion:</div>
                <div className="NormalConvocatoriaM">{Mesas1.fecha_eleccion}</div>
            </div>
            <div>
              <h3 className='H3LISTA'>Carreras:</h3>
              <ul>
              {Mesas1.carreras.map((carrera, idx) => (
            
               <li key={idx}>
                   <div className='ContenedorConvocatoriaTexto'>
                        <div className="LabelCrearConvocatoriaM">Nombre de la carrera:</div>
                        <div className="NormalConvocatoriaM">{carrera.nombre_carrera}</div>
                    </div>
                    <div className='ContenedorConvocatoriaTexto'>
                        <div className="LabelCrearConvocatoriaM">Total de mesas:</div>
                        <div className="NormalConvocatoriaM">{carrera.total_mesas_por_carrera}</div>
                    </div>
                  </li>
            
          ))}
                 
              </ul>
            </div>
            </div>
             ))}
     </div>
           
   
     
  );
}

export default ListaMesas;
