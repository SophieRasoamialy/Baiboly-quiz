import React from "react";
import { View, Text, TouchableOpacity, Modal, Animated, Dimensions } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import i18n from "../../i18n";

const { width } = Dimensions.get("window");

interface GameOverModalProps {
  p1: number;
  p2: number;
  p1Name?: string;
  p2Name?: string;
  onExit: () => void;
  styles: any;
  colors: any;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  p1,
  p2,
  p1Name = i18n.t("player_1"),
  p2Name = i18n.t("player_2"),
  onExit,
  styles,
  colors,
}) => {
  const winner = p1 > p2 ? 1 : p2 > p1 ? 2 : 0;
  const winnerName = winner === 1 ? p1Name : p2Name;
  
  const scaleAnim = React.useRef(new Animated.Value(0)).current;
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Modal visible transparent animationType="none">
      <View style={[styles.modalOverlay, { backgroundColor: "rgba(0,0,0,0.8)" }]}>
        <Animated.View style={[styles.gameOverCard, { 
          transform: [{ scale: scaleAnim }],
          opacity: fadeAnim,
          width: width * 0.85,
          backgroundColor: colors.card,
          borderRadius: 30,
          overflow: "hidden",
          alignItems: "center",
          elevation: 20
        }]}>
          <LinearGradient
            colors={winner !== 0 ? [colors.secondary, colors.secondaryDark] : [colors.surfaceSoft, colors.border]}
            style={{ width: "100%", padding: 30, alignItems: "center" }}
          >
            <MaterialCommunityIcons 
              name={winner !== 0 ? "trophy" : "handshake"} 
              size={64} 
              color={winner !== 0 ? "#FFF" : colors.textMuted} 
            />
            <Text style={{ color: winner !== 0 ? "#FFF" : colors.text, fontSize: 24, fontWeight: "900", marginTop: 10 }}>
              {winner === 0 ? i18n.t("game_tie") : i18n.t("player_wins", { name: (winnerName ?? "").toUpperCase() })}
            </Text>
          </LinearGradient>

          <View style={{ padding: 30, width: "100%" }}>
            <View style={{ flexDirection: "row", justifyContent: "space-around", marginBottom: 30 }}>
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 12, color: colors.textMuted, fontWeight: "700" }}>{p1Name}</Text>
                <Text style={{ fontSize: 32, fontWeight: "900", color: winner === 1 ? colors.secondary : colors.text }}>{p1}</Text>
              </View>
              <View style={{ width: 1, backgroundColor: colors.border, height: "100%" }} />
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 12, color: colors.textMuted, fontWeight: "700" }}>{p2Name}</Text>
                <Text style={{ fontSize: 32, fontWeight: "900", color: winner === 2 ? colors.primary : colors.text }}>{p2}</Text>
              </View>
            </View>

            <TouchableOpacity 
              style={{ 
                backgroundColor: colors.primary, 
                padding: 18, 
                borderRadius: 15, 
                flexDirection: "row", 
                justifyContent: "center", 
                alignItems: "center",
                gap: 10
              }} 
              onPress={onExit}
            >
              <MaterialCommunityIcons name="home" size={24} color="#FFF" />
              <Text style={{ color: "#FFF", fontWeight: "900", fontSize: 16 }}>{i18n.t("go_home")}</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};