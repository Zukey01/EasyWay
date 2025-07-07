import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image, StyleSheet,
  Alert, ScrollView, Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './App';
import { register } from '../src/api/api';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Register() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [name, setName] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [telefono, setTelefono] = useState('');
  const tipoAcceso = 'usuario'; // Puedes cambiar a 'admin' si es necesario
  const { width, height } = Dimensions.get('window');
  const isWide = width >= 768;

  const handleRegister = async () => {
    if (!name || !apellidoPaterno || !apellidoMaterno || !email || !password || !confirmarContraseña || !telefono) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }

    if (password !== confirmarContraseña) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    try {
      const response = await register(
        name,
        apellidoPaterno,
        apellidoMaterno,
        email,
        password,
        confirmarContraseña,
        telefono,
        tipoAcceso
      );
      console.log('Registro exitoso:', response);
      Alert.alert('Éxito', 'Cuenta creada con éxito');
      navigation.navigate('login');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Error al registrarse');
    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.scrollContainer, { minHeight: height }]}>
      <View style={[
        styles.container,
        {
          paddingHorizontal: isWide ? 48 : 20,
          maxWidth: isWide ? 700 : 400,
          width: '100%',
        }
      ]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color="#0B7D03" />
        </TouchableOpacity>

        <Image source={require('../assets/images/logo.png')} style={styles.logo} />
        <Text style={styles.title}>Registro</Text>
        <Text style={styles.subtitle}>Crea tu cuenta llenando los siguientes datos.</Text>

        <TextInput placeholder="Nombres" style={styles.input} placeholderTextColor="black" value={name} onChangeText={setName} />
        <TextInput placeholder="Apellido Paterno" style={styles.input} placeholderTextColor="black" value={apellidoPaterno} onChangeText={setApellidoPaterno} />
        <TextInput placeholder="Apellido Materno" style={styles.input} placeholderTextColor="black" value={apellidoMaterno} onChangeText={setApellidoMaterno} />
        <TextInput placeholder="Correo" style={styles.input} placeholderTextColor="black" keyboardType="email-address" value={email} onChangeText={setEmail} />
        <TextInput placeholder="Contraseña" style={styles.input} placeholderTextColor="black" secureTextEntry value={password} onChangeText={setPassword} />
        <TextInput placeholder="Confirma tu contraseña" style={styles.input} placeholderTextColor="black" secureTextEntry value={confirmarContraseña} onChangeText={setConfirmarContraseña} />
        <TextInput placeholder="Teléfono" style={styles.input} placeholderTextColor="black" keyboardType="phone-pad" value={telefono} onChangeText={setTelefono} />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Crear cuenta</Text>
        </TouchableOpacity>

        <Text style={styles.loginText}>
          ¿Ya tienes una cuenta?{' '}
          <Text style={styles.loginLink} onPress={() => navigation.navigate('login')}>
            Inicia sesión
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
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    backgroundColor: 'transparent',
    padding: 5,
  },
  logo: {
    width: 80,
    height: 50,
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  title: { fontSize: 15, fontWeight: 'bold', marginTop: 10, color: '#000' },
  subtitle: { fontSize: 12, color: '#444', marginBottom: 20, textAlign: 'center' },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#CCE8D0',
    borderRadius: 8,
    paddingHorizontal: 15,
    color: 'black',
    marginVertical: 10,
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
    alignSelf: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  loginText: { marginTop: 20, color: '#444', textAlign: 'center' },
  loginLink: { color: 'green', fontWeight: 'bold' },
});
