import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AgregarPermiso = ({ cod_sis, cod_comite }) => {
  const [motivo, setMotivo] = useState('');
  const [comprobanteEntregado, setComprobanteEntregado] = useState(false);

  useEffect(() => {
    // Realizar una solicitud GET para obtener el estado de comprobante_entregado
    axios.get(`http://localhost:8000/obtenerEstadoComprobante/${cod_sis}/${cod_comite}`)
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
    axios.get(`http://localhost:8000/obtenerEstadoComprobanteAtiempo/${cod_sis}/${cod_comite}`)
      .then(response => {
        // Actualizar el estado del comprobante
        setEstadoComprobante(response.data.estado);
      })
      .catch(error => {
        console.error('Error al obtener el estado del comprobante:', error);
      });
  }, [cod_sis, cod_comite]);

  const agregarPermiso = () => {
    axios.post('http://localhost:8000/agregarPermiso', {
      cod_sis: cod_sis,
      cod_comite: cod_comite,
      motivo: motivo,
      comprobante_entregado: comprobanteEntregado ? 1 : 0,
    })
    .then(response => {
      console.log(response.data);
      // Aquí puedes manejar la respuesta del servidor, por ejemplo, mostrar un mensaje de éxito.
    })
    .catch(error => {
      console.error('Error al agregar permiso:', error);
      // Aquí puedes manejar errores, mostrar mensajes al usuario, etc.
    });
  };

  const [estadoComprobante, setEstadoComprobante] = useState('');


  const handleComprobanteEntregado = () => {
    axios.post('http://localhost:8000/procesarComprobanteEntregado', {
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
      <h2>Agregar Permiso</h2>
      <div>
        <label>Motivo:</label>
        <input type="text" value={motivo} onChange={(e) => setMotivo(e.target.value)} />
      </div>
      <div>
      {/* ... (otras partes del código) */}
      {estadoComprobante === 'entregado_a_tiempo' && <p>Comprobante entregado a tiempo</p>}
      {estadoComprobante === 'entregado_con_retraso' && <p>Comprobante entregado con retraso</p>}
      {estadoComprobante === 'no_entregado' && <p>Comprobante no entregado</p>}
    </div>
      <div>
        <label>Comprobante Entregado:</label>
        <input
          type="checkbox"
          checked={comprobanteEntregado}
          onChange={handleComprobanteEntregado}
        />
      </div>
      <button onClick={agregarPermiso}>Agregar Permiso</button>
    </div>
  );
};

export default AgregarPermiso;
