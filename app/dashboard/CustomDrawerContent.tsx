import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  Dimensions,
  Alert,
} from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CustomDrawerContent() {
  const navigation = useNavigation();
  const [mostrarModal, setMostrarModal] = useState(false);
  const { height } = Dimensions.get('window');

  const cerrarSesion = async () => {
    try {
      await AsyncStorage.removeItem('usuario');
      setMostrarModal(false);
      navigation.reset({
        index: 0,
        routes: [{ name: 'login' }],
      });
    } catch (error) {
      Alert.alert('Error', 'No se pudo cerrar sesión');
    }
  };

  return (
    <DrawerContentScrollView contentContainerStyle={{ minHeight: height, paddingBottom: 30 }}>
      <View style={styles.maincontainer}>
        <View style={styles.containerone}>
          <Image
            source={require('../../assets/images/logo.png')} // ✅ Asegúrate de que exista
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.brand}>¡HOLA, VIAJERO!</Text>

          <TouchableOpacity
            style={styles.buttonperfil}
            onPress={() => navigation.navigate('perfil')}
          >
            <Text style={styles.buttontext}>Ver perfil</Text>
          </TouchableOpacity>

          <Text style={styles.line}>_________________</Text>
        </View>

        <View style={styles.containerdos}>
          <View style={styles.contenedor}>
            <Ionicons name="notifications-outline" size={40} color="#0B7D03" />
            <TouchableOpacity style={styles.botom} onPress={() => navigation.navigate('notificaciones')}>
              <Text style={styles.botomText}>Bandeja de notificación</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.contenedor}>
            <Ionicons name="settings-outline" size={40} color="#0B7D03" />
            <TouchableOpacity style={styles.botom} onPress={() => navigation.navigate('ajustes')}>
              <Text style={styles.botomText}>Ajustes</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.contenedor}>
            <Ionicons name="person-circle-outline" size={40} color="#0B7D03" />
            <TouchableOpacity style={styles.botom} onPress={() => navigation.navigate('contacto')}>
              <Text style={styles.botomText}>Contacto</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.contenedor}>
            <Ionicons name="exit-outline" size={40} color="#0B7D03" />
            <TouchableOpacity style={styles.botom} onPress={() => setMostrarModal(true)}>
              <Text style={styles.botomText}>Log out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Modal de confirmación */}
      <Modal transparent visible={mostrarModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Cerrar sesión</Text>
            <Text style={styles.modalMessage}>¿Estás seguro que deseas cerrar sesión?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#ccc' }]}
                onPress={() => setMostrarModal(false)}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#E53935' }]}
                onPress={cerrarSesion}
              >
                <Text style={styles.modalButtonText}>Cerrar sesión</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  maincontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  containerone: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  logo: {
    width: 120,
    height: 120,
  },
  brand: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonperfil: {
    marginTop: 16,
    backgroundColor: '#0B7D03',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 20,
    width: '70%',
    alignItems: 'center',
    maxWidth: 350,
  },
  buttontext: {
    color: '#fff',
    fontWeight: 'bold',
  },
  line: {
    fontWeight: 'bold',
    marginTop: 10,
    color: '#ccc',
  },
  containerdos: {
    marginTop: 40,
    width: '90%',
  },
  contenedor: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    gap: 10,
  },
  botom: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  botomText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
