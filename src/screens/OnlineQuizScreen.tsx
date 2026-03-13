import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "../context/UserContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import QUESTIONS_DATA from "../data/questions_mg.json";
import { COLORS } from "./HomeScreenStyles";

const { width } = Dimensions.get("window");

const AVATAR_MAP: { [key: string]: any } = {
  elder: require("../../assets/avatars/elder.png"),
  woman: require("../../assets/avatars/woman.png"),
  boy: require("../../assets/avatars/boy.png"),
  girl: require("../../assets/avatars/girl.png"),
  kid: require("../../assets/avatars/kid.png"),
  pastor: require("../../assets/avatars/pastor.png"),
};

const OnlineQuizScreen: React.FC<any> = ({ navigation, route }) => {
  const { opponent } = route.params;
  const { username, avatar: userAvatar } = useUser();

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

  useEffect(() => {
    // Shuffle and pick 5 questions
    const shuffled = [...QUESTIONS_DATA].sort(() => 0.5 - Math.random());
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
    // Bot takes 4-10 seconds to answer
    const delay = 4000 + Math.random() * 6000;
    setTimeout(() => {
      if (!showResult && !gameOver) {
        // 70% chance of correct answer
        const correctIdx = questions[currentQuestionIndex].correctAnswer;
        const isCorrect = Math.random() < 0.7;
        const botChoice = isCorrect
          ? correctIdx
          : Math.floor(Math.random() * 4);

        setOpponentSelected(botChoice);

        // If player already answered, reveal soon
        if (selectedAnswer !== null) {
          // revealAnswers();
        }
      }
    }, delay);
  };

  const handleAnswerSelect = (index: number) => {
    if (selectedAnswer !== null || showResult) return;
    setSelectedAnswer(index);

    // If opponent already answered or time is low, speed up
    if (opponentSelected !== null) {
      revealAnswers();
    }
  };

  const revealAnswers = () => {
    stopTimer();
    setShowResult(true);

    const question = questions[currentQuestionIndex];
    if (selectedAnswer === question.correctAnswer)
      setPlayerScore((s) => s + 20);
    if (opponentSelected === question.correctAnswer)
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

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#0D0B15", "#0A121A"]}
        style={StyleSheet.absoluteFillObject}
      />

      <SafeAreaView style={{ flex: 1 }}>
        {/* Header Scores */}
        <View style={styles.scoreBoard}>
          <View style={[styles.playerInfo, { alignItems: "flex-start" }]}>
            <View style={styles.avatarMini}>
              <Image
                source={AVATAR_MAP[userAvatar || "boy"]}
                style={styles.avatarImg}
              />
            </View>
            <Text style={styles.scoreText}>{playerScore}</Text>
            <Text style={styles.nameText}>{username}</Text>
          </View>

          <View style={styles.timerCircle}>
            <Text style={styles.timerText}>{timeLeft}</Text>
          </View>

          <View style={[styles.playerInfo, { alignItems: "flex-end" }]}>
            <View style={[styles.avatarMini, { borderColor: COLORS.gold }]}>
              <Image
                source={AVATAR_MAP[opponent.avatar]}
                style={styles.avatarImg}
              />
            </View>
            <Text style={styles.scoreText}>{opponentScore}</Text>
            <Text style={styles.nameText}>{opponent.name}</Text>
          </View>
        </View>

        {!gameOver ? (
          <View style={styles.quizArea}>
            <View style={styles.questionCard}>
              <Text style={styles.questionCounter}>
                FANONTANIANA {currentQuestionIndex + 1}/5
              </Text>
              <Text style={styles.questionText}>
                {currentQuestion.question}
              </Text>
            </View>

            <View style={styles.optionsGrid}>
              {currentQuestion.options.map((option: string, index: number) => {
                const isCorrect = index === currentQuestion.correctAnswer;
                const isSelected = selectedAnswer === index;
                const isOpponentSelected = opponentSelected === index;

                let borderColor = "rgba(255,255,255,0.1)";
                let bgColor = "rgba(255,255,255,0.05)";

                if (showResult) {
                  if (isCorrect) {
                    borderColor = COLORS.emerald;
                    bgColor = "rgba(0,229,204,0.1)";
                  } else if (isSelected) {
                    borderColor = "#FF5252";
                    bgColor = "rgba(255,82,82,0.1)";
                  }
                } else if (isSelected) {
                  borderColor = COLORS.emerald;
                }

                return (
                  <TouchableOpacity
                    key={index}
                    disabled={selectedAnswer !== null || showResult}
                    onPress={() => handleAnswerSelect(index)}
                    style={[
                      styles.optionBtn,
                      { borderColor, backgroundColor: bgColor },
                    ]}
                  >
                    <Text style={styles.optionText}>{option}</Text>

                    {/* Selection indicators */}
                    <View style={styles.indicators}>
                      {isSelected && (
                        <View style={styles.playerTag}>
                          <Text style={styles.tagText}>IANAO</Text>
                        </View>
                      )}
                      {isOpponentSelected && (
                        <View
                          style={[
                            styles.playerTag,
                            { backgroundColor: COLORS.gold },
                          ]}
                        >
                          <Text style={styles.tagText}>
                            {opponent.name.toUpperCase()}
                          </Text>
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ) : (
          <View style={styles.gameOver}>
            <View style={styles.medalCircle}>
              <MaterialCommunityIcons
                name={
                  playerScore >= opponentScore
                    ? "trophy"
                    : "emoticon-sad-outline"
                }
                size={80}
                color={
                  playerScore >= opponentScore
                    ? COLORS.gold
                    : "rgba(255,255,255,0.2)"
                }
              />
            </View>
            <Text style={styles.resultTitle}>
              {playerScore > opponentScore
                ? "NANDRESY IANAO!"
                : playerScore < opponentScore
                  ? "RESY IANAO..."
                  : "MITSITOKOTOKO!"}
            </Text>
            <Text style={styles.resultScores}>
              {playerScore} - {opponentScore}
            </Text>

            <TouchableOpacity
              onPress={() => navigation.popToTop()}
              style={styles.homeBtn}
            >
              <LinearGradient
                colors={[COLORS.emerald, COLORS.emeraldDeep]}
                style={styles.homeGradient}
              >
                <Text style={styles.homeText}>Hiverina Home</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scoreBoard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    marginTop: 10,
  },
  playerInfo: {
    flex: 1,
  },
  avatarMini: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: COLORS.emerald,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  avatarImg: {
    width: "100%",
    height: "100%",
  },
  scoreText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "900",
    marginTop: 5,
  },
  nameText: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  timerCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  timerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "900",
  },
  quizArea: {
    flex: 1,
    padding: 20,
  },
  questionCard: {
    backgroundColor: "rgba(255,255,255,0.05)",
    padding: 25,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    marginBottom: 20,
  },
  questionCounter: {
    color: COLORS.emerald,
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 2,
    marginBottom: 15,
  },
  questionText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 28,
  },
  optionsGrid: {
    gap: 12,
  },
  optionBtn: {
    padding: 20,
    borderRadius: 20,
    borderWidth: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  indicators: {
    flexDirection: "row",
    gap: 5,
  },
  playerTag: {
    backgroundColor: COLORS.emerald,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagText: {
    color: "#fff",
    fontSize: 8,
    fontWeight: "900",
  },
  gameOver: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  medalCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "rgba(255,255,255,0.03)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  resultTitle: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "900",
    marginBottom: 10,
  },
  resultScores: {
    color: COLORS.gold,
    fontSize: 48,
    fontWeight: "900",
    marginBottom: 50,
  },
  homeBtn: {
    width: "100%",
    height: 60,
    borderRadius: 20,
    overflow: "hidden",
  },
  homeGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  homeText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "900",
  },
});

export default OnlineQuizScreen;
