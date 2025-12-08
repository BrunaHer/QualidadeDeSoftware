// src/services/authServices.ts
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';

export async function registerStudent(email: string, password: string, fullName: string, course: string) {
  // Cria usuário no Firebase Auth
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Atualiza o displayName do usuário com nome completo
  await updateProfile(user, { displayName: fullName });

  // Salva os dados adicionais no Firestore
  await setDoc(doc(db, 'estudantes', user.uid), {
    fullName: fullName.trim(),
    email: email.toLowerCase(),
    universidade: 'UNOCHAPECÓ',
    curso: course,
    createdAt: new Date().toISOString(),
  });
}
