// app/cadEstudante.tsx
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import { registerStudent } from '@/src/services/authServices';
import { globalStyles } from '../styles/globalStyles';

const COURSES = [
  'Ciência da Computação',
  'Sistemas de Informação',
  'Administração',
  'Agronomia',
  'Arquitetura e Urbanismo',
  'Artes',
  'Biomedicina',
  'Cinema e Mídias Digitais',
  'Ciências Biológicas',
  'Ciências Contábeis',
  'Ciências Econômicas',
  'Design',
  'Direito',
  'Educação Especial',
  'Educação Física',
  'Enfermagem',
  'Engenharia Civil',
  'Engenharia de Alimentos',
  'Engenharia de Produção',
  'Engenharia Elétrica',
  'Engenharia Mecânica',
  'Engenharia Química',
  'Farmácia',
  'Fisioterapia',
  'Fonoaudiologia',
  'Gastronomia',
  'Gestão de Eventos',
  'Gestão de Turismo',
  'Inteligência Artificial Aplicada',
  'Jornalismo',
  'Letras - Inglês',
  'Letras - Libras',
  'Medicina',
  'Medicina Veterinária',
  'Moda',
  'Nutrição',
  'Odontologia',
  'Pedagogia',
  'Psicologia',
  'Publicidade e Propaganda',
  'Relações Internacionais',
  'Terapia Ocupacional',
  'Docente Disfarçado',
  'Colégio Uno',
  'Tecnólogo',
  'Pós Graduação',
  'Mestrado',
  'Doutorado',
  'Colaborador Uno',
];

export default function CadEstudante() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState(COURSES[0]);
  const [password, setPassword] = useState('');
  const [coursePickerVisible, setCoursePickerVisible] = useState(false);

  const validateEmailDomain = (email: string) =>
    email.toLowerCase().endsWith('@unochapeco.edu.br');

  const handleRegister = async () => {
    if (!fullName.trim()) {
      Alert.alert('Erro', 'Nome completo obrigatório');
      return;
    }
    if (!validateEmailDomain(email)) {
      Alert.alert('Erro', 'O e-mail precisa ser do domínio @unochapeco.edu.br');
      return;
    }
    if (!course) {
      Alert.alert('Erro', 'Selecione o curso');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Erro', 'Senha precisa ter pelo menos 6 caracteres');
      return;
    }

    try {
      await registerStudent(email, password, fullName, course);
      Alert.alert('Cadastro', 'Estudante registrado com sucesso!');
      router.replace('/estudante');
    } catch (error: any) {
      const message = error.code ? error.code.replace('auth/', '') : 'Erro ao cadastrar';
      Alert.alert('Erro', message);
    }
  };

  return (
      
      <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={80} // ajusta se o header do app sobrepuser
        >

    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

      <View style={{ position: 'absolute', top: 20, left: 20, zIndex: 10 }}>
        <Pressable onPress={() => router.replace('/vendedor')} style={{ padding: 8 }}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
      </View>

      <ThemedView style={globalStyles.container}>
        <View style={globalStyles.form}>
          <ThemedText type="defaultSemiBold" style={globalStyles.label}>
            Nome completo
          </ThemedText>
          <TextInput
            style={globalStyles.input}
            placeholder="Seu nome"
            value={fullName}
            onChangeText={setFullName}
            placeholderTextColor="#888"
          />

          <ThemedText type="defaultSemiBold" style={globalStyles.label}>
            E-mail institucional
          </ThemedText>
          <TextInput
            style={globalStyles.input}
            placeholder="seunome@unochapeco.edu.br"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#888"
          />
          {!validateEmailDomain(email) && email.length > 0 && (
            <Text style={globalStyles.errorText}>
              O e-mail precisa ser do domínio @unochapeco.edu.br
            </Text>
          )}

          <ThemedText type="defaultSemiBold" style={globalStyles.label}>
            Universidade
          </ThemedText>
          <Text style={globalStyles.fixedField} >UNOCHAPECÓ</Text>

          <ThemedText type="defaultSemiBold" style={globalStyles.label}>
            Curso
          </ThemedText>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 8,
              padding: 12,
              marginBottom: 4,
            }}
            onPress={() => setCoursePickerVisible(true)}
          >
            <Text>{course}</Text>
          </TouchableOpacity>

          <Modal
            visible={coursePickerVisible}
            transparent
            animationType="slide"
            onRequestClose={() => setCoursePickerVisible(false)}
          >
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.5)',
              }}
            >
              <View
                style={{
                  margin: 20,
                  backgroundColor: '#fff',
                  borderRadius: 10,
                  padding: 16,
                }}
              >
                <ThemedText type="defaultSemiBold" style={globalStyles.label}>
                  Selecione o curso
                </ThemedText>
                <FlatList
                  data={COURSES}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <Pressable
                      style={{ paddingVertical: 8 }}
                      onPress={() => {
                        setCourse(item);
                        setCoursePickerVisible(false);
                      }}
                    >
                      <Text style={{ fontWeight: item === course ? '700' : '400' }}>
                        {item}
                      </Text>
                    </Pressable>
                  )}
                  ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: '#ccc' }} />}
                  style={{ maxHeight: 300 }}
                />
                <Pressable onPress={() => setCoursePickerVisible(false)} style={{ marginTop: 12 }}>
                  <Text style={{ textAlign: 'center', color: '#156abd', fontWeight: '600' }}>Fechar</Text>
                </Pressable>
              </View>
            </View>
          </Modal>

          <ThemedText type="defaultSemiBold" style={globalStyles.label}>
            Senha
          </ThemedText>
          <TextInput
            style={[globalStyles.input, { color: '#000'}]}
            placeholder="••••••••"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#888"
          />

          <Pressable
            style={globalStyles.loginButton}
            onPress={handleRegister}
          >
            <ThemedText type="defaultSemiBold" style={globalStyles.buttonText}>
              Cadastrar
            </ThemedText>
          </Pressable>

          <View style={globalStyles.footer}>
            <Text style={globalStyles.smallText}>Já tem conta?</Text>
            <Pressable onPress={() => router.push('/estudante')}>
              <Text style={[globalStyles.smallText, globalStyles.linkText]}>Entrar</Text>
            </Pressable>
          </View>
        </View>
      </ThemedView>
    </ScrollView>
  </KeyboardAvoidingView>
  );
}

