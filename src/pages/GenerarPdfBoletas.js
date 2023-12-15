import React, { useState } from 'react';
import { Button, styled, Typography, Dialog, DialogTitle, DialogContent, Snackbar } from "@mui/material";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CreateIcon from '@mui/icons-material/Create';
import MuiAlert from '@mui/material/Alert';
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
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const url = process.env.REACT_APP_VARURL;

  const handleVolverAtras = () => {
    closeModal();
  };

  const handleGetPDF = async () => {
    try {
      const response = await axios.get(url + `generarBoletasPDF/${eleccionId}`);
      const data = response.data;
      if (data && data.pdf) {
        setPdfSrc(data.pdf);
      }
    } catch (error) {
      console.error("Error al obtener el PDF", error);
    }
  };

  const handleGetBoletas = async (event) => {
    event.stopPropagation();
    try {
      const existeBoleta = await verificarExistenciaBoletas();

      if (!existeBoleta) {
        setSnackbarMessage("Ya se generó boleta electoral, solo haga clic en descargar");
        setSnackbarOpen(true);
        return;
      }

      await axios.post(url + `generar_boletas/${eleccionId}`);

      setSnackbarMessage("La generación de boletas electorales se realizó con éxito.");
      setSnackbarOpen(true);

    } catch (error) {
      console.error("Error en la Generacion:", error);
      setSnackbarMessage("Ocurrió un error en la generación de boletas electorales.");
      setSnackbarOpen(true);
    }
  };

  const verificarExistenciaBoletas = async () => {
    try {
      const response = await axios.get(`${url}generarBoletasPDF/${eleccionId}`);
      return response.data.existeBoleta;
    } catch (error) {
      console.error("Error al verificar la existencia de la boleta:", error);
      return false;
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
    <Dialog
    open={isOpen}
    onClose={() => { }}
    fullWidth
    maxWidth="md"
    BackdropProps={{
      style: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
      invisible: false,
    }}
    PaperProps={{
      style: { zIndex: 100000 },
    }}
  >
      <DialogTitle>
        <Typography variant="h4" gutterBottom style={{ textAlign: 'center', marginBottom: '28px' }}>
          BOLETA ELECTORAL
        </Typography>
      </DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <StyledButton
          variant="contained"
          color="primary"
          onClick={(event) => handleGetBoletas( event)}
          handleGetBoletas
          startIcon={<StyledIcon><CreateIcon /></StyledIcon>}
          sx={{ marginRight: '13px', backgroundColor: '#7f00b2' }}
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
        className="custom-btn btn-8" onClick={handleVolverAtras}>
        Cerrar
      </StyledButton>
    </Dialog>
    
    <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity="info" // You can customize the severity based on your needs
          sx={{ width: '100%', maxWidth: '600px', fontSize: '1.2rem', padding: '20px' }} // Adjust the font size and padding
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default GenerarPdfBoletas;