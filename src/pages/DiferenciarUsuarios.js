import React, { createContext, useContext, useState } from 'react';

const diferenciarUsuarios = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    // Lógica de autenticación y asignación de roles
    setUser(userData);
  };

  const logout = () => {
    // Lógica para cerrar sesión y limpiar el estado del usuario
    setUser(null);
  };

  return (
    <diferenciarUsuarios.Provider value={{ user, login, logout }}>
      {children}
    </diferenciarUsuarios.Provider>
  );
};

export const useUser = () => {
  return useContext(diferenciarUsuarios);
};
