// PÁGINA MAIS SENSÍVEL DO PROJETO - NÃO MEXER NO CÓDIGO
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { auth, db } from '@/src/services/firebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { Alert, Image, Platform, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

export default function EstudanteLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateEmailDomain = (email: string) =>
    email.toLowerCase().endsWith('@unochapeco.edu.br');

async function registerForPushNotificationsAsync(uid: string) {
  try {
    let expoToken: string | null = null;
    let apkToken: string | null = null;

    if (Platform.OS === 'android') {
      // Android 13+: pedir permissão explícita
      if (Platform.Version >= 33) {
        const { PermissionsAndroid } = require('react-native');
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Permissão de notificações não concedida');
          return;
        }
      }

      // Criar canal antes de qualquer push
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    // Expo token
    expoToken = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('Token Expo Push:', expoToken);

    // APK FCM token
    if (Platform.OS === 'android') {
      try {
        const messaging = require('@react-native-firebase/messaging').default;
        if (messaging) {
          apkToken = await messaging().getToken();
          console.log('Token FCM APK:', apkToken);
        }
      } catch (e) {
        console.log('Firebase Messaging não disponível, ignorando APK token', e);
      }
    }

    // Salva no Firestore
    await setDoc(doc(db, 'tokens', uid), { token: expoToken, apkToken }, { merge: true });
    console.log('Tokens salvos com sucesso no Firestore');
  } catch (error) {
    console.error('Erro ao registrar tokens push:', error);
  }
}

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

      const estudanteRef = doc(db, 'estudantes', user.uid);
      const estudanteSnap = await getDoc(estudanteRef);

      if (!estudanteSnap.exists()) {
        Alert.alert('Acesso negado', 'Sua conta não está registrada como estudante.');
        await auth.signOut();
        return;
      }
      
    // Salvar UID no AsyncStorage
    await AsyncStorage.setItem('uid', user.uid);  
    await AsyncStorage.setItem(
      'user',
      JSON.stringify({
        email: user.email,
        displayName: user.displayName || '',
        uid: user.uid,
      })
    );

    console.log("UID salvo no AsyncStorage:", user.uid);


      // Alert.alert('Bem-vindo', `Olá ${user.displayName || user.email}`);

      await registerForPushNotificationsAsync(user.uid);

      setTimeout(() => router.replace('/pages/logEstudante'), 500);
    } catch (err: any) {
      console.log('Erro no Firebase:', err.code, err.message);
      let mensagem = 'Erro ao fazer login.';
      if (err.code === 'auth/wrong-password') mensagem = 'Senha incorreta.';
      else if (err.code === 'auth/user-not-found') mensagem = 'Usuário não encontrado.';
      else if (err.code === 'auth/invalid-email') mensagem = 'E-mail inválido.';
      else if (err.code === 'auth/too-many-requests') mensagem = 'Muitas tentativas. Tente novamente mais tarde.';
      Alert.alert('Erro', mensagem);
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
          <TouchableOpacity onPress={() => router.push('/cadEstudante')}>
            <Text style={[globalStyles.smallText, globalStyles.linkText]}>Cadastrar-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ThemedView>
  );
}