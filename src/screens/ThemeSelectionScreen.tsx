import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions,
  StyleSheet,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import questionsData from "../data/questions_mg.json";

const { width, height } = Dimensions.get("window");

type ThemeSelectionNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ThemeSelection"
>;
interface Props {
  navigation: ThemeSelectionNavigationProp;
}

const COLORS = {
  emerald: "#00B894",
  emeraldDark: "#00897B",
  emeraldDeep: "#00695C",
  gold: "#F9A825",
  goldLight: "#FFD54F",
  white: "#FFFFFF",
  textMuted: "rgba(255,255,255,0.55)",
};

const GRADIENTS = [
  {
    colors: ["#FFB300", "#FF6D00", "#BF360C"],
    shadow: "#FF6D00",
    icon: "cross",
  },
  {
    colors: ["#00E5CC", "#00B894", "#00695C"],
    shadow: "#00B894",
    icon: "bird",
  },
  {
    colors: ["#7986CB", "#3F51B5", "#1A237E"],
    shadow: "#3F51B5",
    icon: "star-david",
  },
  {
    colors: ["#FF8A65", "#E64A19", "#BF360C"],
    shadow: "#E64A19",
    icon: "fire",
  },
  {
    colors: ["#CE93D8", "#9C27B0", "#6A1B9A"],
    shadow: "#9C27B0",
    icon: "crown",
  },
  {
    colors: ["#4DB6AC", "#00897B", "#004D40"],
    shadow: "#00897B",
    icon: "leaf",
  },
  {
    colors: ["#F48FB1", "#E91E63", "#880E4F"],
    shadow: "#E91E63",
    icon: "heart",
  },
  {
    colors: ["#FFD54F", "#FF8F00", "#E65100"],
    shadow: "#FF8F00",
    icon: "shield-star",
  },
];

// ── Floating Gem (same as HomeScreen) ───────────────────────────────────────
interface GemProps {
  x: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

const FloatingGem: React.FC<GemProps> = ({
  x,
  size,
  delay,
  duration,
  opacity,
}) => {
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
        bottom: 30,
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

// ── Theme Card ───────────────────────────────────────────────────────────────
interface ThemeCardProps {
  themeName: string;
  index: number;
  count: number;
  onPress: () => void;
}

const ThemeCard: React.FC<ThemeCardProps> = ({
  themeName,
  index,
  count,
  onPress,
}) => {
  const mountAnim = useRef(new Animated.Value(0)).current;
  const pressAnim = useRef(new Animated.Value(0)).current;
  const g = GRADIENTS[index % GRADIENTS.length];

  useEffect(() => {
    Animated.spring(mountAnim, {
      toValue: 1,
      delay: 300 + index * 80,
      friction: 7,
      tension: 70,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePressIn = () =>
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
    outputRange: [1, 0.95],
  });
  const pressTranslateY = pressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 4],
  });
  const shadowOpacity = pressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 0.1],
  });

  const mountTranslateX = mountAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-40, 0],
  });
  const mountOpacity = mountAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <Animated.View
      style={{
        marginBottom: 16,
        opacity: mountOpacity,
        transform: [{ translateX: mountTranslateX }],
      }}
    >
      {/* 3D shadow bottom layer */}
      <Animated.View
        style={{
          position: "absolute",
          bottom: -6,
          left: 5,
          right: 5,
          height: "100%",
          borderRadius: 24,
          backgroundColor: g.shadow,
          opacity: shadowOpacity,
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: -3,
          left: 3,
          right: 3,
          height: "100%",
          borderRadius: 24,
          backgroundColor: g.shadow,
          opacity: 0.35,
        }}
      />

      <Animated.View
        style={{ transform: [{ scale }, { translateY: pressTranslateY }] }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={{
            borderRadius: 24,
            overflow: "hidden",
            borderWidth: 1.5,
            borderColor: "rgba(255,255,255,0.18)",
            elevation: 10,
            shadowColor: g.shadow,
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.5,
            shadowRadius: 12,
          }}
        >
          <LinearGradient
            colors={g.colors as any}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flexDirection: "row", alignItems: "center", padding: 18 }}
          >
            {/* Top gloss */}
            <LinearGradient
              colors={["rgba(255,255,255,0.22)", "rgba(255,255,255,0)"]}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "60%",
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
              }}
            />
            {/* Left edge highlight */}
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 2,
                height: "65%",
                borderTopLeftRadius: 24,
                backgroundColor: "rgba(255,255,255,0.4)",
              }}
            />

            {/* Icon */}
            <View
              style={{
                width: 52,
                height: 52,
                borderRadius: 16,
                backgroundColor: "rgba(255,255,255,0.22)",
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.3)",
              }}
            >
              <MaterialCommunityIcons
                name={g.icon as any}
                size={26}
                color="#fff"
              />
            </View>

            {/* Text */}
            <View style={{ flex: 1, marginLeft: 16 }}>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 17,
                  fontWeight: "800",
                  letterSpacing: 0.4,
                }}
              >
                {themeName}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 4,
                  gap: 6,
                }}
              >
                <View
                  style={{
                    backgroundColor: "rgba(255,255,255,0.2)",
                    paddingHorizontal: 8,
                    paddingVertical: 2,
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "rgba(255,255,255,0.9)",
                      fontSize: 11,
                      fontWeight: "700",
                    }}
                  >
                    {count} fanontaniana
                  </Text>
                </View>
              </View>
            </View>

            {/* Arrow */}
            <View
              style={{
                width: 34,
                height: 34,
                borderRadius: 17,
                backgroundColor: "rgba(255,255,255,0.18)",
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.25)",
              }}
            >
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color="rgba(255,255,255,0.9)"
              />
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

// ── Main Screen ──────────────────────────────────────────────────────────────
const ThemeSelectionScreen: React.FC<Props> = ({ navigation }) => {
  const [themes, setThemes] = useState<string[]>([]);
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerAnim = useRef(new Animated.Value(0)).current;
  const randomBtnAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const uniqueThemes = Array.from(
      new Set(questionsData.map((q: any) => q.theme)),
    );
    setThemes(uniqueThemes);

    Animated.spring(headerAnim, {
      toValue: 1,
      friction: 7,
      tension: 60,
      useNativeDriver: true,
    }).start();

    Animated.spring(randomBtnAnim, {
      toValue: 1,
      delay: 200,
      friction: 6,
      tension: 70,
      useNativeDriver: true,
    }).start();
  }, []);

  const headerTranslateY = headerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-20, 0],
  });

  const btnScale = randomBtnAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.85, 1],
  });
  const btnOpacity = randomBtnAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const gems_config: GemProps[] = [
    { x: width * 0.04, size: 14, delay: 0, duration: 7000, opacity: 0.65 },
    { x: width * 0.2, size: 10, delay: 1500, duration: 6200, opacity: 0.5 },
    { x: width * 0.38, size: 18, delay: 700, duration: 8500, opacity: 0.7 },
    { x: width * 0.55, size: 11, delay: 2800, duration: 7400, opacity: 0.55 },
    { x: width * 0.7, size: 16, delay: 900, duration: 9000, opacity: 0.65 },
    { x: width * 0.88, size: 12, delay: 3500, duration: 7800, opacity: 0.6 },
  ];

  // Parallax for header
  const headerParallax = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [0, -30],
    extrapolate: "clamp",
  });

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" />

      {/* ── Background ── */}
      <LinearGradient
        colors={["#0D0B15", "#0A1A12", "#080B10"]}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Glow orbs */}
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: -100,
          left: -60,
          width: 300,
          height: 300,
          borderRadius: 150,
          backgroundColor: "rgba(0, 180, 148, 0.1)",
        }}
      />
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          bottom: height * 0.2,
          right: -80,
          width: 240,
          height: 240,
          borderRadius: 120,
          backgroundColor: "rgba(249, 168, 37, 0.06)",
        }}
      />

      {/* ── Floating Gems ── */}
      {gems_config.map((g, i) => (
        <FloatingGem key={i} {...g} />
      ))}

      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        {/* ── Header ── */}
        <Animated.View
          style={{
            paddingHorizontal: 20,
            paddingTop: 10,
            paddingBottom: 24,
            opacity: headerAnim,
            transform: [{ translateY: headerTranslateY }],
            zIndex: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
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
                marginRight: 14,
              }}
            >
              <MaterialCommunityIcons
                name="chevron-left"
                size={26}
                color="#fff"
              />
            </TouchableOpacity>

            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: "rgba(0, 229, 204, 0.7)",
                  fontSize: 11,
                  fontWeight: "700",
                  letterSpacing: 2.5,
                  textTransform: "uppercase",
                  marginBottom: 2,
                }}
              >
                Misafidy lohahevitra
              </Text>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 24,
                  fontWeight: "900",
                  letterSpacing: 0.5,
                }}
              >
                Inona no hianarantsika?
              </Text>
            </View>
          </View>

          {/* Decorative divider */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: "rgba(0,229,204,0.15)",
              }}
            />
            <MaterialCommunityIcons
              name="star-four-points"
              size={8}
              color="rgba(0,229,204,0.4)"
            />
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: "rgba(0,229,204,0.15)",
              }}
            />
          </View>
        </Animated.View>

        <Animated.ScrollView
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 50 }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false },
          )}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          {/* ── Random Play Button ── */}
          <Animated.View
            style={{
              marginBottom: 32,
              opacity: btnOpacity,
              transform: [{ scale: btnScale }],
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
                backgroundColor: "#00897B",
                opacity: 0.45,
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
                backgroundColor: "#00B894",
                opacity: 0.3,
              }}
            />

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() =>
                navigation.navigate("SoloQuiz", { theme: "General" })
              }
              style={{
                borderRadius: 22,
                overflow: "hidden",
                borderWidth: 1.5,
                borderColor: "rgba(255,255,255,0.2)",
                elevation: 12,
                shadowColor: "#00B894",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.5,
                shadowRadius: 16,
              }}
            >
              <LinearGradient
                colors={["#00E5CC", "#00B894", "#00897B"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: 20,
                  paddingHorizontal: 24,
                  gap: 14,
                }}
              >
                {/* Gloss */}
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
                <View
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 14,
                    backgroundColor: "rgba(255,255,255,0.22)",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: "rgba(255,255,255,0.3)",
                  }}
                >
                  <MaterialCommunityIcons
                    name="shuffle-variant"
                    size={24}
                    color="#fff"
                  />
                </View>
                <View>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 18,
                      fontWeight: "900",
                      letterSpacing: 1,
                    }}
                  >
                    Kisendrasendra
                  </Text>
                  <Text
                    style={{
                      color: "rgba(255,255,255,0.75)",
                      fontSize: 11,
                      fontWeight: "600",
                      marginTop: 1,
                    }}
                  >
                    Fanontaniana an-tsaina
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

          {/* ── Section Title ── */}
          <Animated.View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
              gap: 10,
              opacity: headerAnim,
            }}
          >
            <View
              style={{
                width: 4,
                height: 20,
                borderRadius: 2,
                backgroundColor: COLORS.emerald,
              }}
            />
            <Text
              style={{
                color: "rgba(0, 229, 204, 0.7)",
                fontSize: 12,
                fontWeight: "700",
                letterSpacing: 2,
                textTransform: "uppercase",
                opacity: 0.9,
              }}
            >
              Lohahevitra misy
            </Text>
            <View
              style={{
                marginLeft: 4,
                backgroundColor: "rgba(0,229,204,0.15)",
                paddingHorizontal: 10,
                paddingVertical: 3,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "rgba(0,229,204,0.25)",
              }}
            >
              <Text
                style={{
                  color: "rgba(0,229,204,0.8)",
                  fontSize: 12,
                  fontWeight: "700",
                }}
              >
                {themes.length}
              </Text>
            </View>
          </Animated.View>

          {/* ── Theme Cards ── */}
          {themes.map((themeName, index) => (
            <ThemeCard
              key={themeName}
              themeName={themeName}
              index={index}
              count={
                questionsData.filter((q: any) => q.theme === themeName).length
              }
              onPress={() =>
                navigation.navigate("SoloQuiz", { theme: themeName })
              }
            />
          ))}
        </Animated.ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ThemeSelectionScreen;
