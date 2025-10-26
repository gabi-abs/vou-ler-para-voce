import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Main() {
  return (
    <View style={styles.container}>
      <Text style={styles.title1}>Bem-vindo ao</Text>
      <Text style={styles.title2}> Vou Ler Para Você!</Text>
      <Link style={styles.link1}  href="/criar-nova-historia">Criar Nova Historia</Link>
      <Link style={styles.link2} href="/(historias)/historias/minhas">Ver Minhas Historias</Link>
      <Link style={styles.link3} href="/(historias)/historias/favoritas">Ver Favoritas</Link>
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
  link1: {
    fontSize: 18, 
    backgroundColor: '#FFEDB3',
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    color: '#BC793D',
    fontWeight: 'bold',
  },

  link2: {
    fontSize: 18, 
    backgroundColor: '#EBE0F6',
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    color: '#7C5CC4',
    fontWeight: 'bold',
  },

  link3: {
    fontSize: 18, 
    backgroundColor: '#C7E9D2',
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    color: '#67A782',
    fontWeight: 'bold',
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