import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

export default function ContactScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      {/* Botón de regreso */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={28} color="#000" />
      </TouchableOpacity>

      {/* Logo */}
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Título y descripción */}
      <Text style={styles.title}>Hola Viajero !</Text>
      <Text style={styles.description}>
        Buscas maneras de contactarnos, te dejamos nuestra información de contacto, en Easy Way nos importa tener comunicación con nuestros viajeros.
      </Text>

      {/* Línea separadora */}
      <View style={styles.separator} />

      {/* Lista de contactos */}
      <View style={styles.contactItem}>
        <Icon name="mail-outline" size={22} color="#0B7D03" style={styles.icon} />
        <Text style={styles.contactText}>easywayofficial@gmail.com</Text>
      </View>

      <View style={styles.contactItem}>
        <Icon name="logo-instagram" size={22} color="#0B7D03" style={styles.icon} />
        <Text style={styles.contactText}>@Easy_Way_Official</Text>
      </View>

      <View style={styles.contactItem}>
        <Icon name="logo-facebook" size={22} color="#0B7D03" style={styles.icon} />
        <Text style={styles.contactText}>Easy Way Official Pdc</Text>
      </View>

      <View style={styles.contactItem}>
        <Icon name="logo-whatsapp" size={22} color="#0B7D03" style={styles.icon} />
        <Text style={styles.contactText}>+52 984 184 5181</Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 40,
    paddingHorizontal: 20,
    flexGrow: 1,
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 20,
    zIndex: 10,
  },
  logo: {
    width: 150,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 15,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    marginLeft: 60,
    marginVertical: 15
  },
  icon: {
    marginRight: 10,
  },
  contactText: {
    fontSize: 16,
    color: '#000',
  },
});
