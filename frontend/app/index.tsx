import CriarHistoria from "@/assets/svg/criar-historia.svg";
import Favoritas from "@/assets/svg/favoritas.svg";
import Historias from "@/assets/svg/historias.svg";
import { theme } from "@/themes";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Main() {
  return (
    <View style={styles.container}>
      <Text style={styles.title1}>Bem-vindo ao</Text>
      <Text style={styles.title2}>Vou Ler Para Você!</Text>
      <View style={styles.linksContainer}>
        <Link style={[styles.link, theme.colors.button.secondary]} href="/criar-nova-historia">
          <View style={styles.linkContent}>
            <CriarHistoria width={40} height={40} />
          <Text style={[styles.linkText, theme.colors.button.secondary]}>Criar Nova Historia</Text>
          </View>
        </Link>
        <Link style={[styles.link, theme.colors.button.tertiary]} href="/minhas">
          <View style={styles.linkContent}>
            <Historias width={40} height={40} />
            <Text style={[styles.linkText, theme.colors.button.tertiary]}>Ver Minhas Historias</Text>
          </View>
        </Link>
        <Link style={[styles.link, theme.colors.button.primary]} href="/favoritas">
          <View style={styles.linkContent}>
            <Favoritas width={40} height={40} />
            <Text style={[styles.linkText, theme.colors.button.primary]}>Ver Favoritas</Text>
          </View>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    backgroundColor: '#FFF8E2',
  },
  linksContainer: {
    width: '70%',
    gap: 25,
    marginTop: 40,
  },
  link: {
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  linkContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  linkText: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  title1: {
    color: '#D87443',
    fontWeight: 'bold',
    fontSize: 30,
  },
  title2: {
    color: '#7C5CC4',
    fontWeight: 'bold',
    fontSize: 32,
  },
});