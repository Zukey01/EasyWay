import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import 'react-native-reanimated';

import ContactoScreen from '../app/perfil/contacto';
import Index2Screen from '../app/dashboard/CustomDrawerContent';
import DashboardScreen from '../app/dashboard/dashboard';
import EditarPerfilScreen from '../app/perfil/editarPerfil';
import WelcomeScreen from '../app/login/index';
import IngresarCodigoScreen from '../app/login/IngresarCodigo';
import LoginScreen from '../app/login/login';
import NotificacionesScreen from '../app/perfil/notificaciones';
import NuevaContrasenaScreen from '../app/login/nuevaContrasena';
import PerfilScreen from '../app/perfil/perfil';
import RecuperarScreen from '../app/login/recuperar';
import RegisterScreen from '../app/login/register';
import ReportarBacheScreen from '../app/reportarbache/reportarBache';
import StateUserProvider from '../app/context/stateUser';
import AjustesScreen from '../app/tools/ajustes';
import CondicionesScreen from '../app/privacidad/condiciones';
import PrivacyPolicyScreen from '../app/privacidad/privacidad';
import HistorialScreen from '../app/rutas/historial';

export type RootStackParamList = {
  index: undefined;
  login: undefined;
  register: undefined;
  recuperar: undefined; 
  nuevaContra: undefined;
  dashboard: undefined;
  editarPerfil: undefined;   
  index2: undefined;
  nuevaContrasena: { email: string } | undefined;
  contacto: undefined;
  notificaciones: undefined;
  reportarBache: undefined;
  ingresarCodigo: { email: string; codigoGenerado: string };
  perfil: undefined;
  ajustes: undefined;
  condiciones: undefined;
  privacidad: undefined;
  historial: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <StateUserProvider>
        <Stack.Navigator initialRouteName="index" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" component={WelcomeScreen} />
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name="register" component={RegisterScreen} />
          <Stack.Screen name="recuperar" component={RecuperarScreen} />
          <Stack.Screen name="nuevaContrasena" component={NuevaContrasenaScreen} />
          <Stack.Screen name="dashboard" component={DashboardScreen} />
          <Stack.Screen name="index2" component={Index2Screen} />
          <Stack.Screen name="editarPerfil" component={EditarPerfilScreen} />
          <Stack.Screen name="contacto" component={ContactoScreen} />
          <Stack.Screen name="notificaciones" component={NotificacionesScreen} />
          <Stack.Screen name="reportarBache" component={ReportarBacheScreen} />
          <Stack.Screen name="ingresarCodigo" component={IngresarCodigoScreen} />
          <Stack.Screen name="perfil" component={PerfilScreen} />
          <Stack.Screen name="ajustes" component={AjustesScreen}/>
          <Stack.Screen name="condiciones" component={CondicionesScreen} />
          <Stack.Screen name="privacidad" component={PrivacyPolicyScreen} />
          <Stack.Screen name="historial" component={HistorialScreen} />
        </Stack.Navigator>
    </StateUserProvider>
  );
}
