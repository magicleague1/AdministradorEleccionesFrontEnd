import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../css/Asignacion.css";

function ListaMesas({ eleccionId }) {
  const [Mesas, setMesas] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/listarMesasAsignadasPorEleccion/${eleccionId}`)
      .then((response) => {
        const data = response.data;
        setMesas(data);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de mesas:', error);
      });
  }, [eleccionId]);

  return (
    <div className="ListaComitePadre">
      {Mesas.map((mesa, index) => (
        <div key={index}>
          <div className='ContenedorConvocatoriaTexto'>
            <div className="LabelCrearConvocatoriaM">Facultad:</div>
            <div className="NormalConvocatoriaM">{mesa.facultad}</div>
          </div>
          <div className='ContenedorConvocatoriaTexto'>
            <div className="LabelCrearConvocatoriaM">Fecha de la eleccion:</div>
            <div className="NormalConvocatoriaM">{mesa.fecha_eleccion}</div>
          </div>
          <div>
            <h3 className='H3LISTA'>Carreras:</h3>
            <ul>
              {mesa.carreras.map((carrera, idx) => (
                <li key={idx}>
                  <div className='ContenedorConvocatoriaTexto'>
                    <div className="LabelCrearConvocatoriaM">Nombre de la carrera:</div>
                    <div className="NormalConvocatoriaM">{carrera.nombre_carrera}</div>
                  </div>
                  <div className='ContenedorConvocatoriaTexto'>
                    <div className="LabelCrearConvocatoriaM">Total de mesas:</div>
                    <div className="NormalConvocatoriaM">{carrera.total_mesas_por_carrera}</div>
                  </div>
                  <div>
                    <h4 className='H4LISTA'>Mesas:</h4>
                    <ul>
                      {carrera.mesas.map((mesaCarrera, idxMesa) => (
                        <li key={idxMesa}>
                          <div className='ContenedorConvocatoriaTexto'>
                            <div className="LabelCrearConvocatoriaM">Número de mesa:</div>
                            <div className="NormalConvocatoriaM">{mesaCarrera.numero_mesa}</div>
                          </div>
                          <div className='ContenedorConvocatoriaTexto'>
                            <div className="LabelCrearConvocatoriaM">Código de mesa:</div>
                            <div className="NormalConvocatoriaM">{mesaCarrera.cod_mesa}</div>
                          </div>
                          <div className='ContenedorConvocatoriaTexto'>
                            <div className="LabelCrearConvocatoriaM">Apellidos de estudiantes:</div>
                            <div className="NormalConvocatoriaM">{mesaCarrera.apellidos_estudiantes}</div>
                          </div>
                        </li>
                      ))}
                    </ul>
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
