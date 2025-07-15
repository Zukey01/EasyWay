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

// ✅ Tipo para navegación
type NavProp = NativeStackNavigationProp<RootStackParamList, "privacidad">;

export default function PrivacyPolicyScreen() {
  const navigation = useNavigation<NavProp>();

  return (
    <View style={{ flex: 1, backgroundColor: "#f0f0f0" }}>
      {/* ✅ Flecha de retroceso */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("index")}>
          <Ionicons name="arrow-back" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Política de Privacidad</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* ✅ Caja principal con sombra */}
        <View style={styles.card}>
          <Text style={styles.header}>Google Privacidad y Términos</Text>

          <Text style={styles.smallText}>
            En vigencia a partir del 22 de mayo de 2024 |{" "}
            <Text style={styles.link}>Versiones anteriores</Text> |{" "}
            <Text style={styles.link}>Descargar PDF</Text>
          </Text>

          <Text style={styles.smallText}>
            Versión específica para el país: México
          </Text>

          <Text style={styles.sectionTitle}>Qué cubren estas condiciones</Text>

          <Text style={styles.paragraph}>
            Sabemos que es tentador saltarse estas Condiciones del Servicio, pero
            es importante establecer qué puede esperar de nosotros cuando usa los
            servicios de Google, y qué esperamos nosotros de usted.
          </Text>

          <Text style={styles.paragraph}>
            Estas Condiciones del Servicio reflejan el{" "}
            <Text style={styles.link}>comportamiento comercial de Google</Text>,
            las leyes que se aplican a nuestro negocio y determinados aspectos que
            siempre hemos considerado ciertos. Como resultado, estas Condiciones del
            Servicio definen la relación con Google en el marco de su interacción
            con nuestros servicios. Por ejemplo, estas condiciones incluyen las
            siguientes secciones:
          </Text>

          <View style={styles.box}>
            <Text style={styles.listItem}>
              ✅ Lo que puede esperar de nosotros, donde se describe cómo brindaremos
              y desarrollaremos nuestros servicios
            </Text>
            <Text style={styles.listItem}>
              ✅ Qué esperamos de usted, donde se establecen ciertas reglas para usar
              nuestros servicios
            </Text>
            <Text style={styles.listItem}>
              ✅ Contenido en los servicios de Google, donde se describen los
              derechos de propiedad intelectual relacionados con el contenido que
              aparece en nuestros servicios, ya sea suyo o nuestro
            </Text>
            <Text style={styles.listItem}>
              ✅ En caso de problemas o desacuerdos, donde se describen otros derechos
              legales que tiene, y qué esperar en caso de que alguien incumpla estas
              condiciones
            </Text>
          </View>

          <Text style={styles.paragraph}>
            Es importante que comprenda estas condiciones porque, para usar nuestros
            servicios, debe aceptarlas.
          </Text>

          <Text style={styles.paragraph}>
            Además de estas condiciones, también publicamos una{" "}
            <Text style={styles.link}>Política de Privacidad</Text>. Si bien no forma
            parte de estas condiciones, le recomendamos que la lea para comprender
            mejor cómo puede actualizar, administrar, exportar y borrar su información.
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
  smallText: { fontSize: 13, color: "#666", marginBottom: 8 },
  sectionTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  listItem: {
    fontSize: 15,
    color: "#444",
    paddingVertical: 6,
    lineHeight: 20,
  },
});
