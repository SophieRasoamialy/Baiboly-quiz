import React from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface PlayerSideProps {
  player: number;
  isActive: boolean;
  isDisabled: boolean;
  showOptions: boolean;
  options: string[];
  onBuzz: () => void;
  onAnswer: (answer: string) => void;
  score: number;
  scaleAnim: Animated.Value;
  styles: any;
  colors: any;
}

export const PlayerSide: React.FC<PlayerSideProps> = ({
  player,
  isActive,
  isDisabled,
  showOptions,
  options,
  onBuzz,
  onAnswer,
  score,
  scaleAnim,
  styles,
  colors,
}) => {
  return (
    <View
      style={[
        styles.playerSide,
        player === 2 && styles.inverted,
        isActive && { backgroundColor: player === 1 ? "rgba(249,168,37,0.05)" : "rgba(0,184,148,0.05)" },
      ]}
    >
      {!showOptions ? (
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity
            onPress={onBuzz}
            disabled={isDisabled}
            style={[
              styles.buzzer,
              isDisabled && { opacity: 0.3, elevation: 0 },
            ]}
          >
            <LinearGradient
              colors={
                player === 1
                  ? [colors.primary, "#FF8F00"]
                  : [colors.secondary, "#00897B"]
              }
              style={styles.buzzerGradient}
            >
              <Text style={styles.buzzerText}>HITOA</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      ) : isActive ? (
        <View style={styles.optionsContainer}>
          {options.map((opt, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => onAnswer(opt)}
              style={styles.optionBtn}
            >
              <Text style={styles.optionText}>{opt}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <Text style={styles.waitText}>MANDRASI... </Text>
      )}

      <View style={styles.scorePill}>
        <Text style={styles.score}>P{player}: {score}</Text>
      </View>
    </View>
  );
};