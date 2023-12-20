import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import LoginPage from './pages/LoginPage';
import IndexPage from './pages/IndexPage';
import MenuIzquierdo from './pages/MenuIzquierdo';
import GenerarPdfPreviewPublic from './pages/GenerarPdfPreviewPublic';
import GenerarPdfListaVotantesPublic from './pages/GenerarPdfListaVotantesPublic';

const PrivateRoute = ({ children }) => {
  const { authenticated } = useAuth();

  return authenticated ? (
    <React.Fragment>{children}</React.Fragment>
  ) : (
    <Navigate to="/login" replace />
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <MenuIzquierdo />
              </PrivateRoute>
            }
          />
           <Route path="/pdfPublicado/:id" element={<GenerarPdfPreviewPublic />} />
        <Route path="/pdfPublicadoLista/:id" element={<GenerarPdfListaVotantesPublic />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;