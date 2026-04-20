import React, { useState, useEffect, useRef } from "react";
import { View, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "../../context/user";
import { useAppTheme } from "../../hooks/useAppTheme";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

import QUIZ_IMAGE_DATA from "../../data/quiz-image.json";
import { QUIZ_IMAGE_MAP } from "../../constants/quizImages";
import { ScoreBoard } from "../../components/online-quiz/ScoreBoard";
import { QuestionCard } from "../../components/online-quiz/QuestionCard";
import { OptionRow } from "../../components/online-quiz/OptionRow";
import { GameOverView } from "../../components/online-quiz/GameOverView";
import FloatingGem from "../../components/home/FloatingGem";
import { createOnlineQuizStyles } from "./online-quiz.styles";

const { width } = Dimensions.get("window");

const OnlineImageQuizScreen: React.FC<any> = ({ navigation, route }) => {
  const { opponent } = route.params;
  const { username, avatar: userAvatar } = useUser();
  const { colors, isLight } = useAppTheme();
  const styles = createOnlineQuizStyles(colors);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [opponentSelected, setOpponentSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [questions, setQuestions] = useState<any[]>([]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const gemsConfig = [
    { x: width * 0.12, size: 14, delay: 0, duration: 7500, opacity: 0.4 },
    { x: width * 0.88, size: 18, delay: 2000, duration: 8500, opacity: 0.5 },
  ];

  // Shuffle and set questions (images)
  useEffect(() => {
    const shuffle = (arr: any[]) => [...arr].sort(() => 0.5 - Math.random());
    const shuffled = shuffle(QUIZ_IMAGE_DATA).map(q => ({
      ...q,
      shuffledOptions: shuffle(q.options)
    }));
    setQuestions(shuffled.slice(0, 5));
  }, []);

  useEffect(() => {
    if (questions.length > 0 && !gameOver && !showResult) {
      startTimer();
      simulateOpponent();
    }
    return () => stopTimer();
  }, [currentQuestionIndex, questions, gameOver, showResult]);

  const startTimer = () => {
    setTimeLeft(15);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleTimeUp = () => {
    stopTimer();
    revealAnswers();
  };

  const simulateOpponent = () => {
    const delay = 4000 + Math.random() * 6000;
    setTimeout(() => {
      if (!showResult && !gameOver) {
        const question = questions[currentQuestionIndex];
        const correctIdx = question.shuffledOptions.indexOf(question.answer);
        const isCorrect = Math.random() < 0.7; // 70% accuracy for bots
        const botChoice = isCorrect
          ? correctIdx
          : Math.floor(Math.random() * 4);

        setOpponentSelected(botChoice);
      }
    }, delay);
  };

  const handleAnswerSelect = (index: number) => {
    if (selectedAnswer !== null || showResult) return;
    setSelectedAnswer(index);

    if (opponentSelected !== null) {
      revealAnswers();
    }
  };

  const revealAnswers = () => {
    stopTimer();
    setShowResult(true);

    const question = questions[currentQuestionIndex];
    const correctIdx = question.shuffledOptions.indexOf(question.answer);
    
    if (selectedAnswer === correctIdx)
      setPlayerScore((s) => s + 20);
    if (opponentSelected === correctIdx)
      setOpponentScore((s) => s + 20);

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((i) => i + 1);
        setSelectedAnswer(null);
        setOpponentSelected(null);
        setShowResult(false);
      } else {
        setGameOver(true);
      }
    }, 3000);
  };

  if (questions.length === 0) return null;

  const currentQuestion = questions[currentQuestionIndex];
  const correctIdx = currentQuestion.shuffledOptions.indexOf(currentQuestion.answer);
  const imageSource = QUIZ_IMAGE_MAP[currentQuestion.imageKey];

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

      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <ScoreBoard
          playerScore={playerScore}
          opponentScore={opponentScore}
          username={username}
          userAvatar={userAvatar}
          opponent={opponent}
          timeLeft={timeLeft}
          styles={styles}
          colors={colors}
        />

        {!gameOver ? (
          <View style={styles.quizArea}>
            <QuestionCard
              questionIndex={currentQuestionIndex}
              totalQuestions={5}
              questionText={currentQuestion.question}
              questionImage={imageSource}
              styles={styles}
            />

            <View style={styles.optionsGrid}>
              {currentQuestion.shuffledOptions.map((option: string, index: number) => {
                const isCorrect = index === correctIdx;
                const isSelected = selectedAnswer === index;
                const isOpponentSelected = opponentSelected === index;

                return (
                  <OptionRow
                    key={index}
                    option={option}
                    index={index}
                    isCorrect={isCorrect}
                    isSelected={isSelected}
                    isOpponentSelected={isOpponentSelected}
                    showResult={showResult}
                    selectedAnswer={selectedAnswer}
                    opponentName={opponent.name}
                    onSelect={handleAnswerSelect}
                    styles={styles}
                    colors={colors}
                  />
                );
              })}
            </View>
          </View>
        ) : (
          <GameOverView
            playerScore={playerScore}
            opponentScore={opponentScore}
            onHomePress={() => navigation.popToTop()}
            styles={styles}
            colors={colors}
          />
        )}
      </SafeAreaView>
    </View>
  );
};

export default OnlineImageQuizScreen;
