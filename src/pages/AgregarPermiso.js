import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CheckIcon from '@mui/icons-material/Check';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2';

const AgregarPermiso = ({ cod_sis, cod_comite }) => {
  const [motivo, setMotivo] = useState('');
  const [comprobanteEntregado, setComprobanteEntregado] = useState(false);
  const [estadoComprobante, setEstadoComprobante] = useState('');

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_VARURL}obtenerEstadoComprobanteAtiempo/${cod_sis}/${cod_comite}`)
      .then(response => {
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
      });
    })
    .catch(error => {
      Swal.fire({
        icon: 'error',
        title: 'Error en la asignación ',
        text: 'Ocurrió un error en la asignación de permisos'
      });
      console.error('Error al agregar permiso:', error);
    });
  };

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
    <div >
      <div>
        <TextField
          label="Motivo"
          variant="outlined"
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
          style={{width:'50%', marginRight:'10px'}}
        />
        <Button variant="contained" onClick={agregarPermiso} startIcon={<CheckIcon />}>
          Agregar Permiso
        </Button>
      </div>
      <div>
        {estadoComprobante === 'entregado_a_tiempo' && <Typography variant="body1">Comprobante entregado a tiempo</Typography>}
        {estadoComprobante === 'entregado_con_retraso' && <Typography variant="body1">Comprobante entregado con retraso</Typography>}
        {estadoComprobante === 'no_entregado' && <Typography variant="body1">Comprobante no entregado</Typography>}
      </div>
      <div>
        <FormControlLabel
          control={
            <Checkbox
              checked={comprobanteEntregado}
              onChange={handleComprobanteEntregado}
            />
          }
          label="Comprobante Entregado"
        />
      </div>
    </div>
  );
};

export default AgregarPermiso;