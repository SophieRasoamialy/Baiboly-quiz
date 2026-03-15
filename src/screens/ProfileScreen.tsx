import React, { useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  Alert,
  Animated,
  Easing,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "../context/UserContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation";
import { StatusBar } from "expo-status-bar";

const { width, height } = Dimensions.get("window");

const AVATAR_MAP: { [key: string]: any } = {
  elder: require("../../assets/avatars/elder.png"),
  woman: require("../../assets/avatars/woman.png"),
  boy: require("../../assets/avatars/boy.png"),
  girl: require("../../assets/avatars/girl.png"),
  kid: require("../../assets/avatars/kid.png"),
  pastor: require("../../assets/avatars/pastor.png"),
};

const AVATARS = [
  { id: "elder", img: AVATAR_MAP.elder },
  { id: "woman", img: AVATAR_MAP.woman },
  { id: "boy", img: AVATAR_MAP.boy },
  { id: "girl", img: AVATAR_MAP.girl },
  { id: "kid", img: AVATAR_MAP.kid },
  { id: "pastor", img: AVATAR_MAP.pastor },
];

const ALL_MEDALS = [
  { id: "bronze", name: "Alimo", color: "#CD7F32", icon: "medal" },
  { id: "silver", name: "Volafotsy", color: "#C0C0C0", icon: "medal" },
  { id: "gold", name: "Volamena", color: "#FFD700", icon: "medal" },
  { id: "platinum", name: "Platina", color: "#E5E4E2", icon: "crown" },
];

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
  const animOpacity = translateY.interpolate({
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
        opacity: animOpacity,
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

// ── Avatar Ring ───────────────────────────────────────────────────────────────
const AvatarRing = ({
  avatar,
  pulseAnim,
}: {
  avatar: string;
  pulseAnim: Animated.Value;
}) => {
  const ringScale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.06],
  });
  const ringOpacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 1],
  });

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      {/* Outer glow ring */}
      <Animated.View
        style={{
          position: "absolute",
          width: 116,
          height: 116,
          borderRadius: 58,
          borderWidth: 2,
          borderColor: "#00E5CC",
          opacity: ringOpacity,
          transform: [{ scale: ringScale }],
          shadowColor: "#00E5CC",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.8,
          shadowRadius: 16,
        }}
      />

      <LinearGradient
        colors={["#00E5CC", "#00897B", "#004D40"]}
        style={{ borderRadius: 54, padding: 3 }}
      >
        <View
          style={{
            backgroundColor: "#0D0B15",
            borderRadius: 51,
            overflow: "hidden",
            width: 100,
            height: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={
              avatar && AVATAR_MAP[avatar] ? AVATAR_MAP[avatar] : AVATAR_MAP.boy
            }
            style={{ width: "100%", height: "100%", resizeMode: "cover" }}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

// ── Stat Card ─────────────────────────────────────────────────────────────────
const StatCard = ({
  icon,
  iconColor,
  label,
  value,
  gradientColors,
  mountDelay,
}: any) => {
  const mountAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.spring(mountAnim, {
      toValue: 1,
      delay: mountDelay,
      friction: 7,
      tension: 70,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View
      style={{
        width: "48%",
        opacity: mountAnim,
        transform: [
          {
            scale: mountAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.8, 1],
            }),
          },
        ],
      }}
    >
      <View
        style={{
          position: "absolute",
          bottom: -5,
          left: 4,
          right: 4,
          height: "100%",
          borderRadius: 20,
          backgroundColor: gradientColors[1],
          opacity: 0.3,
        }}
      />
      <LinearGradient
        colors={["rgba(255,255,255,0.07)", "rgba(255,255,255,0.03)"]}
        style={{
          borderRadius: 20,
          padding: 18,
          borderWidth: 1.5,
          borderColor: "rgba(255,255,255,0.1)",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <LinearGradient
          colors={["rgba(255,255,255,0.1)", "rgba(255,255,255,0)"]}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "50%",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        />
        <View
          style={{
            width: 46,
            height: 46,
            borderRadius: 14,
            backgroundColor: `${gradientColors[0]}20`,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: `${gradientColors[0]}35`,
            marginBottom: 10,
          }}
        >
          <MaterialCommunityIcons name={icon} size={24} color={iconColor} />
        </View>
        <Text
          style={{
            color: "rgba(255,255,255,0.45)",
            fontSize: 11,
            fontWeight: "700",
            letterSpacing: 1.5,
            textTransform: "uppercase",
            marginBottom: 4,
          }}
        >
          {label}
        </Text>
        <Text style={{ color: "#fff", fontSize: 28, fontWeight: "900" }}>
          {value}
        </Text>
      </LinearGradient>
    </Animated.View>
  );
};

// ── Medal Card ────────────────────────────────────────────────────────────────
const MedalCard = ({ medal, hasMedal, index }: any) => {
  const mountAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.spring(mountAnim, {
      toValue: 1,
      delay: 400 + index * 80,
      friction: 7,
      tension: 70,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View
      style={{
        opacity: mountAnim,
        transform: [
          {
            scale: mountAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.7, 1],
            }),
          },
        ],
      }}
    >
      <View
        style={{
          width: 105,
          height: 130,
          marginRight: 14,
          borderRadius: 22,
          overflow: "hidden",
          borderWidth: 1.5,
          borderColor: hasMedal ? medal.color : "rgba(255,255,255,0.06)",
        }}
      >
        <LinearGradient
          colors={
            hasMedal
              ? [`${medal.color}22`, `${medal.color}08`]
              : ["rgba(255,255,255,0.04)", "rgba(255,255,255,0.01)"]
          }
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 16,
          }}
        >
          {hasMedal && (
            <LinearGradient
              colors={["rgba(255,255,255,0.12)", "rgba(255,255,255,0)"]}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "50%",
                borderTopLeftRadius: 22,
                borderTopRightRadius: 22,
              }}
            />
          )}
          <View
            style={{
              width: 52,
              height: 52,
              borderRadius: 16,
              backgroundColor: hasMedal
                ? `${medal.color}25`
                : "rgba(255,255,255,0.04)",
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderColor: hasMedal
                ? `${medal.color}50`
                : "rgba(255,255,255,0.06)",
              marginBottom: 8,
            }}
          >
            <MaterialCommunityIcons
              name={hasMedal ? medal.icon : "lock-outline"}
              size={28}
              color={hasMedal ? medal.color : "rgba(255,255,255,0.18)"}
            />
          </View>
          <Text
            style={{
              color: hasMedal ? "#fff" : "rgba(255,255,255,0.25)",
              fontWeight: "800",
              fontSize: 13,
              letterSpacing: 0.3,
            }}
          >
            {medal.name}
          </Text>
          {hasMedal && (
            <View
              style={{
                marginTop: 6,
                backgroundColor: `${medal.color}30`,
                paddingHorizontal: 8,
                paddingVertical: 2,
                borderRadius: 8,
              }}
            >
              <Text
                style={{
                  color: medal.color,
                  fontSize: 9,
                  fontWeight: "900",
                  letterSpacing: 1,
                }}
              >
                AZONAO
              </Text>
            </View>
          )}
        </LinearGradient>
      </View>
    </Animated.View>
  );
};

// ── Main Screen ───────────────────────────────────────────────────────────────
const ProfileScreen = () => {
  const {
    gems,
    medals,
    avatar,
    setAvatar,
    isLoggedIn,
    username,
    churchName,
    city,
    logout,
  } = useUser();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const headerAnim = useRef(new Animated.Value(0)).current;
  const avatarPulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(headerAnim, {
      toValue: 1,
      friction: 7,
      tension: 60,
      useNativeDriver: true,
    }).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(avatarPulse, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(avatarPulse, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const gemsConfig = [
    { x: width * 0.04, size: 12, delay: 0, duration: 8000, opacity: 0.45 },
    { x: width * 0.25, size: 9, delay: 2000, duration: 7000, opacity: 0.35 },
    { x: width * 0.55, size: 14, delay: 1000, duration: 9000, opacity: 0.5 },
    { x: width * 0.8, size: 10, delay: 3000, duration: 7500, opacity: 0.4 },
  ];

  const headerTY = headerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-20, 0],
  });

  return (
    <View style={{ flex: 1, backgroundColor: "#0D0B15" }}>
      <StatusBar style="light" />

      <LinearGradient
        colors={["#0D0B15", "#0A1A12", "#080B10"]}
        style={StyleSheet.absoluteFill}
      />

      {/* Glow orbs */}
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: -80,
          left: -60,
          width: 280,
          height: 280,
          borderRadius: 140,
          backgroundColor: "rgba(0,229,204,0.09)",
        }}
      />
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          bottom: height * 0.2,
          right: -80,
          width: 220,
          height: 220,
          borderRadius: 110,
          backgroundColor: "rgba(249,168,37,0.05)",
        }}
      />

      {/* Floating gems */}
      {gemsConfig.map((g, i) => (
        <FloatingGem key={i} {...g} />
      ))}

      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 60 }}
        >
          {/* ── HEADER ── */}
          <Animated.View
            style={{
              paddingHorizontal: 20,
              paddingTop: 12,
              paddingBottom: 8,
              opacity: headerAnim,
              transform: [{ translateY: headerTY }],
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 28,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 14,
                  backgroundColor: "rgba(255,255,255,0.08)",
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: "rgba(255,255,255,0.12)",
                  marginRight: 14,
                }}
              >
                <MaterialCommunityIcons
                  name="arrow-left"
                  size={22}
                  color="#fff"
                />
              </TouchableOpacity>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    color: "rgba(0,229,204,0.65)",
                    fontSize: 11,
                    fontWeight: "700",
                    letterSpacing: 2.5,
                    textTransform: "uppercase",
                    marginBottom: 2,
                  }}
                >
                  Mpiara-milalao
                </Text>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 24,
                    fontWeight: "900",
                    letterSpacing: 0.5,
                  }}
                >
                  Profiliko
                </Text>
              </View>
            </View>

            {/* Divider */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                marginBottom: 28,
              }}
            >
              <View
                style={{
                  flex: 1,
                  height: 1,
                  backgroundColor: "rgba(0,229,204,0.12)",
                }}
              />
              <MaterialCommunityIcons
                name="star-four-points"
                size={8}
                color="rgba(0,229,204,0.35)"
              />
              <View
                style={{
                  flex: 1,
                  height: 1,
                  backgroundColor: "rgba(0,229,204,0.12)",
                }}
              />
            </View>
          </Animated.View>

          {/* ── AVATAR + USER INFO ── */}
          <Animated.View
            style={{
              alignItems: "center",
              paddingHorizontal: 24,
              opacity: headerAnim,
            }}
          >
            <AvatarRing avatar={avatar ?? "boy"} pulseAnim={avatarPulse} />

            {isLoggedIn ? (
              <View style={{ alignItems: "center", marginTop: 16 }}>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 24,
                    fontWeight: "900",
                    letterSpacing: 0.5,
                    marginBottom: 8,
                  }}
                >
                  {username}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: 8,
                  }}
                >
                  {churchName && (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: "rgba(0,229,204,0.1)",
                        paddingHorizontal: 12,
                        paddingVertical: 5,
                        borderRadius: 14,
                        gap: 5,
                        borderWidth: 1,
                        borderColor: "rgba(0,229,204,0.2)",
                      }}
                    >
                      <MaterialCommunityIcons
                        name="church"
                        size={13}
                        color="rgba(0,229,204,0.8)"
                      />
                      <Text
                        style={{
                          color: "rgba(255,255,255,0.7)",
                          fontSize: 12,
                          fontWeight: "600",
                        }}
                      >
                        {churchName}
                      </Text>
                    </View>
                  )}
                  {city && (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: "rgba(0,229,204,0.1)",
                        paddingHorizontal: 12,
                        paddingVertical: 5,
                        borderRadius: 14,
                        gap: 5,
                        borderWidth: 1,
                        borderColor: "rgba(0,229,204,0.2)",
                      }}
                    >
                      <MaterialCommunityIcons
                        name="map-marker"
                        size={13}
                        color="rgba(0,229,204,0.8)"
                      />
                      <Text
                        style={{
                          color: "rgba(255,255,255,0.7)",
                          fontSize: 12,
                          fontWeight: "600",
                        }}
                      >
                        {city}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            ) : (
              /* ── GUEST BANNER ── */
              <View style={{ width: "100%", marginTop: 24 }}>
                {/* Promo */}
                <View
                  style={{
                    borderRadius: 20,
                    overflow: "hidden",
                    marginBottom: 20,
                    elevation: 8,
                    shadowColor: "#F9A825",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.35,
                    shadowRadius: 12,
                  }}
                >
                  <LinearGradient
                    colors={["#FFB300", "#F9A825", "#FF8F00"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      padding: 18,
                      gap: 14,
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
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                      }}
                    />
                    <View
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 14,
                        backgroundColor: "rgba(0,0,0,0.15)",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <MaterialCommunityIcons
                        name="gift"
                        size={24}
                        color="#0D0B15"
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          color: "#0D0B15",
                          fontSize: 13,
                          fontWeight: "900",
                          letterSpacing: 0.3,
                        }}
                      >
                        Vato soa 50 maimaim-poana!
                      </Text>
                      <Text
                        style={{
                          color: "rgba(0,0,0,0.6)",
                          fontSize: 11,
                          fontWeight: "600",
                          marginTop: 2,
                        }}
                      >
                        Mamorona kaonty hahazoana
                      </Text>
                    </View>
                  </LinearGradient>
                </View>

                <Text
                  style={{
                    color: "#fff",
                    fontSize: 20,
                    fontWeight: "800",
                    textAlign: "center",
                    marginBottom: 6,
                  }}
                >
                  Tsy mbola manana kaonty
                </Text>
                <Text
                  style={{
                    color: "rgba(255,255,255,0.45)",
                    fontSize: 13,
                    textAlign: "center",
                    lineHeight: 20,
                    marginBottom: 24,
                    paddingHorizontal: 8,
                  }}
                >
                  Mamorona kaonty mba hahafahanao milalao miaraka amin'ny
                  namanao sady mahazoa vatosoa kadoa
                </Text>

                {/* CTA button */}
                <View style={{ position: "relative" }}>
                  <View
                    style={{
                      position: "absolute",
                      bottom: -6,
                      left: 5,
                      right: 5,
                      height: "100%",
                      borderRadius: 20,
                      backgroundColor: "#00695C",
                      opacity: 0.4,
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Auth")}
                    style={{
                      borderRadius: 20,
                      overflow: "hidden",
                      borderWidth: 1.5,
                      borderColor: "rgba(255,255,255,0.2)",
                      elevation: 10,
                      shadowColor: "#00E5CC",
                      shadowOffset: { width: 0, height: 6 },
                      shadowOpacity: 0.4,
                      shadowRadius: 14,
                    }}
                  >
                    <LinearGradient
                      colors={["#00E5CC", "#00B894", "#00695C"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        paddingVertical: 17,
                        gap: 12,
                      }}
                    >
                      <LinearGradient
                        colors={[
                          "rgba(255,255,255,0.22)",
                          "rgba(255,255,255,0)",
                        ]}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          height: "55%",
                          borderTopLeftRadius: 20,
                          borderTopRightRadius: 20,
                        }}
                      />
                      <MaterialCommunityIcons
                        name="login"
                        size={20}
                        color="#0D0B15"
                      />
                      <Text
                        style={{
                          color: "#0D0B15",
                          fontSize: 16,
                          fontWeight: "900",
                          letterSpacing: 0.5,
                        }}
                      >
                        Hamorona Kaonty
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Animated.View>

          {/* ── STATS ── */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 20,
              marginTop: 32,
              marginBottom: 32,
            }}
          >
            <StatCard
              icon="diamond-stone"
              iconColor="#00E5CC"
              label="Vato soa"
              value={gems}
              gradientColors={["#00E5CC", "#00897B"]}
              mountDelay={200}
            />
            <StatCard
              icon="medal"
              iconColor="#F9A825"
              label="Meday"
              value={medals.length}
              gradientColors={["#F9A825", "#E65100"]}
              mountDelay={300}
            />
          </View>

          {/* ── SECTION: MEDALS ── */}
          <View style={{ paddingHorizontal: 20, marginBottom: 28 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginBottom: 18,
              }}
            >
              <View
                style={{
                  width: 4,
                  height: 20,
                  borderRadius: 2,
                  backgroundColor: "#F9A825",
                }}
              />
              <Text
                style={{
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: "800",
                  letterSpacing: 0.5,
                }}
              >
                Meday misy
              </Text>
              <View
                style={{
                  backgroundColor: "rgba(249,168,37,0.12)",
                  paddingHorizontal: 10,
                  paddingVertical: 3,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "rgba(249,168,37,0.25)",
                }}
              >
                <Text
                  style={{
                    color: "rgba(249,168,37,0.85)",
                    fontSize: 11,
                    fontWeight: "800",
                  }}
                >
                  {medals.length}/{ALL_MEDALS.length}
                </Text>
              </View>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 8 }}
            >
              {ALL_MEDALS.map((m, i) => (
                <MedalCard
                  key={m.id}
                  medal={m}
                  hasMedal={medals.includes(m.id)}
                  index={i}
                />
              ))}
            </ScrollView>
          </View>

          {/* ── SECTION: AVATAR PICKER ── */}
          <View style={{ paddingHorizontal: 20, marginBottom: 28 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginBottom: 18,
              }}
            >
              <View
                style={{
                  width: 4,
                  height: 20,
                  borderRadius: 2,
                  backgroundColor: "#00E5CC",
                }}
              />
              <Text
                style={{
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: "800",
                  letterSpacing: 0.5,
                }}
              >
                Misafidiana Sary
              </Text>
              {!isLoggedIn && (
                <View
                  style={{
                    backgroundColor: "rgba(249,168,37,0.12)",
                    paddingHorizontal: 8,
                    paddingVertical: 3,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: "rgba(249,168,37,0.25)",
                  }}
                >
                  <Text
                    style={{
                      color: "rgba(249,168,37,0.85)",
                      fontSize: 10,
                      fontWeight: "800",
                    }}
                  >
                    🔒MILA MANANA KAONTY
                  </Text>
                </View>
              )}
            </View>

            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 14,
                justifyContent: "space-between",
              }}
            >
              {AVATARS.map((item, index) => {
                const isSelected = avatar === item.id;
                const mountAnim = new Animated.Value(0);
                return (
                  <AvatarOption
                    key={item.id}
                    item={item}
                    isSelected={isSelected}
                    index={index}
                    onPress={() => {
                      if (!isLoggedIn) {
                        Alert.alert(
                          "Mila Kaonty",
                          "Mamorona kaonty hahafahanao misafidy sary manokana ho anao.",
                        );
                      } else {
                        setAvatar(item.id);
                      }
                    }}
                  />
                );
              })}
            </View>
          </View>

          {/* ── LOGOUT ── */}
          {isLoggedIn && (
            <View style={{ paddingHorizontal: 20 }}>
              <View
                style={{
                  position: "absolute",
                  bottom: -4,
                  left: 25,
                  right: 25,
                  height: "100%",
                  borderRadius: 18,
                  backgroundColor: "#E53935",
                  opacity: 0.2,
                }}
              />
              <TouchableOpacity
                onPress={logout}
                activeOpacity={0.85}
                style={{
                  borderRadius: 18,
                  overflow: "hidden",
                  borderWidth: 1.5,
                  borderColor: "rgba(255,82,82,0.3)",
                  elevation: 4,
                  shadowColor: "#FF5252",
                  shadowOffset: { width: 0, height: 3 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                }}
              >
                <LinearGradient
                  colors={["rgba(255,82,82,0.14)", "rgba(229,57,53,0.08)"]}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingVertical: 16,
                    gap: 10,
                  }}
                >
                  <MaterialCommunityIcons
                    name="logout"
                    size={20}
                    color="#FF5252"
                  />
                  <Text
                    style={{
                      color: "#FF5252",
                      fontWeight: "800",
                      fontSize: 16,
                    }}
                  >
                    Hivoaka
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

// ── Avatar Option (extracted to use hooks properly) ───────────────────────────
const AvatarOption = ({ item, isSelected, index, onPress }: any) => {
  const mountAnim = useRef(new Animated.Value(0)).current;
  const pressAnim = useRef(new Animated.Value(0)).current;
  const size = (width - 40 - 28) / 3;

  useEffect(() => {
    Animated.spring(mountAnim, {
      toValue: 1,
      delay: 500 + index * 60,
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
    outputRange: [1, 0.93],
  });

  return (
    <Animated.View
      style={{
        width: size,
        height: size,
        opacity: mountAnim,
        transform: [
          {
            scale: mountAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.7, 1],
            }),
          },
          { scale },
        ],
      }}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={{
          flex: 1,
          borderRadius: 20,
          overflow: "hidden",
          borderWidth: 2,
          borderColor: isSelected ? "#00E5CC" : "rgba(255,255,255,0.1)",
          backgroundColor: isSelected
            ? "rgba(0,229,204,0.1)"
            : "rgba(255,255,255,0.04)",
          shadowColor: isSelected ? "#00E5CC" : "transparent",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.4,
          shadowRadius: 10,
          elevation: isSelected ? 8 : 2,
        }}
      >
        {isSelected && (
          <LinearGradient
            colors={["rgba(0,229,204,0.15)", "rgba(0,229,204,0)"]}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "50%",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          />
        )}
        <Image
          source={item.img}
          style={{
            width: "90%",
            height: "90%",
            resizeMode: "contain",
            alignSelf: "center",
            marginTop: "5%",
          }}
        />
        {isSelected && (
          <View
            style={{
              position: "absolute",
              top: 6,
              right: 6,
              backgroundColor: "rgba(0,0,0,0.55)",
              borderRadius: 12,
              padding: 1,
            }}
          >
            <MaterialCommunityIcons
              name="check-circle"
              size={20}
              color="#00E5CC"
            />
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default ProfileScreen;
