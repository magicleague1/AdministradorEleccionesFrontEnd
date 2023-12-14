import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CheckIcon from '@mui/icons-material/Check';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';

const AgregarPermiso = ({ cod_sis, cod_comite }) => {
  const [motivo, setMotivo] = useState('');


  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_VARURL}obtenerEstadoComprobanteAtiempo/${cod_sis}/${cod_comite}`)
      .then(response => {
        
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
    </div>
  );
};

export default AgregarPermiso;