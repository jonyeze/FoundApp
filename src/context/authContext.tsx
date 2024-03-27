import React, { createContext, useState, useEffect, ReactNode } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// Definir el tipo de usuario de autenticación
interface AuthUser {
  uid: string;
  email: string;
  displayName: string;
}

// Definir el contexto de autenticación
interface AuthContextType {
  currentUser: AuthUser | null;
}

// Crear el contexto de autenticación
export const AuthContext = createContext<AuthContextType | null>(null);

// Crear el proveedor del contexto de autenticación
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser({ uid: user.uid, email: user.email ?? '', displayName: user.displayName ?? '' });
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return <AuthContext.Provider value={{ currentUser }}>{children}</AuthContext.Provider>;
};
