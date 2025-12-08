import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { auth, db } from '@/src/services/firebaseConfig';
import { globalStyles } from '@/styles/globalStyles';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { addDoc, collection, doc, getDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View
} from 'react-native';

export default function Push() {
  const [uids, setUids] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();
  const [loading, setLoading] = useState(false);

async function handleSend() {
  if (!uids.trim() || !title.trim() || !description.trim()) {
    Alert.alert('Erro', 'Preencha todos os campos.');
    return;
  }

  if (loading) return; // evita clique duplo
  setLoading(true);

  try {
    const senderUid = auth.currentUser?.uid;
    let estabelecimentoName = 'Estabelecimento desconhecido';

    if (senderUid) {
      const senderDoc = await getDoc(doc(db, 'estabelecimentos', senderUid));
      if (senderDoc.exists()) {
        estabelecimentoName = senderDoc.data().companyName || estabelecimentoName;
      }
    }

    let uidList: string[] = [];

    if (uids.trim().toLowerCase() === "sendall") {
      const snapshot = await getDocs(collection(db, "estudantes"));
      uidList = snapshot.docs.map(doc => doc.id);
    } else {
      uidList = uids
        .split(/[\n,]+/)
        .map(uid => uid.trim())
        .filter(uid => uid.length > 0);
    }

    for (const uid of uidList) {
      const res = await fetch('https://unofserver.up.railway.app/send-push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid,
          title: title.trim(),
          message: description.trim(),
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `Falha ao enviar para ${uid}`);
      }

      await addDoc(collection(db, 'notificacoes'), {
        userId: uid,
        title: title.trim(),
        description: description.trim(),
        estabelecimento: estabelecimentoName,
        timestamp: serverTimestamp(),
      });
    }

    Alert.alert('Sucesso', 'Notificações enviadas!');
    setUids('');
    setTitle('');
    setDescription('');
  } catch (error) {
    console.error(error);
    Alert.alert('Erro', 'Não foi possível enviar a notificação');
  } finally {
    setLoading(false); // 🔑 sempre volta pro estado normal
  }
}

  return (

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={80} // ajusta se o header do app sobrepuser
        >

    <ScrollView contentContainerStyle={globalStyles.scroll}>
      <ThemedView style={globalStyles.container}>

        <View style={globalStyles.logoWrapper}>
          <Image
            source={require('@/assets/images/logodark.png')}
            style={globalStyles.logo}
            resizeMode="contain"
          />
        </View>

        
      <View style={{ position: 'absolute', top: 50, left: 20, zIndex: 10 }}>
        <Pressable onPress={() => router.replace('./logVendas')} style={{ padding: 8 }}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
      </View>

        <View style={globalStyles.form}>

          <ThemedText type="defaultSemiBold" style={globalStyles.label}>
            UIDs dos Destinatários 
          </ThemedText>
          <TextInput
            style={[globalStyles.input, styles.textAreaSmall]}
            placeholder="UID1, UID2, UID3..."
            value={uids}
            onChangeText={setUids}
            autoCapitalize="none"
            multiline
            numberOfLines={3}
            placeholderTextColor="#888"
          />

          <ThemedText type="defaultSemiBold" style={globalStyles.label}>
            Título
          </ThemedText>
          <TextInput
            style={globalStyles.input}
            placeholder="Título da Notificação"
            value={title}
            onChangeText={setTitle}
            placeholderTextColor="#888"
          />

          <ThemedText type="defaultSemiBold" style={globalStyles.label}>
            Descrição
          </ThemedText>
          <TextInput
            style={[globalStyles.input, styles.textArea]}
            placeholder="Descrição da Notificação"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            placeholderTextColor="#888"
          />

<Pressable 
  style={[globalStyles.loginButton, loading && { opacity: 0.6 }]} 
  onPress={handleSend}
  disabled={loading}
>
{loading ? (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <ActivityIndicator size="small" color="#fff" style={{ marginRight: 8 }} />
    <ThemedText type="defaultSemiBold" style={globalStyles.buttonText}>
      Enviando...
    </ThemedText>
  </View>
) : (
  <ThemedText type="defaultSemiBold" style={globalStyles.buttonText}>
    Enviar
  </ThemedText>
)}

</Pressable>

        </View>
      </ThemedView>
    </ScrollView>
  </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  textAreaSmall: {
    height: 70,
    textAlignVertical: 'top',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
});
