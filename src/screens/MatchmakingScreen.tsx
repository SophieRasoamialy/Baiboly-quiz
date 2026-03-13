import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  Easing,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation";
import { useUser } from "../context/UserContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "./HomeScreenStyles";

const { width } = Dimensions.get("window");

type MatchmakingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Matchmaking"
>;
interface Props {
  navigation: MatchmakingScreenNavigationProp;
  route: any;
}

const BOT_DATA = [
  {
    name: "Rasoa",
    church: "FJKM Ambatonakanga",
    city: "Antananarivo",
    avatar: "woman",
  },
  { name: "Andry", church: "METM Itaosy", city: "Antananarivo", avatar: "boy" },
  {
    name: "Miora",
    church: "Ekar Faravohitra",
    city: "Antsirabe",
    avatar: "girl",
  },
  {
    name: "Tafita",
    church: "FLM Ambohibao",
    city: "Fianarantsoa",
    avatar: "kid",
  },
  {
    name: "Pastora Solofo",
    church: "Apokalipsy 67ha",
    city: "Toamasina",
    avatar: "pastor",
  },
];

const AVATAR_MAP: { [key: string]: any } = {
  elder: require("../../assets/avatars/elder.png"),
  woman: require("../../assets/avatars/woman.png"),
  boy: require("../../assets/avatars/boy.png"),
  girl: require("../../assets/avatars/girl.png"),
  kid: require("../../assets/avatars/kid.png"),
  pastor: require("../../assets/avatars/pastor.png"),
};

const MatchmakingScreen: React.FC<Props> = ({ navigation, route }) => {
  const { mode, friendName } = route.params;
  const [status, setStatus] = useState("searching"); // searching, found
  const [opponent, setOpponent] = useState<any>(null);

  const radarAnim = useRef(new Animated.Value(0)).current;
  const foundAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Radar rotation
    Animated.loop(
      Animated.timing(radarAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();

    // Simulated search time
    const searchTime = mode === "invite" ? 4000 : 3000 + Math.random() * 3000;

    const timer = setTimeout(() => {
      let selectedOpponent;
      if (mode === "invite" && friendName) {
        selectedOpponent = {
          name: friendName,
          church: "Tsy fantatra",
          city: "Tsy fantatra",
          avatar: "elder",
        };
      } else {
        selectedOpponent =
          BOT_DATA[Math.floor(Math.random() * BOT_DATA.length)];
      }

      setOpponent(selectedOpponent);
      setStatus("found");

      Animated.spring(foundAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }).start();

      // Auto start game after 3 seconds
      setTimeout(() => {
        navigation.replace("OnlineQuiz", { opponent: selectedOpponent });
      }, 3000);
    }, searchTime);

    return () => clearTimeout(timer);
  }, []);

  const spin = radarAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#0D0B15", "#0A121A", "#08070A"]}
        style={StyleSheet.absoluteFillObject}
      />

      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.content}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.cancelBtn}
          >
            <MaterialCommunityIcons
              name="close"
              size={24}
              color="rgba(255,255,255,0.5)"
            />
          </TouchableOpacity>

          <View style={styles.mainGroup}>
            {status === "searching" ? (
              <>
                <View style={styles.radarContainer}>
                  <Animated.View
                    style={[
                      styles.radarLine,
                      { transform: [{ rotate: spin }] },
                    ]}
                  />
                  <LinearGradient
                    colors={["rgba(0,229,204,0.2)", "transparent"]}
                    style={styles.radarPulse}
                  />
                  <View style={styles.centerAvatar}>
                    <MaterialCommunityIcons
                      name="radar"
                      size={40}
                      color={COLORS.emerald}
                    />
                  </View>
                </View>
                <Text style={styles.statusTitle}>
                  {mode === "invite"
                    ? `Miandry an'i ${friendName}...`
                    : "Mikaroka mpifanandrina..."}
                </Text>
                <Text style={styles.statusSub}>
                  Aza miala fa hadina segondra vitsy dia hisy mpifanandrina
                  hita.
                </Text>
              </>
            ) : (
              <Animated.View
                style={[
                  styles.matchCard,
                  { opacity: foundAnim, transform: [{ scale: foundAnim }] },
                ]}
              >
                <Text style={styles.foundText}>MPIFANANDRINA HITA!</Text>
                <View style={styles.opponentAvatarCircle}>
                  <Image
                    source={AVATAR_MAP[opponent.avatar]}
                    style={styles.avatarImg}
                  />
                </View>
                <Text style={styles.opponentName}>{opponent.name}</Text>
                <View style={styles.opponentDetails}>
                  <View style={styles.badge}>
                    <MaterialCommunityIcons
                      name="church"
                      size={14}
                      color={COLORS.gold}
                    />
                    <Text style={styles.badgeText}>{opponent.church}</Text>
                  </View>
                  <View style={styles.badge}>
                    <MaterialCommunityIcons
                      name="map-marker"
                      size={14}
                      color={COLORS.gold}
                    />
                    <Text style={styles.badgeText}>{opponent.city}</Text>
                  </View>
                </View>
                <LinearGradient
                  colors={[COLORS.emerald, COLORS.emeraldDeep]}
                  style={styles.startBadge}
                >
                  <Text style={styles.startText}>Hanomboka ny lalao...</Text>
                </LinearGradient>
              </Animated.View>
            )}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  cancelBtn: {
    alignSelf: "flex-end",
    padding: 10,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  mainGroup: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  radarContainer: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 1,
    borderColor: "rgba(0,229,204,0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  radarLine: {
    position: "absolute",
    width: 125,
    height: 2,
    backgroundColor: COLORS.emerald,
    left: 125,
    top: 124,
    transformOrigin: "left",
    opacity: 0.8,
  },
  radarPulse: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  centerAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(0,229,204,0.05)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0,229,204,0.2)",
  },
  statusTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 10,
    textAlign: "center",
  },
  statusSub: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 14,
    textAlign: "center",
    paddingHorizontal: 40,
    lineHeight: 20,
  },
  matchCard: {
    width: width * 0.85,
    padding: 30,
    borderRadius: 30,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
  },
  foundText: {
    color: COLORS.gold,
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 3,
    marginBottom: 20,
  },
  opponentAvatarCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: COLORS.gold,
    overflow: "hidden",
    marginBottom: 20,
    backgroundColor: "rgba(255,215,0,0.1)",
  },
  avatarImg: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  opponentName: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "900",
    marginBottom: 15,
  },
  opponentDetails: {
    width: "100%",
    gap: 10,
    marginBottom: 30,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,215,0,0.1)",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 10,
    alignSelf: "center",
  },
  badgeText: {
    color: "rgba(255,215,0,0.8)",
    fontSize: 13,
    fontWeight: "700",
  },
  startBadge: {
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 20,
  },
  startText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "800",
  },
});

export default MatchmakingScreen;
