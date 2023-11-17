import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SustitucionDeVocal = ({ codComite }) => {
  const [vocales, setVocales] = useState([]);
  const [vocales2, setVocales2] = useState([]);
  console.log('Vocales del comité:', codComite);
  useEffect(() => {
    // Realizar una solicitud GET para obtener la lista de vocales del comité
    if (codComite) {
      axios.get(`http://localhost:8000/ver_lista_comite_id/${codComite}`)
        .then((response) => {
          const data = response.data;
          setVocales(data.titulares);
          setVocales2(data.suplentes);
          
        })
        .catch((error) => {
          console.error('Error al obtener la lista de vocales:', error);
        });
    }
  }, [codComite]);

  const handleActualizarDatos = (vocal) => {
    // Verificar si existe un permiso para el vocal en la tabla permisos
    axios.get(`http://localhost:8000/verificarPermiso/${vocal.COD_SIS}/${codComite}`)
      .then((response) => {
        const tienePermiso = response.data.tiene_permiso;
  
        if (tienePermiso) {
          // Realizar una solicitud POST para actualizar los datos
          axios.post('http://localhost:8000/actualizarDatos', {
            cod_comite_actual: codComite,
            cod_sis_actual: vocal.COD_SIS,
            cod_sis_nuevo: vocal.nuevoCodSis,
          })
            .then((response) => {
              console.log('Datos actualizados correctamente:', response.data);
              // Actualizar localmente la lista de vocales con el nuevo código SIS
              setVocales((prevVocales) =>
                prevVocales.map((prevVocal) =>
                  prevVocal.COD_SIS === vocal.COD_SIS
                    ? { ...prevVocal, COD_SIS: vocal.nuevoCodSis }
                    : prevVocal
                )
              );
            })
            .catch((error) => {
              console.error('Error al actualizar los datos:', error);
            });
        } else {
          // Mostrar mensaje de que no tiene permiso
          alert('No tiene permiso para realizar esta acción.');
        }
      })
      .catch((error) => {
        console.error('Error al verificar el permiso:', error);
      });
  };

  return (
    <div>
      <h2>Sustitución de Vocal</h2>
      <h3>Código del Comité: {codComite}</h3>
      
      <h3>Vocales del Comité TiTULAR:</h3>
      <ul>
        {vocales.map((vocal, index) => (
          <li key={index}>
            {vocal.NOMBRE} {vocal.APELLIDO} (Código SIS: {vocal.COD_SIS})  {vocal.ESTUDIANTE === 1 ? 'Estudiante' : 'Docente'}
            
            <div>
              <label>Nuevo Código SIS:</label>
              <input
                type="text"
                value={vocal.nuevoCodSis || ''}
                onChange={(e) => {
                  const nuevoCodSis = e.target.value;
                  setVocales((prevVocales) =>
                    prevVocales.map((prevVocal) =>
                      prevVocal.COD_SIS === vocal.COD_SIS
                        ? { ...prevVocal, nuevoCodSis }
                        : prevVocal
                    )
                  );
                }}
              />
              <button onClick={() => handleActualizarDatos(vocal)}>Confirmar Sustitución</button>
            </div>
          </li>
        ))}
      </ul>
      <h3>Vocales del Comité Suplentes:</h3>
      <ul>
        {vocales2.map((vocal, index) => (
          <li key={index}>
            {vocal.NOMBRE} {vocal.APELLIDO} (Código SIS: {vocal.COD_SIS})  {vocal.ESTUDIANTE === 1 ? 'Estudiante' : 'Docente'}
            <div>
              <label>Nuevo Código SIS:</label>
              <input
                type="text"
                value={vocal.nuevoCodSis || ''}
                onChange={(e) => {
                  const nuevoCodSis = e.target.value;
                  setVocales2((prevVocales) =>
                    prevVocales.map((prevVocal) =>
                      prevVocal.COD_SIS === vocal.COD_SIS
                        ? { ...prevVocal, nuevoCodSis }
                        : prevVocal
                    )
                  );
                }}
              />
              <button onClick={() => handleActualizarDatos(vocal)}>Confirmar Sustitución</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SustitucionDeVocal;
