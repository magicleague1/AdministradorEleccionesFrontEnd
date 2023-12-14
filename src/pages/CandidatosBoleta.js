import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography } from '@mui/material';

const CandidatosBoletas = ({ frenteId }) => {
  const [candidatoPorFrente, setCandidatoPorFrente] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData2 = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_VARURL}obtenerCandidatosPorFrente/${frenteId}`);
        setCandidatoPorFrente(response.data);
      } catch (error) {
        console.error('Error al obtener los candidatos:', error);
        setError('Error al obtener los datos');
      } finally {
        setLoading(false);
      }
    };

    fetchData2();
  }, [frenteId]);



  return (
    <React.Fragment>
      {loading && <p>Cargando candidatos...</p>}
      {error && <p>Error: {error}</p>}
      {candidatoPorFrente.length > 0 && (
        <div>
          {candidatoPorFrente.map((candidato, index) => (
            <Typography key={index}>
              {candidato.NOMBRE} {candidato.APELLIDO}- {candidato.CARGO_POSTULADO}
            </Typography>
          ))}
        </div>
      )}
    </React.Fragment>
  );
};

export default CandidatosBoletas;