import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as DocumentPicker from 'expo-document-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function ReportarBache() {
  const navigation = useNavigation();

  // Estado local
  const [descripcion, setDescripcion] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [archivo, setArchivo] = useState(null);
  const [fecha, setFecha] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  // Seleccionar archivo
  const seleccionarArchivo = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
      if (!result.canceled) {
        setArchivo(result.assets[0]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Enviar reporte (futuro backend)
  const enviarReporte = () => {
    console.log('Descripción:', descripcion);
    console.log('Ubicación:', ubicacion);
    console.log('Archivo:', archivo?.name || 'No seleccionado');
    console.log('Fecha:', fecha.toLocaleString());

    // Aquí puedes hacer una petición POST al backend
  };

  return (
    <View style={styles.container}>
      {/* Botón de regresar */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Reportar bache</Text>

      {/* Perfil */}
      <View style={styles.profileBox}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>A</Text>
        </View>
        <Text style={styles.nombre}>Alberto</Text>
        <Text style={styles.estado}>Usuario registrado</Text>
      </View>

      {/* Formulario */}
      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Describa el problema..."
        multiline
        value={descripcion}
        onChangeText={setDescripcion}
      />

      <Text style={styles.label}>Ubicación</Text>
      <TextInput
        style={styles.input}
        placeholder="Ubicación del bache"
        value={ubicacion}
        onChangeText={setUbicacion}
      />

      <Text style={styles.label}>Imagen</Text>
      <TouchableOpacity style={styles.fileInput} onPress={seleccionarArchivo}>
        <Text style={{ color: '#000' }}>
          {archivo ? archivo.name : 'Seleccionar archivo'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.label}>Fecha del reporte</Text>
      <TouchableOpacity style={styles.input} onPress={() => setShowPicker(true)}>
        <Text>{fecha.toLocaleString()}</Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={fecha}
          mode="datetime"
          display="default"
          onChange={(event, selectedDate) => {
            setShowPicker(Platform.OS === 'ios');
            if (selectedDate) {
              setFecha(selectedDate);
            }
          }}
        />
      )}

      {/* Botón enviar */}
      <TouchableOpacity style={styles.submitButton} onPress={enviarReporte}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Enviar Reporte</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    flex: 1,
  },
  backButton: {
    marginTop: 40,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 10,
  },
  profileBox: {
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 20,
  },
  avatar: {
    backgroundColor: '#C8E6C9',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#006400',
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  estado: {
    color: '#666',
    fontSize: 12,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  textArea: {
    backgroundColor: '#D0EFD0',
    borderRadius: 8,
    padding: 10,
    height: 90,
    textAlignVertical: 'top',
  },
  input: {
    backgroundColor: '#D0EFD0',
    borderRadius: 8,
    padding: 10,
  },
  fileInput: {
    backgroundColor: '#D0EFD0',
    borderRadius: 8,
    padding: 12,
    justifyContent: 'center',
  },
  submitButton: {
    backgroundColor: '#006400',
    marginTop: 25,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
});
