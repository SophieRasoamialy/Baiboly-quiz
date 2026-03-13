import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Modal,
  ScrollView,
  Dimensions,
  Easing,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation";
import { useUser } from "../context/UserContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

import questionsData from "../data/questions_mg.json";
import bibleData from "../data/bible_lite.json";

const { width, height } = Dimensions.get("window");

const COLORS = {
  emerald: "#00B894",
  emeraldDark: "#00897B",
  emeraldDeep: "#00695C",
  gold: "#F9A825",
  goldLight: "#FFD54F",
  goldDark: "#E65100",
  coral: "#FF6B6B",
  coralDark: "#E53935",
  white: "#FFFFFF",
  correctBg: "#E8F5E9",
  correctBorder: "#00B894",
  wrongBg: "#FFEBEE",
  wrongBorder: "#FF6B6B",
  neutralBg: "#F4F6F8",
  neutralBorder: "#E0E6ED",
  textDark: "#0F1923",
  textMuted: "#8A99A8",
};

type SoloQuizScreenRouteProp = RouteProp<RootStackParamList, "SoloQuiz">;
type SoloQuizScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SoloQuiz"
>;

interface Props {
  route: SoloQuizScreenRouteProp;
  navigation: SoloQuizScreenNavigationProp;
}

const TIMER_SECONDS = 20;
const OPTION_LETTERS = ["A", "B", "C", "D"];

// ── Floating Gem ─────────────────────────────────────────────────────────────
const FloatingGem = ({ x, size, delay, duration, opacity }: any) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = () => {
      translateY.setValue(0);
      rotate.setValue(0);
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: -height,
          duration,
          delay,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(rotate, {
          toValue: 1,
          duration,
          delay,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]).start(() => loop());
    };
    loop();
  }, []);

  const spin = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });
  const animatedOpacity = translateY.interpolate({
    inputRange: [-height, -height * 0.7, -height * 0.15, 0],
    outputRange: [0, opacity, opacity, 0],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      pointerEvents="none"
      style={{
        position: "absolute",
        left: x,
        bottom: 20,
        opacity: animatedOpacity,
        transform: [{ translateY }, { rotate: spin }],
        zIndex: 0,
      }}
    >
      <LinearGradient
        colors={["#A7FFEB", "#00E5CC", "#00897B", "#004D40"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          width: size,
          height: size,
          transform: [{ rotate: "45deg" }],
          borderRadius: size * 0.12,
          shadowColor: "#00E5CC",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 1,
          shadowRadius: size,
          elevation: 14,
        }}
      />
      <View
        style={{
          position: "absolute",
          width: size * 0.28,
          height: size * 0.28,
          borderRadius: 2,
          backgroundColor: "rgba(255,255,255,0.8)",
          top: size * 0.15,
          left: size * 0.2,
          transform: [{ rotate: "45deg" }],
        }}
      />
    </Animated.View>
  );
};

// ── Option Button ─────────────────────────────────────────────────────────────
const OptionButton = ({
  option,
  index,
  onPress,
  disabled,
  revealed,
  isAnswer,
  isSelected,
}: any) => {
  const pressAnim = useRef(new Animated.Value(0)).current;
  const mountAnim = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(mountAnim, {
      toValue: 1,
      delay: index * 80,
      friction: 7,
      tension: 70,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    if (revealed && isSelected && !isAnswer) {
      Animated.sequence([
        Animated.timing(shakeAnim, {
          toValue: 8,
          duration: 60,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -8,
          duration: 60,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 6,
          duration: 60,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -6,
          duration: 60,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 0,
          duration: 60,
          useNativeDriver: true,
        }),
      ]).start();
    }
    if (revealed && isAnswer) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: false,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 600,
            useNativeDriver: false,
          }),
        ]),
      ).start();
    }
  }, [revealed]);

  const handlePressIn = () =>
    !disabled &&
    Animated.spring(pressAnim, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  const handlePressOut = () =>
    Animated.spring(pressAnim, {
      toValue: 0,
      friction: 5,
      useNativeDriver: true,
    }).start();

  const scale = pressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.97],
  });
  const mountTranslateX = mountAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [40, 0],
  });
  const mountOpacity = mountAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  let bg = COLORS.neutralBg;
  let border = COLORS.neutralBorder;
  let letterBg = "#DDE3EA";
  let letterColor = COLORS.textMuted;
  let textColor = COLORS.textDark;
  let iconName: any = null;
  let iconColor = COLORS.white;
  let shadowColor = "rgba(0,0,0,0.08)";

  if (revealed) {
    if (isAnswer) {
      bg = COLORS.correctBg;
      border = COLORS.correctBorder;
      letterBg = COLORS.emerald;
      letterColor = "#fff";
      textColor = COLORS.emeraldDeep;
      iconName = "check-circle";
      iconColor = COLORS.emerald;
      shadowColor = "rgba(0,185,148,0.25)";
    } else if (isSelected) {
      bg = COLORS.wrongBg;
      border = COLORS.wrongBorder;
      letterBg = COLORS.coral;
      letterColor = "#fff";
      textColor = COLORS.coralDark;
      iconName = "close-circle";
      iconColor = COLORS.coral;
      shadowColor = "rgba(255,107,107,0.25)";
    }
  }

  const glowBorder = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(0,184,148,0.5)", "rgba(0,184,148,1)"],
  });

  return (
    <Animated.View
      style={{
        opacity: mountOpacity,
        transform: [{ translateX: mountTranslateX }, { translateX: shakeAnim }],
        marginBottom: 10,
      }}
    >
      <Animated.View style={{ transform: [{ scale }] }}>
        <TouchableOpacity
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={disabled}
          activeOpacity={1}
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
            paddingVertical: 15,
            borderRadius: 18,
            borderWidth: 2,
            backgroundColor: bg,
            borderColor: border,
            shadowColor,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 1,
            shadowRadius: 8,
            elevation: revealed && (isAnswer || isSelected) ? 6 : 2,
          }}
        >
          {/* Letter badge */}
          <View
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              backgroundColor: letterBg,
              justifyContent: "center",
              alignItems: "center",
              marginRight: 14,
            }}
          >
            <Text
              style={{ color: letterColor, fontWeight: "800", fontSize: 14 }}
            >
              {OPTION_LETTERS[index]}
            </Text>
          </View>

          <Text
            style={{
              flex: 1,
              fontSize: 15,
              fontWeight: "600",
              color: textColor,
              lineHeight: 22,
            }}
          >
            {option}
          </Text>

          {iconName && (
            <MaterialCommunityIcons
              name={iconName}
              size={24}
              color={iconColor}
              style={{ marginLeft: 8 }}
            />
          )}
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

// ── Main Screen ───────────────────────────────────────────────────────────────
const SoloQuizScreen: React.FC<Props> = ({ route, navigation }) => {
  const { theme: quizTheme } = route.params;
  const {
    hearts,
    gems,
    removeHeart,
    addGems,
    removeGems,
    buyHeartWithGems,
    nextRefillIn,
  } = useUser();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [timer, setTimer] = useState(TIMER_SECONDS);
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [showVerseModal, setShowVerseModal] = useState(false);

  // Interactive Verse Lookup State
  const [lookupBook, setLookupBook] = useState<string>("Genesisy");
  const [lookupChapter, setLookupChapter] = useState<string>("1");
  const [lookupStartVerse, setLookupStartVerse] = useState<number>(1);
  const [lookupEndVerse, setLookupEndVerse] = useState<number>(1);
  const [isSelecting, setIsSelecting] = useState<
    "BOOK" | "CHAPTER" | "VERSE_START" | "VERSE_END" | null
  >(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressAnim = useRef(new Animated.Value(1)).current;
  const timerPulse = useRef(new Animated.Value(1)).current;
  const cardAnim = useRef(new Animated.Value(0)).current;
  const resultAnim = useRef(new Animated.Value(0)).current;
  const nextBtnAnim = useRef(new Animated.Value(0)).current;
  const heartPulse = useRef(new Animated.Value(1)).current;

  const shuffleArray = (array: any[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  useEffect(() => {
    let filtered = questionsData.filter(
      (q) => q.theme.includes(quizTheme) || quizTheme === "General",
    );
    if (filtered.length === 0) filtered = questionsData.slice(0, 10);

    const shuffled = shuffleArray(filtered).map((q) => ({
      ...q,
      options: shuffleArray(q.options),
    }));

    setQuizQuestions(shuffled.slice(0, 15));
  }, [quizTheme]);

  // Card entrance animation on question change
  useEffect(() => {
    if (quizQuestions.length === 0) return;
    cardAnim.setValue(0);
    Animated.spring(cardAnim, {
      toValue: 1,
      friction: 7,
      tension: 65,
      useNativeDriver: true,
    }).start();
  }, [currentQuestionIndex, quizQuestions]);

  useEffect(() => {
    if (timer <= 5 && timer > 0 && selectedOption === null) {
      Animated.sequence([
        Animated.timing(timerPulse, {
          toValue: 1.15,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(timerPulse, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [timer]);

  useEffect(() => {
    if (selectedOption !== null || quizQuestions.length === 0 || hearts === 0)
      return;
    if (timer > 0) {
      timerRef.current = setTimeout(() => setTimer((p) => p - 1), 1000);
      Animated.timing(progressAnim, {
        toValue: timer / TIMER_SECONDS,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    } else {
      handleTimeout();
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timer, selectedOption, quizQuestions, hearts]);

  const handleTimeout = () => {
    setIsCorrect(false);
    setSelectedOption("TIMEOUT");
    removeHeart();
    showNextBtn();
  };

  const showNextBtn = () => {
    nextBtnAnim.setValue(0);
    Animated.spring(nextBtnAnim, {
      toValue: 1,
      friction: 6,
      tension: 70,
      useNativeDriver: true,
    }).start();
  };

  const handleOptionSelect = (option: string) => {
    if (selectedOption !== null) return;
    setSelectedOption(option);
    const correct = option === quizQuestions[currentQuestionIndex].answer;
    setIsCorrect(correct);
    if (correct) addGems(5);
    else removeHeart();
    showNextBtn();
  };

  const nextQuestion = () => {
    nextBtnAnim.setValue(0);
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((p) => p + 1);
      setSelectedOption(null);
      setIsCorrect(null);
      setTimer(TIMER_SECONDS);
      progressAnim.setValue(1);
    } else {
      navigation.goBack();
    }
  };

  const handleVerseLookup = () => {
    const questionText = quizQuestions[currentQuestionIndex].question;
    const refMatch = questionText.match(/([A-Z][a-z]+) (\d+):(\d+)/);
    if (refMatch) {
      const [_, book, chapter, verse] = refMatch;
      // Map common names to Malagasy if needed, but here we assume match
      setLookupBook(book);
      setLookupChapter(chapter);
      setLookupStartVerse(parseInt(verse));
      setLookupEndVerse(parseInt(verse));
    }
    setShowVerseModal(true);
  };

  const books = useMemo(
    () => Object.keys(bibleData).sort((a, b) => a.localeCompare(b)),
    [],
  );

  const chapters = useMemo(() => {
    if (!lookupBook || !(bibleData as any)[lookupBook]) return [];
    return Object.keys((bibleData as any)[lookupBook]).sort(
      (a, b) => parseInt(a) - parseInt(b),
    );
  }, [lookupBook]);

  const maxVerses = useMemo(() => {
    if (
      !lookupBook ||
      !lookupChapter ||
      !(bibleData as any)[lookupBook]?.[lookupChapter]
    )
      return 0;
    return Object.keys((bibleData as any)[lookupBook][lookupChapter]).length;
  }, [lookupBook, lookupChapter]);

  const selectedVersesText = useMemo(() => {
    if (
      !lookupBook ||
      !lookupChapter ||
      !(bibleData as any)[lookupBook]?.[lookupChapter]
    )
      return "";
    const chapterData = (bibleData as any)[lookupBook][lookupChapter];
    let combinedText = "";
    for (let v = lookupStartVerse; v <= lookupEndVerse; v++) {
      if (chapterData[v]) {
        combinedText += (combinedText ? " " : "") + chapterData[v];
      }
    }
    return combinedText;
  }, [lookupBook, lookupChapter, lookupStartVerse, lookupEndVerse]);

  const gemsConfig = [
    { x: width * 0.03, size: 12, delay: 0, duration: 8000, opacity: 0.5 },
    { x: width * 0.22, size: 9, delay: 2000, duration: 7000, opacity: 0.4 },
    { x: width * 0.45, size: 15, delay: 1000, duration: 9000, opacity: 0.55 },
    { x: width * 0.68, size: 10, delay: 3000, duration: 7500, opacity: 0.45 },
    { x: width * 0.88, size: 13, delay: 1500, duration: 8500, opacity: 0.5 },
  ];

  // No hearts animation effect
  useEffect(() => {
    if (hearts === 0) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(heartPulse, {
            toValue: 1.1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(heartPulse, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }
  }, [hearts]);

  // Loading state
  if (quizQuestions.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LinearGradient
          colors={["#0D0B15", "#0A1A12", "#080B10"]}
          style={StyleSheet.absoluteFillObject}
        />
        <Animated.View style={{ opacity: timerPulse }}>
          <MaterialCommunityIcons
            name="book-open-variant"
            size={48}
            color={COLORS.emerald}
          />
        </Animated.View>
        <Text
          style={{
            color: "rgba(255,255,255,0.6)",
            marginTop: 12,
            fontWeight: "600",
          }}
        >
          Miomana...
        </Text>
      </View>
    );
  }

  // No hearts state
  if (hearts === 0) {
    const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 32,
        }}
      >
        <LinearGradient
          colors={["#0D0B15", "#0A1A12"]}
          style={StyleSheet.absoluteFillObject}
        />
        {gemsConfig.map((g, i) => (
          <FloatingGem key={i} {...g} />
        ))}

        {/* Animated Heart Icon */}
        <Animated.View
          style={{
            width: 120,
            height: 120,
            borderRadius: 40,
            backgroundColor: "rgba(255,107,107,0.1)",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 2,
            borderColor: "rgba(255,107,107,0.3)",
            marginBottom: 24,
            transform: [{ scale: heartPulse }],
          }}
        >
          <MaterialCommunityIcons
            name="heart-off"
            size={58}
            color={COLORS.coral}
          />
        </Animated.View>

        <Text
          style={{
            color: "#fff",
            fontSize: 32,
            fontWeight: "900",
            marginBottom: 8,
            textAlign: "center",
          }}
        >
          Lany ny fo!
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            marginBottom: 40,
            backgroundColor: "rgba(255,255,255,0.05)",
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 20,
          }}
        >
          <MaterialCommunityIcons
            name="timer-outline"
            size={18}
            color={COLORS.emerald}
          />
          <Text
            style={{ color: COLORS.emerald, fontWeight: "800", fontSize: 16 }}
          >
            Haverina afaka: {formatTime(nextRefillIn)}
          </Text>
        </View>

        {/* Buy Heart Button */}
        <TouchableOpacity
          onPress={() => {
            if (buyHeartWithGems()) {
              // Optionally show a success animation or toast
            } else {
              Alert.alert(
                "Tsy ampy vatosoa",
                "Mila vatosoa 20 ianao mba hividianana fo.",
              );
            }
          }}
          style={{
            width: "100%",
            borderRadius: 22,
            overflow: "hidden",
            marginBottom: 16,
            elevation: 12,
            shadowColor: COLORS.emerald,
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.4,
            shadowRadius: 15,
          }}
        >
          <LinearGradient
            colors={[COLORS.emerald, COLORS.emeraldDeep]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              paddingVertical: 18,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 12,
            }}
          >
            <MaterialCommunityIcons name="heart-plus" size={24} color="#fff" />
            <Text
              style={{
                color: "#fff",
                fontWeight: "900",
                fontSize: 18,
                letterSpacing: 0.5,
              }}
            >
              Mividy fo (20 vatosoa)
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Go Back Button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            width: "100%",
            borderRadius: 22,
            overflow: "hidden",
            borderWidth: 1.5,
            borderColor: "rgba(255,255,255,0.15)",
          }}
        >
          <View style={{ paddingVertical: 18, alignItems: "center" }}>
            <Text
              style={{
                color: "rgba(255,255,255,0.6)",
                fontWeight: "700",
                fontSize: 16,
              }}
            >
              Hiverina
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  const currentQ = quizQuestions[currentQuestionIndex];
  const timerColor =
    timer <= 5 ? COLORS.coral : timer <= 10 ? COLORS.gold : COLORS.emerald;
  const progressColor =
    timer <= 5 ? COLORS.coral : timer <= 10 ? COLORS.gold : COLORS.emerald;
  const timerPercent = timer / TIMER_SECONDS;

  const cardTranslateY = cardAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [30, 0],
  });
  const cardOpacity = cardAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  const nextBtnTranslateY = nextBtnAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [60, 0],
  });
  const nextBtnOpacity = nextBtnAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" />

      {/* Background */}
      <LinearGradient
        colors={["#0D0B15", "#0A1A12", "#080B10"]}
        style={StyleSheet.absoluteFillObject}
      />
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: -80,
          left: -60,
          width: 280,
          height: 280,
          borderRadius: 140,
          backgroundColor: "rgba(0,180,148,0.08)",
        }}
      />
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: height * 0.3,
          right: -80,
          width: 220,
          height: 220,
          borderRadius: 110,
          backgroundColor: "rgba(249,168,37,0.06)",
        }}
      />

      {/* Floating gems */}
      {gemsConfig.map((g, i) => (
        <FloatingGem key={i} {...g} />
      ))}

      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        {/* ── TOP BAR ── */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            paddingTop: 10,
            paddingBottom: 14,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              width: 42,
              height: 42,
              borderRadius: 14,
              backgroundColor: "rgba(255,255,255,0.1)",
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.15)",
            }}
          >
            <MaterialCommunityIcons name="arrow-left" size={22} color="#fff" />
          </TouchableOpacity>

          {/* Progress dots / counter */}
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: 11,
                fontWeight: "700",
                letterSpacing: 2,
                textTransform: "uppercase",
                marginBottom: 2,
              }}
            >
              Fanontaniana
            </Text>
            <Text
              style={{
                color: "#fff",
                fontSize: 20,
                fontWeight: "900",
                letterSpacing: 0.5,
              }}
            >
              {String(currentQuestionIndex + 1).padStart(2, "0")}
              <Text
                style={{
                  color: "rgba(255,255,255,0.35)",
                  fontSize: 14,
                  fontWeight: "600",
                }}
              >
                {" "}
                / {quizQuestions.length}
              </Text>
            </Text>
          </View>

          {/* Timer pill */}
          <Animated.View
            style={{
              transform: [{ scale: timerPulse }],
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              backgroundColor: "rgba(255,255,255,0.1)",
              paddingHorizontal: 14,
              paddingVertical: 9,
              borderRadius: 24,
              borderWidth: 2,
              borderColor: timerColor,
            }}
          >
            <MaterialCommunityIcons
              name="timer-outline"
              size={16}
              color={timerColor}
            />
            <Text
              style={{
                color: timerColor,
                fontSize: 16,
                fontWeight: "800",
                letterSpacing: 1,
                minWidth: 36,
              }}
            >
              {String(Math.floor(timer / 60)).padStart(2, "0")}:
              {String(timer % 60).padStart(2, "0")}
            </Text>
          </Animated.View>
        </View>

        {/* ── PROGRESS BAR ── */}
        <View
          style={{
            marginHorizontal: 20,
            height: 6,
            borderRadius: 3,
            backgroundColor: "rgba(255,255,255,0.12)",
            overflow: "hidden",
            marginBottom: 18,
          }}
        >
          <Animated.View
            style={{
              height: "100%",
              borderRadius: 3,
              backgroundColor: progressColor,
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
              }),
            }}
          />
        </View>

        {/* ── STATS ROW (hearts & gems) ── */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 16,
            marginBottom: 16,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "rgba(255,107,107,0.12)",
              paddingHorizontal: 14,
              paddingVertical: 6,
              borderRadius: 14,
              borderWidth: 1,
              borderColor: "rgba(255,107,107,0.25)",
            }}
          >
            {[...Array(5)].map((_, i) => (
              <MaterialCommunityIcons
                key={i}
                name={i < hearts ? "heart" : "heart-outline"}
                size={16}
                color={i < hearts ? COLORS.coral : "rgba(255,107,107,0.3)"}
              />
            ))}
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              backgroundColor: "rgba(249,168,37,0.12)",
              paddingHorizontal: 14,
              paddingVertical: 6,
              borderRadius: 14,
              borderWidth: 1,
              borderColor: "rgba(249,168,37,0.25)",
            }}
          >
            <MaterialCommunityIcons
              name="diamond-stone"
              size={14}
              color={COLORS.goldLight}
            />
            <Text
              style={{
                color: COLORS.goldLight,
                fontWeight: "800",
                fontSize: 14,
              }}
            >
              {gems}
            </Text>
          </View>
        </View>

        {/* ── QUESTION CARD ── */}
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            style={{
              opacity: cardOpacity,
              transform: [{ translateY: cardTranslateY }],
            }}
          >
            {/* Card */}
            <View
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 28,
                overflow: "hidden",
                marginBottom: 16,
                elevation: 20,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.3,
                shadowRadius: 20,
              }}
            >
              {/* Top accent bar */}
              <LinearGradient
                colors={[
                  COLORS.emerald,
                  COLORS.emeraldDark,
                  COLORS.emeraldDeep,
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ height: 5 }}
              />

              <View style={{ padding: 22 }}>
                {/* Theme tag */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 14,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "rgba(0,184,148,0.1)",
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: "rgba(0,184,148,0.2)",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 11,
                        color: COLORS.emeraldDark,
                        fontWeight: "700",
                        letterSpacing: 0.5,
                        textTransform: "uppercase",
                      }}
                    >
                      {currentQ.theme}
                    </Text>
                  </View>
                </View>

                {/* Question text */}
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "800",
                    color: COLORS.textDark,
                    lineHeight: 30,
                    marginBottom: 16,
                  }}
                >
                  {currentQ.question}
                </Text>

                {/* Verse link */}
                <TouchableOpacity
                  onPress={handleVerseLookup}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 6,
                    backgroundColor: "rgba(0,137,123,0.08)",
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 12,
                    alignSelf: "flex-start",
                    borderWidth: 1,
                    borderColor: "rgba(0,137,123,0.2)",
                  }}
                >
                  <MaterialCommunityIcons
                    name="book-open-outline"
                    size={14}
                    color={COLORS.emeraldDark}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      color: COLORS.emeraldDark,
                      fontWeight: "700",
                    }}
                  >
                    Hijery andinin-tsoratra masina
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* ── OPTIONS ── */}
            <View>
              {currentQ.options.map((option: string, index: number) => (
                <OptionButton
                  key={index}
                  option={option}
                  index={index}
                  onPress={() => handleOptionSelect(option)}
                  disabled={selectedOption !== null}
                  revealed={selectedOption !== null}
                  isAnswer={option === currentQ.answer}
                  isSelected={option === selectedOption}
                />
              ))}
            </View>

            {/* ── RESULT FEEDBACK ── */}
            {selectedOption !== null && (
              <Animated.View style={{ marginTop: 8 }}>
                <LinearGradient
                  colors={
                    isCorrect
                      ? ["rgba(0,184,148,0.15)", "rgba(0,105,92,0.1)"]
                      : ["rgba(255,107,107,0.15)", "rgba(229,57,53,0.1)"]
                  }
                  style={{
                    borderRadius: 20,
                    padding: 16,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 12,
                    borderWidth: 1,
                    borderColor: isCorrect
                      ? "rgba(0,184,148,0.3)"
                      : "rgba(255,107,107,0.3)",
                  }}
                >
                  <View
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 14,
                      backgroundColor: isCorrect
                        ? "rgba(0,184,148,0.2)"
                        : "rgba(255,107,107,0.2)",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <MaterialCommunityIcons
                      name={
                        isCorrect
                          ? "star-shooting"
                          : selectedOption === "TIMEOUT"
                            ? "timer-off"
                            : "emoticon-sad-outline"
                      }
                      size={26}
                      color={isCorrect ? COLORS.emerald : COLORS.coral}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        color: isCorrect
                          ? COLORS.emeraldDark
                          : COLORS.coralDark,
                        fontWeight: "800",
                        fontSize: 15,
                        marginBottom: 2,
                      }}
                    >
                      {isCorrect
                        ? "Tsara! +5 gems 💎"
                        : selectedOption === "TIMEOUT"
                          ? "Lany ny fotoana!"
                          : "Diso! -1 fo ❤️"}
                    </Text>
                    {!isCorrect && selectedOption !== "TIMEOUT" && (
                      <Text
                        style={{
                          color: COLORS.textMuted,
                          fontSize: 12,
                          fontWeight: "600",
                        }}
                      >
                        Valiny: {currentQ.answer}
                      </Text>
                    )}
                  </View>
                </LinearGradient>
              </Animated.View>
            )}
          </Animated.View>
        </ScrollView>

        {/* ── NEXT BUTTON ── */}
        {selectedOption !== null && (
          <Animated.View
            style={{
              position: "absolute",
              bottom: 24,
              left: 20,
              right: 20,
              opacity: nextBtnOpacity,
              transform: [{ translateY: nextBtnTranslateY }],
            }}
          >
            {/* 3D shadow */}
            <View
              style={{
                position: "absolute",
                bottom: -7,
                left: 6,
                right: 6,
                height: "100%",
                borderRadius: 22,
                backgroundColor: COLORS.goldDark,
                opacity: 0.4,
              }}
            />
            <View
              style={{
                position: "absolute",
                bottom: -4,
                left: 4,
                right: 4,
                height: "100%",
                borderRadius: 22,
                backgroundColor: COLORS.gold,
                opacity: 0.25,
              }}
            />

            <TouchableOpacity
              onPress={nextQuestion}
              activeOpacity={0.9}
              style={{
                borderRadius: 22,
                overflow: "hidden",
                borderWidth: 1.5,
                borderColor: "rgba(255,255,255,0.2)",
                elevation: 14,
                shadowColor: COLORS.gold,
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.5,
                shadowRadius: 16,
              }}
            >
              <LinearGradient
                colors={[COLORS.goldLight, COLORS.gold, COLORS.goldDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  paddingVertical: 18,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                }}
              >
                <LinearGradient
                  colors={["rgba(255,255,255,0.25)", "rgba(255,255,255,0)"]}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "55%",
                    borderTopLeftRadius: 22,
                    borderTopRightRadius: 22,
                  }}
                />
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 17,
                    fontWeight: "900",
                    letterSpacing: 0.5,
                  }}
                >
                  {currentQuestionIndex < quizQuestions.length - 1
                    ? "Fanontaniana manaraka"
                    : "Farany 🎉"}
                </Text>
                <MaterialCommunityIcons
                  name={
                    currentQuestionIndex < quizQuestions.length - 1
                      ? "arrow-right"
                      : "flag-checkered"
                  }
                  size={20}
                  color="#fff"
                />
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        )}
      </SafeAreaView>

      {/* ── INTERACTIVE VERSE LOOKUP MODAL ── */}
      <Modal visible={showVerseModal} transparent animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.85)",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <Animated.View
            style={{
              backgroundColor: "#fff",
              borderRadius: 32,
              overflow: "hidden",
              maxHeight: height * 0.85,
            }}
          >
            <LinearGradient
              colors={[COLORS.emerald, COLORS.emeraldDeep]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ height: 6 }}
            />

            <View style={{ padding: 24 }}>
              {/* Header */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      backgroundColor: "rgba(0,184,148,0.1)",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <MaterialCommunityIcons
                      name="book-open-variant"
                      size={20}
                      color={COLORS.emerald}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "900",
                      color: COLORS.textDark,
                    }}
                  >
                    Hitady andininy
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setShowVerseModal(false);
                    setIsSelecting(null);
                  }}
                  style={{ padding: 8 }}
                >
                  <MaterialCommunityIcons
                    name="close"
                    size={24}
                    color={COLORS.textMuted}
                  />
                </TouchableOpacity>
              </View>

              {/* Selectors */}
              <View style={{ flexDirection: "row", gap: 8, marginBottom: 20 }}>
                {/* Book Selector */}
                <TouchableOpacity
                  onPress={() =>
                    setIsSelecting(isSelecting === "BOOK" ? null : "BOOK")
                  }
                  style={{
                    flex: 2,
                    backgroundColor:
                      isSelecting === "BOOK"
                        ? "rgba(0,184,148,0.1)"
                        : COLORS.neutralBg,
                    padding: 12,
                    borderRadius: 14,
                    borderWidth: 1,
                    borderColor:
                      isSelecting === "BOOK"
                        ? COLORS.emerald
                        : COLORS.neutralBorder,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      color: COLORS.textMuted,
                      fontWeight: "700",
                      textTransform: "uppercase",
                      marginBottom: 2,
                    }}
                  >
                    Boky
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "800",
                      color: COLORS.textDark,
                    }}
                    numberOfLines={1}
                  >
                    {lookupBook}
                  </Text>
                </TouchableOpacity>

                {/* Chapter Selector */}
                <TouchableOpacity
                  onPress={() =>
                    setIsSelecting(isSelecting === "CHAPTER" ? null : "CHAPTER")
                  }
                  style={{
                    flex: 1,
                    backgroundColor:
                      isSelecting === "CHAPTER"
                        ? "rgba(0,184,148,0.1)"
                        : COLORS.neutralBg,
                    padding: 12,
                    borderRadius: 14,
                    borderWidth: 1,
                    borderColor:
                      isSelecting === "CHAPTER"
                        ? COLORS.emerald
                        : COLORS.neutralBorder,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      color: COLORS.textMuted,
                      fontWeight: "700",
                      textTransform: "uppercase",
                      marginBottom: 2,
                    }}
                  >
                    Toko
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "800",
                      color: COLORS.textDark,
                    }}
                  >
                    {lookupChapter}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: "row", gap: 8, marginBottom: 24 }}>
                {/* Start Verse */}
                <TouchableOpacity
                  onPress={() =>
                    setIsSelecting(
                      isSelecting === "VERSE_START" ? null : "VERSE_START",
                    )
                  }
                  style={{
                    flex: 1,
                    backgroundColor:
                      isSelecting === "VERSE_START"
                        ? "rgba(249,168,37,0.1)"
                        : COLORS.neutralBg,
                    padding: 12,
                    borderRadius: 14,
                    borderWidth: 1,
                    borderColor:
                      isSelecting === "VERSE_START"
                        ? COLORS.gold
                        : COLORS.neutralBorder,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      color: COLORS.textMuted,
                      fontWeight: "700",
                      textTransform: "uppercase",
                      marginBottom: 2,
                    }}
                  >
                    Andininy (Atomboka)
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "800",
                      color: COLORS.textDark,
                    }}
                  >
                    {lookupStartVerse}
                  </Text>
                </TouchableOpacity>

                {/* End Verse */}
                <TouchableOpacity
                  onPress={() =>
                    setIsSelecting(
                      isSelecting === "VERSE_END" ? null : "VERSE_END",
                    )
                  }
                  style={{
                    flex: 1,
                    backgroundColor:
                      isSelecting === "VERSE_END"
                        ? "rgba(249,168,37,0.1)"
                        : COLORS.neutralBg,
                    padding: 12,
                    borderRadius: 14,
                    borderWidth: 1,
                    borderColor:
                      isSelecting === "VERSE_END"
                        ? COLORS.gold
                        : COLORS.neutralBorder,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      color: COLORS.textMuted,
                      fontWeight: "700",
                      textTransform: "uppercase",
                      marginBottom: 2,
                    }}
                  >
                    Andininy (Farany)
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "800",
                      color: COLORS.textDark,
                    }}
                  >
                    {lookupEndVerse}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Selection Lists (Conditional) */}
              {isSelecting && (
                <View
                  style={{
                    height: 200,
                    backgroundColor: COLORS.neutralBg,
                    borderRadius: 16,
                    padding: 8,
                    marginBottom: 20,
                  }}
                >
                  <ScrollView showsVerticalScrollIndicator={true}>
                    {isSelecting === "BOOK" &&
                      books.map((b: string) => (
                        <TouchableOpacity
                          key={b}
                          onPress={() => {
                            setLookupBook(b);
                            setLookupChapter("1");
                            setLookupStartVerse(1);
                            setLookupEndVerse(1);
                            setIsSelecting("CHAPTER");
                          }}
                          style={{
                            padding: 12,
                            backgroundColor:
                              lookupBook === b ? COLORS.emerald : "transparent",
                            borderRadius: 10,
                          }}
                        >
                          <Text
                            style={{
                              color:
                                lookupBook === b ? "#fff" : COLORS.textDark,
                              fontWeight: "700",
                            }}
                          >
                            {b}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    {isSelecting === "CHAPTER" &&
                      chapters.map((c: string) => (
                        <TouchableOpacity
                          key={c}
                          onPress={() => {
                            setLookupChapter(c);
                            setLookupStartVerse(1);
                            setLookupEndVerse(1);
                            setIsSelecting("VERSE_START");
                          }}
                          style={{
                            padding: 12,
                            backgroundColor:
                              lookupChapter === c
                                ? COLORS.emerald
                                : "transparent",
                            borderRadius: 10,
                          }}
                        >
                          <Text
                            style={{
                              color:
                                lookupChapter === c ? "#fff" : COLORS.textDark,
                              fontWeight: "700",
                            }}
                          >
                            Toko {c}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    {isSelecting === "VERSE_START" &&
                      Array.from({ length: maxVerses }, (_, i) => i + 1).map(
                        (v: number) => (
                          <TouchableOpacity
                            key={v}
                            onPress={() => {
                              setLookupStartVerse(v);
                              if (v > lookupEndVerse) setLookupEndVerse(v);
                              setIsSelecting("VERSE_END");
                            }}
                            style={{
                              padding: 12,
                              backgroundColor:
                                lookupStartVerse === v
                                  ? COLORS.gold
                                  : "transparent",
                              borderRadius: 10,
                            }}
                          >
                            <Text
                              style={{
                                color:
                                  lookupStartVerse === v
                                    ? "#fff"
                                    : COLORS.textDark,
                                fontWeight: "700",
                              }}
                            >
                              Andininy {v}
                            </Text>
                          </TouchableOpacity>
                        ),
                      )}
                    {isSelecting === "VERSE_END" &&
                      Array.from({ length: maxVerses }, (_, i) => i + 1)
                        .filter((v: number) => v >= lookupStartVerse)
                        .map((v: number) => (
                          <TouchableOpacity
                            key={v}
                            onPress={() => {
                              setLookupEndVerse(v);
                              setIsSelecting(null);
                            }}
                            style={{
                              padding: 12,
                              backgroundColor:
                                lookupEndVerse === v
                                  ? COLORS.gold
                                  : "transparent",
                              borderRadius: 10,
                            }}
                          >
                            <Text
                              style={{
                                color:
                                  lookupEndVerse === v
                                    ? "#fff"
                                    : COLORS.textDark,
                                fontWeight: "700",
                              }}
                            >
                              Andininy {v}
                            </Text>
                          </TouchableOpacity>
                        ))}
                  </ScrollView>
                </View>
              )}

              {/* Verse Display Area */}
              {!isSelecting && (
                <View style={{ paddingBottom: 10 }}>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "800",
                      color: COLORS.emeraldDark,
                      marginBottom: 12,
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                    }}
                  >
                    {lookupBook} {lookupChapter}:{lookupStartVerse}
                    {lookupStartVerse !== lookupEndVerse
                      ? `-${lookupEndVerse}`
                      : ""}
                  </Text>
                  <ScrollView style={{ maxHeight: 250 }}>
                    <View
                      style={{
                        backgroundColor: "rgba(0,184,148,0.06)",
                        borderRadius: 16,
                        padding: 20,
                        borderLeftWidth: 4,
                        borderLeftColor: COLORS.emerald,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          color: COLORS.textDark,
                          lineHeight: 28,
                          fontStyle: "italic",
                        }}
                      >
                        "{selectedVersesText || "Select range to read..."}"
                      </Text>
                    </View>
                  </ScrollView>
                </View>
              )}

              {/* Close Button */}
              <TouchableOpacity
                onPress={() => setShowVerseModal(false)}
                style={{
                  marginTop: 24,
                  borderRadius: 18,
                  overflow: "hidden",
                  elevation: 4,
                }}
              >
                <LinearGradient
                  colors={[COLORS.gold, COLORS.goldDark]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{ paddingVertical: 16, alignItems: "center" }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontWeight: "900",
                      fontSize: 16,
                      letterSpacing: 1,
                    }}
                  >
                    HIDIANA
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

export default SoloQuizScreen;
