import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
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

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../src/services/firebaseConfig';
import { globalStyles } from '../styles/globalStyles';

/** Remove tudo que não seja número */
const onlyDigits = (str: string) => str.replace(/\D+/g, '');

/** Formata CNPJ no padrão 00.000.000/0000-00 enquanto digita */
const formatCNPJ = (value: string) => {
  const digits = onlyDigits(value).slice(0, 14);
  let formatted = digits;

  if (digits.length > 2) formatted = `${digits.slice(0, 2)}.${digits.slice(2)}`;
  if (digits.length > 5) formatted = `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
  if (digits.length > 8) formatted = `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`;
  if (digits.length > 12) formatted = `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`;

  return formatted;
};

/** Validação oficial de CNPJ */
const validateCNPJ = (cnpj: string) => {
  const cleaned = onlyDigits(cnpj);
  if (cleaned.length !== 14) return false;
  if (/^(\d)\1{13}$/.test(cleaned)) return false;

  const calculate = (base: string, factors: number[]) => {
    const sum = base
      .split('')
      .map((d) => parseInt(d, 10))
      .reduce((acc, num, idx) => acc + num * factors[idx], 0);
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const base12 = cleaned.slice(0, 12);
  const factor1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const digit1 = calculate(base12, factor1);

  const base13 = base12 + digit1.toString();
  const factor2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const digit2 = calculate(base13, factor2);

  const expected = `${digit1}${digit2}`;
  return cleaned.slice(12) === expected;
};

export default function CadEstabelecimento() {
  const router = useRouter();

  const [companyName, setCompanyName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cnpjValid, setCnpjValid] = useState<boolean | null>(null);

  useEffect(() => {
    if (!cnpj) setCnpjValid(null);
    else setCnpjValid(validateCNPJ(cnpj));
  }, [cnpj]);

  const handleRegister = async () => {
    if (!companyName.trim()) return Alert.alert('Erro', 'Nome da empresa obrigatório');
    if (!cnpj.trim()) return Alert.alert('Erro', 'CNPJ obrigatório');
    if (!validateCNPJ(cnpj)) return Alert.alert('Erro', 'CNPJ inválido');
    if (!email.trim()) return Alert.alert('Erro', 'E-mail obrigatório');
    if (password.length < 6) return Alert.alert('Erro', 'Senha precisa ter pelo menos 6 caracteres');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.toLowerCase(), password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: companyName.trim() });
      await setDoc(doc(db, 'estabelecimentos', user.uid), {
        companyName: companyName.trim(),
        cnpj: onlyDigits(cnpj),
        universidade: 'UNOCHAPECÓ',
        location: location.trim() || null,
        email: email.toLowerCase(),
        createdAt: new Date().toISOString(),
      });
      Alert.alert('Cadastro', 'Estabelecimento registrado com sucesso!');
      router.replace('/estabelecimento');
    } catch (err: any) {
      console.error(err);
      Alert.alert('Erro', err.code ? err.code.replace('auth/', '') : 'Erro ao cadastrar');
    }
  };

  return (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={80} // ajusta se o header do app sobrepuser
        >
    <ScrollView contentContainerStyle={globalStyles.scroll}>

      <View style={{ position: 'absolute', top: 20, left: 20, zIndex: 10 }}>
        <Pressable onPress={() => router.replace('/vendedor')} style={{ padding: 8 }}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
      </View>

      <ThemedView style={globalStyles.container}>
        <View style={globalStyles.form}>
          <ThemedText type="defaultSemiBold" style={globalStyles.label}>Nome da Empresa</ThemedText>
          <TextInput
            style={globalStyles.input}
            placeholder="Ex: Cantina Central"
            value={companyName}
            onChangeText={setCompanyName}
            placeholderTextColor="#888"
          />

          <ThemedText type="defaultSemiBold" style={globalStyles.label}>CNPJ</ThemedText>
          <TextInput
            style={globalStyles.input}
            placeholder="00.000.000/0000-00"
            value={formatCNPJ(cnpj)}
            onChangeText={(txt) => setCnpj(onlyDigits(txt))}
            keyboardType="numeric"
            placeholderTextColor="#888"
            maxLength={18}
          />
          {cnpjValid === false && <Text style={globalStyles.errorText}>CNPJ inválido</Text>}

          <ThemedText type="defaultSemiBold" style={globalStyles.label}>Universidade</ThemedText>
          <TextInput
            style={[globalStyles.fixedField, { backgroundColor: '#f2f2f2' }]}
            value="UNOCHAPECÓ"
            editable={false}
            placeholderTextColor="#888"
          />

          <ThemedText type="defaultSemiBold" style={globalStyles.label}>Bloco / Localização</ThemedText>
          <TextInput
            style={globalStyles.input}
            placeholder="Ex: Bloco A, térreo"
            value={location}
            onChangeText={setLocation}
            placeholderTextColor="#888"
          />

          <ThemedText type="defaultSemiBold" style={globalStyles.label}>E-mail</ThemedText>
          <TextInput
            style={globalStyles.input}
            placeholder="seunome@exemplo.com"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
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
            <Pressable onPress={() => router.replace('/estabelecimento')}>
              <Text style={[globalStyles.smallText, globalStyles.linkText]}>Entrar</Text>
            </Pressable>
          </View>
        </View>
      </ThemedView>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}
