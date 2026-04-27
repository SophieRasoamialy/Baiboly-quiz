import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/types";
import { useUser } from "../../context/user/UserContext";
import { useAppTheme } from "../../hooks/useAppTheme";
import { useAlert } from "../../context/AlertContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

import quizImageData from "../../data/quiz-image.json";
import { QUIZ_IMAGE_MAP } from "../../constants/quizImages";
import { createImageQuizStyles, TIMER_SECONDS } from "./image-quiz.styles";
import FloatingGem from "../../components/home/FloatingGem";
import { OptionButton } from "../../components/image-quiz/OptionButton";
import BackButton from "../../components/ui/BackButton";
import { soundHelper } from "../../utils/SoundHelper";
import { SoloGameOverView } from "../../components/ui/SoloGameOverView";

const { width } = Dimensions.get("window");

type ImageQuizScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ImageQuiz"
>;

interface Props {
  navigation: ImageQuizScreenNavigationProp;
}

const ImageQuizScreen: React.FC<Props> = ({ navigation }) => {
  const { hearts, gems, removeHeart, addGems, buyHeartWithGems, nextRefillIn, soundEnabled, isLoggedIn, addPoints } =
    useUser();
  const { colors, isLight } = useAppTheme();
  const { showAlert } = useAlert();
  const styles = createImageQuizStyles(colors);

  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [timer, setTimer] = useState(TIMER_SECONDS);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const cardAnim = useRef(new Animated.Value(0)).current;
  const nextBtnAnim = useRef(new Animated.Value(0)).current;

  const gemsConfig = [
    { x: width * 0.08, size: 14, delay: 0, duration: 8000, opacity: 0.4 },
    { x: width * 0.92, size: 18, delay: 2000, duration: 9000, opacity: 0.5 },
  ];

  // Shuffle logic
  const shuffle = (arr: any[]) => {
    const newArr = [...arr];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  useEffect(() => {
    const shuffled = shuffle(quizImageData).map((q) => ({
      ...q,
      options: shuffle(q.options),
    }));
    setQuestions(shuffled.slice(0, 10)); // 10 questions per round
  }, []);

  useEffect(() => {
    if (questions.length === 0) return;
    cardAnim.setValue(0);
    Animated.spring(cardAnim, {
      toValue: 1,
      friction: 8,
      tension: 60,
      useNativeDriver: true,
    }).start();
  }, [currentIndex, questions]);

  useEffect(() => {
    if (revealed || questions.length === 0 || hearts === 0) return;

    if (timer > 0) {
      timerRef.current = setTimeout(() => setTimer((t) => t - 1), 1000);
    } else {
      handleAnswer(null); // Timeout
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timer, revealed, hearts, questions]);

  const handleAnswer = (option: string | null) => {
    if (revealed) return;
    setSelectedOption(option);
    setRevealed(true);

    const correct = option === questions[currentIndex].answer;
    if (correct) {
      setScore(s => s + 1);
      addGems(5);
      if (isLoggedIn) addPoints(10);
      soundHelper.playCorrect(soundEnabled);
    } else {
      removeHeart();
      if (isLoggedIn) addPoints(-5);
      soundHelper.playWrong(soundEnabled);
    }

    // Auto-navigate to next question after delay
    setTimeout(() => {
      navigateNext();
    }, 1500);
  };

  const navigateNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setRevealed(false);
      setTimer(TIMER_SECONDS);
      nextBtnAnim.setValue(0);
    } else {
      soundHelper.playWin(soundEnabled);
      setIsFinished(true);
    }
  };

  if (questions.length === 0) return null;

  const currentQ = questions[currentIndex];
  const imageSource = currentQ ? QUIZ_IMAGE_MAP[currentQ.imageKey] : null;

  if (hearts === 0) {
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
        <View style={styles.fullCenter}>
          <MaterialCommunityIcons
            name="heart-off"
            size={80}
            color={colors.accent}
          />
          <Text style={styles.noHeartsTitle}>Lany ny fo!</Text>
          <Text style={styles.noHeartsSub}>
            Haverina afaka: {Math.floor(nextRefillIn / 60)}:
            {(nextRefillIn % 60).toString().padStart(2, "0")}
          </Text>
          <TouchableOpacity
            style={styles.buyBtn}
            onPress={() => {
              if (!buyHeartWithGems())
                showAlert({
                  title: "Tsy ampy vatosoa",
                  message: "Mila 20 vatosoa ianao.",
                });
            }}
          >
            <LinearGradient
              colors={[colors.secondary, colors.secondaryDark]}
              style={styles.buyGradient}
            >
              <Text style={styles.buyText}>Mividy fo (20 vatosoa)</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginTop: 24 }}
          >
            <Text style={{ color: colors.textMuted, fontWeight: "700" }}>
              HIVERINA
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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

      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        {/* Header */}
        <View style={styles.header}>
          <BackButton colors={colors} onPress={() => navigation.goBack()} />
          <View style={styles.stats}>
            <View style={styles.statPill}>
              <Text style={styles.statText}>💎 {gems}</Text>
            </View>
            <View style={[styles.statPill, { borderColor: colors.accent }]}>
              <Text style={styles.statText}>❤️ {hearts}</Text>
            </View>
          </View>
        </View>

        <View style={styles.main}>
          {isFinished ? (
            <SoloGameOverView
              score={score}
              totalQuestions={questions.length}
              onHomePress={() => navigation.popToTop()}
              onReplayPress={() => {
                const shuffled = shuffle(quizImageData).map((q) => ({
                  ...q,
                  options: shuffle(q.options),
                }));
                setQuestions(shuffled.slice(0, 10));
                setCurrentIndex(0);
                setSelectedOption(null);
                setRevealed(false);
                setTimer(TIMER_SECONDS);
                setScore(0);
                setIsFinished(false);
              }}
              colors={colors}
            />
          ) : (
            <>
              {/* Timer Progress */}
              <View style={styles.timerTrack}>
                <Animated.View
                  style={[
                    styles.timerBar,
                    {
                      width: (timer / TIMER_SECONDS) * (width - 40),
                      backgroundColor: timer < 5 ? colors.accent : colors.secondary,
                    },
                  ]}
                />
              </View>

              <Animated.View
                style={[
                  styles.quizCard,
                  {
                    opacity: cardAnim,
                    transform: [
                      {
                        translateY: cardAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [40, 0],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <View style={styles.imageContainer}>
                  <Image
                    source={imageSource}
                    style={styles.quizImage}
                    resizeMode="contain"
                  />
                  <LinearGradient
                    colors={["transparent", "rgba(0,0,0,0.6)"]}
                    style={styles.imageOverlay}
                  />
                  <View style={styles.themeTag}>
                    <Text style={styles.themeText}>{currentQ.theme.toUpperCase()}</Text>
                  </View>
                </View>

                <Text style={styles.questionText}>{currentQ.question}</Text>

                <View style={styles.optionsArea}>
                  {currentQ.options.map((opt: string, i: number) => (
                    <OptionButton
                      key={opt}
                      option={opt}
                      index={i}
                      revealed={revealed}
                      isAnswer={opt === currentQ.answer}
                      isSelected={opt === selectedOption}
                      disabled={revealed}
                      onPress={() => handleAnswer(opt)}
                      styles={styles}
                      colors={colors}
                    />
                  ))}
                </View>
              </Animated.View>
            </>
          )}
        </View>


      </SafeAreaView>
    </View>
  );
};

export default ImageQuizScreen;
