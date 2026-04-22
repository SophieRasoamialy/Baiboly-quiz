import React, { useEffect, useRef } from "react";
import {
  Animated,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Pressable,
} from "react-native";
import { useAlert } from "../../context/AlertContext";
import { useAppTheme } from "../../hooks/useAppTheme";

const { width } = Dimensions.get("window");

const CustomAlert: React.FC = () => {
  const { alertState, hideAlert } = useAlert();
  const { colors, isLight } = useAppTheme();
  
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (alertState?.visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [alertState?.visible]);

  if (!alertState) return null;

  const handleButtonPress = (onPress?: () => void) => {
    hideAlert();
    if (onPress) {
      setTimeout(onPress, 300); // Wait for animation to finish
    }
  };

  return (
    <Modal
      transparent
      visible={alertState.visible}
      animationType="none"
      onRequestClose={hideAlert}
    >
      <View style={styles.overlay}>
        <Animated.View 
          style={[
            styles.backdrop, 
            { 
              opacity: opacityAnim,
              backgroundColor: isLight ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.75)" 
            }
          ]}
        >
          <Pressable style={StyleSheet.absoluteFill} onPress={hideAlert} />
        </Animated.View>

        <Animated.View
          style={[
            styles.alertCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              opacity: opacityAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <View style={[styles.marker, { backgroundColor: colors.secondary }]} />
          
          <Text style={[styles.title, { color: colors.text }]}>
            {alertState.title}
          </Text>
          
          <Text style={[styles.message, { color: colors.textSecondary }]}>
            {alertState.message}
          </Text>

          <View style={styles.buttonRow}>
            {alertState.buttons?.map((btn, index) => {
              const isCancel = btn.style === "cancel";
              const isDestructive = btn.style === "destructive";
              
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.8}
                  onPress={() => handleButtonPress(btn.onPress)}
                  style={[
                    styles.button,
                    { flex: alertState.buttons!.length > 1 ? 1 : 0 },
                    index > 0 && { marginLeft: 12 },
                    isDestructive && styles.destructiveButton,
                    !isCancel && !isDestructive && { backgroundColor: colors.secondarySoft },
                  ]}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      { color: isDestructive ? "#FF5252" : colors.secondary },
                      isCancel && { color: colors.textMuted },
                    ]}
                  >
                    {btn.text}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  alertCard: {
    width: width * 0.85,
    borderRadius: 24,
    borderWidth: 1,
    padding: 24,
    paddingTop: 32,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 10,
  },
  marker: {
    position: "absolute",
    top: 0,
    width: 60,
    height: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  message: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 28,
  },
  buttonRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 100,
  },
  destructiveButton: {
    backgroundColor: "rgba(255,82,82,0.1)",
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
});

export default CustomAlert;
