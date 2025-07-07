import { Entypo } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as Location from 'expo-location';
import React, { useRef, useState } from 'react';
import {
  FlatList,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';
import { BottomSheet } from 'react-native-sheet';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomDrawerContent from './CustomDrawerContent';


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
            >
              <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
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
                  source={require('../assets/images/reporte.png')}
                  style={{ width: 24, height: 24, resizeMode: 'contain' }}
                />
              </TouchableOpacity>
            </View>
          </View>

          <BottomSheet height={500} ref={bottomSheet}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20, alignItems: 'center' }}>
              <TouchableOpacity style={{ width: 83, height: 25, backgroundColor: 'white', borderRadius: 10, borderColor: 'black', borderWidth: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                <Ionicons name="home" size={20} color="green" />
                <Text>Casa</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: 83, height: 25, backgroundColor: 'white', borderRadius: 10, borderColor: 'black', borderWidth: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                <Ionicons name="school" size={20} color="brown" />
                <Text>Escuela</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: 83, height: 25, backgroundColor: 'white', borderRadius: 10, borderColor: 'black', borderWidth: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                <Ionicons name="briefcase" size={20} color="orange" />
                <Text>Trabajo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: 83, height: 25, backgroundColor: 'white', borderRadius: 10, borderColor: 'black', borderWidth: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                <Ionicons name="location-sharp" size={20} color="red" />
                <Text>Otro</Text>
              </TouchableOpacity>
            </View>

            <View>
              <Text style={{fontWeight: 'bold', fontSize: 20, marginLeft: 30, marginTop: 20}}>Tus últimas rutas</Text>
              <Text style={{marginLeft: 30, marginTop: 12}}>Aqui apareceran tus ultimas rutas</Text>
              <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity style={styles.recentRouteBox} />
                <TouchableOpacity style={styles.recentRouteBox} />
                <TouchableOpacity style={styles.recentRouteBox} /> 
                
              </View>
            </View>

            <View style={styles.containersGreen}>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Rutas recientes</Text>
              <Text style={{ marginTop: 10 }}>Aquí aparecerán tus rutas recientes.</Text>
            </View>
            <View style={styles.containersGreen}>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Rutas recientes</Text>
              <Text style={{ marginTop: 10 }}>Aquí aparecerán tus rutas recientes.</Text>
            </View>
            <View style={styles.containersGreen}>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Rutas recientes</Text>
              <Text style={{ marginTop: 10 }}>Aquí aparecerán tus rutas recientes.</Text>
            </View>
          </BottomSheet>
        </View>
      </TouchableWithoutFeedback>
    </GestureHandlerRootView>
  );
}



const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  searchBarContainer: {
    flex: 1,
    marginLeft: 10,
    position: 'relative',
    zIndex: 100,
  },
  inputGO: {
    width: '90%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fakeMap: {
    flex: 1,
    backgroundColor: '#CCE8D0',
  },
  zoomButtonsContainer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    flexDirection: 'column',
    zIndex: 20,
  },
  zoomButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    elevation: 5,
  },
  zoomButtonText: {
    fontSize: 24,
    color: '#0B7D03',
    fontWeight: 'bold',
  },
  centerBottomButtonContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 30,
  },
  centerBottomButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 25,
    paddingHorizontal: 30,
    paddingVertical: 12,
    elevation: 5,
  },
  reportButtonContainer: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    zIndex: 30,
  },
  alertButton: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  containerSheet: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  recentRouteBox: {
    width: 100,
    height: 60,
    backgroundColor: '#C4C4C4',
    borderRadius: 5,
    marginHorizontal: 5,
    marginTop: 20,
    marginLeft: 20,
  },
  containersGreen: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C8E6C9',
    borderRadius: 10,
    marginTop: 20,
    marginLeft: 25,
  },
});
