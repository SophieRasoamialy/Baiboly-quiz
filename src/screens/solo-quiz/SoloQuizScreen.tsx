import React, { useMemo, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Dimensions, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import questionsData from "../../data/questions_mg.json";
import { QUIZ_CONFIG } from "../../constants/quiz";
import { useQuizGame } from "../../hooks/useQuizGame";
import { useTimer } from "../../hooks/useTimer";
import { useAppTheme } from "../../hooks/useAppTheme";
import { useUser } from "../../context/user/UserContext";
import { useAlert } from "../../context/AlertContext";

import AnswersList from "../../components/quiz-solo/AnswersList";
import HeartsBar from "../../components/quiz-solo/HeartsBar";
import GemsCounter from "../../components/quiz-solo/GemsCounter";
import TimerBar from "../../components/quiz-solo/TimerBar";
import FloatingGem from "../../components/home/FloatingGem";
import { createSoloQuizStyles } from "./solo-quiz.styles";
import BackButton from "../../components/ui/BackButton";
import { soundHelper } from "../../utils/SoundHelper";
import { SoloGameOverView } from "../../components/ui/SoloGameOverView";
import i18n from "../../i18n";

const { width } = Dimensions.get("window");

const shuffle = (array: any[]) => {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

const SoloQuizScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { themeId, random } = route.params || {};
  const { buyHeartWithGems, nextRefillIn, soundEnabled } = useUser();
  const { showAlert } = useAlert();

  const quizQuestions = useMemo(() => {
    let filtered = [...questionsData];

    if (themeId) {
      filtered = filtered.filter((q: any) => q.theme === themeId);
    }

    const shuffled = shuffle(filtered).slice(0, QUIZ_CONFIG.TOTAL_QUESTIONS);

    return shuffled.map((q: any) => ({
      id: q.id.toString(),
      question: q.question,
      answers: shuffle(q.options),
      correctAnswer: q.answer,
    }));
  }, [themeId, random]);

  const game = useQuizGame(quizQuestions);
  
  const timer = useTimer(QUIZ_CONFIG.TIME_PER_QUESTION, () => {
    game.next();
  });

  useEffect(() => {
    if (game.isFinished) {
      soundHelper.playWin(soundEnabled);
    }
  }, [game.isFinished, soundEnabled]);

  const { colors, isLight } = useAppTheme();
  const styles = createSoloQuizStyles(colors);

  const gemsConfig = [
    { x: width * 0.1, size: 12, delay: 0, duration: 6000, opacity: 0.5 },
    { x: width * 0.8, size: 16, delay: 2000, duration: 8000, opacity: 0.6 },
    { x: width * 0.5, size: 20, delay: 1000, duration: 7500, opacity: 0.4 },
  ];

  if (game.hearts === 0) {
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
        <SafeAreaView style={styles.topBar}>
          <BackButton colors={colors} onPress={() => navigation.goBack()} />
        </SafeAreaView>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <MaterialCommunityIcons
            name="heart-off"
            size={80}
            color={colors.accent}
          />
          <Text style={{ fontSize: 28, fontWeight: 'bold', color: colors.text, marginTop: 20 }}>{i18n.t("no_hearts_title")}</Text>
          <Text style={{ fontSize: 16, color: colors.textSecondary, marginTop: 10 }}>
            {i18n.t("refill_in")} {Math.floor(nextRefillIn / 60)}:
            {(nextRefillIn % 60).toString().padStart(2, "0")}
          </Text>
          <TouchableOpacity
            style={{ 
              backgroundColor: colors.secondary, 
              paddingHorizontal: 30, 
              paddingVertical: 12, 
              borderRadius: 25, 
              marginTop: 30,
              elevation: 4
            }}
            onPress={() => {
              if (!buyHeartWithGems())
                showAlert({
                  title: i18n.t("insufficient_gems"),
                  message: i18n.t("need_20_gems"),
                });
            }}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>{i18n.t("buy_heart_btn")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // No early return, handle states in the main return block

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
          <BackButton colors={colors} onPress={() => navigation.goBack()} />
          <View style={styles.topBarSpacer} />
          <HeartsBar hearts={game.hearts} styles={styles} colors={colors} />
          <GemsCounter gems={game.gems} styles={styles} colors={colors} />
        </View>

        {/* Timer */}
        <TimerBar time={timer.timeLeft} totalTime={20} styles={styles} colors={colors} />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
          {game.isFinished ? (
            <SoloGameOverView
              score={game.correctCount}
              totalQuestions={quizQuestions.length}
              onHomePress={() => navigation.popToTop()}
              onReplayPress={() => navigation.replace("SoloQuiz", { themeId, random })}
              colors={colors}
            />
          ) : game.currentQuestion ? (
            <View style={styles.body}>
              {/* Question */}
              <View style={styles.questionCard}>
                <Text style={styles.questionNumber}>
                  {i18n.t("question_count", { count: game.index + 1, total: quizQuestions.length })}
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
          ) : null}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default SoloQuizScreen;