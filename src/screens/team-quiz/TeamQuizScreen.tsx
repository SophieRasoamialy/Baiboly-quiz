import React, { useState, useEffect, useRef, useCallback } from "react";
import { View, Text, Animated, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "../../context/user";
import { useAppTheme } from "../../hooks/useAppTheme";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/types";

import { createTeamQuizStyles } from "./team-quiz.styles";
import TEAM_WORDS from "../../data/team_words_mg.json";
import FloatingGem from "../../components/home/FloatingGem";

import { Player, TeamLobby } from "../../components/team-quiz/TeamLobby";
import { RoleAnnounce } from "../../components/team-quiz/RoleAnnounce";
import { DescribingPhase } from "../../components/team-quiz/DescribingPhase";
import { GuessingPhase } from "../../components/team-quiz/GuessingPhase";
import { StealPhase } from "../../components/team-quiz/StealPhase";
import { ResultPhase } from "../../components/team-quiz/ResultPhase";
import { TeamGameOver } from "../../components/team-quiz/TeamGameOver";
import { soundHelper } from "../../utils/SoundHelper";

const { width } = Dimensions.get("window");

type TeamQuizScreenNavigationProp = StackNavigationProp<RootStackParamList, "TeamQuiz">;

interface Props {
  navigation: TeamQuizScreenNavigationProp;
}

type GamePhase =
  | "LOBBY"
  | "ROLE_ANNOUNCE"
  | "DESCRIBING"
  | "GUESSING"
  | "STEAL"
  | "RESULT"
  | "GAME_OVER";

const TeamQuizScreen: React.FC<Props> = ({ navigation }) => {
  const { username, avatar, soundEnabled } = useUser();
  const { colors, isLight } = useAppTheme();
  const styles = createTeamQuizStyles(colors);

  const [players] = useState<Player[]>([
    { id: "p1", name: username || "Hery", avatar: avatar || "davida", team: 1 },
    { id: "p2", name: "Rova", avatar: "woman", team: 1 },
    { id: "p3", name: "Andry", avatar: "boy", team: 2 },
    { id: "p4", name: "Miora", avatar: "girl", team: 2 },
  ]);

  const [phase, setPhase] = useState<GamePhase>("LOBBY");
  const [currentRound, setCurrentRound] = useState(1);
  const [maxRounds] = useState(4);
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);

  const [currentWord, setCurrentWord] = useState<any>(null);
  const [describerId, setDescriberId] = useState("");
  const [guesserId, setGuesserId] = useState("");
  const [opponentIds, setOpponentIds] = useState<string[]>([]);

  const [threeWords, setThreeWords] = useState(["", "", ""]);
  const [guess, setGuess] = useState("");
  const [timeLeft, setTimeLeft] = useState(15);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [winner, setWinner] = useState<1 | 2 | null>(null);

  const phaseAnim = useRef(new Animated.Value(0)).current;

  const gemsConfig = [
    { x: width * 0.05, size: 14, delay: 0, duration: 8000, opacity: 0.4 },
    { x: width * 0.9, size: 18, delay: 2000, duration: 9000, opacity: 0.5 },
    { x: width * 0.4, size: 22, delay: 4000, duration: 11000, opacity: 0.3 },
  ];

  const setupRound = useCallback(() => {
    let d, g, ops;
    if (currentRound === 1) { d = "p1"; g = "p2"; ops = ["p3", "p4"]; }
    else if (currentRound === 2) { d = "p3"; g = "p4"; ops = ["p1", "p2"]; }
    else if (currentRound === 3) { d = "p2"; g = "p1"; ops = ["p3", "p4"]; }
    else { d = "p4"; g = "p3"; ops = ["p1", "p2"]; }

    setDescriberId(d);
    setGuesserId(g);
    setOpponentIds(ops);

    const randomWord = TEAM_WORDS[Math.floor(Math.random() * TEAM_WORDS.length)];
    setCurrentWord(randomWord);
    setThreeWords(["", "", ""]);
    setGuess("");
    setTimeLeft(15);

    setPhase("ROLE_ANNOUNCE");
    startPhaseAnimation();

    setTimeout(() => {
      setPhase("DESCRIBING");
      startPhaseAnimation();
    }, 3000);
  }, [currentRound]);

  const startPhaseAnimation = () => {
    phaseAnim.setValue(0);
    Animated.timing(phaseAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (phase === "LOBBY") {
      setTimeout(() => setupRound(), 2000);
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0 && isTimerActive) {
      setIsTimerActive(false);
      if (phase === "GUESSING") {
        setPhase("STEAL");
        startPhaseAnimation();
      } else if (phase === "STEAL") {
        handleRoundEnd(false);
      }
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft, phase]);

  const startGuessing = () => {
    setPhase("GUESSING");
    setIsTimerActive(true);
    startPhaseAnimation();
  };

  const handleGuessSubmit = () => {
    const isCorrect = guess.trim().toLowerCase() === currentWord.word.toLowerCase();
    if (isCorrect) {
      soundHelper.playCorrect(soundEnabled);
      handleRoundEnd(true, phase === "STEAL");
    } else {
      // In Team Quiz, a wrong guess during guessing phase doesn't necessarily end the round immediately,
      // but we play a subtle wrong sound for feedback.
      soundHelper.playWrong(soundEnabled);
    }
  };

  const handleRoundEnd = (correct: boolean, stole: boolean = false) => {
    setIsTimerActive(false);

    if (correct) {
      const activeTeam = players.find(
        (p) => p.id === (stole ? opponentIds[0] : guesserId)
      )?.team;
      if (activeTeam === 1) setTeam1Score((s) => s + 1);
      else setTeam2Score((s) => s + 1);
    }

    setPhase("RESULT");
    startPhaseAnimation();

    setTimeout(() => {
      if (currentRound < maxRounds) {
        setCurrentRound((r) => r + 1);
        setupRound();
      } else {
        soundHelper.playWin(soundEnabled);
        setPhase("GAME_OVER");
        setWinner(team1Score > team2Score ? 1 : team2Score > team1Score ? 2 : null);
        startPhaseAnimation();
      }
    }, 3000);
  };

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
        <View style={styles.header}>
          <Text style={styles.roundIndicator}>
            ROUND {currentRound} / {maxRounds}
          </Text>
          <View style={styles.scoreTicker}>
            <Text style={[styles.scorePoint, { color: colors.secondary }]}>{team1Score}</Text>
            <Text style={styles.scoreDivider}>:</Text>
            <Text style={[styles.scorePoint, { color: colors.primary }]}>{team2Score}</Text>
          </View>
        </View>

        <View style={styles.mainArea}>
          {phase === "LOBBY" && <TeamLobby players={players} />}
          {phase === "ROLE_ANNOUNCE" && (
            <RoleAnnounce
              currentRound={currentRound}
              dPlayer={players.find((p) => p.id === describerId)}
              gPlayer={players.find((p) => p.id === guesserId)}
              phaseAnim={phaseAnim}
            />
          )}
          {phase === "DESCRIBING" && (
            <DescribingPhase
              currentWord={currentWord}
              threeWords={threeWords}
              setThreeWords={setThreeWords}
              onStartGuessing={startGuessing}
            />
          )}
          {phase === "GUESSING" && (
            <GuessingPhase
              timeLeft={timeLeft}
              threeWords={threeWords}
              guess={guess}
              setGuess={setGuess}
              onSubmitGuess={handleGuessSubmit}
            />
          )}
          {phase === "STEAL" && (
            <StealPhase
              guess={guess}
              setGuess={setGuess}
              onSubmitGuess={handleGuessSubmit}
            />
          )}
          {phase === "RESULT" && (
            <ResultPhase guess={guess} currentWord={currentWord} />
          )}
          {phase === "GAME_OVER" && (
            <TeamGameOver
              team1Score={team1Score}
              team2Score={team2Score}
              onHomePress={() => navigation.popToTop()}
            />
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default TeamQuizScreen;
