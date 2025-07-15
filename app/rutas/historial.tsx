import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

type HistorialItem = {
  id: string;
  lugar: string;
  fecha: string; // Ejemplo: "15/07/2025 - 14:30"
};

// Ejemplos aleatorios
const historialData: HistorialItem[] = [
  { id: "1", lugar: "Playa del Carmen, Centro", fecha: "15/07/2025 - 14:30" },
  { id: "2", lugar: "Aeropuerto Internacional de Cancún", fecha: "14/07/2025 - 09:15" },
  { id: "3", lugar: "Parque Fundadores, Playa del Carmen", fecha: "12/07/2025 - 18:42" },
  { id: "4", lugar: "Terminal de Autobuses ADO", fecha: "10/07/2025 - 07:20" },
  { id: "5", lugar: "Calle Quinta Avenida, Playa del Carmen", fecha: "08/07/2025 - 20:10" },
];

export default function HistorialScreen() {
  const navigation = useNavigation();

  const renderItem = ({ item }: { item: HistorialItem }) => (
    <View style={styles.itemContainer}>
      <Ionicons name="time-outline" size={22} color="#0B7D03" style={{ marginRight: 10 }} />
      <View style={{ flex: 1 }}>
        <Text style={styles.lugar}>{item.lugar}</Text>
        <Text style={styles.fecha}>{item.fecha}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Botón para volver */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <Text style={styles.titulo}>Historial de Búsquedas</Text>
      </View>

      {/* Lista del historial */}
      <FlatList
        data={historialData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    marginRight: 10,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 20, // Lo movemos un poco más a la derecha
  },
  itemContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    elevation: 2,
  },
  lugar: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  fecha: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
  },
  separator: {
    height: 10,
  },
});
