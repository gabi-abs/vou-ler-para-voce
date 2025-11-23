import CriarHistoriaSVG from "@/assets/svg/criar-historia.svg";
import FavoritasSVG from "@/assets/svg/favoritas.svg";
import HistoriasSVG from "@/assets/svg/historias.svg";

import LoginScreen from "@/components/LoginScreen/LoginScreen";
import NuvemBackground from "@/components/NuvemBackgroud/NuvemBackgroud";
import { useAuth } from "@/context/AuthContext";
import { theme } from "@/themes";
import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Main() {
  const { isAuthenticated, logout, usuario } = useAuth();
  const [menuAberto, setMenuAberto] = useState(false);

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
            {/* MENU DE USUÁRIO */}
            <View style={styles.userMenuContainer}>
              <Pressable 
                style={styles.userButton} 
                onPress={() => setMenuAberto(!menuAberto)}
              >
                <Text style={styles.userButtonText}>
                  Bem-vindo, {usuario?.nome || "Usuário"}
                </Text>
                <Text style={styles.arrowText}>{menuAberto ? "▲" : "▼"}</Text>
              </Pressable>
              
              {menuAberto && (
                <View style={styles.dropdownMenu}>
                  <Pressable 
                    style={styles.dropdownItem} 
                    onPress={() => {
                      setMenuAberto(false);
                      logout?.();
                    }}
                  >
                    <Text style={styles.dropdownText}>Sair</Text>
                  </Pressable>
                </View>
              )}
            </View>

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
  /** CONTAINER PRINCIPAL */
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    zIndex: 2, // 👈 Fica na frente das nuvens (que têm zIndex: 1)
  },

  /** CAMADA DE FUNDO DAS NUVENS */
  nuvensContainer: {
    position: "absolute",
    top: 35,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    zIndex: 1, // fica atrás de todo o conteúdo
    backgroundColor: "#FFF8E2",
  },

  /** CONTEÚDO */
  title1: {
    color: "#D87443",
    fontWeight: "bold",
    fontSize: 30,
    zIndex: 1, // garante que fique na frente das nuvens
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

  /** MENU DE USUÁRIO */
  userMenuContainer: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 3,
  },
  userButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    gap: 10,
    borderWidth: 1.5,
    borderColor: "rgba(216, 116, 67, 0.3)",
    shadowColor: "#D87443",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  userButtonText: {
    color: "#D87443",
    fontSize: 16,
    fontWeight: "700",
  },
  arrowText: {
    color: "#D87443",
    fontSize: 10,
    fontWeight: "bold",
  },
  dropdownMenu: {
    marginTop: 10,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(216, 116, 67, 0.2)",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  dropdownItem: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderTopColor: "rgba(216, 116, 67, 0.1)",
  },
  dropdownText: {
    color: "#D87443",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
});
