import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { auth, db } from '@/src/services/firebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { globalStyles } from '../styles/globalStyles';

export default function VendedorLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateEmailDomain = (email: string) => {
    return email.toLowerCase().endsWith('@unochapeco.edu.br');
  };

  const handleLogin = async () => {
    if (!validateEmailDomain(email)) {
      Alert.alert('Erro', 'O e-mail precisa ser do domínio @unochapeco.edu.br');
      return;
    }
    if (!password) {
      Alert.alert('Erro', 'Senha obrigatória');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 🔹 Verifica se o usuário está na coleção "vendedores"
      const vendedorRef = doc(db, 'vendedores', user.uid);
      const vendedorSnap = await getDoc(vendedorRef);

      if (!vendedorSnap.exists()) {
        Alert.alert('Acesso negado', 'Sua conta não está registrada como vendedor.');
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
          E-mail institucional
        </ThemedText>
        <TextInput
          style={globalStyles.input}
          placeholder="seunome@unochapeco.edu.br"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#888"
        />
        {!validateEmailDomain(email) && email.length > 0 && (
          <Text style={globalStyles.errorText}>
            O e-mail precisa ser do domínio @unochapeco.edu.br
          </Text>
        )}

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
          <TouchableOpacity onPress={() => router.push('/cadVendedor')}>
            <Text style={[globalStyles.smallText, globalStyles.linkText]}>Cadastrar-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ThemedView>
  );
}
