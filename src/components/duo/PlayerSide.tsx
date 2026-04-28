import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import i18n from "../../i18n";

interface PlayerSideProps {
  player: number;
  playerName: string;
  playerAvatar: any;
  questionText: string;
  questionImage?: any;
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
  questionImage,
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
        <Text style={styles.counter}>
          {i18n.t("question_count_label", { count: questionIndex + 1 })}
        </Text>
        {questionImage && (
          <View style={styles.quizImageContainerSmall}>
            <Image source={questionImage} style={styles.quizImageSmall} resizeMode="contain" />
          </View>
        )}
        <Text style={styles.question}>{questionText}</Text>
      </View>

      {/* Answer options – always visible */}
      {hasAnswered && !questionDone ? (
        <Text style={styles.waitText}>{i18n.t("wait_partner")}</Text>
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