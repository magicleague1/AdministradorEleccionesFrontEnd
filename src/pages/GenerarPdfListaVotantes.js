import React, { useState, useEffect } from 'react';
import { Button, styled, Typography, Dialog, DialogTitle, DialogContent } from "@mui/material";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import axios from "axios";
import Swal from "sweetalert2";

const StyledButton = styled(Button)({
  marginBottom: '15px',
  fontWeight: 'bold',
  textTransform: 'none',
});

const StyledIcon = styled('span')({
  marginRight: '8px',
});

const StyledPDFEmbed = styled('embed')({
  width: '100%',
  height: '350px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  marginTop: '20px',
});

const GenerarPdfListaVotantes = ({ isOpen, closeModal, codMesa }) => {
  const [pdfSrc, setPdfSrc] = useState('');
  const [modalPP, setModalPP] = useState(false);
  const [botonesDeshabilitados, setBotonesDeshabilitados] = useState({});

  const url = process.env.REACT_APP_VARURL;

  useEffect(() => {
    setBotonesDeshabilitados({});
    setModalPP(isOpen);
  }, [isOpen, codMesa]);


  const closeModalADDFP = () => {
    setModalPP(false);
  };

  const handleVolverAtras = (event) => {
    event.stopPropagation();
    closeModal();
  };

  const handleGetPDF = async (event) => {
    event.stopPropagation();
    try {
      console.log("PDF boletas", codMesa);
      const response = await axios.get(url + `obtenerDatosPorMesaYGenerarPDF/${codMesa}`);

      const data = response.data;

      if (data && data.pdf) {
        setPdfSrc(data.pdf);
      }
    } catch (error) {
      console.error("Error al obtener el PDF", error);
    }
  };
  const verificarExistenciaLista = async (eleccionId) => {
    try {
      const response = await axios.get(url + `obtenerDatosPorMesaYGenerarPDF/${codMesa}`);
      return response.data.existeLista; // Ajusta esto según la estructura de tu respuesta
    } catch (error) {
      console.error("Error al verificar la existencia de la boleta:", error);
      return false;
    }
  };
  const handleGetListaVotantes = async (event) => {
    event.stopPropagation();
    try {
      const existeBoleta = await verificarExistenciaLista(codMesa);
  
      if (!existeBoleta) {
        Swal.fire({
          icon: "error",
          title: "Generacion incorrecta",
          text: "Ya se genero Lista de Votantes, solo haga click en descargar",
          customClass: {
            container: 'swal-container',
          },
          onOpen: (modalElement) => {
            document.body.appendChild(modalElement);
            modalElement.style.zIndex = 100000; // Establecer un valor alto para el z-index
          },
        });
        return;
      }
  
      await axios.post(url + `/generarListasVotantes/${codMesa}`);
  
      Swal.fire({
        icon: "success",
        title: "Generacion exitosa",
        text: "La generacion de Lista de votantes se realizó con éxito.",
        customClass: {
          container: 'swal-container',
        },
        onOpen: (modalElement) => {
          document.body.appendChild(modalElement);
          modalElement.style.zIndex = 100001; // Ajustar según sea necesario
        },
      });
  
    } catch (error) {
      console.error("Error en la Generacion:", error);
      Swal.fire({
        icon: "error",
        title: "Error en la generacion",
        text: "Ocurrió un error en la generacion de Lista de votantes.",
        customClass: {
          container: 'swal-container',
        },
        onOpen: (modalElement) => {
          document.body.appendChild(modalElement);
          modalElement.style.zIndex = 100002; // Ajustar según sea necesario
        },
      });
    }
   
  };

  return (
    <Dialog open={modalPP} onClose={closeModalADDFP} fullWidth maxWidth="md">
      <DialogTitle>
        <Typography variant="h4" gutterBottom style={{ textAlign: 'center', marginBottom: '28px' }}>
          LISTA VOTANTES- CODIGO MESA: {codMesa}
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <StyledButton
          variant="contained"
          color="primary"
          onClick={(event) => handleGetListaVotantes(event)}
          disabled={botonesDeshabilitados[codMesa]}
          startIcon={<StyledIcon><CloudDownloadIcon /></StyledIcon>}
          sx={{ marginRight: '13px' }}
        >
          Generar Boletas
        </StyledButton>
        <StyledButton
          variant="contained"
          color="primary"
          onClick={(event) => handleGetPDF(event)}
          startIcon={<StyledIcon><CloudDownloadIcon /></StyledIcon>}
          sx={{ marginRight: '13px' }}
        >
          Descargar PDF
        </StyledButton>
       
      </DialogContent>

      {pdfSrc && (
        <StyledPDFEmbed src={`data:application/pdf;base64,${pdfSrc}`} type="application/pdf" />
      )}
      <StyledButton
        variant="contained"
        color="secondary"
        className="custom-btn btn-8"
        onClick={(event) => handleVolverAtras(event)}
      >
        Cerrar
      </StyledButton>
      
    </Dialog>
  );
};

export default GenerarPdfListaVotantes;