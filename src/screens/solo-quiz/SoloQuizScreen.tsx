import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useQuizGame } from "../../hooks/useQuizGame";
import { useTimer } from "../../hooks/useTimer";
import { useAppTheme } from "../../hooks/useAppTheme";

import AnswersList from "../../components/quiz-solo/AnswersList";
import HeartsBar from "../../components/quiz-solo/HeartsBar";
import GemsCounter from "../../components/quiz-solo/GemsCounter";
import TimerBar from "../../components/quiz-solo/TimerBar";
import FloatingGem from "../../components/home/FloatingGem";
import { createSoloQuizStyles } from "./solo-quiz.styles";

// This is still using mock logic for demo purposes
// But the hooks will eventually fetch from route params
const mockQuestions = [
  {
    id: "1",
    question: "Iza no nanamboatra ny sambofiara?",
    answers: ["Noa", "Mosesy", "Davida", "Abrahama"],
    correctAnswer: "Noa",
  },
  {
    id: "2",
    question: "Iza no mpanjaka hendry indrindra?",
    answers: ["Saoly", "Solomona", "Davida", "Josia"],
    correctAnswer: "Solomona",
  }
];

const { width } = Dimensions.get("window");

const SoloQuizScreen = () => {
  const navigation = useNavigation<any>();
  const game = useQuizGame(mockQuestions);
  
  const timer = useTimer(20, () => {
    game.next();
  });

  const { colors, isLight } = useAppTheme();
  const styles = createSoloQuizStyles(colors);

  const gemsConfig = [
    { x: width * 0.1, size: 12, delay: 0, duration: 6000, opacity: 0.5 },
    { x: width * 0.8, size: 16, delay: 2000, duration: 8000, opacity: 0.6 },
    { x: width * 0.5, size: 20, delay: 1000, duration: 7500, opacity: 0.4 },
  ];

  if (!game.currentQuestion) return null;

  return (
    <View style={styles.container}>
      <StatusBar style={isLight ? "dark" : "light"} />

      <LinearGradient
        colors={
          isLight
            ? [colors.background, colors.backgroundSecondary]
            : [colors.background, colors.backgroundSecondary, colors.background]
        }
        style={styles.backgroundFill}
      />

      {!isLight && (
        <>
          <View pointerEvents="none" style={styles.glowLeft} />
          <View pointerEvents="none" style={styles.glowRight} />
        </>
      )}

      {gemsConfig.map((gem, index) => (
        <FloatingGem key={index} {...gem} isLight={isLight} />
      ))}

      <SafeAreaView style={styles.safeArea}>
        {/* Top bar with stats */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <MaterialCommunityIcons name="close" size={22} color={colors.text} />
          </TouchableOpacity>
          <View style={styles.topBarSpacer} />
          <HeartsBar hearts={game.hearts} styles={styles} colors={colors} />
          <GemsCounter gems={game.gems} styles={styles} colors={colors} />
        </View>

        {/* Timer */}
        <TimerBar time={timer.timeLeft} totalTime={20} styles={styles} colors={colors} />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.body}>
            {/* Question */}
            <View style={styles.questionCard}>
              <Text style={styles.questionNumber}>
                Fanontaniana {game.index + 1} / {mockQuestions.length}
              </Text>
              <Text style={styles.question}>
                {game.currentQuestion.question}
              </Text>
            </View>

            {/* Answers */}
            <AnswersList
              answers={game.currentQuestion.answers}
              onSelect={(answer) => {
                game.answer(answer);
                timer.stop();
                setTimeout(() => {
                  game.next();
                  timer.reset();
                }, 1500);
              }}
              selectedAnswer={game.selected}
              correctAnswer={game.currentQuestion.correctAnswer}
              disabled={!!game.selected}
              styles={styles}
              colors={colors}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default SoloQuizScreen;