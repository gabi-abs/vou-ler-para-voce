import { theme } from "@/themes";
import { Image, StyleSheet, Text, View } from "react-native";
import ActionButton from "./ActionButton";

export default function HistoriaItem({ historia }: { historia: any }) {
  return (
    <>
      <View key={historia.id} style={styles.card}>
        <View style={styles.cardHeader}>
          <Image source={{ uri: historia.capaUrl }} style={styles.capaImagem} />
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>{historia.titulo}</Text>
            <Text style={styles.cardDescription} numberOfLines={9} ellipsizeMode="tail">
              {historia.descricao}
            </Text>
          </View>
        </View>
        <View style={styles.actionsContainer}>
          <ActionButton type="primary" title="Ouvir" icon="play-arrow" onPress={() => {}} historia={historia} />
          <ActionButton type="tertiary" title="Gravar" icon="record-voice-over" onPress={() => {}} historia={historia} />
          <ActionButton type="secondary" title="Editar" icon="edit" onPress={() => {}} historia={historia} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  cardHeader: {
    flexDirection: "row",
  },
  actionButton: {
    marginRight: 10,
    padding: 10,
    backgroundColor: "#DDDDDD",
    borderRadius: 5,
  },
  capaImagem: {
    width: 150,
    height: 200,
    resizeMode: "cover",
    borderRadius: 8,
    marginBottom: 8,
  },
  card: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: theme.colors.card,
    borderColor: theme.colors.border,
    borderWidth: 2,
  },
  cardInfo: {
    paddingHorizontal: 10,
  },
  cardTitle: {
    ...theme.colors.title1,
    fontSize: 15,
  },
  cardDescription: {
    fontSize: 14,
    marginTop: 8,
    color: "#555555",
    width: 180,
    textAlign: "justify",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
