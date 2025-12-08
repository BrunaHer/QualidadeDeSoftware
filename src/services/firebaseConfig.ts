import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAI9fPdPPNRZXMz3Jo3NLVv_JYcfgAE_BE",
  authDomain: "unofertas.firebaseapp.com",
  projectId: "unofertas",
  storageBucket: "unofertas.firebasestorage.app",
  messagingSenderId: "234900215597",
  appId: "1:234900215597:web:34fc29dd5c9f1a1065a4"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = initializeFirestore(app, {
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
  experimentalAutoDetectLongPolling: true,
  projectId: firebaseConfig.projectId,
} as any);  // <== cast para 'any' aqui para suprimir erro TS

const auth = getAuth(app);

export { auth, db };

