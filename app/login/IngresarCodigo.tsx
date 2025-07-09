import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import Icon from 'react-native-vector-icons/Ionicons';

type IngresarCodigoRouteProp = RouteProp<RootStackParamList, 'ingresarCodigo'>;

export default function IngresarCodigo() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<IngresarCodigoRouteProp>();

  const [codigoIngresado, setCodigoIngresado] = useState('');

  const { email, codigoGenerado } = route.params;

  const verificarCodigo = () => {
    if (codigoIngresado.trim() === '') {
      Alert.alert('Error', 'Ingresa el código enviado.');
      return;
    }

    if (codigoIngresado !== codigoGenerado) {
      Alert.alert('Error', 'El código ingresado es incorrecto.');
      return;
    }

    navigation.navigate('.nuevaContraseña');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color="#0B7D03" />
        </TouchableOpacity>

        <Text style={styles.title}>Ingresa el Código</Text>
        <Text style={styles.subtitle}>
          Se ha generado un código para: {email}
        </Text>

        <Text style={styles.label}>Código</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: 123456"
          placeholderTextColor="#666"
          value={codigoIngresado}
          onChangeText={setCodigoIngresado}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.button} onPress={navigation.navigate('nuevaContraseña', { desdeRecuperacion: true })}>
          <Text style={styles.buttonText}>Verificar Código</Text>
        </TouchableOpacity>
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
    padding: 24,
    alignItems: 'center',
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 0,
    zIndex: 10,
    padding: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#0B7D03',
    textAlign: 'center',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 8,
    color: '#222',
  },
  input: {
    width: '100%',
    backgroundColor: '#e6f4ea',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 20,
    color: '#222',
  },
  button: {
    backgroundColor: '#0B7D03',
    paddingVertical: 14,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    maxWidth: 350,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
});
