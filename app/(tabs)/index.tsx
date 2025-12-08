import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import BottomCurve from '@/components/ui/BottomCurve';
import { useAuth } from '@/src/services/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Platform, Pressable, SafeAreaView, StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [checkingPersistedLogin, setCheckingPersistedLogin] = useState(true);

  useEffect(() => {
    const checkPersistedLogin = async () => {
      try {
        const uid = await AsyncStorage.getItem('uid'); // Verificação de Persistência por UID
        if (uid) {
          console.log('UID encontrado no AsyncStorage, redirecionando...', uid);
          router.replace('/pages/logEstudante');
        } else {
          console.log('Nenhum UID encontrado, usuário não logado');
        }
      } catch (err) {
        console.error('Erro ao verificar AsyncStorage:', err);
      } finally {
        setCheckingPersistedLogin(false);
      }
    };

    checkPersistedLogin();
  }, [router]);

  if (loading || checkingPersistedLogin) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#fff" />
      </ThemedView>
    );
  }

  // 🔹 Todo o layout existente continua igual
  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <View style={styles.logoWrapper}>
          <Image
            source={require('@/assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.buttonsContainer}>
          <Pressable style={styles.button} onPress={() => router.push('/estudante')}>
            <ThemedText type="defaultSemiBold" style={styles.buttonText}>
              Sou Estudante
            </ThemedText>
          </Pressable>

          <Pressable style={styles.button} onPress={() => router.push('/estabelecimento')}>
            <ThemedText type="defaultSemiBold" style={styles.buttonText}>
              Tenho um estabelecimento
            </ThemedText>
          </Pressable>

          <Pressable style={styles.button} onPress={() => router.push('/vendedor')}>
            <ThemedText type="defaultSemiBold" style={styles.buttonText}>
              Sou vendedor autônomo
            </ThemedText>
          </Pressable>
        </View>

        <BottomCurve />

        <View style={styles.footer}>
          <Pressable onPress={() => router.push('/about')}>
            <ThemedText type="default" style={styles.footerText}>
              © 2025, Grupo Unofertas. Todos os direitos reservados.
            </ThemedText>
          </Pressable>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#003366' },
  container: {
    flex: 1,
    backgroundColor: '#003366',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 20,
  },
  logoWrapper: {
    alignItems: 'center',
    position: 'absolute',
    top: Platform.OS === 'android' ? '10%' : '15%',
  },
  logo: { 
    width: 220, 
    height: 150 
  },
  buttonsContainer: {
    width: '90%',
    marginTop: 290,
    gap: 16,
    alignItems: 'center',
    zIndex: 2,
  },
  button: {
    backgroundColor: '#1976d2',
    paddingVertical: 16,
    borderRadius: 20,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  footer: { position: 'absolute', bottom: 0, width: '100%', paddingVertical: 35, alignItems: 'center', zIndex: 10 },
  footerText: { color: '#000000ff', fontSize: 12 },
});
