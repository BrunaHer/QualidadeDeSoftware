import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { globalStyles } from '@/styles/globalStyles';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LogVendas() {
  const router = useRouter();

  return (
    <ThemedView style={globalStyles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.replace('../estabelecimento')}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
        <ThemedText type="title" style={styles.headerTitle}>
          Área de Vendas
        </ThemedText>
        <View style={{ width: 24 }} /> 
      </View>

      <ScrollView contentContainerStyle={globalStyles.scroll}>
        {/* Espaço para logo no topo */}
        <View style={styles.logoRow}>
         {/*  <Image source={require('@/assets/images/icon.png')} style={styles.logoCard} /> */}
        </View>

        {/* Card único */}
        <View style={styles.promoCard}>
          <View style={styles.imageContainer}>
            <Image
              source={require('@/assets/images/estabelecimento0.jpeg')}
              style={styles.promoImage}
            />
            <Image
              source={require('@/assets/images/icon.png')}
              style={styles.promoLogo}
            />
          </View>
          <View style={styles.promoContent}>
            <ThemedText style={styles.promoTitle}>Unochapecó</ThemedText>
            <ThemedText style={styles.promoDetails}>Servidão Anjo da Guarda 295-D, Efapi</ThemedText>
            <ThemedText style={styles.promoDetails}>Do Bloco A1 ao E4</ThemedText>
            <ThemedText style={styles.promoStatus}>Sempre disponível</ThemedText>
          </View>
        </View>

        {/* Caixa de mensagem */}
        <View style={styles.messageBox}>
          <ThemedText style={styles.messageText}>
            Maximize o impacto das suas ações com o Unofertas! Aqui você gerencia suas promoções e envia notificações em tempo real para os estudantes da Unochapecó! 
          </ThemedText>
        </View>

        {/* Botões */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Em Breve!', 'Fique atento às novidades')}>
            <Text style={styles.buttonText}>Promoções</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => router.push('/pages/push')}>
            <Text style={styles.buttonText}>Enviar Notificação</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0033cc',
  },
  logoRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 32,
    marginTop: 20,
  },
  logoCard: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  promoCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 8,
    elevation: 3,
    alignItems: 'center',
  },
  promoImage: {
    width: 150,
    height: 120,
    borderRadius: 8,
    marginRight: 15,
  },
  promoContent: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
  },
  promoLogo: {
    width: 24,
    height: 24,
    borderRadius: 12,
    position: 'absolute',
    top: 5,
    right: 5,
    borderWidth: 1,
    borderColor: '#fff',
  },
  promoTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  promoDetails: {
    fontSize: 12,
    color: '#555',
  },
  promoStatus: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: 'bold',
    color: 'green',
  },
  messageBox: {
    backgroundColor: '#0033cc',
    borderRadius: 8,
    padding: 12,
    marginTop: 20,
  },
  messageText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 25,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 140,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
