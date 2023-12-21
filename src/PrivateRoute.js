import React from 'react';
import { Route, Navigate } from 'react-router-dom'; // Asegúrate de importar Route desde react-router-dom
import { useAuth } from './AuthContext';


const PrivateRoute = ({ children }) => {
  const { authenticated } = useAuth();

  if (!authenticated) {
    return <Navigate to="/login" />;
  }

  return <React.Fragment>{children}</React.Fragment>;
};

export default PrivateRoute;