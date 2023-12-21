import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedAuthenticated = localStorage.getItem('authenticated') === 'true';
  const [authenticated, setAuthenticated] = useState(storedAuthenticated);

  const login = () => {
    setAuthenticated(true);
    localStorage.setItem('authenticated', 'true');
  };

  const logout = () => {
    setAuthenticated(false);
    localStorage.setItem('authenticated', 'false');
  };

  return (
    <AuthContext.Provider value={{ authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  console.log('useAuth', context.authenticated);
  return context;
};