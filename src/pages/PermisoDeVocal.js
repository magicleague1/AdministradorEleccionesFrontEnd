import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AgregarPermiso from './AgregarPermiso'; // Ajusta la ruta según la ubicación real del componente

const PermisoDeVocal = ({ codComite }) => {
  const [vocales, setVocales] = useState([]);
  const [vocales2, setVocales2] = useState([]);

  useEffect(() => {
    if (codComite) {
      axios.get(`${process.env.REACT_APP_VARURL}ver_lista_comite_id/${codComite}`)
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
    axios.post(process.env.REACT_APP_VARURL+'actualizarDatos', {
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
    <div className="ListaComitePadre">
      <h3 className='H3LISTA'>Código del Comité: {codComite}</h3>
      <h3 className='H3LISTA' >Vocales del Comité Titular:</h3>
      <ul>
        {vocales.map((vocal, index) => (
          <li key={index}>
              <span h3 className='H3LISTA' style={{ color: 'black' }}> {vocal.NOMBRE} {vocal.APELLIDO} (Código SIS: {vocal.COD_SIS}) {vocal.ESTUDIANTE === 1 ? 'Estudiante' : 'Docente'} </span>
            <div className="vocal-item" >
              <AgregarPermiso cod_sis={vocal.COD_SIS} cod_comite={codComite} />
            </div>
          </li>
        ))}
      </ul>
      <h3 className='H3LISTA'>Vocales del Comité Suplentes:</h3>
      <ul>
        {vocales2.map((vocal, index) => (
          <li key={index}>
             <span className="vocal-name">  {vocal.NOMBRE} {vocal.APELLIDO} (Código SIS: {vocal.COD_SIS})  {vocal.ESTUDIANTE === 1 ? 'Estudiante' : 'Docente'}</span>
            <div className="vocal-item">
              <AgregarPermiso cod_sis={vocal.COD_SIS} cod_comite={codComite} />
            </div >
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PermisoDeVocal;
