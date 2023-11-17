import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CheckIcon from '@mui/icons-material/Check';
import Swal from 'sweetalert2';
const SustitucionDeVocal = ({ codComite }) => {
  const [vocales, setVocales] = useState([]);
  const [vocales2, setVocales2] = useState([]);
  console.log('Vocales del comité:', codComite);
  useEffect(() => {
    // Realizar una solicitud GET para obtener la lista de vocales del comité
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
    // Verificar si existe un permiso para el vocal en la tabla permisos
    axios.get(`${process.env.REACT_APP_VARURL}verificarPermiso/${vocal.COD_SIS}/${codComite}`)
      .then((response) => {
        const tienePermiso = response.data.tiene_permiso;
  
        if (tienePermiso) {
          // Realizar una solicitud POST para actualizar los datos
          axios.post(process.env.REACT_APP_VARURL+'actualizarDatos', {
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
              Swal.fire({
                icon: 'success',
                title: 'Asignación exitosa',
                text: 'La asignación del comité y vocales se realizó con éxito.'
              })
            })
            .catch((error) => {
              console.error('Error al actualizar los datos:', error);
              Swal.fire({
                icon: 'error',
                title: 'Error en la asignación de vocales',
                text: `Ocurrió un error en la asignación de vocales`
              });
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
    <div className="ListaComitePadre">
            
              <h3 className='H3LISTA'>Código del Comité: {codComite} </h3>
              <h3 className='H3LISTA'>Vocales del Comité TiTULAR: </h3>
              <ul>
              {vocales.map((vocal, index) => (
                <li key={index}>
                   <span className="vocal-name">{vocal.NOMBRE} {vocal.APELLIDO} (Código SIS: {vocal.COD_SIS})  {vocal.ESTUDIANTE === 1 ? 'Estudiante' : 'Docente'} </span>
                  
                  <div className="vocal-item">
                  <span className="vocal-name">Ingrese el nuevo Código SIS: </span>
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
                    <button onClick={() => handleActualizarDatos(vocal)}><CheckIcon fontSize="small" /></button>
                  </div>
                </li>
              ))}
      </ul>
      <h3 className='H3LISTA' >Vocales del Comité Suplentes:</h3>
      <ul>
        {vocales2.map((vocal, index) => (
          <li key={index}>
           <span className="vocal-name">{vocal.NOMBRE} {vocal.APELLIDO} (Código SIS: {vocal.COD_SIS})  {vocal.ESTUDIANTE === 1 ? 'Estudiante' : 'Docente'}</span> 
            <div className="vocal-item">
              <span className="vocal-name">Ingrese el nuevo Código SIS:</span>
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
              <button onClick={() => handleActualizarDatos(vocal)}><CheckIcon fontSize="small" /></button>
            </div>
          </li>
        ))}
      </ul>

          
    </div>
  );
};

export default SustitucionDeVocal;
