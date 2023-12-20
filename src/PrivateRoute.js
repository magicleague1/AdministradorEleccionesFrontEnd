import React from 'react';
import { Route, Navigate } from 'react-router-dom'; // Asegúrate de importar Route desde react-router-dom
import { useAuth } from './AuthContext';

const PrivateRoute = ({ element, ...props }) => {
  const { authenticated } = useAuth();

  return authenticated ? (
    <Route {...props} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;