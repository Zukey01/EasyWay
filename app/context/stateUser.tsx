import React, { useState, createContext, useContext } from 'react';
import { View, Text } from 'react-native';

// 1. Crear contexto
export const UserContext = createContext(null);

// 2. Componente proveedor
export default function StateUserProvider({ children }) {
  const [user, setUser] = useState(null);

  // Simulación de login
  const loginWithGoogle = async () => {
    // lógica real para iniciar sesión con Google
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, loginWithGoogle, logout }}>
      {children}
    </UserContext.Provider>
  );
}

// 3. Hook personalizado
export const useUser = () => useContext(UserContext);
