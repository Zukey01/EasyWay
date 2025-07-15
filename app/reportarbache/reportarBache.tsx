import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import MapView, { Marker, MapPressEvent } from 'react-native-maps';

export default function ReportarBache() {
  const navigation = useNavigation();

  const [fecha, setFecha] = useState(new Date());
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState<any>(null);
  const [ubicacionTexto, setUbicacionTexto] = useState('');
  const [mostrarMapa, setMostrarMapa] = useState(false);
  const [coordenadas, setCoordenadas] = useState({
    latitude: 20.6274,
    longitude: -87.07987,
  });

  const mostrarSelectorFecha = () => {
    DateTimePickerAndroid.open({
      value: fecha,
      onChange: (_event, selectedDate) => {
        if (selectedDate) setFecha(selectedDate);
      },
      mode: 'datetime',
      is24Hour: true,
    });
  };

  const handleMapaPress = (e: MapPressEvent) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setCoordenadas({ latitude, longitude });
    setUbicacionTexto(`Lat: ${latitude.toFixed(5)}, Lng: ${longitude.toFixed(5)}`);
    setMostrarMapa(false);
  };

  const pickImage = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ['image/*'],
      copyToCacheDirectory: true,
    });
    if (result.type === 'success') {
      setImagen(result);
    }
  };

  const enviarReporte = () => {
    const descripcionLlena = descripcion.trim() !== '';
    const ubicacionLlena = ubicacionTexto.trim() !== '';
    const imagenSeleccionada = imagen !== null;

    if (!descripcionLlena && !ubicacionLlena && !imagenSeleccionada) {
      Alert.alert('Por favor', 'Rellene todos los campos.');
      return;
    }

    if (!descripcionLlena || !ubicacionLlena || !imagenSeleccionada) {
      Alert.alert('Datos incompletos', 'Por favor, complete todos los campos antes de enviar.');
      return;
    }

    console.log({
      fecha: fecha.toISOString(),
      descripcion,
      imagen,
      coordenadas,
    });

    Alert.alert('Éxito', 'Reporte enviado correctamente');

    setDescripcion('');
    setImagen(null);
    setUbicacionTexto('');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('dashboard' as never)}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={28} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Reportar bache</Text>

      <Text style={styles.label}>Fecha del reporte</Text>
      <TouchableOpacity style={styles.inputWithIcon} onPress={mostrarSelectorFecha}>
        <Text style={styles.inputText}>{fecha.toLocaleString()}</Text>
        <Ionicons name="calendar-outline" size={22} color="gray" />
      </TouchableOpacity>

      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Describa el problema..."
        placeholderTextColor="#666"
        multiline
        value={descripcion}
        onChangeText={setDescripcion}
      />

      <Text style={styles.label}>Imagen</Text>
      <TouchableOpacity style={styles.inputWithIcon} onPress={pickImage}>
        <Text style={styles.inputText}>
          {imagen ? imagen.name : 'Seleccionar imagen'}
        </Text>
        <Ionicons name="document-attach-outline" size={22} color="gray" />
      </TouchableOpacity>
      {imagen?.uri && (
        <Image
          source={{ uri: imagen.uri }}
          style={{ width: '100%', height: 180, borderRadius: 10, marginTop: 10 }}
          resizeMode="cover"
        />
      )}

      <Text style={styles.label}>Ubicación</Text>
      <TouchableOpacity
        style={styles.inputWithIcon}
        onPress={() => setMostrarMapa(true)}
      >
        <Text style={styles.inputText}>
          {ubicacionTexto || 'Seleccionar en el mapa'}
        </Text>
        <Ionicons name="location-outline" size={22} color="gray" />
      </TouchableOpacity>

      {mostrarMapa && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: coordenadas.latitude,
            longitude: coordenadas.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          onPress={handleMapaPress}
        >
          <Marker coordinate={coordenadas} />
        </MapView>
      )}

      <TouchableOpacity
        style={styles.submitButton}
        onPress={enviarReporte}
      >
        <Text style={styles.submitButtonText}>Enviar Reporte</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 60,
    marginBottom: 24,
    textAlign: 'center',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'flex-start',
    marginTop: 16,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#D7F3D7',
    borderRadius: 10,
    padding: 12,
    width: '100%',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#C3E6C3',
  },
  inputWithIcon: {
    backgroundColor: '#D7F3D7',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    width: '100%',
    borderWidth: 1,
    borderColor: '#C3E6C3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 50,
  },
  inputText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginRight: 10,
  },
  map: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: '#0B7D03',
    borderRadius: 10,
    paddingVertical: 16,
    width: '100%',
    alignItems: 'center',
    marginTop: 32,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
