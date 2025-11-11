import CriarHistoriaSVG from "@/assets/svg/criar-historia.svg";
import FavoritasSVG from "@/assets/svg/favoritas.svg";
import HistoriasSVG from "@/assets/svg/historias.svg";

import LoginScreen from "@/components/LoginScreen/LoginScreen";
import NuvemBackground from "@/components/NuvemBackgroud/NuvemBackgroud";
import { useAuth } from "@/context/AuthContext";
import { theme } from "@/themes";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Main() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {/* NUVEM FIXA NO FUNDO */}
      <NuvemBackground style={styles.nuvensContainer} />

      {/** CONTEÚDO PRINCIPAL */}
      <View style={styles.container}>
        {!isAuthenticated ? (
          <LoginScreen />
        ) : (
          <>
            {/* CONTEÚDO PRINCIPAL */}
            <Text style={styles.title1}>Bem-vindo ao</Text>
            <Text style={styles.title2}>Vou Ler Para Você!</Text>

            <View style={styles.linksContainer}>
              <Link
                style={[styles.link, theme.colors.button.secondary]}
                href="/criar-nova-historia"
              >
                <View style={styles.linkContent}>
                  <CriarHistoriaSVG width={40} height={40} />
                  <Text
                    style={[styles.linkText, theme.colors.button.secondary]}
                  >
                    Criar Nova História
                  </Text>
                </View>
              </Link>

              <Link
                style={[styles.link, theme.colors.button.tertiary]}
                href="/minhas"
              >
                <View style={styles.linkContent}>
                  <HistoriasSVG width={40} height={40} />
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
                  <FavoritasSVG width={40} height={40} />
                  <Text style={[styles.linkText, theme.colors.button.primary]}>
                    Ver Favoritas
                  </Text>
                </View>
              </Link>
            </View>
          </>
        )}
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
    zIndex: 2, // 👈 Fica na frente das nuvens (que têm zIndex: 1)
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
    backgroundColor: "#FFF8E2",
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
