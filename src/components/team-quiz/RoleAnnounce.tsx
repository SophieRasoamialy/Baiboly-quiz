import React from "react";
import { View, Text, Image, Animated, StyleSheet } from "react-native";
import { AVATAR_MAP } from "../../constants/avatar";
import { useAppTheme } from "../../hooks/useAppTheme";
import { createTeamQuizStyles } from "../../screens/team-quiz/team-quiz.styles";

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
    <Animated.View style={[styles.centerPhase, { opacity: phaseAnim }]}>
      <Text style={styles.roundText}>FANOMBOHANA ROUND {currentRound}</Text>

      <View style={styles.roleCard}>
        <Text style={styles.roleLabel}>MPIAZAFA</Text>
        <View style={styles.avatarLarge}>
          <Image
            source={AVATAR_MAP[dPlayer?.avatar as keyof typeof AVATAR_MAP]}
            style={StyleSheet.absoluteFillObject}
          />
        </View>
        <Text style={styles.roleName}>{dPlayer?.name}</Text>
      </View>

      <View style={{ height: 30 }} />

      <View style={styles.roleCard}>
        <Text style={styles.roleLabel}>MPIKASOKA</Text>
        <View style={[styles.avatarLarge, { borderColor: colors.primary }]}>
          <Image
            source={AVATAR_MAP[gPlayer?.avatar as keyof typeof AVATAR_MAP]}
            style={StyleSheet.absoluteFillObject}
          />
        </View>
        <Text style={styles.roleName}>{gPlayer?.name}</Text>
      </View>
    </Animated.View>
  );
};
