import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

interface GameModeCardProps {
  title: string;
  description: string;
  icon: string;
  iconColor: string;
  gradientColors: string[];
  onPress: () => void;
  isNew?: boolean;
  styles: any;
  colors: any;
}

export const GameModeCard: React.FC<GameModeCardProps> = ({
  title,
  description,
  icon,
  iconColor,
  onPress,
  isNew,
  styles,
  colors,
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.gameCard}>
      <LinearGradient
        colors={[colors.card, colors.surfaceSoft]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gameCardGradient}
      >
        <View style={[styles.gameIconWrapper, { backgroundColor: colors.surfaceSoft }]}>
          <MaterialCommunityIcons name={icon as any} size={28} color={iconColor} />
        </View>

        <View style={styles.gameInfo}>
          <Text style={styles.gameTitle}>{title}</Text>
          <Text style={styles.gameDesc}>{description}</Text>
        </View>

        {isNew && (
          <View style={styles.betaTag}>
            <Text style={styles.betaText}>VAOVAO</Text>
          </View>
        )}

        <MaterialCommunityIcons
          name="chevron-right"
          size={20}
          color={colors.textMuted}
        />
      </LinearGradient>
    </TouchableOpacity>
  );
};
