import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import 'react-native-gesture-handler';
import 'react-native-reanimated';


import ContactoScreen from './contacto';
import Index2Screen from './CustomDrawerContent';
import DashboardScreen from './dashboard';
import EditarPerfilScreen from './editarPerfil';
import WelcomeScreen from './index';
import IngresarCodigoScreen from './IngresarCodigo';
import LoginScreen from './login';
import NotificacionesScreen from './notificaciones';
import NuevaContrasenaScreen from './nuevaContrasena';
import PerfilScreen from './perfil';
import RecuperarScreen from './recuperar';
import RegisterScreen from './register';
import ReportarBacheScreen from './reportarBache';

export type RootStackParamList = {
  index: undefined;
  login: undefined;
  register: undefined;
  recuperar: undefined; 
  nuevaContra: undefined;
  dashboard: undefined;
  editarPerfil: undefined;   
  index2: undefined;
  nuevaContrasena: {email: string} | undefined; // Asegúrate de que este tipo coincida con lo que espera tu pantalla
  contacto: undefined;
  notificaciones: undefined;
  reportarBache: undefined;
  ingresarCodigo: { email: string; codigoGenerado: string};
  perfil: undefined; // Añade esta línea para el perfil
  
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="index" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" component={WelcomeScreen} />
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="register" component={RegisterScreen} />
        <Stack.Screen name="recuperar" component={RecuperarScreen} />
        <Stack.Screen name="nuevaContrasena" component={NuevaContrasenaScreen} />
        <Stack.Screen name="dashboard" component={DashboardScreen} />
        <Stack.Screen name="index2" component={Index2Screen}/>
        <Stack.Screen name="editarPerfil" component={EditarPerfilScreen}/>
        <Stack.Screen name="contacto" component={ContactoScreen}/>
        <Stack.Screen name="notificaciones" component={NotificacionesScreen}/>
        <Stack.Screen name="reportarBache" component={ReportarBacheScreen}/>
        <Stack.Screen name="ingresarCodigo" component={IngresarCodigoScreen} />
        <Stack.Screen name="perfil" component={PerfilScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}