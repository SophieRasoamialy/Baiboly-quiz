import React, { useEffect, useRef } from "react";
import { Text, TouchableOpacity, View, Animated, Dimensions, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import i18n from "../../i18n";

const { width } = Dimensions.get("window");

interface SoloGameOverViewProps {
  score: number;
  totalQuestions: number;
  onHomePress: () => void;
  onReplayPress: () => void;
  colors: any;
}

export const SoloGameOverView: React.FC<SoloGameOverViewProps> = ({
  score,
  totalQuestions,
  onHomePress,
  onReplayPress,
  colors,
}) => {
  const percentage = (score / totalQuestions) * 100;
  const isGood = percentage >= 70;
  const needsImprovement = percentage < 40;
  
  const incorrect = totalQuestions - score;
  const pointsEarned = Math.max(0, (score * 10) - (incorrect * 5));

  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const getFeedbackText = () => {
    if (isGood) return i18n.t("excellent");
    if (needsImprovement) return i18n.t("needs_effort");
    return i18n.t("good_but_better");
  };

  const getFeedbackIcon = () => {
    if (isGood) return "trophy-outline";
    if (needsImprovement) return "book-open-variant";
    return "star-face";
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.card, { 
        transform: [{ scale: scaleAnim }], 
        opacity: fadeAnim,
        backgroundColor: colors.card,
        borderColor: colors.border,
        borderWidth: 1
      }]}>
        <LinearGradient
          colors={isGood ? [colors.secondary, colors.secondaryDark] : [colors.primary, colors.primaryDark]}
          style={styles.header}
        >
          <MaterialCommunityIcons name={getFeedbackIcon()} size={64} color="#FFF" />
          <Text style={styles.feedbackText}>{getFeedbackText()}</Text>
        </LinearGradient>

        <View style={styles.content}>
          <Text style={[styles.scoreTitle, { color: colors.textMuted }]}>{i18n.t("game_result")}</Text>
          <Text style={[styles.scoreValue, { color: isGood ? colors.secondary : colors.primary }]}>
            {score} / {totalQuestions}
          </Text>
          
          <View style={[styles.statsRow, { borderTopColor: colors.border }]}>
            <View style={styles.statItem}>
              <Text style={[styles.statLabel, { color: colors.textMuted }]}>{i18n.t("points_label")}</Text>
              <Text style={[styles.statValue, { color: colors.text }]}>+{pointsEarned} ⭐️</Text>
            </View>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statLabel, { color: colors.textMuted }]}>{i18n.t("gems_earned")}</Text>
              <Text style={[styles.statValue, { color: colors.text }]}>+{score * 5} 💎</Text>
            </View>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: colors.secondary }]}
            onPress={onReplayPress}
          >
            <MaterialCommunityIcons name="refresh" size={24} color="#FFF" />
            <Text style={styles.btnText}>{i18n.t("replay")}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, { backgroundColor: colors.surfaceSoft, borderWidth: 1, borderColor: colors.border }]}
            onPress={onHomePress}
          >
            <MaterialCommunityIcons name="home" size={24} color={colors.text} />
            <Text style={[styles.btnText, { color: colors.text }]}>{i18n.t("go_home")}</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    width: "100%",
  },
  card: {
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 32,
    overflow: "hidden",
    elevation: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  header: {
    padding: 40,
    alignItems: "center",
  },
  feedbackText: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "900",
    marginTop: 15,
    textAlign: "center",
  },
  content: {
    padding: 30,
    alignItems: "center",
  },
  scoreTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#6B7280",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  scoreValue: {
    fontSize: 56,
    fontWeight: "900",
    marginBottom: 25,
  },
  statsRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  statItem: {
    alignItems: "center",
  },
  statLabel: {
    fontSize: 12,
    color: "#9CA3AF",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1F2937",
  },
  divider: {
    width: 1,
    height: "100%",
    backgroundColor: "#F3F4F6",
  },
  actions: {
    padding: 30,
    gap: 12,
  },
  btn: {
    height: 60,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  btnText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "800",
  },
});
