import React, { useRef } from "react";
import { View, Animated, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

import { useDuoGame } from "../../hooks/useDuoGame";
import { useAppTheme } from "../../hooks/useAppTheme";
import { PlayerSide } from "../../components/duo/PlayerSide";
import { GameOverModal } from "../../components/duo/GameOverModal";
import FloatingGem from "../../components/home/FloatingGem";
import { createDuoStyles } from "../../components/duo/duoStyles";

const { width } = Dimensions.get("window");

const DuoQuizScreen = ({ navigation, route }: any) => {
  const { p1, p2 } = route.params;
  const game = useDuoGame(p1, p2);
  const { colors, isLight } = useAppTheme();
  const styles = createDuoStyles(colors);

  const gemsConfig = [
    { x: width * 0.05, size: 15, delay: 0, duration: 8000, opacity: 0.4 },
    { x: width * 0.9, size: 20, delay: 2000, duration: 9000, opacity: 0.5 },
  ];

  if (!game.current) return null;

  if (game.isGameOver) {
    return (
      <GameOverModal
        p1={game.p1Score}
        p2={game.p2Score}
        p1Name={game.p1Name}
        p2Name={game.p2Name}
        onExit={() => navigation.goBack()}
        styles={styles}
        colors={colors}
      />
    );
  }

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

      {/* Player 2 – top, inverted */}
      <PlayerSide
        player={2}
        playerName={game.p2Name}
        playerAvatar={game.p2Avatar}
        questionText={game.current.question}
        questionIndex={game.index}
        options={game.current.options}
        onAnswer={(opt) => game.answer(2, opt)}
        hasAnswered={game.p2Answered}
        questionDone={game.questionDone}
        score={game.p2Score}
        styles={styles}
        colors={colors}
      />

      {/* Player 1 – bottom */}
      <PlayerSide
        player={1}
        playerName={game.p1Name}
        playerAvatar={game.p1Avatar}
        questionText={game.current.question}
        questionIndex={game.index}
        options={game.current.options}
        onAnswer={(opt) => game.answer(1, opt)}
        hasAnswered={game.p1Answered}
        questionDone={game.questionDone}
        score={game.p1Score}
        styles={styles}
        colors={colors}
      />
    </View>
  );
};

export default DuoQuizScreen;