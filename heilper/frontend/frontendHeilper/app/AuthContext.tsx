import React, { createContext, useState, ReactNode } from 'react';

// 1. Define la interfaz del contexto
interface AuthContextType {
  correoUsuario: string | null;
  setCorreoUsuario: (correo: string | null) => void;
}

// 2. Crea el contexto con un valor inicial (temporal)
export const AuthContext = createContext<AuthContextType>({
  correoUsuario: null,
  setCorreoUsuario: () => {},
});

// 3. Tipar las props del proveedor
interface AuthProviderProps {
  children: ReactNode;
}

// 4. Proveedor del contexto
export function AuthProvider({ children }: AuthProviderProps) {
  const [correoUsuario, setCorreoUsuario] = useState<string | null>(null);

  const handleSetCorreoUsuario = (correo: string | null) => {
    setCorreoUsuario(correo);
  };
   
  return (
    <AuthContext.Provider value={{ correoUsuario, setCorreoUsuario: handleSetCorreoUsuario }}>
      {children}
    </AuthContext.Provider>
  );
}

