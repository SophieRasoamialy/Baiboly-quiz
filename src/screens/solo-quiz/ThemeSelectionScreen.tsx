import React from "react";
import { View, Dimensions, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useQuizThemes } from "../../hooks/useQuizThemes";
import { useAppTheme } from "../../hooks/useAppTheme";
import ThemeHeader from "../../components/quiz-solo/ThemeHeader";
import ThemeList from "../../components/quiz-solo/ThemeList";
import RandomThemeCard from "../../components/quiz-solo/RandomThemeCard";
import FloatingGem from "../../components/home/FloatingGem";
import { createThemeSelectionStyles } from "./theme-selection.styles";
import { BackButton } from "../../components/ui/BackButton";

const { width } = Dimensions.get("window");

const ThemeSelectionScreen = () => {
  const navigation = useNavigation<any>();
  const { themes, totalQuestions } = useQuizThemes();
  const { colors, isLight } = useAppTheme();
  const styles = createThemeSelectionStyles(colors);

  const gemsConfig = [
    { x: width * 0.05, size: 18, delay: 0, duration: 7000, opacity: 0.75 },
    { x: width * 0.18, size: 13, delay: 1200, duration: 6000, opacity: 0.65 },
    { x: width * 0.32, size: 22, delay: 600, duration: 8500, opacity: 0.8 },
    { x: width * 0.47, size: 15, delay: 2500, duration: 7200, opacity: 0.6 },
    { x: width * 0.58, size: 20, delay: 800, duration: 9000, opacity: 0.75 },
    { x: width * 0.71, size: 11, delay: 3200, duration: 6500, opacity: 0.55 },
    { x: width * 0.83, size: 17, delay: 1800, duration: 7800, opacity: 0.7 },
    { x: width * 0.92, size: 14, delay: 4000, duration: 8000, opacity: 0.65 },
  ];

  const handleSelect = (themeId: string) => {
    navigation.navigate("SoloQuiz", { themeId });
  };

  const handleRandom = () => {
    navigation.navigate("SoloQuiz", { random: true });
  };

  const renderHeader = () => (
    <>
      <ThemeHeader styles={styles} colors={colors} total={totalQuestions} />
      <RandomThemeCard
        onPress={handleRandom}
        total={totalQuestions}
        styles={styles}
        colors={colors}
      />
    </>
  );

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
          <BackButton colors={colors} onPress={() => navigation.goBack()} />
        </View>

        <ThemeList 
          themes={themes} 
          onSelect={handleSelect} 
          ListHeaderComponent={renderHeader()}
          contentContainerStyle={styles.scrollContent}
          styles={styles}
          colors={colors}
        />
      </SafeAreaView>
    </View>
  );
};

export default ThemeSelectionScreen;