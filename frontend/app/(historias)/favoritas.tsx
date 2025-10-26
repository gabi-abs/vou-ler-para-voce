import { StyleSheet, Text, View } from "react-native";

const favoritaLista = [];

export default function FavoritasScreen() {
  return (
    <View style={styles.container}>

      {favoritaLista.length === 0 ? (
        <Text style={styles.text}>Você ainda não tem histórias favoritas.</Text>
      ) : (
        <Text style={styles.text}>Aqui estão suas histórias favoritas:</Text>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: "#444",
  },
});
