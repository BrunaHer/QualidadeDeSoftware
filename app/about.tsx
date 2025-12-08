// app/about.tsx
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';


export default function About() {
  const equipe = ['Rafael Belchor Hein', 'João Gabriel Chagas', 'Bruna Hergenraeder', 'José Tourinho', 'Amanda Ferraz'];
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Logo no topo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('@/assets/images/icon.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

      <View style={{ position: 'absolute', top: 50, left: 20, zIndex: 10 }}>
        <Pressable onPress={() => router.replace('/logout')} style={{ padding: 8 }}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
      </View>

        {/* Nomes centralizados */}
        <View style={styles.nomesContainer}>
          <ThemedText type="defaultSemiBold" style={styles.titulo}>
            Equipe Unofertas
          </ThemedText>

          {equipe.map((nome, index) => (
            <ThemedText key={index} type="defaultSemiBold" style={styles.nome}>
              {nome}
            </ThemedText>
          ))}
        </View>
        
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
  },
  logoContainer: {
    marginTop: 40,
    marginBottom: 40,
    alignItems: 'center',
  },
  logo: {
    width: 180,
    height: 180,
  },
  nomesContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 26,
    marginBottom: 40,
    color: '#000000ff',
  },
  nome: {
    fontSize: 20,
    color: '#156abd',
    marginBottom: 12,
  },
});
