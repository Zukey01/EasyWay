import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { Ionicons } from "@expo/vector-icons";

// ✅ Tipo de navegación para esta pantalla
type NavProp = NativeStackNavigationProp<RootStackParamList, "condiciones">;

export default function TermsOfServiceScreen() {
  const navigation = useNavigation<NavProp>();

  return (
    <View style={{ flex: 1, backgroundColor: "#f0f0f0" }}>
      {/* ✅ Flecha de retroceso */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("index")}>
          <Ionicons name="arrow-back" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Condiciones del servicio</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* ✅ Caja principal con sombra */}
        <View style={styles.card}>
          <Text style={styles.header}>Google Privacidad y Términos</Text>

          <Text style={styles.paragraph}>
            Cuando usa nuestros servicios, nos confía su información. Comprendemos
            que se trata de una gran responsabilidad y trabajamos arduamente para
            proteger su información y darle el control de ella.
          </Text>

          <Text style={styles.paragraph}>
            Esta Política de Privacidad está destinada a ayudarlo a entender qué
            información recopilamos, por qué lo hacemos y cómo puede actualizar,
            administrar, exportar y borrar su información.
          </Text>

          <View style={styles.box}>
            <Text style={styles.link}>✅ Verificación de privacidad</Text>
            <Text style={styles.smallText}>
              ¿Quiere cambiar su configuración de privacidad?
            </Text>
            <Text style={styles.link}>Realice la Verificación de privacidad →</Text>
          </View>

          <Text style={styles.smallText}>
            En vigencia a partir del 16 de septiembre de 2024 |{" "}
            <Text style={styles.link}>Versiones anteriores</Text> |{" "}
            <Text style={styles.link}>Descargar PDF</Text>
          </Text>

          <Text style={styles.sectionTitle}>Contenido</Text>
          <Text style={styles.listItem}>› Introducción</Text>
          <Text style={styles.listItem}>› La información que recopila Google</Text>
          <Text style={styles.listItem}>› Por qué Google recopila datos</Text>
          <Text style={styles.listItem}>› Sus controles de privacidad</Text>
          <Text style={styles.listItem}>› Uso compartido de la información</Text>
          <Text style={styles.listItem}>› Protección de la información</Text>
          <Text style={styles.listItem}>
            › Cumplimiento y cooperación con reguladores
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#333",
  },
  scrollContent: {
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  header: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
    color: "#222",
  },
  paragraph: {
    fontSize: 16,
    color: "#444",
    marginBottom: 12,
    lineHeight: 22,
  },
  box: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  link: { color: "#1a73e8", fontWeight: "500" },
  smallText: { fontSize: 13, color: "#666", marginTop: 4 },
  sectionTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  listItem: {
    fontSize: 16,
    color: "#444",
    paddingVertical: 4,
  },
});
