import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function Main() {
  return (
    <View style={styles.container}>
      <Link style={styles.link} href="/criar-nova-historia">Criar Nova Historia</Link>
      <Link style={styles.link} href="/(historias)/historias/minhas">Ver Minhas Historias</Link>
      <Link style={styles.link} href="/(historias)/historias/favoritas">Ver Favoritas</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  link: {
    fontSize: 18, 
    backgroundColor: '#FFEDB3',
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    color: '#BC793D',
    fontWeight: 'bold',
  },
});