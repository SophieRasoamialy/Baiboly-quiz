import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing,
  Dimensions,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation";
import { useUser } from "../context/UserContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { COLORS, styles } from "./HomeScreenStyles";
import { Image } from "react-native";

const AVATAR_MAP: { [key: string]: any } = {
  elder: require("../../assets/avatars/elder.png"),
  woman: require("../../assets/avatars/woman.png"),
  boy: require("../../assets/avatars/boy.png"),
  girl: require("../../assets/avatars/girl.png"),
  kid: require("../../assets/avatars/kid.png"),
  pastor: require("../../assets/avatars/pastor.png"),
};

const { width, height } = Dimensions.get("window");

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;
interface Props {
  navigation: HomeScreenNavigationProp;
}

// ── Floating Emerald Gem ────────────────────────────────────────────────────
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

// ── 3D Card Component ────────────────────────────────────────────────────────
interface CardItem {
  title: string;
  subtitle: string;
  icon: string;
  colors: string[];
  shadowColor: string;
  onPress: () => void;
}

const Card3D: React.FC<{ item: CardItem; index: number }> = ({
  item,
  index,
}) => {
  const pressAnim = useRef(new Animated.Value(0)).current;
  const mountAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(mountAnim, {
      toValue: 1,
      delay: index * 120,
      friction: 6,
      tension: 80,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(pressAnim, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(pressAnim, {
      toValue: 0,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  const scale = pressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.93],
  });
  const shadowOpacity = pressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 0.1],
  });
  const translateY = pressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 6],
  });

  const mountScale = mountAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 1],
  });
  const mountOpacity = mountAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const cardWidth = (width - 40 - 20) / 2; // paddingHorizontal*2=40, gap=20

  return (
    <Animated.View
      style={{
        width: cardWidth,
        height: 190,
        transform: [{ scale: mountScale }, { scale }, { translateY }],
        opacity: mountOpacity,
      }}
    >
      {/* 3D bottom shadow layer */}
      <Animated.View
        style={{
          position: "absolute",
          bottom: -8,
          left: 6,
          right: 6,
          height: "100%",
          borderRadius: 28,
          backgroundColor: item.shadowColor,
          opacity: shadowOpacity,
          transform: [{ scaleY: 0.96 }],
        }}
      />

      {/* 3D side layer */}
      <View
        style={{
          position: "absolute",
          bottom: -5,
          left: 4,
          right: 4,
          height: "100%",
          borderRadius: 28,
          backgroundColor: item.shadowColor,
          opacity: 0.4,
        }}
      />

      {/* Main card */}
      <TouchableOpacity
        activeOpacity={1}
        onPress={item.onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={{
          flex: 1,
          borderRadius: 28,
          overflow: "hidden",
          borderWidth: 1.5,
          borderColor: "rgba(255,255,255,0.2)",
          elevation: 12,
          shadowColor: item.shadowColor,
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.6,
          shadowRadius: 16,
        }}
      >
        <LinearGradient
          colors={item.colors as any}
          style={{ flex: 1, padding: 20, justifyContent: "space-between" }}
          start={{ x: 0.1, y: 0 }}
          end={{ x: 0.9, y: 1 }}
        >
          {/* Top gloss */}
          <LinearGradient
            colors={["rgba(255,255,255,0.25)", "rgba(255,255,255,0)"]}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "55%",
              borderTopLeftRadius: 28,
              borderTopRightRadius: 28,
            }}
          />

          {/* Edge highlight */}
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 2,
              height: "70%",
              borderTopLeftRadius: 28,
              backgroundColor: "rgba(255,255,255,0.4)",
            }}
          />

          <View
            style={{
              alignSelf: "flex-start",
              backgroundColor: "rgba(255,255,255,0.25)",
              padding: 10,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.3)",
              shadowColor: "#fff",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.4,
              shadowRadius: 6,
            }}
          >
            <MaterialCommunityIcons
              name={item.icon as any}
              size={26}
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
              {item.title}
            </Text>
            <Text
              style={{
                color: "rgba(255,255,255,0.75)",
                fontSize: 11,
                fontWeight: "600",
                marginTop: 2,
              }}
            >
              {item.subtitle}
            </Text>
          </View>

          {/* BG watermark icon */}
          <MaterialCommunityIcons
            name={item.icon as any}
            size={100}
            color="rgba(255,255,255,0.08)"
            style={{ position: "absolute", bottom: -20, right: -20 }}
          />
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

// ── Main Screen ──────────────────────────────────────────────────────────────
const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const {
    gems,
    hearts,
    theme,
    buyHeartWithGems,
    nextRefillIn,
    avatar,
    isLoggedIn,
  } = useUser();
  const isLight = theme === "light";

  const headerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(headerAnim, {
      toValue: 1,
      friction: 7,
      tension: 60,
      useNativeDriver: true,
    }).start();
  }, []);

  // Gem particles config
  const gems_config: GemProps[] = [
    { x: width * 0.05, size: 18, delay: 0, duration: 7000, opacity: 0.75 },
    { x: width * 0.18, size: 13, delay: 1200, duration: 6000, opacity: 0.65 },
    { x: width * 0.32, size: 22, delay: 600, duration: 8500, opacity: 0.8 },
    { x: width * 0.47, size: 15, delay: 2500, duration: 7200, opacity: 0.6 },
    { x: width * 0.58, size: 20, delay: 800, duration: 9000, opacity: 0.75 },
    { x: width * 0.71, size: 11, delay: 3200, duration: 6500, opacity: 0.55 },
    { x: width * 0.83, size: 17, delay: 1800, duration: 7800, opacity: 0.7 },
    { x: width * 0.92, size: 14, delay: 4000, duration: 8000, opacity: 0.65 },
  ];

  const menuItems: CardItem[] = [
    {
      title: "SOLO",
      subtitle: "Study the Bible",
      icon: "book-open-variant",
      colors: ["#FFB300", "#FF6D00", "#BF360C"],
      shadowColor: "#FF6D00",
      onPress: () => navigation.navigate("ThemeSelection"),
    },
    {
      title: "DUO",
      subtitle: "Challenge a friend",
      icon: "account-group",
      colors: ["#00E5CC", "#00B894", "#00695C"],
      shadowColor: "#00B894",
      onPress: () => navigation.navigate("Multiplayer"),
    },
    {
      title: "BIBLE",
      subtitle: "Vakio ny Baiboly",
      icon: "book-open-variant",
      colors: ["#66BB6A", "#43A047", "#1B5E20"],
      shadowColor: "#43A047",
      onPress: () => navigation.navigate("Bible"),
    },
    {
      title: "VERS DU JOUR",
      subtitle: "Teny fampaherezana",
      icon: "script-text-outline",
      colors: ["#AB47BC", "#8E24AA", "#4A148C"],
      shadowColor: "#8E24AA",
      onPress: () => navigation.navigate("VerseOfDay"),
    },
    {
      title: "RANKING",
      subtitle: "Global standing",
      icon: "trophy",
      colors: ["#7986CB", "#3F51B5", "#1A237E"],
      shadowColor: "#3F51B5",
      onPress: () => navigation.navigate("Ranking"),
    },
    {
      title: "SETTING",
      subtitle: "Preferences",
      icon: "cog",
      colors: ["#90A4AE", "#546E7A", "#263238"],
      shadowColor: "#546E7A",
      onPress: () => navigation.navigate("Settings"),
    },
  ];

  const headerTranslateY = headerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-30, 0],
  });

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isLight ? COLORS.surfaceLight : "#08070A" },
      ]}
    >
      <StatusBar style="light" />

      {/* ── Background gradient ── */}
      <LinearGradient
        colors={["#0D0B15", "#0A1A12", "#0D0B15"]}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />

      {/* ── Radial glow top ── */}
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: -80,
          left: -80,
          width: 320,
          height: 320,
          borderRadius: 160,
          backgroundColor: "rgba(0, 180, 148, 0.12)",
        }}
      />
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: -40,
          right: -60,
          width: 250,
          height: 250,
          borderRadius: 125,
          backgroundColor: "rgba(249, 168, 37, 0.08)",
        }}
      />

      {/* ── Floating Emerald Gems ── */}
      {gems_config.map((g, i) => (
        <FloatingGem key={i} {...g} />
      ))}

      {/* ── Safe Area ── */}
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        {/* ── Header ── */}
        <Animated.View
          style={[
            styles.header,
            {
              opacity: headerAnim,
              transform: [{ translateY: headerTranslateY }],
            },
          ]}
        >
          <TouchableOpacity
            style={[
              styles.avatarBtn,
              {
                shadowColor: COLORS.goldLight,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.6,
                shadowRadius: 12,
              },
            ]}
            onPress={() => navigation.navigate("Profile")}
            activeOpacity={0.7}
          >
            {isLoggedIn && avatar ? (
              <Image
                source={AVATAR_MAP[avatar] || AVATAR_MAP.boy}
                style={{ width: "100%", height: "100%", borderRadius: 20 }}
              />
            ) : (
              <MaterialCommunityIcons
                name="account-circle"
                size={40}
                color={COLORS.white}
              />
            )}
          </TouchableOpacity>

          <View style={styles.userStats}>
            <View
              style={[
                styles.statPill,
                {
                  shadowColor: COLORS.goldLight,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.4,
                  shadowRadius: 8,
                  elevation: 4,
                },
              ]}
            >
              <MaterialCommunityIcons
                name="diamond-stone"
                size={14}
                color={COLORS.goldLight}
              />
              <Text style={styles.statText}>{gems}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                if (hearts < 5) {
                  Alert.alert(
                    "Mividy fo",
                    "Mila vatosoa 20 ianao mba hividianana fo. Te hanohy ve ianao?",
                    [
                      { text: "Tsia", style: "cancel" },
                      {
                        text: "Eny",
                        onPress: () => {
                          if (!buyHeartWithGems()) {
                            Alert.alert(
                              "Tsy ampy vatosoa",
                              "Mila vatosoa 20 ianao.",
                            );
                          }
                        },
                      },
                    ],
                  );
                }
              }}
              style={[
                styles.statPill,
                {
                  shadowColor: COLORS.coral,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.4,
                  shadowRadius: 8,
                  elevation: 4,
                },
              ]}
            >
              <MaterialCommunityIcons
                name="heart"
                size={14}
                color={COLORS.coral}
              />
              <Text style={styles.statText}>{hearts}</Text>
              {hearts < 5 && (
                <Text
                  style={{
                    fontSize: 8,
                    color: "rgba(255,255,255,0.6)",
                    marginLeft: 4,
                    fontWeight: "700",
                  }}
                >
                  {Math.floor(nextRefillIn / 60)}:
                  {(nextRefillIn % 60).toString().padStart(2, "0")}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </Animated.View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 50, paddingTop: 10 }}
        >
          {/* ── Welcome ── */}
          <Animated.View
            style={[
              styles.welcomeSection,
              {
                opacity: headerAnim,
                transform: [{ translateY: headerTranslateY }],
              },
            ]}
          >
            <Text
              style={[
                styles.welcomeBack,
                {
                  color: "rgba(0, 229, 204, 0.7)",
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  fontSize: 12,
                },
              ]}
            >
              Ho tsara ny andro!
            </Text>
            <View style={{ alignItems: "center", position: "relative" }}>
              <LinearGradient
                colors={["#FFD54F", "#F9A825", "#E65100"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 4,
                  borderRadius: 12,
                  marginBottom: 8,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 10,
                    fontWeight: "900",
                    letterSpacing: 2,
                    textTransform: "uppercase",
                  }}
                >
                  Ny tenin'Andriamanitra
                </Text>
              </LinearGradient>

              <Text
                style={[
                  styles.userName,
                  {
                    fontSize: 42,
                    letterSpacing: -1,
                    color: "#FFFFFF",
                    fontWeight: "900",
                    textShadowColor: "rgba(0, 229, 204, 0.5)",
                    textShadowOffset: { width: 0, height: 4 },
                    textShadowRadius: 15,
                  },
                ]}
              >
                Baiboly Quiz
              </Text>
            </View>

            {/* Decorative line */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20,
                width: "100%",
                paddingHorizontal: 40,
                gap: 12,
              }}
            >
              <LinearGradient
                colors={[
                  "transparent",
                  "rgba(0,229,204,0.4)",
                  "rgba(0,229,204,0.8)",
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ flex: 1, height: 2, borderRadius: 1 }}
              />
              <MaterialCommunityIcons
                name="star-four-points"
                size={16}
                color="#00E5CC"
                style={
                  {
                    textShadowColor: "#00E5CC",
                    textShadowOffset: { width: 0, height: 0 },
                    textShadowRadius: 10,
                  } as any
                }
              />
              <LinearGradient
                colors={[
                  "rgba(0,229,204,0.8)",
                  "rgba(0,229,204,0.4)",
                  "transparent",
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ flex: 1, height: 2, borderRadius: 1 }}
              />
            </View>
          </Animated.View>

          {/* ── Menu Grid ── */}
          <View
            style={{
              paddingHorizontal: 20,
              flexDirection: "row",
              flexWrap: "wrap",
              columnGap: 20,
              rowGap: 20,
            }}
          >
            {menuItems.map((item, index) => (
              <Card3D key={index} item={item} index={index} />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
