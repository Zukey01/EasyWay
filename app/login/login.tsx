import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../App';
import { login } from '../../src/api/api';

export default function Login() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { width, height } = Dimensions.get('window');
  const isWide = width >= 768;

  const handleLogin = async () => {
  try {
    const data = await login(email, password);

    // ✅ Guardar nombre y apellidoPaterno en AsyncStorage correctamente
    await AsyncStorage.setItem('usuario', JSON.stringify({
      nombre: data.usuario.nombre,
      apellidoPaterno: data.usuario.apellidoPaterno || '',
    }));

    Alert.alert('✅ Inicio de sesión exitoso', `¡Bienvenido ${data.usuario.nombre}!`);
    navigation.navigate('dashboard');
  } catch (error: any) {
    Alert.alert('❌ Error', error.message || 'Error al iniciar sesión');
  }
};



  return (
    <ScrollView contentContainerStyle={[styles.scrollContainer, { minHeight: height }]}>
      <View
        style={[
          styles.container,
          {
            paddingHorizontal: isWide ? 48 : 20,
            maxWidth: isWide ? 700 : 400,
            width: '100%',
          },
        ]}
      >
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('index')}>
          <Icon name="arrow-back" size={28} color="#0B7D03" />
        </TouchableOpacity>

        <Image source={require('../../assets/images/logo.png')} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Inicio de Sesión</Text>
        <Text style={styles.subtitle}>Inicia sesión con tu cuenta de Easy Way.</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Introduce tu correo"
          style={styles.input}
          placeholderTextColor="black"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          placeholder="Introduce tu contraseña"
          style={styles.input}
          placeholderTextColor="black"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.buttonGoogle}>
          <Text style={styles.buttonText}>Iniciar sesión con Google</Text>
        </TouchableOpacity>

        <Text style={styles.loginText}>
          ¿Olvidaste tu contraseña?{' '}
          <Text style={styles.loginLink} onPress={() => navigation.navigate('recuperar')}>
            Recuperar
          </Text>
        </Text>

        <Text style={styles.loginText}>
          ¿No tienes cuenta?{' '}
          <Text style={styles.loginLink} onPress={() => navigation.navigate('register')}>
            Regístrate
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    alignSelf: 'center',
  },
  logo: {
    width: 250,
    height: 160,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: { fontSize: 24, fontWeight: 'bold', marginTop: 10, color: '#000' },
  subtitle: { fontSize: 14, color: '#444', marginBottom: 20, textAlign: 'center' },
  label: {
    fontSize: 20,
    alignSelf: 'flex-start',
    marginLeft: 10,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10,
  },
  input: {
    width: '100%',
    height: 60,
    backgroundColor: '#CCE8D0',
    borderRadius: 8,
    paddingHorizontal: 15,
    color: 'black',
    marginTop: 5,
    marginVertical: 8,
    borderColor: 'black',
    borderWidth: 1,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#00712D',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    maxWidth: 350,
  },
  buttonGoogle: {
    marginTop: 16,
    backgroundColor: '#0B7D03',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    maxWidth: 350,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  loginText: { marginTop: 20, color: '#444', textAlign: 'center' },
  loginLink: { color: 'green', fontWeight: 'bold' },
  backButton: { position: 'absolute', top: 40, left: 20, zIndex: 10, backgroundColor: 'transparent', padding: 5 },
});
