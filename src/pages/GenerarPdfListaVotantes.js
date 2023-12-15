import React, { useState, useEffect } from 'react';
import { Button, styled, Typography, Dialog, DialogTitle, DialogContent, Snackbar } from "@mui/material";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import axios from "axios";
import MuiAlert from '@mui/material/Alert';

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
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
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
        setSnackbarSeverity("error");
        setSnackbarMessage("Ya se generó Lista de Votantes, solo haz clic en descargar");
        setSnackbarOpen(true);
        return;
      }

      await axios.post(url + `/generarListasVotantes/${codMesa}`);

      setSnackbarSeverity("success");
      setSnackbarMessage("La generación de Lista de votantes se realizó con éxito.");
      setSnackbarOpen(true);

    } catch (error) {
      console.error("Error en la Generación:", error);
      setSnackbarSeverity("error");
      setSnackbarMessage("Ocurrió un error en la generación de Lista de votantes.");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
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

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default GenerarPdfListaVotantes;