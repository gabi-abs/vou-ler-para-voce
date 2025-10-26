import { theme } from "@/themes";
import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import ActionButton from "./ActionButton";

export default function HistoriaItem({ historia }: { historia: any }) {
  const [ item, setItem ] =  useState<any>(historia);

  const handleFavoriteToggle = () => {
    item.favoritado = !item.favoritado;
    setItem({ ...item });
  };

  return (
    <>
      <View key={item.id} style={styles.card}>
        <View style={styles.cardHeader}>
          <Image source={{ uri: item.capaUrl }} style={styles.capaImagem} />
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>{item.titulo}</Text>
            <Text style={styles.cardDescription} numberOfLines={9} ellipsizeMode="tail">
              {item.descricao}
            </Text>
          </View>
        </View>
        <View style={styles.actionsContainer}>
          <ActionButton type="primary" title="Ouvir" icon="play-arrow" onPress={() => {}} historia={item} />
          <ActionButton type="tertiary" title="Gravar" icon="record-voice-over" onPress={() => {}} historia={item} />
          <ActionButton type="secondary" title="Editar" icon="edit" onPress={() => {}} historia={item} />
          <ActionButton type="outline" icon={item.favoritado ? "favorite" : "favorite-border"} onPress={handleFavoriteToggle} historia={item} />
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
    borderRadius: 20,
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
    width: 170,
    textAlign: "justify",
  },
  actionsContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
