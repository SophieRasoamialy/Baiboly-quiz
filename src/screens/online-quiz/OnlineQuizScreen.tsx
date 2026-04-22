import React, { useState, useEffect, useRef } from "react";
import { View, Dimensions, ActivityIndicator, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "../../context/user";
import { useAppTheme } from "../../hooks/useAppTheme";
import { useAlert } from "../../context/AlertContext";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import QUESTIONS_DATA from "../../data/questions_mg.json";

import { ScoreBoard } from "../../components/online-quiz/ScoreBoard";
import { QuestionCard } from "../../components/online-quiz/QuestionCard";
import { OptionRow } from "../../components/online-quiz/OptionRow";
import { GameOverView } from "../../components/online-quiz/GameOverView";
import FloatingGem from "../../components/home/FloatingGem";
import { createOnlineQuizStyles } from "./online-quiz.styles";
import { soundHelper } from "../../utils/SoundHelper";
import { supabaseService } from "../../services/SupabaseService";

const { width } = Dimensions.get("window");

const OnlineQuizScreen: React.FC<any> = ({ navigation, route }) => {
  const { opponent, mySessionId, opponentSessionId } = route.params;
  const { username, avatar: userAvatar, soundEnabled, isLoggedIn, addPoints, addFriend } = useUser();
  const { colors, isLight } = useAppTheme();
  const { showAlert } = useAlert();
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
  const [isSyncing, setIsSyncing] = useState(true);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const channelRef = useRef<any>(null);
  const isHost = mySessionId < opponentSessionId;

  const gemsConfig = [
    { x: width * 0.12, size: 14, delay: 0, duration: 7500, opacity: 0.4 },
    { x: width * 0.88, size: 18, delay: 2000, duration: 8500, opacity: 0.5 },
  ];

  // 1. Setup Real-time Sync Channel
  useEffect(() => {
    const ids = [mySessionId, opponentSessionId].sort();
    const channelName = `game_sync_${ids[0]}_${ids[1]}`;

    channelRef.current = supabaseService.joinGameChannel(channelName, (payload) => {
      handleBroadcastMessage(payload);
    });

    return () => {
      if (channelRef.current) {
        channelRef.current.unsubscribe();
      }
    };
  }, []);

  // 2. Initial synchronization (Host picks questions, Client receives)
  useEffect(() => {
    if (isHost && questions.length === 0) {
      const shuffled = [...QUESTIONS_DATA].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 5).map(q => {
        const shuffledOptions = [...q.options].sort(() => 0.5 - Math.random());
        return {
          ...q,
          options: shuffledOptions,
          correctAnswer: shuffledOptions.indexOf(q.answer)
        };
      });
      
      setQuestions(selected);
      setIsSyncing(false);

      // Broadcast questions to opponent
      setTimeout(() => {
        supabaseService.broadcastGameAction(channelRef.current, "SET_QUESTIONS", selected);
      }, 1000);
    }
  }, [isHost]);

  const handleBroadcastMessage = (payload: any) => {
    const { action, data } = payload;

    switch (action) {
      case "SET_QUESTIONS":
        if (!isHost) {
          setQuestions(data);
          setIsSyncing(false);
          // Acknowledge receipt
          supabaseService.broadcastGameAction(channelRef.current, "ACK_SYNC", null);
        }
        break;
      case "ACK_SYNC":
        // Questions are synced on both sides
        console.log("Game sync confirmed");
        break;
      case "ANSWER_SELECTED":
        setOpponentSelected(data.index);
        break;
    }
  };

  // 3. Question Logic
  useEffect(() => {
    if (questions.length > 0 && !gameOver && !showResult && !isSyncing) {
      startTimer();
    }
    return () => stopTimer();
  }, [currentQuestionIndex, questions, gameOver, showResult, isSyncing]);

  useEffect(() => {
    // If BOTH have answered, reveal immediately
    if (selectedAnswer !== null && opponentSelected !== null && !showResult) {
      revealAnswers();
    }
  }, [selectedAnswer, opponentSelected, showResult]);

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

  const handleAnswerSelect = (index: number) => {
    if (selectedAnswer !== null || showResult || isSyncing) return;
    setSelectedAnswer(index);

    // Broadcast our choice to the opponent
    supabaseService.broadcastGameAction(channelRef.current, "ANSWER_SELECTED", { index });
  };

  const revealAnswers = () => {
    stopTimer();
    setShowResult(true);

    const question = questions[currentQuestionIndex];
    if (selectedAnswer === question.correctAnswer) {
      setPlayerScore((s) => s + 20);
      if (isLoggedIn) addPoints(10);
      soundHelper.playCorrect(soundEnabled);
    } else if (selectedAnswer !== null) {
      if (isLoggedIn) addPoints(-5);
      soundHelper.playWrong(soundEnabled);
    }

    if (opponentSelected === question.correctAnswer)
      setOpponentScore((s) => s + 20);

    // Wait and move to next question/end
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((i) => i + 1);
        setSelectedAnswer(null);
        setOpponentSelected(null);
        setShowResult(false);
      } else {
        soundHelper.playWin(soundEnabled);
        setGameOver(true);
      }
    }, 3000);
  };

  if (isSyncing) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ marginTop: 20, color: colors.text, fontStyle: "italic" }}>
          Mampifandray ny lalao...
        </Text>
      </View>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

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
              styles={styles}
            />

            <View style={styles.optionsGrid}>
              {currentQuestion.options.map((option: string, index: number) => {
                const isCorrect = index === currentQuestion.correctAnswer;
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
            username={username || "Mpilalao"}
            opponent={opponent}
            onHomePress={() => navigation.popToTop()}
            onReplayPress={() => navigation.replace("Matchmaking", { mode: "lobby" })}
            onAddFriendPress={(opp) => {
              addFriend({
                id: opp.profile_id || opp.session_id,
                name: opp.name,
                avatar: opp.avatar,
                church: opp.church,
                city: opp.city,
              });
              showAlert({
                title: "Nambara ny namana",
                message: `Tafiditra ao anatin'ny nambanao i ${opp.name}`,
                buttons: [{ text: "Misaotra" }]
              });
            }}
            styles={styles}
            colors={colors}
          />
        )}
      </SafeAreaView>
    </View>
  );
};

export default OnlineQuizScreen;
