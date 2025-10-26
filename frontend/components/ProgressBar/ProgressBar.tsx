import { theme } from "@/themes";
import { StyleSheet, Text, View } from "react-native";

interface ProgressBarProps {
  posicao?: number;
  duracao?: number;
}

export default function ProgressBar({posicao, duracao}: ProgressBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.containerProgress}>
        <View style={styles.progress} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.timeText}>{posicao}</Text>
        <Text style={styles.timeText}>{duracao}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
  },
  containerProgress: {
    height: 10,
    width: "100%",
    backgroundColor: theme.colors.brown2,
    borderRadius: 5,
    marginBottom: 10,
  },
  progress: {
    height: "100%",
    width: "50%",
    backgroundColor: theme.colors.brown,
    borderRadius: 5,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeText: {
    fontSize: 15,
  },
});
