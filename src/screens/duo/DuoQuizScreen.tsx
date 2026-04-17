import React, { useRef } from "react";
import { View, Animated, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

import { useDuoGame } from "../../hooks/useDuoGame";
import { useAppTheme } from "../../hooks/useAppTheme";
import { PlayerSide } from "../../components/duo/PlayerSide";
import { QuestionCard } from "../../components/duo/QuestionCard";
import { GameOverModal } from "../../components/duo/GameOverModal";
import FloatingGem from "../../components/home/FloatingGem";
import { createDuoStyles } from "../../components/duo/duoStyles";

const { width } = Dimensions.get("window");

const DuoQuizScreen = ({ navigation }: any) => {
  const game = useDuoGame();
  const { colors, isLight } = useAppTheme();
  const styles = createDuoStyles(colors);

  const p1Anim = useRef(new Animated.Value(1)).current;
  const p2Anim = useRef(new Animated.Value(1)).current;

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
        onExit={() => navigation.goBack()}
        styles={styles}
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
      
      <PlayerSide
        player={2}
        isActive={game.buzzedPlayer === 2}
        isDisabled={!!game.buzzedPlayer && game.buzzedPlayer !== 2}
        showOptions={game.showOptions}
        options={game.current.options}
        onBuzz={() => game.buzz(2)}
        onAnswer={game.answer}
        score={game.p2Score}
        scaleAnim={p2Anim}
        styles={styles}
        colors={colors}
      />

      <QuestionCard
        question={game.current.question}
        index={game.index}
        styles={styles}
      />

      <PlayerSide
        player={1}
        isActive={game.buzzedPlayer === 1}
        isDisabled={!!game.buzzedPlayer && game.buzzedPlayer !== 1}
        showOptions={game.showOptions}
        options={game.current.options}
        onBuzz={() => game.buzz(1)}
        onAnswer={game.answer}
        score={game.p1Score}
        scaleAnim={p1Anim}
        styles={styles}
        colors={colors}
      />
    </View>
  );
};

export default DuoQuizScreen;