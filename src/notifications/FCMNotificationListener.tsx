// 20.08 VERSÃO FUNCIONANDO COM APP EM BACKGROUND
import notifee, { AndroidImportance } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';
import { Alert, Platform } from 'react-native';

export default function FCMNotificationListener() {
  useEffect(() => {
    if (Platform.OS !== 'android') return; // apenas APK Android

    // Cria canal do Android (necessário para notificações externas)
    async function createDefaultChannel() {
      await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
      });
    }

    createDefaultChannel().catch(console.error);

    // Listener foreground: captura notificações enquanto o app está aberto
    const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
      const { title, body } = remoteMessage?.notification ?? {};

      // Alerta dentro do app
      Alert.alert(title ?? 'Nova Notificação', body ?? '');

      // Notificação externa
      await notifee.displayNotification({
        title: title ?? 'Nova Notificação',
        body: body ?? '',
        android: {
          channelId: 'default',
          smallIcon: 'ic_launcher', // ícone em res/drawable
          pressAction: { id: 'default' },
        },
      });
    });

    // Listener quando a notificação abre o app (foreground/background)
    const unsubscribeOpened = messaging().onNotificationOpenedApp(remoteMessage => {
      const { title, body } = remoteMessage?.notification ?? {};
      console.log('App aberto pela notificação:', title, body);
    });

    // Checa se o app foi iniciado pela notificação (quit state)
    messaging().getInitialNotification().then(initialNotification => {
      if (initialNotification) {
        const { title, body } = initialNotification.notification ?? {};
        console.log('App iniciado pela notificação:', title, body);
      }
    });

    console.log('FCM Notification Listener ativo');

    return () => {
      unsubscribeForeground();
      unsubscribeOpened();
    };
  }, []);

  return null;
}