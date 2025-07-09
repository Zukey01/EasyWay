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
import { RootStackParamList } from './App';

export default function Notificaciones() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { height, width } = Dimensions.get('window');

  return (
    <ScrollView contentContainerStyle={[styles.scrollContainer, { minHeight: height }]}>
      
      {/* Encabezado */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color="#0B7D03" />
        </TouchableOpacity>
        <Text style={styles.title}>Notificaciones</Text>
      </View>

      {/* Contenido principal */}
      <View style={styles.container}>
        

        <Text style={{fontWeight: 'bold'}}>Sin notificaciones de seguridad</Text>
        <Text>Pronto tus nuevas notificaciones apareceran aqui</Text>

        <View style={{flexDirection:'row', marginTop:300 }}>
          <TouchableOpacity style={{width: 150, height:40, backgroundColor: '#00712D', alignItems: 'center',justifyContent:'center', borderRadius:10, marginRight:20}}>
            <Text style={{color: 'white', fontWeight:'bold'}}>Marcar como leido</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{width: 150, height:40, backgroundColor: '#90A4AE', alignItems: 'center',justifyContent:'center', borderRadius:10}}>
            <Text style={{color: 'white', fontWeight:'bold'}}>Configuracion</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  header: {
    position: 'relative',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
    marginBottom: 20,
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
    textAlign: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
});