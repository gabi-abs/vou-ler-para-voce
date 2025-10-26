import { theme } from "@/themes";
import { StyleSheet, View } from "react-native";

interface ProgressBarProps {
  posicaoMs?: number | null;
  duracaoMs?: number | null;
}

export default function ProgressBar({ posicaoMs, duracaoMs }: ProgressBarProps) {
  // Calcula a porcentagem de progresso
  const calcularProgresso = (): number => {
    if (!posicaoMs || !duracaoMs || duracaoMs === 0) {
      return 0;
    }
    const porcentagem = (posicaoMs / duracaoMs) * 100;
    return Math.min(100, Math.max(0, porcentagem));
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerProgress}>
        <View style={[styles.progress, { width: `${calcularProgresso()}%` }]} />
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
  },
  progress: {
    height: "100%",
    backgroundColor: theme.colors.brown,
    borderRadius: 5,
  },
});
