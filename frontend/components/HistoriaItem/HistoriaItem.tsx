import Historia from "@/interfaces/HistoriaInterface";
import { theme } from "@/themes";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import ActionButton from "./ActionButton";

type Props = {
  historia: Historia;
  onToggleFavorito?: (h: Historia) => void;
};

export default function HistoriaItem({ historia, onToggleFavorito }: Props) {
  const [item, setItem] = useState<Historia>(historia);

  useEffect(() => {
    setItem(historia);
  }, [historia]);

  const handleFavoriteToggle = () => {
    if (onToggleFavorito) {
      onToggleFavorito(item); // 👈 manda o estado ANTES
    }

    setItem(prev => ({
      ...prev,
      favoritado: !prev.favoritado, // 👈 só visual
    }));
  };

  return (
    <View key={item.id} style={styles.card}>
      <View style={styles.cardHeader}>
        <Image source={{ uri: item.capa }} style={styles.capaImagem} />
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>{item.titulo}</Text>
          <Text style={styles.cardDescription} numberOfLines={9} ellipsizeMode="tail">
            {item.texto}
          </Text>
        </View>
      </View>
      <View style={styles.actionsContainer}>
        <ActionButton
          type="tertiary"
          title="Gravar"
          icon="record-voice-over"
          onPress={() => {
            router.push(`/gravar/${item.id}` as any);
          }}
          historia={item}
        />
        <ActionButton
          type="primary"
          title="Ouvir"
          icon="play-arrow"
          onPress={() => {
            router.push(`/ouvir/${item.id}` as any);
          }}
          historia={item}
        />
        <ActionButton
          type="secondary"
          title="Editar"
          icon="edit"
          onPress={() => {
            router.push({
              pathname: `/editar/${item.id}`,
              params: { historia: JSON.stringify(item) },
            } as any);
          }}
          historia={item}
        />
        <ActionButton
          type="danger"
          icon={item.favoritado ? "favorite" : "favorite-border"}
          onPress={handleFavoriteToggle}
          historia={item}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardHeader: {
    flexDirection: "row",
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
