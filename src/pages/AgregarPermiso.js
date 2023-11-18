import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CheckIcon from '@mui/icons-material/Check';
import Swal from 'sweetalert2';

const AgregarPermiso = ({ cod_sis, cod_comite }) => {
  const [motivo, setMotivo] = useState('');
  const [comprobanteEntregado, setComprobanteEntregado] = useState(false);

  useEffect(() => {
    // Realizar una solicitud GET para obtener el estado de comprobante_entregado
    axios.get(`${process.env.REACT_APP_VARURL}obtenerEstadoComprobante/${cod_sis}/${cod_comite}`)
      .then(response => {
        // Actualizar el estado del checkbox con el valor obtenido del servidor
        setComprobanteEntregado(response.data.comprobante_entregado === 1);
      })
      .catch(error => {
        console.error('Error al obtener el estado del comprobante:', error);
      });
  }, [cod_sis, cod_comite]);

  
useEffect(() => {
    // Realizar una solicitud GET para obtener el estado de comprobante_entregado
    axios.get(`${process.env.REACT_APP_VARURL}obtenerEstadoComprobanteAtiempo/${cod_sis}/${cod_comite}`)
      .then(response => {
        // Actualizar el estado del comprobante
        setEstadoComprobante(response.data.estado);
      })
      .catch(error => {
        console.error('Error al obtener el estado del comprobante:', error);
      });
  }, [cod_sis, cod_comite]);

  const agregarPermiso = () => {

    axios.post(process.env.REACT_APP_VARURL+'permisos', {
      cod_sis: cod_sis,
      cod_comite: cod_comite,
      motivo: motivo,
      comprobante_entregado: comprobanteEntregado ? 1 : 0,
    })
    .then(response => {
      console.log(response.data);
      Swal.fire({
        icon: 'success',
        title: 'Asignación exitosa',
        text: 'La asignación del permiso se realizó con éxito.'
      })
      // Aquí puedes manejar la respuesta del servidor, por ejemplo, mostrar un mensaje de éxito.
    })
    .catch(error => {
      Swal.fire({
        icon: 'error',
        title: 'Error en la asignación ',
        text: `Ocurrió un error en la asignación de permisos`
      });
      console.error('Error al agregar permiso:', error);
      // Aquí puedes manejar errores, mostrar mensajes al usuario, etc.
    });
  };

  const [estadoComprobante, setEstadoComprobante] = useState('');


  const handleComprobanteEntregado = () => {
    axios.post(process.env.REACT_APP_VARURL+'procesarComprobanteEntregado', {
      cod_sis,
      cod_comite,
      comprobante_entregado: !comprobanteEntregado ? 1 : 0,
    })
      .then((response) => {
        console.log('Procesamiento del comprobante entregado:', response.data);
        setComprobanteEntregado(!comprobanteEntregado);
      })
      .catch((error) => {
        console.error('Error al procesar el comprobante entregado:', error);
      });
  };

  return (
    <div>
       <h3 className="vocal-name">Agregar Permiso </h3>
      <div>
        <label className="vocal-name" >Motivo:</label>
        <input type="text" value={motivo} onChange={(e) => setMotivo(e.target.value)} />
        <button onClick={agregarPermiso}><CheckIcon fontSize="small" /></button>
      </div>
      <div>
      {/* ... (otras partes del código) */}
      {estadoComprobante === 'entregado_a_tiempo' && <p className="vocal-name">Comprobante entregado a tiempo</p>}
      {estadoComprobante === 'entregado_con_retraso' && <p className="vocal-name">Comprobante entregado con retraso</p>}
      {estadoComprobante === 'no_entregado' && <p className="vocal-name">Comprobante no entregado</p>}
    </div>
      <div>
        <label className="vocal-name">Comprobante Entregado:</label>
        <input
          type="checkbox"
          checked={comprobanteEntregado}
          onChange={handleComprobanteEntregado}
        />
      </div>
     
    </div>
  );
};

export default AgregarPermiso;
