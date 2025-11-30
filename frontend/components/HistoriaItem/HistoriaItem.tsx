import Historia from "@/interfaces/HistoriaInterface";
import { theme } from "@/themes";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Animated, Image, Pressable, StyleSheet, Text, View } from "react-native";
import ActionButton from "./ActionButton";

type Props = {
  historia: Historia;
  onToggleFavorito?: (h: Historia) => void;
  onDelete?: (h: Historia) => void;
};

export default function HistoriaItem({ historia, onToggleFavorito, onDelete }: Props) {
  const [item, setItem] = useState<Historia>(historia);
  const [showDelete, setShowDelete] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setItem(historia);
  }, [historia]);

  useEffect(() => {
    if (showDelete) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [showDelete]);

  const handleFavoriteToggle = () => {
    if (onToggleFavorito) {
      onToggleFavorito(item); // 👈 manda o estado ANTES
    }

    setItem(prev => ({
      ...prev,
      favoritado: !prev.favoritado, // 👈 só visual
    }));
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(item);
    }
    setShowDelete(false);
  };

  const handleLongPress = () => {
    setShowDelete(true);
  };

  const handlePress = () => {
    if (showDelete) {
      setShowDelete(false);
    } else {
      // Se não está mostrando o delete, navega para ouvir
      router.push(`/ouvir/${item.id}` as any);
    }
  };

  return (
    <Pressable 
      onLongPress={handleLongPress}
      onPress={handlePress}
      delayLongPress={500}
    >
      <View key={item.id} style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.capaContainer}>
            <Image source={{ uri: item.capa }} style={styles.capaImagem} />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle} ellipsizeMode="tail" numberOfLines={2}>{item.titulo}</Text>
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
      
      <Animated.View 
        style={[
          styles.deleteOverlay, 
          { 
            opacity: fadeAnim,
            pointerEvents: showDelete ? 'auto' : 'none'
          }
        ]}
      >
        <Pressable style={styles.deleteButton} onPress={handleDelete}>
          <MaterialIcons name="delete" size={48} color="#ff6666" />
          <Text style={styles.deleteText}>Excluir</Text>
        </Pressable>
      </Animated.View>
    </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardHeader: {
    flexDirection: "row",
  },
  capaContainer: {
    width: 150,
    height: 200,
  },
  capaImagem: {
    width: "100%",
    height: "100%",
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
    position: "relative",
  },
  deleteOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(247, 223, 223, 0.69)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButton: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#ffa4a4ff",
    backgroundColor: "#ffd7dba1",
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 15,
  },
  deleteText: {
    color: "#ff6666",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
  },
  cardInfo: {
    paddingHorizontal: 5,
  },
  cardTitle: {
    ...theme.colors.title1,
    fontSize: 15,
    width: 170,
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
