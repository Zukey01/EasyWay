import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './App';

export default function EditarPerfil() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { height } = Dimensions.get('window');

  return (
    <ScrollView contentContainerStyle={[styles.scrollContainer, { minHeight: height }]}>
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color="#0B7D03" />
        </TouchableOpacity>
        <Text style={styles.title}>Editar perfil</Text>
      </View>

      <View style={styles.avatarContainer}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.avatar}
        />
        <Text style={styles.changePhotoText}>Cambiar foto</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Acerca de ti</Text>

        <View style={styles.labelRow}>
          <Text style={styles.labelBold}>Nombre de usuario</Text>
          <TouchableOpacity>
          </TouchableOpacity>
        </View>
        <Text style={styles.helperText}>Otros usuarios podrán ver tu nombre de Usuario y avatar.</Text>
        <TextInput style={styles.input} placeholder='Tu usuario' editable={true} Icon name="pencil" size={18} />
        
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Datos de Acceso</Text>

        <Text style={styles.label}>Correo electrónico</Text>
        <TextInput style={styles.input} placeholder='usuario@gmail.com' editable={true} />

        <Text style={styles.label}>Contraseña</Text>
        <TextInput style={styles.input} placeholder='contraseña' secureTextEntry editable={true} />

        <Text style={styles.label}>Fecha de Nacimiento</Text>
        <TextInput style={styles.input} value="11/01/04" editable={true} />
      </View>

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Guardar</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingBottom: 30,
  },
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  changePhotoText: {
    marginTop: 8,
    color: '#888',
    fontWeight: 'bold',
  },
  section: {
    paddingHorizontal: 25,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#555',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelBold: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 15,
  },
  helperText: {
    color: '#999',
    fontSize: 12,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#D4E8D0',
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  saveButton: {
    backgroundColor: '#0B7D03',
    marginHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
