import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { auth, db } from '@/src/services/firebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { Alert, Image, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

export default function EstabelecimentoLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!password) {
      Alert.alert('Erro', 'Senha obrigatória');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 🔹 Verifica se o usuário está na coleção "estabelecimentos"
      const estabelecimentoRef = doc(db, 'estabelecimentos', user.uid);
      const estabelecimentoSnap = await getDoc(estabelecimentoRef);

      if (!estabelecimentoSnap.exists()) {
        Alert.alert('Acesso negado', 'Sua conta não está registrada como estabelecimento.');
        await auth.signOut();
        return;
      }

      // Alert.alert('Bem-vindo', `Olá ${user.displayName || user.email}`);
      router.replace('/pages/logVendas');
    } catch (err: any) {
      console.error(err);
      Alert.alert('Erro', 'Credenciais inválidas');
    }
  };

  return (
    <ThemedView style={globalStyles.container}>
      <View style={globalStyles.logoWrapper}>
        <Image
          source={require('@/assets/images/logodark.png')}
          style={globalStyles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={{ position: 'absolute', top: 50, left: 20, zIndex: 10 }}>
        <Pressable onPress={() => router.replace('/logout')} style={{ padding: 8 }}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
    </View>

      <View style={globalStyles.form}>
        <ThemedText type="defaultSemiBold" style={globalStyles.label}>
          E-mail
        </ThemedText>
        <TextInput
          style={globalStyles.input}
          placeholder="Seu e-mail..."
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#888"
        />

        <ThemedText type="defaultSemiBold" style={globalStyles.label}>
          Senha
        </ThemedText>
        <TextInput
          style={[globalStyles.input, { color: '#000'}]}
          placeholder="••••••••"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#888"
        />

        <Pressable style={globalStyles.loginButton} onPress={handleLogin}>
          <ThemedText type="defaultSemiBold" style={globalStyles.buttonText}>
            Entrar
          </ThemedText>
        </Pressable>

        <View style={globalStyles.footer}>
          <Text style={globalStyles.smallText}>Não tem conta?</Text>
          <TouchableOpacity onPress={() => router.push('/cadEstabelecimento')}>
            <Text style={[globalStyles.smallText, globalStyles.linkText]}>Cadastrar-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ThemedView>
  );
}
