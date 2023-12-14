import React, { useState, useEffect } from 'react';
import CrearPublicaConv from './CrearPublicaConv';
import { Button, styled, Modal,Typography,Dialog,
  DialogTitle,
  DialogContent } from "@mui/material";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import "../css/GenerarPdf.css";
import axios from "axios";


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


const GenerarPdfBoletas = ({ isOpen, closeModal, eleccionId }) => {
  const [pdfSrc, setPdfSrc] = useState(''); 
  const [eleccionMId, setEleccionMId] = useState(0);
  const [modalPP, setModalPP] = useState(false);
  const [botonesDeshabilitados, setBotonesDeshabilitados] = useState({});

  const url = process.env.REACT_APP_VARURL;
  useEffect(() => {
    // Reiniciar el estado de botonesDeshabilitados cuando cambia la elección
    setBotonesDeshabilitados({});
  }, [eleccionId]);

  const openModalADDFP = (id) => {
    setEleccionMId(id);
    setModalPP(true);
  };

  const closeModalADDFP = () => {
    setModalPP(false);
  };
  const handleVolverAtras = () => {
    closeModal();
  };
  const handleGetPDF = async () => {
    try {
      console.log("PDF boletas", eleccionId)
      const response = await axios.get(url + `generarBoletasPDF/${eleccionId}`);
      
      const data = response.data; 
  
      if (data && data.pdf) {
        setPdfSrc(data.pdf);
      }
    } catch (error) {
      console.error("Error al obtener el PDF", error);
    }
  };
  const handleGetBoletas = async () => {
    if (!botonesDeshabilitados[eleccionId]) {
      // Deshabilita el botón específico para esta elección
      setBotonesDeshabilitados(prevState => ({
        ...prevState,
        [eleccionId]: true
      }));

      try {
        const response = await axios.post(url + `generar_boletas/${eleccionId}`);
        console.log('Generación de boletas exitosa', response.data);
      } catch (error) {
        console.error('Error al generar boletas', error);
      }
    }
  };


  return (
    <Dialog open={isOpen} onClose={closeModal} fullWidth maxWidth="md">
      <DialogTitle>
      <Typography variant="h4" gutterBottom style={{ textAlign: 'center', marginBottom: '28px' }}>
          BOLETA ELECTORAL
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',}}>
      <StyledButton
          variant="contained"
          color="primary"
          onClick={handleGetBoletas}
          disabled={botonesDeshabilitados[eleccionId]}
          startIcon={<StyledIcon><CloudDownloadIcon /></StyledIcon>}
          sx={{ marginRight: '13px' }}
        >
          Generar Boletas
        </StyledButton>
      <StyledButton
          variant="contained"
          color="primary"
          onClick={handleGetPDF}
          startIcon={<StyledIcon><CloudDownloadIcon /></StyledIcon>}
          sx={{ marginRight: '13px' }}
        >
          Descargar PDF
        </StyledButton>

      </DialogContent>
       
      {pdfSrc && (
        <StyledPDFEmbed src={`data:application/pdf;base64,${pdfSrc}`} type="application/pdf" />
      )}
       <StyledButton variant="contained"
            color="secondary"
            className="custom-btn btn-8"onClick={handleVolverAtras} >
        
          Cerrar
        </StyledButton>
      <Modal open={modalPP} onClose={closeModalADDFP}>
        
          <CrearPublicaConv
            isOpen={modalPP}
            closeModal={closeModalADDFP}
            eleccionId={eleccionMId}
          />
        
      </Modal>
    </Dialog>
  );
};

export default GenerarPdfBoletas;