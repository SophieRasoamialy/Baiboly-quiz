import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  Easing,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation";
import { useUser } from "../context/UserContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "./HomeScreenStyles";
import questionsData from "../data/questions_mg.json";

const { width, height } = Dimensions.get("window");

type DuoQuizScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "DuoQuiz"
>;
interface Props {
  navigation: DuoQuizScreenNavigationProp;
}

const GAME_QUESTIONS_COUNT = 15;

const DuoQuizScreen: React.FC<Props> = ({ navigation }) => {
  const { colors } = useUser();
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);

  // Game State
  const [p1Score, setP1Score] = useState(0);
  const [p2Score, setP2Score] = useState(0);
  const [buzzedPlayer, setBuzzedPlayer] = useState<1 | 2 | null>(null);
  const [showOptions, setShowOptions] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  // Animations
  const p1BuzzerAnim = useRef(new Animated.Value(1)).current;
  const p2BuzzerAnim = useRef(new Animated.Value(1)).current;
  const questionAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Select 15 random questions
    const shuffled = [...questionsData].sort(() => 0.5 - Math.random());
    setQuizQuestions(shuffled.slice(0, GAME_QUESTIONS_COUNT));

    Animated.timing(questionAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleBuzzer = (player: 1 | 2) => {
    if (buzzedPlayer !== null || isGameOver) return;
    setBuzzedPlayer(player);
    setShowOptions(true);

    // Pulse animation for the buzzer
    const anim = player === 1 ? p1BuzzerAnim : p2BuzzerAnim;
    Animated.sequence([
      Animated.timing(anim, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(anim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleAnswer = (option: string) => {
    if (buzzedPlayer === null) return;

    const isCorrect = option === quizQuestions[currentIdx].answer;

    if (buzzedPlayer === 1) {
      setP1Score((prev) => (isCorrect ? prev + 1 : Math.max(0, prev - 1)));
    } else {
      setP2Score((prev) => (isCorrect ? prev + 1 : Math.max(0, prev - 1)));
    }

    // Short delay before next question
    setTimeout(() => {
      if (currentIdx < GAME_QUESTIONS_COUNT - 1) {
        setCurrentIdx((prev) => prev + 1);
        setBuzzedPlayer(null);
        setShowOptions(false);
      } else {
        setIsGameOver(true);
      }
    }, 1500);
  };

  if (quizQuestions.length === 0) return null;

  const currentQuestion = quizQuestions[currentIdx];

  // Component for Player Side
  const PlayerSide = ({ player }: { player: 1 | 2 }) => {
    const isInverted = player === 2;
    const isActive = buzzedPlayer === player;
    const isDisabled = buzzedPlayer !== null && !isActive;

    return (
      <View
        style={[
          styles.playerSide,
          isInverted && styles.inverted,
          isActive && styles.activeSide,
          isDisabled && styles.disabledSide,
        ]}
      >
        {!showOptions ? (
          <TouchableOpacity
            onPress={() => handleBuzzer(player)}
            disabled={isDisabled}
            style={styles.buzzerWrapper}
          >
            <Animated.View
              style={[
                styles.buzzer,
                {
                  transform: [
                    { scale: player === 1 ? p1BuzzerAnim : p2BuzzerAnim },
                  ],
                },
              ]}
            >
              <LinearGradient
                colors={
                  player === 1
                    ? [COLORS.emerald, COLORS.emeraldDeep]
                    : [COLORS.gold, COLORS.goldDark]
                }
                style={styles.buzzerGradient}
              >
                <MaterialCommunityIcons
                  name="gesture-tap"
                  size={40}
                  color="#fff"
                />
                <Text style={styles.buzzerText}>TAP!</Text>
              </LinearGradient>
            </Animated.View>
          </TouchableOpacity>
        ) : isActive ? (
          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((opt: string) => (
              <TouchableOpacity
                key={opt}
                onPress={() => handleAnswer(opt)}
                style={styles.optionBtn}
              >
                <Text style={styles.optionText}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.waitContainer}>
            <MaterialCommunityIcons
              name="timer-sand"
              size={40}
              color="rgba(255,255,255,0.2)"
            />
            <Text style={styles.waitText}>Miandry ny mpifanandrina...</Text>
          </View>
        )}

        <View style={styles.scorePill}>
          <Text style={styles.scoreLabel}>MPILALAO {player}</Text>
          <Text style={styles.scoreValue}>
            {player === 1 ? p1Score : p2Score}
          </Text>
        </View>
      </View>
    );
  };

  if (isGameOver) {
    const winner = p1Score > p2Score ? 1 : p2Score > p1Score ? 2 : 0;
    return (
      <View style={styles.gameOverContainer}>
        <LinearGradient
          colors={["#0D0B15", "#0A1A12"]}
          style={StyleSheet.absoluteFillObject}
        />
        <MaterialCommunityIcons
          name={winner === 0 ? "scale-balance" : "trophy"}
          size={100}
          color={winner === 0 ? "#fff" : COLORS.gold}
        />
        <Text style={styles.gameOverTitle}>
          {winner === 0 ? "Sahala!" : `Mpilalao ${winner} no mpandresy!`}
        </Text>
        <View style={styles.finalScores}>
          <View style={styles.finalScoreItem}>
            <Text style={styles.finalScoreLabel}>P1</Text>
            <Text style={styles.finalScoreValue}>{p1Score}</Text>
          </View>
          <View style={styles.finalScoreSeparator} />
          <View style={styles.finalScoreItem}>
            <Text style={styles.finalScoreLabel}>P2</Text>
            <Text style={styles.finalScoreValue}>{p2Score}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.exitBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.exitBtnText}>Hiverina</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <PlayerSide player={2} />

      {/* Central Question Area */}
      <View style={styles.centerArea}>
        <LinearGradient
          colors={["rgba(255,255,255,0.05)", "rgba(255,255,255,0.08)"]}
          style={styles.questionCard}
        >
          <Text style={styles.questionCounter}>
            FANONTANIANA {currentIdx + 1} / {GAME_QUESTIONS_COUNT}
          </Text>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
        </LinearGradient>
      </View>

      <PlayerSide player={1} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#08070A",
  },
  playerSide: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  inverted: {
    transform: [{ rotate: "180deg" }],
  },
  activeSide: {
    backgroundColor: "rgba(0,229,204,0.05)",
  },
  disabledSide: {
    opacity: 0.3,
  },
  centerArea: {
    height: 180,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  questionCard: {
    width: width * 0.9,
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
  },
  questionCounter: {
    color: COLORS.emerald,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 2,
    marginBottom: 8,
  },
  questionText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 22,
  },
  buzzerWrapper: {
    width: 140,
    height: 140,
  },
  buzzer: {
    flex: 1,
    borderRadius: 70,
    overflow: "hidden",
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
  },
  buzzerGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buzzerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "900",
    marginTop: 5,
  },
  optionsContainer: {
    width: "100%",
    gap: 10,
  },
  optionBtn: {
    backgroundColor: "rgba(255,255,255,0.08)",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  optionText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  scorePill: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  scoreLabel: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 10,
    fontWeight: "800",
  },
  scoreValue: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "900",
  },
  waitContainer: {
    alignItems: "center",
    gap: 10,
  },
  waitText: {
    color: "rgba(255,255,255,0.3)",
    fontSize: 12,
    fontWeight: "600",
  },
  gameOverContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  gameOverTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "900",
    textAlign: "center",
    marginTop: 30,
    marginBottom: 40,
  },
  finalScores: {
    flexDirection: "row",
    alignItems: "center",
    gap: 30,
    marginBottom: 60,
  },
  finalScoreItem: {
    alignItems: "center",
  },
  finalScoreLabel: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 5,
  },
  finalScoreValue: {
    color: "#fff",
    fontSize: 48,
    fontWeight: "900",
  },
  finalScoreSeparator: {
    width: 2,
    height: 40,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  exitBtn: {
    backgroundColor: COLORS.emerald,
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 20,
  },
  exitBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "900",
  },
});

export default DuoQuizScreen;
