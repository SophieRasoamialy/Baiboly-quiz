import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

interface PlayerSideProps {
  player: number;
  playerName: string;
  playerAvatar: any;
  questionText: string;
  questionIndex: number;
  options: string[];
  onAnswer: (answer: string) => void;
  hasAnswered: boolean;
  questionDone: boolean;
  score: number;
  styles: any;
  colors: any;
}

export const PlayerSide: React.FC<PlayerSideProps> = ({
  player,
  playerName,
  playerAvatar,
  questionText,
  questionIndex,
  options,
  onAnswer,
  hasAnswered,
  questionDone,
  score,
  styles,
  colors,
}) => {
  const isBlocked = hasAnswered || questionDone;

  return (
    <View
      style={[
        styles.playerSide,
        player === 2 && styles.inverted,
      ]}
    >
      {/* Player identity header */}
      <View style={styles.playerHeader}>
        {playerAvatar && (
          <View style={styles.playerAvatarSmall}>
            <Image source={playerAvatar} style={{ width: "100%", height: "100%", resizeMode: "contain" }} />
          </View>
        )}
        <Text style={styles.playerName}>{playerName}</Text>
        <View style={styles.scorePillInline}>
          <Text style={styles.score}>{score} pt</Text>
        </View>
      </View>

      {/* Question */}
      <View style={styles.inSideQuestionContainer}>
        <Text style={styles.counter}>FANONTANIANA {questionIndex + 1}</Text>
        <Text style={styles.question}>{questionText}</Text>
      </View>

      {/* Answer options – always visible */}
      {hasAnswered && !questionDone ? (
        <Text style={styles.waitText}>MANDRASA NY NAMANA...</Text>
      ) : (
        <View style={styles.optionsContainer}>
          {options.map((opt, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => onAnswer(opt)}
              disabled={isBlocked}
              style={[
                styles.optionBtn,
                isBlocked && { opacity: 0.4 },
              ]}
            >
              <Text style={styles.optionText}>{opt}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};