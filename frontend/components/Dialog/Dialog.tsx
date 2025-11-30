import { theme } from "@/themes";
import React, { ReactNode, useEffect, useRef } from "react";
import {
  Animated,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type DialogProps = {
  visible: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: null | (() => void);
  onCancel?: null | (() => void);
  dismissOnBackdropPress?: boolean;
  children?: ReactNode; // se quiser passar conteúdo customizado
};

export default function Dialog({
  visible,
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onConfirm = null,
  onCancel = null,
  dismissOnBackdropPress = true,
  children,
}: DialogProps) {
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 160,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 160,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0.9,
          duration: 130,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 130,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, scaleAnim, opacityAnim]);

  const handleBackdropPress = () => {
    if (dismissOnBackdropPress && onCancel) {
      onCancel();
    }
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      statusBarTranslucent
    >
      <Pressable style={styles.backdrop} onPress={handleBackdropPress}>
        <Animated.View
          style={[
            styles.container,
            { transform: [{ scale: scaleAnim }], opacity: opacityAnim },
          ]}
        >
          {title && <Text style={styles.title}>{title}</Text>}

          {children ? (
            children
          ) : (
            message && <Text style={styles.message}>{message}</Text>
          )}

          <View style={styles.footer}>
            {onCancel && (
              <TouchableOpacity
                style={[styles.button, styles.buttonSecondary]}
                onPress={onCancel}
              >
                <Text style={[styles.buttonSecondaryText]}>{cancelText}</Text>
              </TouchableOpacity>
            )}

            {onConfirm && (
              <TouchableOpacity
                style={[styles.button, theme.colors.button.primary]}
                onPress={onConfirm}
              >
                <Text style={[styles.buttonPrimaryText, theme.colors.button.primary]}>{confirmText}</Text>
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.69)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  container: {
    width: "100%",
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 18,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
    paddingVertical: 10,
    color: "#111827",
  },
  message: {
    fontSize: 15,
    color: "#4B5563",
    marginBottom: 16,
  },
  footer: {
    flexDirection: "row",
    paddingVertical: 10,
    justifyContent: "space-around",
  },
  button: {
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    width: "48%",
    alignItems: "center",
  },
  buttonSecondary: {
    backgroundColor: "#ebebebff",
  },
  buttonSecondaryText: {
    color: "#8274b4ff",
    fontWeight: "700",
    fontSize: 18,
  },
  buttonPrimary: {
    backgroundColor: "#eae7f0ff",
  },
  buttonPrimaryText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },
});
