import { Entypo } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as Location from 'expo-location';
import React, { useRef, useState } from 'react';
import {
  FlatList,
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { BottomSheet } from 'react-native-sheet';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomDrawerContent from '../dashboard/CustomDrawerContent';

const MAPBOX_TOKEN = 'pk.eyJ1Ijoia2V2c3luZHJvbWUiLCJhIjoiY21icDVoNGtuMDB5dDJ2cTU4bms0aWttcCJ9.lW4Mf_0RgTSdhTpTCbC8MQ';

function getDeltas(zoom: number) {
  const latitudeDelta = Math.exp(Math.log(180) - zoom * 0.35);
  const longitudeDelta = latitudeDelta;
  return { latitudeDelta, longitudeDelta };
}

const Drawer = createDrawerNavigator();

export default function Dashboard() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Mapa" component={DashboardScreen} />
    </Drawer.Navigator>
  );
}

function DashboardScreen({ navigation }: any) {
  const bottomSheet = useRef(null);
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [zoom, setZoom] = useState(15);
  const [routePoints, setRoutePoints] = useState([]);
  const [region, setRegion] = useState({
    latitude: 20.6408526,
    longitude: -87.0733932,
    ...getDeltas(15),
  });

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;
      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        ...getDeltas(15),
      });
    })();
  }, []);

  const handleSearch = async (text: string) => {
    setSearch(text);
    if (text.length < 3) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(text)}.json?access_token=${MAPBOX_TOKEN}&language=es&limit=5`
      );
      const data = await res.json();
      setSuggestions(data.features || []);
    } catch (e) {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (item: any) => {
    const newZoom = 15;
    setRegion({
      latitude: item.center[1],
      longitude: item.center[0],
      ...getDeltas(newZoom),
    });
    setZoom(newZoom);
    setSearch(item.place_name);
    setSuggestions([]);
    Keyboard.dismiss();
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => navigation.openDrawer()}
            >
              <Entypo name="menu" size={24} color="#000" />
            </TouchableOpacity>
            <View style={styles.searchBarContainer}>
              <View style={styles.inputGO}>
                <Ionicons name="search" size={20} color="#0B7D03" />
                <TextInput
                  placeholder="¿A dónde quieres ir?"
                  placeholderTextColor="#000"
                  style={{ marginLeft: 10, flex: 1 }}
                  value={search}
                  onChangeText={handleSearch}
                />
              </View>
              {suggestions.length > 0 && (
                <FlatList
                  data={suggestions}
                  keyExtractor={item => item.id}
                  style={{ backgroundColor: '#fff', width: '100%', borderRadius: 8, marginTop: 5, maxHeight: 150, position: 'absolute', top: 55, zIndex: 100 }}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={{ padding: 10, borderBottomWidth: 1, borderColor: '#eee' }}
                      onPress={() => handleSelectSuggestion(item)}
                    >
                      <Text>{item.place_name}</Text>
                    </TouchableOpacity>
                  )}
                />
              )}
            </View>
          </View>

          <View style={styles.fakeMap}>
            <MapView
              style={{ flex: 1, width: '100%', height: '100%' }}
              region={region}
              onPress={(e) => {
                const { latitude, longitude } = e.nativeEvent.coordinate;
                setRoutePoints([...routePoints, { latitude, longitude }]);
              }}
            >
              <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
              {routePoints.length > 1 && (
                <Polyline
                  coordinates={routePoints}
                  strokeColor="#0B7D03"
                  strokeWidth={4}
                />
              )}
            </MapView>

            <View style={styles.zoomButtonsContainer}>
              <TouchableOpacity
                style={styles.zoomButton}
                onPress={() => {
                  const newZoom = zoom + 1;
                  if (newZoom <= 20) {
                    setZoom(newZoom);
                    setRegion({
                      latitude: region.latitude,
                      longitude: region.longitude,
                      ...getDeltas(newZoom),
                    });
                  }
                }}
              >
                <Text style={styles.zoomButtonText}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.zoomButton}
                onPress={() => {
                  const newZoom = zoom - 1;
                  if (newZoom >= 2) {
                    setZoom(newZoom);
                    setRegion({
                      latitude: region.latitude,
                      longitude: region.longitude,
                      ...getDeltas(newZoom),
                    });
                  }
                }}
              >
                <Text style={styles.zoomButtonText}>-</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.centerBottomButtonContainer}>
              <TouchableOpacity
                style={styles.centerBottomButton}
                onPress={() => bottomSheet.current?.show()}
              >
                <Ionicons name="chevron-up-outline" size={20} color="black" />
              </TouchableOpacity>
            </View>

            <View style={styles.reportButtonContainer}>
              <TouchableOpacity style={styles.alertButton} onPress={() => navigation.navigate('reportarBache')}>
                <Image
                  source={require('../../assets/images/reporte.png')}
                  style={{ width: 24, height: 24, resizeMode: 'contain' }}
                />
              </TouchableOpacity>
            </View>

            <View style={{ position: 'absolute', bottom: 90, right: 20, zIndex: 30 }}>
              <TouchableOpacity
                style={styles.alertButton}
                onPress={async () => {
                  try {
                    const response = await fetch('http://TU_BACKEND_URL/api/rutas', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        puntos: routePoints,
                        fecha: new Date().toISOString(),
                        usuarioId: 'ID_DEL_USUARIO_AUTENTICADO',
                      }),
                    });
                    const json = await response.json();
                    alert('Ruta guardada con éxito');
                    setRoutePoints([]);
                  } catch (err) {
                    console.error(err);
                    alert('Error al guardar la ruta');
                  }
                }}
              >
                <Ionicons name="save-outline" size={24} color="#0B7D03" />
              </TouchableOpacity>
            </View>
          </View>

          <BottomSheet height={600} ref={bottomSheet}>
             <ScrollView>
              {/* BOTONES CASA, ESCUELA, TRABAJO, OTRO */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  padding: 20,
                }}
              >
                <TouchableOpacity style={styles.placeButton}>
                  <Ionicons name="home" size={20} color="green" />
                  <Text>Casa</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.placeButton}>
                  <Ionicons name="school" size={20} color="brown" />
                  <Text>Escuela</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.placeButton}>
                  <Ionicons name="briefcase" size={20} color="orange" />
                  <Text>Trabajo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.placeButton}>
                  <Ionicons name="location-sharp" size={20} color="red" />
                  <Text>Otro</Text>
                </TouchableOpacity>
              </View>

              {/* ÚLTIMAS RUTAS */}
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  marginLeft: 20,
                  marginTop: 10,
                }}
              >
                Tus últimas rutas
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                  justifyContent: "center",
                }}
              >
                <View style={styles.recentRouteBox} />
                <View style={styles.recentRouteBox} />
                <View style={styles.recentRouteBox} />
              </View>

              {/* NOTIFICACIONES SEGURIDAD */}
              <View style={styles.cardGreen}>
                <Text style={styles.cardTitle}>NOTIFICACIONES DE SEGURIDAD</Text>
                <Text>¡Atención! Incidentes reportados en la zona</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("notificaciones")}
                >
                  <Text style={styles.link}>Ver notificaciones</Text>
                </TouchableOpacity>
              </View>

              {/* REPORTAR INCIDENTE */}
              <View style={styles.cardYellow}>
                <Text style={styles.cardTitle}>REPORTAR INCIDENTE</Text>
                <Text>Ayuda a mejorar las rutas reportando incidentes</Text>
                <TouchableOpacity
                  style={styles.reportButtonBig}
                  onPress={() => navigation.navigate("reportarBache")}
                >
                  <Text
                    style={{
                      color: "#fff",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    Reportar
                  </Text>
                </TouchableOpacity>
              </View>

              {/* HISTORIAL DE RUTAS */}
              <View style={styles.cardBlue}>
                <Text style={styles.cardTitle}>HISTORIAL DE RUTAS</Text>
                <Text>Sin registros de rutas</Text>
                <TouchableOpacity>
                  <Text style={styles.link} onPress={() => navigation.navigate("historial")}>
                    Historial completo
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </BottomSheet>
        </View>
      </TouchableWithoutFeedback>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    position: "absolute",
    top: 40,
    left: 20,
    right: 20,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  menuButton: {
    width: 40,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  searchBarContainer: {
    flex: 1,
    marginLeft: 10,
    position: "relative",
    zIndex: 100,
  },
  inputGO: {
    width: "90%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  fakeMap: { flex: 1, backgroundColor: "#CCE8D0" },
  zoomButtonsContainer: {
    position: "absolute",
    bottom: 30,
    left: 20,
    flexDirection: "column",
    zIndex: 20,
  },
  zoomButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
    elevation: 5,
  },
  zoomButtonText: { fontSize: 24, color: "#0B7D03", fontWeight: "bold" },
  centerBottomButtonContainer: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 30,
  },
  centerBottomButton: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 25,
    paddingHorizontal: 30,
    paddingVertical: 12,
    elevation: 5,
  },
  reportButtonContainer: {
    position: "absolute",
    bottom: 30,
    right: 20,
    zIndex: 30,
  },
  alertButton: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  recentRouteBox: {
    width: 100,
    height: 60,
    backgroundColor: "#C4C4C4",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  placeButton: {
    width: 72,
    height: 35,
    backgroundColor: "white",
    borderRadius: 8,
    borderColor: "black",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginHorizontal: 5,
  },
  cardGreen: {
    backgroundColor: "#eaf8ea",
    padding: 16,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
  },
  cardYellow: {
    backgroundColor: "#fef8e6",
    padding: 16,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 10,
  },
  cardBlue: {
    backgroundColor: "#eef6f9",
    padding: 16,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 30,
  },
  cardTitle: { fontWeight: "bold", marginBottom: 5 },
  link: { color: "green", marginTop: 5, fontWeight: "bold" },
  reportButtonBig: {
    backgroundColor: "orange",
    marginTop: 8,
    padding: 10,
    borderRadius: 8,
  },
});

