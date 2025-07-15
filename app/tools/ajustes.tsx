import React, { useState } from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function SettingsScreen() {
  const navigation = useNavigation();

  const [darkMode, setDarkMode] = useState(false);
  const [showBaches, setShowBaches] = useState(true);
  const [notificationsActive, setNotificationsActive] = useState(true);
  const [wifiSync, setWifiSync] = useState(false);

  const [distanceUnit, setDistanceUnit] = useState("Kilómetros");
  const [language, setLanguage] = useState("Español");
  const [updateTime, setUpdateTime] = useState("10 segundos");
  const [routePref, setRoutePref] = useState("Evitar baches");

  // Para abrir los modales
  const [modalVisible, setModalVisible] = useState(false);
  const [modalOptions, setModalOptions] = useState([]);
  const [modalTitle, setModalTitle] = useState("");
  const [onSelect, setOnSelect] = useState(() => () => {});

  const openSelector = (title, options, setter) => {
    setModalTitle(title);
    setModalOptions(options);
    setOnSelect(() => (value) => {
      setter(value);
      setModalVisible(false);
    });
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* BOTÓN DE CIERRE */}
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.navigate("dashboard")}>
        <Text style={styles.closeButtonText}>✕</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Ajustes</Text>

      {/* GENERAL */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>General</Text>

        <View style={styles.row}>
          <Text>Tema oscuro</Text>
          <Switch value={darkMode} onValueChange={setDarkMode} />
        </View>

        <View style={styles.row}>
          <Text>Unidades de distancia</Text>
          <TouchableOpacity
            style={styles.selector}
            onPress={() =>
              openSelector("Unidades de distancia", ["Kilómetros", "Millas"], setDistanceUnit)
            }
          >
            <Text>{distanceUnit} ▼</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <Text>Idioma</Text>
          <TouchableOpacity
            style={styles.selector}
            onPress={() =>
              openSelector("Idioma", ["Español", "Inglés", "Portugués"], setLanguage)
            }
          >
            <Text>{language} ▼</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* NAVEGACIÓN */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Navegación</Text>

        <View style={styles.row}>
          <Text>Mostrar baches</Text>
          <Switch value={showBaches} onValueChange={setShowBaches} />
        </View>

        <View style={styles.row}>
          <Text>Actualizar cada</Text>
          <TouchableOpacity
            style={styles.selector}
            onPress={() =>
              openSelector(
                "Actualizar cada",
                ["10 segundos", "30 segundos", "1 minuto"],
                setUpdateTime
              )
            }
          >
            <Text>{updateTime} ▼</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <Text>Preferencia de ruta</Text>
          <TouchableOpacity
            style={styles.selector}
            onPress={() =>
              openSelector(
                "Preferencia de ruta",
                ["Evitar baches", "Ruta más corta", "Ruta más rápida"],
                setRoutePref
              )
            }
          >
            <Text>{routePref} ▼</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* NOTIFICACIONES */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notificaciones</Text>
        <View style={styles.row}>
          <Text>Notificaciones activas</Text>
          <Switch value={notificationsActive} onValueChange={setNotificationsActive} />
        </View>
      </View>

      {/* PRIVACIDAD */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Privacidad y datos</Text>
        <View style={styles.row}>
          <Text>Sincronizar solo con Wi-Fi</Text>
          <Switch value={wifiSync} onValueChange={setWifiSync} />
        </View>
      </View>

      {/* MODAL PARA OPCIONES */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{modalTitle}</Text>
            <FlatList
              data={modalOptions}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => onSelect(item)}
                >
                  <Text style={styles.modalOptionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.modalCancel} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "#eee",
    borderRadius: 20,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  closeButtonText: { fontSize: 18, fontWeight: "bold" },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 20, marginTop: 10 },
  section: { marginBottom: 20 },
  sectionTitle: { fontWeight: "bold", marginBottom: 10 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  selector: {
    backgroundColor: "#eee",
    padding: 6,
    borderRadius: 6,
    minWidth: 120,
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: "80%",
    maxHeight: "60%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  modalOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  modalOptionText: { fontSize: 16, textAlign: "center" },
  modalCancel: {
    marginTop: 15,
    padding: 12,
    backgroundColor: "#eee",
    borderRadius: 8,
  },
  modalCancelText: { textAlign: "center", fontWeight: "bold" },
});
