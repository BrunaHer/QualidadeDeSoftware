import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { auth, db } from '@/src/services/firebaseConfig';
import { globalStyles } from '@/styles/globalStyles';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { collection, getDocs, limit, orderBy, query, Timestamp, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

type Notification = {
  id: string;
  title: string;
  description: string;
  estabelecimento: string;
  timestamp: Timestamp;
};

export default function NotificationsScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;

useEffect(() => {
  const fetchNotifications = async () => {
    try {
    let currentUid: string | undefined = auth.currentUser?.uid || undefined;

    if (!currentUid) {
      const storedUid = await AsyncStorage.getItem('uid');
      currentUid = storedUid || undefined;
    }

    if (!currentUid) {
      setLoading(false);
      return;
    }
      const q = query(
        collection(db, 'notificacoes'),
        where('userId', '==', currentUid),
        orderBy('timestamp', 'desc'),
        limit(5)
      );

      const snapshot = await getDocs(q);
      const notifs: Notification[] = snapshot.docs.map(doc => ({
        id: doc.id,
        title: doc.data().title,
        description: doc.data().description,
        estabelecimento: doc.data().estabelecimento,
        timestamp: doc.data().timestamp,
      }));
      setNotifications(notifs);
    } catch (err) {
      console.error('Erro ao buscar notificações:', err);
    } finally {
      setLoading(false);
    }
  };

  fetchNotifications();
}, []);


  const renderTimeAgo = (timestamp: Timestamp) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.toDate().getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return `há ${minutes} min`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `há ${hours} h`;
    const days = Math.floor(hours / 24);
    return `há ${days} d`;
  };

  return (
    <ThemedView style={globalStyles.container}>

    <View style={styles.header}>
        <Pressable onPress={() => router.replace('/pages/logEstudante')}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
        <ThemedText type="title" style={styles.headerTitle}>
          Notificações
        </ThemedText>
        <Ionicons name="notifications" size={24} color="#FFD700" />
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.notificationCard}>
            <View style={styles.notificationHeader}>
              <ThemedText style={styles.notificationTitle}>{item.title}</ThemedText>
              <ThemedText style={styles.notificationTime}>{renderTimeAgo(item.timestamp)}</ThemedText>
            </View>
            <ThemedText style={styles.notificationDescription}>{item.description}</ThemedText>
            <ThemedText style={styles.notificationEstabelecimento}>{item.estabelecimento}</ThemedText>
          </View>
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={!loading ? <ThemedText>Nenhuma notificação.</ThemedText> : null}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0033cc',
  },
  list: {
    paddingBottom: 20,
    gap: 12,
  },
  notificationCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    elevation: 5,
    shadowColor: '#0033cc',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  notificationTime: {
    fontSize: 12,
    color: '#888',
  },
  notificationEstabelecimento: {
    fontSize: 12,
    color: '#555',
    marginBottom: 4,
  },
  notificationDescription: {
    fontSize: 13,
    color: '#555',
  },
});
