import CriarHistoria from "@/assets/svg/criar-historia.svg";
import Favoritas from "@/assets/svg/favoritas.svg";
import Historias from "@/assets/svg/historias.svg";
import Nuvem from "@/assets/svg/nuvem.svg";
import NuvemRodape from "@/assets/svg/nuvemrodape.svg";
import { theme } from "@/themes";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Main() {
  return (
    <>
      {/* NUVEM FIXA NO FUNDO */}
      <View style={styles.nuvensContainer}>
        <Nuvem style={styles.nuvemEsq} width={130} height={130} color="#E6D9F5" />
        <Nuvem style={styles.nuvemDir} width={130} height={130} color="#E6D9F5" />
          <NuvemRodape style={styles.nuvemAzul} color="#A8D6F2" />
      </View>

      <View style={styles.container}>
        {/* CONTEÚDO PRINCIPAL */}
        <Text style={styles.title1}>Bem-vindo ao</Text>
        <Text style={styles.title2}>Vou Ler Para Você!</Text>

        <View style={styles.linksContainer}>
          <Link
            style={[styles.link, theme.colors.button.secondary]}
            href="/criar-nova-historia"
          >
            <View style={styles.linkContent}>
              <CriarHistoria width={40} height={40} />
              <Text style={[styles.linkText, theme.colors.button.secondary]}>
                Criar Nova História
              </Text>
            </View>
          </Link>

          <Link
            style={[styles.link, theme.colors.button.tertiary]}
            href="/minhas"
          >
            <View style={styles.linkContent}>
              <Historias width={40} height={40} />
              <Text style={[styles.linkText, theme.colors.button.tertiary]}>
                Ver Minhas Histórias
              </Text>
            </View>
          </Link>

          <Link
            style={[styles.link, theme.colors.button.primary]}
            href="/favoritas"
          >
            <View style={styles.linkContent}>
              <Favoritas width={40} height={40} />
              <Text style={[styles.linkText, theme.colors.button.primary]}>
                Ver Favoritas
              </Text>
            </View>
          </Link>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  /** 🌈 CONTAINER PRINCIPAL */
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    backgroundColor: "#FFF8E2",
  },

  /** ☁️ CAMADA DE FUNDO DAS NUVENS */
  nuvensContainer: {
    position: "absolute",
    top: 35,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    zIndex: 1, // 👈 fica atrás de todo o conteúdo
  },
  nuvemEsq: {
    opacity: 0.8,
  },
  nuvemDir: {
    transform: [{ scaleX: -1 }],
    opacity: 0.8,
    left: 170
  },

  /** 💙 NUVEM AZUL CENTRAL (MAIS ABAIXO) */
  nuvemAzul: {
    bottom: 0,
    left: 0,
    position: "absolute", // 👈 mais abaixo das roxas
    opacity: 0.7,
  },


  /** 🌟 CONTEÚDO */
  title1: {
    color: "#D87443",
    fontWeight: "bold",
    fontSize: 30,
    zIndex: 1, // 👈 garante que fique na frente das nuvens
  },
  title2: {
    color: "#7C5CC4",
    fontWeight: "bold",
    fontSize: 32,
    zIndex: 1,
  },

  linksContainer: {
    width: "70%",
    gap: 25,
    marginTop: 40,
    zIndex: 1,
  },
  link: {
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  linkContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  linkText: {
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
});
