import React from "react";
import { View, Text, Image, Animated, StyleSheet } from "react-native";
import { AVATAR_MAP } from "../../constants/avatar";
import { useAppTheme } from "../../hooks/useAppTheme";
import UserAvatar from "../ui/UserAvatar";
import { createTeamQuizStyles } from "../../screens/team-quiz/team-quiz.styles";
import i18n from "../../i18n";

interface RoleAnnounceProps {
  currentRound: number;
  dPlayer: any;
  gPlayer: any;
  phaseAnim: Animated.Value;
}

export const RoleAnnounce: React.FC<RoleAnnounceProps> = ({
  currentRound,
  dPlayer,
  gPlayer,
  phaseAnim,
}) => {
  const { colors } = useAppTheme();
  const styles = createTeamQuizStyles(colors);

  return (
    <Animated.View style={[styles.centerPhase, { opacity: phaseAnim, transform: [{ scale: phaseAnim.interpolate({ inputRange: [0, 1], outputRange: [0.95, 1] }) }] }]}>
      <Text style={styles.roundText}>{i18n.t("round_start", { round: currentRound })}</Text>

      <View style={styles.roleCard}>
        <Text style={styles.roleLabel}>{i18n.t("describer_role")}</Text>
        <UserAvatar 
          avatar={dPlayer?.avatar} 
          size={100} 
          borderWidth={3} 
          points={dPlayer?.points || 0}
        />
        <Text style={styles.roleName}>{dPlayer?.name}</Text>
      </View>

      <View style={{ height: 30 }} />

      <View style={styles.roleCard}>
        <Text style={styles.roleLabel}>{i18n.t("guesser_role")}</Text>
        <UserAvatar 
          avatar={gPlayer?.avatar} 
          size={100} 
          borderWidth={3} 
          points={gPlayer?.points || 0}
        />
        <Text style={styles.roleName}>{gPlayer?.name}</Text>
      </View>
    </Animated.View>
  );
};
