import React, { useState} from 'react';
import { Button, styled, Typography, Dialog, DialogTitle, DialogContent } from "@mui/material";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
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

const GenerarPdfListaVotantes = ({ isOpen, closeModal, codmesa }) => {
  const [pdfSrc, setPdfSrc] = useState('');
  const [modalPP, setModalPP] = useState(false);



  const url = process.env.REACT_APP_VARURL;

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
      const response = await axios.get(url + `obtenerDatosPorMesaYGenerarPDF/${codmesa}`);

      const data = response.data;

      if (data && data.pdf) {
        setPdfSrc(data.pdf);
      }
    } catch (error) {
      console.error("Error al obtener el PDF", error);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onClose={closeModalADDFP} fullWidth maxWidth="md">
        <DialogTitle>
          <Typography variant="h4" gutterBottom style={{ textAlign: 'center', marginBottom: '28px' }}>
            LISTA VOTANTES- CODIGO MESA: {codmesa}
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          
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

      
    </>
  );
};

export default GenerarPdfListaVotantes;