// app/logout.tsx
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import BottomCurve from '@/components/ui/BottomCurve';
import { auth } from '@/src/services/firebaseConfig';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Platform, Pressable, SafeAreaView, StyleSheet, View } from 'react-native';

export default function LogoutScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const doLogout = async () => {
      try {
        await auth.signOut();
        console.log('Usuário deslogado com sucesso');
      } catch (err) {
        console.error('Erro ao deslogar:', err);
      } finally {
        setLoading(false);
      }
    };

    doLogout();
  }, []);

  if (loading) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

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
          <Pressable
            style={styles.button}
            onPress={() => router.push('/estudante')}
          >
            <ThemedText type="defaultSemiBold" style={styles.buttonText}>
              Sou Estudante
            </ThemedText>
          </Pressable>

          <Pressable
            style={styles.button}
            onPress={() => router.push('/estabelecimento')}
          >
            <ThemedText type="defaultSemiBold" style={styles.buttonText}>
              Tenho um Estabelecimento
            </ThemedText>
          </Pressable>

          <Pressable
            style={styles.button}
            onPress={() => router.push('/vendedor')}
          >
            <ThemedText type="defaultSemiBold" style={styles.buttonText}>
              Sou Vendedor Autônomo
            </ThemedText>
          </Pressable>
        </View>

        <BottomCurve />

        <View style={styles.footer}>
          <Pressable onPress={() => router.push('/about')}>
            <ThemedText type="default" style={styles.footerText}>
              © 2025 - Grupo Unofertas. Todos os direitos reservados.
            </ThemedText>
          </Pressable>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#003366',
  },
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
    zIndex: 5,
  },
  logo: {
    width: 250,
    height: 70,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  buttonsContainer: {
    width: '100%',
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
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingVertical: 35,
    alignItems: 'center',
    zIndex: 10,
  },
  footerText: {
    color: '#000000ff',
    fontSize: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: '#fff',
  },
  
});

