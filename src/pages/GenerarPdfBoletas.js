import React, { useState } from 'react';
import { Button, styled, Typography, Dialog, DialogTitle, DialogContent } from "@mui/material";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CreateIcon from '@mui/icons-material/Create';
import "../css/GenerarPdf.css";
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

const GenerarPdfBoletas = ({ isOpen, closeModal, eleccionId }) => {
  const [pdfSrc, setPdfSrc] = useState('');
  const url = process.env.REACT_APP_VARURL;

  const handleVolverAtras = () => {
    closeModal();
  };

  const verificarExistenciaBoletas = async (eleccionId) => {
    try {
      const response = await axios.get(`${url}generarBoletasPDF/${eleccionId}`);
      return response.data.existeBoleta; // Ajusta esto según la estructura de tu respuesta
    } catch (error) {
      console.error("Error al verificar la existencia de la boleta:", error);
      return false;
    }
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

  const handleGetBoletas = async (eleccionId) => {
    try {
      const existeBoleta = await verificarExistenciaBoletas(eleccionId);
  
      if (!existeBoleta) {
        Swal.fire({
          icon: "error",
          title: "Generacion incorrecta",
          text: "Ya se genero boleta electoral, solo haga click en descargar",
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
  
      await axios.post(url + `generar_boletas/${eleccionId}`);
  
      Swal.fire({
        icon: "success",
        title: "Generacion exitosa",
        text: "La generacion de boletas electorales se realizó con éxito.",
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
        text: "Ocurrió un error en la generacion de boletas electorales.",
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
    <Dialog open={isOpen} onClose={closeModal} fullWidth maxWidth="md">
      <DialogTitle>
        <Typography variant="h4" gutterBottom style={{ textAlign: 'center', marginBottom: '28px' }}>
          BOLETA ELECTORAL
        </Typography>
      </DialogTitle>
      <DialogContent sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <StyledButton
          variant="contained"
          color="primary"
          onClick={() => {
            handleGetBoletas(eleccionId,);
            Swal.fire({
              customClass: {
                container: 'swal-container',
              },
              onOpen: (modalElement) => {
                document.body.appendChild(modalElement);
                modalElement.style.zIndex = 100000; // Establecer un valor alto para el z-index
              },
            });
          }}
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
  );
};

export default GenerarPdfBoletas;