import FormatoDeCoracao from "@/assets/svg/formato-de-coracao.svg";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

const favoritaLista = [];

export default function FavoritasScreen() {

  const router = useRouter();

  const handleVerHistorias = () => {
    router.push("/(historias)/minhas");
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Favoritas</Text>

      <FormatoDeCoracao style={styles.icon} width={335} height={280} color={"#EDB638"}/>

    <Text></Text> 

      {favoritaLista.length === 0 ? (
        <Text style={styles.text2}>Nenhuma história favorita ainda.</Text>
      ) : (
        <Text style={styles.text}>Aqui estão suas histórias favoritas:</Text>
      )}

      <Text style={styles.text}>Marque histórias com 💛 para encontrá-las aqui.</Text>

    <View>
      <Pressable style={styles.botaoVerHistorias} onPress={handleVerHistorias}>
      <Text style={styles.textoBotaoVerHistorias}>Ver Histórias</Text>
      </Pressable>
    </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#FFF8E2"
    
  },
  title: {
    fontSize: 40,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
    color: "#D87443"
  },
  text: {
    fontSize: 17.5,
    color: "#4E504F",
    textAlign: "center"
  },
  text2: {
    fontSize: 23,
    color: "#4E504F",
    textAlign: "center",
    fontWeight: "medium"
  },
  icon: {
    marginVertical: 30,
    //paddingHorizontal: 35
    
  },
  botaoVerHistorias:{
    backgroundColor: "#E5DFF6",
    margin: 25,  
    borderRadius: 20, 
    height: 50, 
    paddingVertical: 12
    
  },
  textoBotaoVerHistorias:{
    color: "#4D4388", 
    textAlign: "center", 
    fontWeight: "semibold", 
    fontSize: 20

  }
});
