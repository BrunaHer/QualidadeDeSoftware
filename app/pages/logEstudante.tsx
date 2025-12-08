import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { globalStyles } from '@/styles/globalStyles';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';

export default function LogEstudante() {
  const router = useRouter();

  return (
    <ThemedView style={globalStyles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.replace('../estudante')}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
        <ThemedText type="title" style={styles.headerTitle}>
          Bem-vindo ao Unofertas!  
        </ThemedText>
        <Pressable onPress={() => router.push('/pages/notificacoes')}>
          <Ionicons name="notifications" size={24} color="#FFD700" />
        </Pressable>
      </View>


      <ScrollView contentContainerStyle={globalStyles.scroll}>
        <View style={styles.logoRow}>
          {/* <Image source={require('@/assets/images/icon.png')} style={styles.logoCard} /> */}
        </View>

        {/* Card único */}
        <View style={styles.promoCard}>
          {/* Container da imagem + logo sobreposta */}
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

          {/* Conteúdo à direita */}
          <View style={styles.promoContent}>
            <ThemedText style={styles.promoTitle}>Unochapecó</ThemedText>
            <ThemedText style={styles.promoDetails}>Servidão Anjo da Guarda 295-D, Efapi</ThemedText>
            <ThemedText style={styles.promoDetails}>Do Bloco A1 ao E4</ThemedText>
            <ThemedText style={styles.promoStatus}>Sempre disponível</ThemedText>
          </View>
        </View>

   {/* 🔹 Botão provisório para a tela de teste 
    <View style={{ marginTop: 20 }}>
      <Pressable
        style={[{ backgroundColor: '#666' }]}
        onPress={() => router.push('/teste')}
      >
        <ThemedText type="defaultSemiBold">
          Ir para TestePersistencia
        </ThemedText>
      </Pressable>
    </View> */}
    
        {/* Mensagem abaixo do card */}
        <View style={styles.messageBox}>
          <ThemedText style={styles.messageText}> 
          Aqui você aproveita ao máximo sua experiência na Unochapecó: 
          economize tempo nos intervalos, descubra promoções em tempo real e mantenha-se sempre atualizado com as melhores oportunidades do campus. 
          Mantenha-se logado e receba as ofertas mais quentes, direto no seu celular — antes que a fila cresça ou a promoção acabe!         
          </ThemedText>
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
    marginTop: 20
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
    top: 5,    // distância do topo da imagem
    right: 5,  // distância da borda direita da imagem
    borderWidth: 1,
    borderColor: '#fff', // opcional pra destacar
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
    marginTop: 45,
  },
  messageText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
  },
});
