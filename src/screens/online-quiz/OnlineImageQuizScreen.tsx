import React, { useState, useEffect, useRef } from "react";
import { View, Dimensions, ActivityIndicator, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "../../context/user";
import { useAppTheme } from "../../hooks/useAppTheme";
import { useAlert } from "../../context/AlertContext";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

import QUIZ_IMAGE_DATA from "../../data/quiz-image.json";
import { QUIZ_IMAGE_MAP } from "../../constants/quizImages";
import { ScoreBoard } from "../../components/online-quiz/ScoreBoard";
import { QuestionCard } from "../../components/online-quiz/QuestionCard";
import { OptionRow } from "../../components/online-quiz/OptionRow";
import { GameOverView } from "../../components/online-quiz/GameOverView";
import { createOnlineQuizStyles } from "./online-quiz.styles";
import { soundHelper } from "../../utils/SoundHelper";
import { supabaseService } from "../../services/SupabaseService";
import FloatingGem from "../../components/home/FloatingGem";
import i18n from "../../i18n";

const { width } = Dimensions.get("window");

const OnlineImageQuizScreen: React.FC<any> = ({ navigation, route }) => {
  const { opponent, mySessionId, opponentSessionId } = route.params;
  const { username, avatar: userAvatar, soundEnabled, isLoggedIn, addPoints, addFriend, points } = useUser();
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
  const [sessionPoints, setSessionPoints] = useState(0);
  const [playerTimestamp, setPlayerTimestamp] = useState<number>(0);
  const [opponentTimestamp, setOpponentTimestamp] = useState<number>(0);

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
    const channelName = `game_sync_image_${ids[0]}_${ids[1]}`;

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
      const shuffle = (arr: any[]) => [...arr].sort(() => 0.5 - Math.random());
      const shuffled = shuffle(QUIZ_IMAGE_DATA).map(q => ({
        ...q,
        shuffledOptions: shuffle(q.options)
      }));
      const selected = shuffled.slice(0, 5);
      
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
        console.log("Image Game sync confirmed");
        break;
      case "ANSWER_SELECTED":
        setOpponentSelected(data.index);
        setOpponentTimestamp(data.timestamp || Date.now());
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
    const now = Date.now();
    setSelectedAnswer(index);
    setPlayerTimestamp(now);

    // Broadcast our choice to the opponent
    supabaseService.broadcastGameAction(channelRef.current, "ANSWER_SELECTED", { index, timestamp: now });
  };

  const revealAnswers = () => {
    stopTimer();
    setShowResult(true);

    const question = questions[currentQuestionIndex];
    const correctIdx = question.shuffledOptions.indexOf(question.answer);
    
    const isPlayerCorrect = selectedAnswer === correctIdx;
    const isOpponentCorrect = opponentSelected === correctIdx;

    // First-to-answer logic:
    // If both are correct, only the one with the smaller timestamp gets points.
    let playerEarnsPoints = isPlayerCorrect;
    if (isPlayerCorrect && isOpponentCorrect) {
      if (opponentTimestamp < playerTimestamp) {
        playerEarnsPoints = false; // Opponent was faster
      } else if (opponentTimestamp === playerTimestamp) {
        if (!isHost) playerEarnsPoints = false;
      }
    }

    if (playerEarnsPoints) {
      setPlayerScore((s) => s + 20);
      if (isLoggedIn) {
        addPoints(10);
        setSessionPoints(prev => prev + 10);
      }
      soundHelper.playCorrect(soundEnabled);
    } else if (selectedAnswer !== null && !isPlayerCorrect) {
      if (isLoggedIn) {
        addPoints(-5);
        setSessionPoints(prev => prev - 5);
      }
      soundHelper.playWrong(soundEnabled);
    }

    if (isOpponentCorrect) {
      let opponentEarnsPoints = true;
      if (isPlayerCorrect) {
        if (playerTimestamp < opponentTimestamp) {
          opponentEarnsPoints = false;
        } else if (playerTimestamp === opponentTimestamp) {
          if (isHost) opponentEarnsPoints = false;
        }
      }
      if (opponentEarnsPoints) {
        setOpponentScore((s) => s + 20);
      }
    }

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
          {i18n.t("syncing_game")}
        </Text>
      </View>
    );
  }

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
          totalPoints={points}
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
            sessionPoints={sessionPoints}
            username={username || "Mpilalao"}
            userAvatar={userAvatar}
            points={points}
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
                title: i18n.t("friend_added_title"),
                message: i18n.t("friend_added_msg", { name: opp.name }),
                buttons: [{ text: i18n.t("thanks") }]
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

export default OnlineImageQuizScreen;
