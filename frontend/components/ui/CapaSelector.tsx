import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useCallback } from "react";
import { Alert, Image, Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

export interface CapaSelectorProps {
  value?: string | null;
  onChange: (uri: string | null) => void;
  label?: string;
  height?: number;
  containerStyle?: StyleProp<ViewStyle>;
}

export default function CapaSelector({
  value,
  onChange,
  label = "Capa",
  height = 200,
  containerStyle,
}: CapaSelectorProps) {
  const handleSelecionarCapa = useCallback(async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permissão negada",
        "É necessário permitir o acesso à galeria para adicionar uma capa."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets?.[0]?.uri ?? null;
      onChange(uri);
    }
  }, [onChange]);

  return (
    <View>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <Pressable
        style={[styles.capaContainer, { height }, containerStyle]}
        onPress={handleSelecionarCapa}
      >
        {value ? (
          <>
            <Image source={{ uri: value }} style={styles.capaImage} resizeMode="contain" />
            <View style={styles.capaOverlay}>
              <Ionicons name="camera-outline" size={18} color="#573212" />
              <Text style={styles.capaOverlayText}>Trocar capa</Text>
            </View>
          </>
        ) : (
          <View style={styles.capaPlaceholder}>
            <Ionicons name="image-outline" size={40} color="#573212" />
            <Text style={styles.capaPlaceholderText}>Adicionar capa</Text>
            <Text style={styles.capaHint}>Toque para escolher uma imagem</Text>
          </View>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  capaContainer: {
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#EEE5DE",
    overflow: "hidden",
    marginBottom: 16,
    backgroundColor: "#F5FAEA",
    alignItems: "center",
    justifyContent: "center",
  },
  capaImage: {
    width: "100%",
    height: "100%",
  },
  capaOverlay: {
    position: "absolute",
    right: 12,
    bottom: 12,
    backgroundColor: "#FFF0CC",
    borderColor: "#E9C66C",
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  capaOverlayText: {
    color: "#D16314",
    fontWeight: "600",
  },
  capaPlaceholder: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  capaPlaceholderText: {
    color: "#573212",
    fontWeight: "600",
    fontSize: 16,
    marginTop: 8,
  },
  capaHint: {
    color: "#8B6F5A",
    fontSize: 12,
    marginTop: 4,
  },
});
