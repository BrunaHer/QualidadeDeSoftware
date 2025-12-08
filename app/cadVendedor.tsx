import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { globalStyles } from '@/styles/globalStyles';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { auth, db } from '../src/services/firebaseConfig';

export default function CadVendedor() {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [mainProduct, setMainProduct] = useState('');
  const [password, setPassword] = useState('');

  const validateEmailDomain = (email: string) =>
    email.toLowerCase().endsWith('@unochapeco.edu.br');

  const handleRegister = async () => {
    if (!fullName.trim()) return Alert.alert('Erro', 'Nome completo obrigatório');
    if (!validateEmailDomain(email)) return Alert.alert('Erro', 'O e-mail precisa ser do domínio @unochapeco.edu.br');
    if (password.length < 6) return Alert.alert('Erro', 'Senha precisa ter pelo menos 6 caracteres');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: fullName });

      await setDoc(doc(db, 'vendedores', user.uid), {
        fullName: fullName.trim(),
        businessName: businessName.trim() || null,
        email: email.toLowerCase(),
        mainProduct: mainProduct.trim() || null,
        createdAt: new Date().toISOString(),
      });

      Alert.alert('Cadastro', 'Vendedor registrado com sucesso!');
      router.replace('/vendedor');
    } catch (err: any) {
      console.error('Erro ao cadastrar vendedor:', err);
      const message = err.code ? err.code.replace('auth/', '') : 'Erro ao cadastrar';
      Alert.alert('Erro', message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80} // ajusta se o header do app sobrepuser
    >

  <ScrollView contentContainerStyle={[globalStyles.scroll, { paddingBottom: 25 }]}>

      <View style={{ position: 'absolute', top: 20, left: 20, zIndex: 10 }}>
        <Pressable onPress={() => router.replace('/vendedor')} style={{ padding: 8 }}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
      </View>

      <ThemedView style={globalStyles.container}>

        <View style={globalStyles.form}>
          <ThemedText type="defaultSemiBold" style={globalStyles.label}>Nome Completo</ThemedText>
          <TextInput
            style={globalStyles.input}
            placeholder="Seu nome"
            value={fullName}
            onChangeText={setFullName}
            placeholderTextColor="#888"
          />

          <ThemedText type="defaultSemiBold" style={globalStyles.label}>Nome Fantasia</ThemedText>
          <TextInput
            style={globalStyles.input}
            placeholder="Doces do João..."
            value={businessName}
            onChangeText={setBusinessName}
            placeholderTextColor="#888"
          />

          <ThemedText type="defaultSemiBold" style={globalStyles.label}>E-mail Institucional</ThemedText>
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

          <ThemedText type="defaultSemiBold" style={globalStyles.label}>Principal Produto</ThemedText>
          <TextInput
            style={globalStyles.input}
            placeholder="Eu vendo..."
            value={mainProduct}
            onChangeText={setMainProduct}
            placeholderTextColor="#888"
          />

          <ThemedText type="defaultSemiBold" style={globalStyles.label}>Senha</ThemedText>
          <TextInput
            style={[globalStyles.input, { color: '#000'}]}
            placeholder="••••••••"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#888"
          />

          <Pressable style={globalStyles.registerButton} onPress={handleRegister}>
            <ThemedText type="defaultSemiBold" style={globalStyles.buttonText}>Cadastrar</ThemedText>
          </Pressable>

          <View style={globalStyles.footer}>
            <Text style={globalStyles.smallText}>Já tem conta?</Text>
            <Pressable onPress={() => router.replace('/vendedor')}>
              <Text style={[globalStyles.smallText, globalStyles.linkText]}>Entrar</Text>
            </Pressable>
          </View>
        </View>
      </ThemedView>
    </ScrollView>
  </KeyboardAvoidingView>
  );
}
