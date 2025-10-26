import { theme } from "@/themes";
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function ActionButton({ title, onPress, historia, icon, type}: any) {
  const buttonStyle = type ? { ...styles.actionButton, ...(styles as any)[type] } : styles.actionButton;
  const buttonTextStyle = type ? { ...styles.actionText, ...(styles as any)[type] } : styles.actionText;

  return (
    <Link
      href={{
        pathname: `/gravar/[historiaId]`,
        params: { historiaId: historia.id },
      }}
      asChild
    >
      <Pressable style={buttonStyle} onPress={onPress}>
        <View style={styles.buttonContent}>
          <MaterialIcons name={icon} size={24} />
          <Text style={buttonTextStyle}>{title}</Text>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  actionButton: {
    marginRight: 10,
    padding: 10,
    paddingHorizontal: 15,
    backgroundColor: "#DDDDDD",
    borderRadius: 15,
  },
  actionText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  primary: { ...theme.colors.button.primary },
  secondary: { ...theme.colors.button.secondary },
  tertiary: { ...theme.colors.button.tertiary },
});
