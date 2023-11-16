import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AgregarPermiso from './AgregarPermiso'; // Ajusta la ruta según la ubicación real del componente

const PermisoDeVocal = ({ codComite }) => {
  const [vocales, setVocales] = useState([]);
  const [vocales2, setVocales2] = useState([]);

  useEffect(() => {
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
    axios.post('http://localhost:8000/actualizarDatos', {
      cod_comite_actual: codComite,
      cod_sis_actual: vocal.COD_SIS,
      cod_sis_nuevo: vocal.nuevoCodSis,
    })
      .then((response) => {
        console.log('Datos actualizados correctamente:', response.data);
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
  };

  return (
    <div>
      <h2>Sustitución de Vocal</h2>
      <h3>Código del Comité: {codComite}</h3>
      <h3>Vocales del Comité Titular:</h3>
      <ul>
        {vocales.map((vocal, index) => (
          <li key={index}>
            {vocal.NOMBRE} {vocal.APELLIDO} (Código SIS: {vocal.COD_SIS}) {vocal.ESTUDIANTE === 1 ? 'Estudiante' : 'Docente'}
            <div>
              <AgregarPermiso cod_sis={vocal.COD_SIS} cod_comite={codComite} />
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
              <AgregarPermiso cod_sis={vocal.COD_SIS} cod_comite={codComite} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PermisoDeVocal;
