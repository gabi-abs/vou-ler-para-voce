import NuvemSVG from "@/assets/svg/nuvem.svg";
import NuvemRodapeSVG from "@/assets/svg/nuvemrodape.svg";
import { StyleSheet, View } from "react-native";

export default function NuvemBackground({ style }: { style?: object }) {
  return (
    <View style={[styles.nuvensContainer, style]}>
      <NuvemSVG
        style={styles.nuvemEsq}
        width={130}
        height={130}
        color="#E6D9F5"
      />
      <NuvemSVG
        style={styles.nuvemDir}
        width={130}
        height={130}
        color="#E6D9F5"
      />
      <NuvemRodapeSVG style={styles.nuvemAzul} color="#A8D6F2" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  nuvensContainer: {
    position: "absolute",
    top: 35,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
  },
  nuvemEsq: {
    opacity: 0.8,
  },
  nuvemDir: {
    transform: [{ scaleX: -1 }],
    opacity: 0.8,
    left: 170,
  },
  nuvemAzul: {
    bottom: 0,
    left: 0,
    position: "absolute", 
    opacity: 0.7,
  },
});
