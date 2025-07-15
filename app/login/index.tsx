// index.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../App';



type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'index'>;

const WelcomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
   <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.welcomeText}>
        Bienvenido a <Text style={styles.brandName}>Easy Way</Text>
      </Text>
      <Text style={styles.subtitle}>nuevos caminos te esperan</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('dashboard')}>
        <Text style={styles.buttonText}>Comenzar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('login')}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>

      <Text style={styles.termsText}>
        Al continuar, aceptas las{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('condiciones')}>
          Condiciones del Servicio
        </Text>{' '}
        y la{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('privacidad')}>
          Política de Privacidad
        </Text>{' '}
        de Easy Way
      </Text>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fff' },

  logo: { width: 200, height: 150, marginBottom: 40 },

  welcomeText: { fontSize: 18, fontWeight: '500', textAlign: 'center' },

  brandName: { color: '#F5A623', fontWeight: 'bold' },

  subtitle: { fontSize: 16, marginBottom: 30, color: '#000' },

  button: {
    backgroundColor: '#0B7D03',
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 25,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },

  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },

  termsText: { fontSize: 12, textAlign: 'center', color: '#666', marginTop: 30 },
  
  link: { color: '#F5A623', textDecorationLine: 'underline' },
});