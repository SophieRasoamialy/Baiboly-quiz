import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { AVATAR_MAP } from "../../constants/avatar";
import { useAppTheme } from "../../hooks/useAppTheme";
import { createTeamQuizStyles } from "../../screens/team-quiz/team-quiz.styles";

export interface Player {
  id: string;
  name: string;
  avatar: string;
  team: 1 | 2;
}

export const TeamLobby: React.FC<{ players: Player[] }> = ({ players }) => {
  const { colors } = useAppTheme();
  const styles = createTeamQuizStyles(colors);

  return (
    <View style={styles.centerPhase}>
      <Text style={styles.phaseTitle}>Fiandrasana...</Text>
      <Text style={styles.phaseSubtitle}>Mivory ny mpilalao rehetra...</Text>
      <View style={styles.playerGrid}>
        {players.map((p) => (
          <View key={p.id} style={styles.playerSlot}>
            <View style={styles.avatarMini}>
              <Image
                source={AVATAR_MAP[p.avatar as keyof typeof AVATAR_MAP]}
                style={StyleSheet.absoluteFillObject}
              />
              <View
                style={[
                  styles.teamBadge,
                  { backgroundColor: p.team === 1 ? colors.secondary : colors.primary },
                ]}
              >
                <Text style={styles.teamText}>T{p.team}</Text>
              </View>
            </View>
            <Text style={styles.playerName}>{p.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};
