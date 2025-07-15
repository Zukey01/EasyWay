import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { RootStackParamList } from '../App';

export default function Notificaciones() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { height } = Dimensions.get('window');

  return (
    <ScrollView contentContainerStyle={[styles.scrollContainer, { minHeight: height }]}>

      {/* ✅ Encabezado con botón atrás */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color="#0B7D03" />
        </TouchableOpacity>
        <Text style={styles.title}>Notificaciones de seguridad</Text>
      </View>

      {/* ✅ Lista de notificaciones */}
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Hoy</Text>
        {[1, 2, 3].map((item) => (
          <View key={`today-${item}`} style={styles.notificationCard}>
            <Text style={styles.notificationTitle}>Notificación {item}</Text>
            <Text>Pronto tus nuevas notificaciones aparecerán aquí</Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Ayer</Text>
        {[1, 2, 3].map((item) => (
          <View key={`yesterday-${item}`} style={styles.notificationCard}>
            <Text style={styles.notificationTitle}>Notificación {item}</Text>
            <Text>Pronto tus nuevas notificaciones aparecerán aquí</Text>
          </View>
        ))}
      </View>

      {/* ✅ Botones inferiores */}
      <View style={styles.footerButtons}>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#00712D' }]}>
          <Text style={styles.actionButtonText}>Marcar como leído</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#90A4AE' }]}>
          <Text style={styles.actionButtonText}>Configuración</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },

  /* ✅ Encabezado */
  header: {
    position: 'relative',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
    marginBottom: 10,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 30,
    padding: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },

  /* ✅ Contenido de notificaciones */
  content: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 8,
    fontSize: 16,
  },
  notificationCard: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
  },
  notificationTitle: {
    fontWeight: 'bold',
  },

  /* ✅ Botones inferiores */
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 30,
    marginBottom: 40,
  },
  actionButton: {
    width: 150,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
