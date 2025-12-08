// src/services/authContext.tsx Funcional em 20/09, só nao espelha notificações pela
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { User } from "firebase/auth";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { auth } from "./firebaseConfig";

type AuthContextType = {
  user: User | { uid: string } | null;
  loading: boolean;
  login: (uid: string, token: string) => Promise<void>;
  logout: () => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | { uid: string } | null>(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  // Se estiver no Expo Go, não usa Firebase Auth de verdade
  if (Constants.appOwnership === 'expo') {
    (async () => {
      try {
        const uid = await AsyncStorage.getItem('uid');  
        const token = await AsyncStorage.getItem('userToken');

        if (uid && token) {
          setUser({ uid });
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Erro ao carregar login persistido:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
    return;
  }

  const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
    setUser(firebaseUser ?? null);
    setLoading(false);
  });

  return unsubscribe;
}, []);


  const login = async (uid: string, token: string) => {
    try {
    await AsyncStorage.setItem('uid', uid);   
    await AsyncStorage.setItem('userToken', token);

      setUser({ uid });
      console.log("✅ Login persistido:", uid, token);
    } catch (err) {
      console.error("Erro ao salvar login no AsyncStorage:", err);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('uid');
      await AsyncStorage.removeItem('userToken');

      setUser(null);
      console.log("✅ Logout realizado, dados limpos");
    } catch (err) {
      console.error("Erro ao limpar login no AsyncStorage:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
