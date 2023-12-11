import React, { useState } from 'react';
import CrearPublicaConv from './CrearPublicaConv';
import { Button, Container, styled, Modal,Typography,Dialog,
  DialogTitle,
  DialogContent } from "@mui/material";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import PublishIcon from '@mui/icons-material/Publish';
import "../css/GenerarPdf.css";


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
    const response = await fetch(`${process.env.REACT_APP_VARURL}generarBoletasPDF/${eleccionId}`);
    const data = await response.json();

    if (data && data.pdf) {
      setPdfSrc(data.pdf);
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