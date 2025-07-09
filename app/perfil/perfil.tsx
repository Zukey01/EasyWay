import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

export default function Perfil() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [nombre, setNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');

  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const usuarioString = await AsyncStorage.getItem('usuario');
        if (usuarioString) {
          const usuario = JSON.parse(usuarioString);
          setNombre(usuario.nombre || '');
          setApellidoPaterno(usuario.apellidoPaterno || '');
        }
      } catch (error) {
        console.error('Error al cargar usuario:', error);
      }
    };

    obtenerUsuario();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Perfil</Text>

      <View style={styles.profileSection}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.avatar}
        />

        <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('editarPerfil')}>
          <Text style={styles.editText}>Editar perfil</Text>
        </TouchableOpacity>

        <Text style={styles.userName}>{nombre} {apellidoPaterno}</Text>

        <View style={styles.locationRow}>
          <Ionicons name="location" size={18} color="#0B7D03" />
          <Text style={styles.locationText}>Playa del Carmen</Text>

          <Text style={styles.levelLabel}>Nivel </Text>
          <Text style={styles.levelValue}>Diamante</Text>
          <Ionicons name="diamond-outline" size={18} color="#00BFFF" style={{ marginLeft: 4 }} />
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Rutas</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Puntos</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statNumber}>00/00</Text>
          <Text style={styles.statLabel}>Último viaje</Text>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Cumpleaños</Text>
        <TextInput style={styles.input} value="11/01/04" editable={false} />
      </View>

      <View style={styles.memberSince}>
        <Text>Miembro desde: Mayo 2023</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F8F9FA',
    minHeight: '100%',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  title: {
    marginTop: 60,
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 30,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#D0EAE2',
  },
  editButton: {
    backgroundColor: '#C8E6C9',
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginTop: 8,
  },
  editText: {
    fontSize: 12,
    color: '#0B7D03',
    fontWeight: 'bold',
  },
  userName: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    flexWrap: 'wrap',
  },
  locationText: {
    marginHorizontal: 4,
  },
  levelLabel: {
    marginLeft: 10,
  },
  levelValue: {
    color: '#00BFFF',
    fontWeight: 'bold',
  },
  statsContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    flexDirection: 'row',
    marginTop: 30,
    padding: 20,
    width: '100%',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  inputGroup: {
    marginTop: 30,
    width: '100%',
  },
  inputLabel: {
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#555',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  memberSince: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
  },
});
