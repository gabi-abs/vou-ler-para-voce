import { theme } from "@/themes";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function ActionButton({ title, onPress, historia, icon, type}: any) {
  const buttonStyle = type ? { ...styles.actionButton, ...(styles as any)[type] } : styles.actionButton;
  const buttonTextStyle = type ? { ...styles.actionText, ...(styles as any)[type] } : styles.actionText;

  return (
    <Pressable style={buttonStyle} onPress={onPress}>
      <View style={styles.buttonContent}>
        <MaterialIcons name={icon} size={title ? 20 : 20} color={buttonTextStyle.color} />
        {title && <Text style={buttonTextStyle}>{title}</Text>}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  actionButton: {
    padding: 10,
    paddingHorizontal: 10,
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
    gap: 5,
  },
  primary: { ...theme.colors.button.primary },
  secondary: { ...theme.colors.button.secondary },
  tertiary: { ...theme.colors.button.tertiary },
  danger: {
    backgroundColor: "transparent",
    color: "#f75959ff",
  },
});
