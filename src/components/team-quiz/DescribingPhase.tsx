import React from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAppTheme } from "../../hooks/useAppTheme";
import { createTeamQuizStyles } from "../../screens/team-quiz/team-quiz.styles";

interface DescribingPhaseProps {
  currentWord: any;
  threeWords: string[];
  setThreeWords: (words: string[]) => void;
  onStartGuessing: () => void;
}

export const DescribingPhase: React.FC<DescribingPhaseProps> = ({
  currentWord,
  threeWords,
  setThreeWords,
  onStartGuessing,
}) => {
  const { colors } = useAppTheme();
  const styles = createTeamQuizStyles(colors);

  const updateWord = (val: string, idx: number) => {
    const newWords = [...threeWords];
    newWords[idx] = val;
    setThreeWords(newWords);
  };

  const isReady = threeWords.every((w) => w.trim().length > 0);

  return (
    <ScrollView contentContainerStyle={styles.scrollPhase} showsVerticalScrollIndicator={false}>
      <View style={styles.describerHeader}>
        <Text style={styles.secretLabel}>TENY AFENINA</Text>
        <Text style={styles.secretWord}>{currentWord?.word}</Text>
        <Text style={styles.secretHint}>{currentWord?.hint}</Text>
      </View>

      <View style={styles.instructionBox}>
        <Text style={styles.instructionText}>
          Soraty eto ny teny 3 hanampy ny namanao hamantatra ny teny afenina.
        </Text>
      </View>

      <View style={styles.wordInputs}>
        {threeWords.map((w, i) => (
          <TextInput
            key={i}
            style={styles.wordInput}
            value={w}
            onChangeText={(v) => updateWord(v, i)}
            placeholder={`Teny faha-${i + 1}`}
            placeholderTextColor={colors.textMuted}
          />
        ))}
      </View>

      <TouchableOpacity
        style={[styles.actionBtn, !isReady && { opacity: 0.5 }]}
        disabled={!isReady}
        onPress={onStartGuessing}
      >
        <LinearGradient colors={[colors.primary, colors.primaryDark]} style={styles.btnGradient}>
          <Text style={styles.btnText}>HIDITRA NY NAMANA</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
};
