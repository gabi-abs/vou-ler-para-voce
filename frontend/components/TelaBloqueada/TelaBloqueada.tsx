import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Animated, BackHandler, PanResponder, StyleSheet, Text, View } from "react-native";

export default function TelaBloqueada({ onDesbloquear }: { onDesbloquear: () => void }) {
  const navigation = useNavigation();
  const SLIDER_WIDTH = 260;
  const SLIDER_HEIGHT = 56;
  const THUMB_SIZE = 48;
  const [unlocked, setUnlocked] = useState(false);
  const pan = useRef(new Animated.Value(0)).current;
  const [thumbColor, setThumbColor] = useState("#FFF8E2");

  useEffect(() => {
    navigation.setOptions?.({ headerShown: false });
    const onBackPress = () => true;
    const subscription = BackHandler.addEventListener("hardwareBackPress", onBackPress);
    return () => {
      navigation.setOptions?.({ headerShown: true });
      subscription.remove();
    };
  }, [navigation]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dx) > 5,
      onPanResponderMove: (_, gestureState) => {
        if (!unlocked) {
          const x = Math.max(0, Math.min(SLIDER_WIDTH - THUMB_SIZE, gestureState.dx));
          pan.setValue(x);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > SLIDER_WIDTH - THUMB_SIZE - 10) {
          setUnlocked(true);
          setThumbColor("#EDB638");
          Animated.timing(pan, {
            toValue: SLIDER_WIDTH - THUMB_SIZE,
            duration: 150,
            useNativeDriver: false,
          }).start(() => {
            onDesbloquear();
          });
        } else {
          setThumbColor("#FFF8E2");
          Animated.spring(pan, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  return (
    <View style={[styles.container, { backgroundColor: '#181820' }]}> {/* fundo escuro */}
      <Text style={[styles.title, { color: '#FFF8E2' }]}>Modo Travado</Text>
      <Text style={[styles.message, { color: '#E5DFF6' }]}>Para garantir a concentração, a tela está bloqueada enquanto o áudio é reproduzido.</Text>
      <LinearGradient
        colors={["#23232A", "#3A2C4D"]}
        start={[0, 0]}
        end={[1, 1]}
        style={[styles.slider, { width: SLIDER_WIDTH, height: SLIDER_HEIGHT }]}
      >
        <Text style={[styles.sliderText, { color: '#FFF8E2', opacity: 0.95 }]}>Deslize o círculo para desbloquear</Text>
        <Animated.View
          style={[
            styles.thumb,
            {
              transform: [{ translateX: pan }],
              opacity: unlocked ? 0.7 : 1,
              backgroundColor: thumbColor,
              borderColor: unlocked ? "#EDB638" : "#E5DFF6",
              borderWidth: 2,
            },
          ]}
          {...panResponder.panHandlers}
        >
          <Text style={styles.thumbIcon}>{unlocked ? "✅" : "🔒"}</Text>
        </Animated.View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#181820",
    padding: 24,
  },
  lockIcon: {
    fontSize: 60,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4D4388",
    marginBottom: 12,
  },
  message: {
    fontSize: 18,
    color: "#4E504F",
    textAlign: "center",
    marginBottom: 32,
  },
  slider: {
    borderRadius: 28,
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    marginTop: 8,
    height: 56,
    shadowColor: "#EDB638",
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  sliderText: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    textAlign: "center",
    textAlignVertical: "center",
    color: "#4D4388",
    fontSize: 17,
    fontWeight: "600",
    zIndex: 0,
    lineHeight: 56,
    opacity: 0.85,
    letterSpacing: 0.2,
  },
  thumb: {
    position: "absolute",
    left: 0,
    top: 4,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#EDB638",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    zIndex: 1,
  },
  thumbIcon: {
    fontSize: 28,
    color: "#4D4388",
    textAlign: "center",
  },
});