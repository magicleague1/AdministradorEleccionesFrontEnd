import React, { useState} from "react";
import {
  Container,
  Grid,
  Typography,
  FormControl,
  TextField,
  Button,
  Box,
  Paper,
  styled,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";

const StyledContainer = styled(Container)({
  paddingTop: '12px',
  paddingBottom: '32px',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 56, 116, 0.564)',
});

const StyledPaper = styled(Paper)({
  padding: '32px',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: 'auto',
  marginTop: '85px',
  width: '80%',
});

const StyledFormControl = styled(FormControl)({
  width: '45%',
  marginBottom: '10px',
  marginLeft:'10px'
});

const StyledButtonGroup = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',  
  textAlign: 'center',
  width: '100%',
});

const StyledButton = styled(Button)({
  marginLeft: '20px',
});

const AgregarUsuarios = () => {
    const url = process.env.REACT_APP_VARURL;
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [carnets, setCarnets] = useState(['', '', '', '', '']);

  const handleCarnetChange = (index, value) => {
    const newCarnets = [...carnets];
    newCarnets[index] = value;
    setCarnets(newCarnets);
  };


  const handleRegistrarUsuarios = async () => {
    try {
         await fetch(`${url}registrarCincoUsuarios`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ carnets }),
          });
    
      handleSnackbarOpen('success', 'Usuarios registrados correctamente');
    }catch{
        handleSnackbarOpen('error', 'Error al registrar usuarios');
    }
     
  };
  const handleVolverAtras = () => {

  };
  const handleSnackbarOpen = (severity, message) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };
    return (
      <StyledContainer  >
        <StyledPaper >
        <Typography variant="h4" gutterBottom style={{textAlign:'center', marginBottom: '28px'}}>
          CREACION DE USUARIOS TRIBUNAL ELECTORAL
        </Typography>
        <Grid container spacing={4} >
          <Grid item xs={12} md={12} >
          {carnets.map((carnet, index) => (
            <StyledFormControl>
            <TextField
              key={index}
              fullWidth
              margin="normal"
              label={`Carnet ${index + 1}`}
              variant="outlined"
              value={carnet}
              onChange={(e) => handleCarnetChange(index, e.target.value)}
            />
             </StyledFormControl>
          ))}
         </Grid>
         
         <StyledButtonGroup>
              <StyledButton
                variant="contained"
                color="primary"
                onClick={handleRegistrarUsuarios}
              >
                Registrar usuario
              </StyledButton>
              <StyledButton
                variant="contained"
                color="secondary"
                type="reset" 
              >
                Cancelar
              </StyledButton>
            </StyledButtonGroup>
            </Grid>
        
      </StyledPaper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: '100%', maxWidth: '600px', fontSize: '1.2rem', padding: '20px' }}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </StyledContainer>
  );
};

export default AgregarUsuarios;