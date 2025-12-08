import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';
import { Alert } from 'react-native';

// Configuração de exibição padrão do Expo
Notifications.setNotificationHandler({
  handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    } as Notifications.NotificationBehavior),
});

export default function NotificationListener() {
  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      const { title, body } = notification.request.content;
      Alert.alert(title || 'Nova Notificação', body || '');
    });

    return () => subscription.remove();
  }, []);

  return null;
}
