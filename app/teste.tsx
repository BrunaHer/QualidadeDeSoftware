// Teste da Persistência de Login
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Button, ScrollView, Text, View } from 'react-native';
import { useAuth } from '../src/services/authContext';

export default function TestePersistencia() {
  const { user, logout } = useAuth();
  const [savedUID, setSavedUID] = useState<string | null>(null);
  const [savedToken, setSavedToken] = useState<string | null>(null);

  useEffect(() => {
    const loadPersistedData = async () => {
      try {
        const uid = await AsyncStorage.getItem('uid');     // 🔹 corrigido
        const token = await AsyncStorage.getItem('token'); // 🔹 corrigido

        setSavedUID(uid);
        setSavedToken(token);

        console.log('UID persistido:', uid);
        console.log('Token persistido:', token);
      } catch (error) {
        console.error('Erro ao carregar persistência:', error);
      }
    };

    loadPersistedData();
  }, []);

  const verAsyncStorage = async () => {
    const keys = await AsyncStorage.getAllKeys();
    const allData = await AsyncStorage.multiGet(keys);
    console.log('Conteúdo completo do AsyncStorage:', allData);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ marginBottom: 10 }}>
        Usuário logado: {user ? user.uid : 'Nenhum'}
      </Text>

      <Text style={{ marginBottom: 10 }}>
        UID persistido: {savedUID || 'Nenhum'}
      </Text>
      <Text style={{ marginBottom: 10 }}>
        Token persistido: {savedToken || 'Nenhum'}
      </Text>

      <View style={{ marginVertical: 10 }}>
        <Button title="Logout" onPress={() => logout()} color="red" />
      </View>

      <Button title="Ver AsyncStorage" onPress={verAsyncStorage} />
    </ScrollView>
  );
}
