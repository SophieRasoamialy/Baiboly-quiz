import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Animated,
  Easing,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "../context/UserContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation";
import { COLORS } from "./HomeScreenStyles";

const AVATAR_MAP: { [key: string]: any } = {
  elder: require("../../assets/avatars/elder.png"),
  woman: require("../../assets/avatars/woman.png"),
  boy: require("../../assets/avatars/boy.png"),
  girl: require("../../assets/avatars/girl.png"),
  kid: require("../../assets/avatars/kid.png"),
  pastor: require("../../assets/avatars/pastor.png"),
};

const { width } = Dimensions.get("window");

type MultiplayerScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Multiplayer"
>;
interface Props {
  navigation: MultiplayerScreenNavigationProp;
}

const MultiplayerScreen: React.FC<Props> = ({ navigation }) => {
  const { isLoggedIn, username, avatar, churchName, city } = useUser();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={["#0D0B15", "#0A121A"]}
          style={StyleSheet.absoluteFillObject}
        />
        <SafeAreaView style={styles.centerContent}>
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons
              name="account-group-outline"
              size={80}
              color={COLORS.emerald}
            />
          </View>
          <Text style={styles.title}>Fomba Maromaro</Text>
          <Text style={styles.description}>
            Mila mamorona kaonty ianao vao afaka milalao miaraka amin'ny namana.
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Auth")}
            style={styles.mainButton}
          >
            <LinearGradient
              colors={[COLORS.emerald, COLORS.emeraldDeep]}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>Hamorona Kaonty</Text>
            </LinearGradient>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#0D0B15", "#0A1A12"]}
        style={StyleSheet.absoluteFillObject}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Lalao Maromaro</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView contentContainerStyle={styles.lobbyContent}>
          <View style={styles.userCard}>
            <View style={styles.avatarCircle}>
              <Image
                source={avatar ? AVATAR_MAP[avatar] : AVATAR_MAP.boy}
                style={styles.avatarImage}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.welcomeText}>Tongasoa,</Text>
              <Text style={styles.usernameText}>{username}</Text>
              <View style={styles.badgeRow}>
                <View style={styles.infoBadge}>
                  <MaterialCommunityIcons
                    name="church"
                    size={12}
                    color={COLORS.emerald}
                  />
                  <Text style={styles.badgeText}>{churchName}</Text>
                </View>
                <View style={styles.infoBadge}>
                  <MaterialCommunityIcons
                    name="map-marker"
                    size={12}
                    color={COLORS.emerald}
                  />
                  <Text style={styles.badgeText}>{city}</Text>
                </View>
              </View>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Lalao Afaka Atao</Text>

          {/* Duo Quiz Card */}
          <TouchableOpacity
            style={styles.gameCard}
            onPress={() => navigation.navigate("DuoQuiz")}
          >
            <LinearGradient
              colors={["rgba(0,229,204,0.15)", "rgba(0,137,123,0.05)"]}
              style={styles.gameCardGradient}
            >
              <View style={styles.gameIconWrapper}>
                <MaterialCommunityIcons
                  name="sword-cross"
                  size={32}
                  color={COLORS.emerald}
                />
              </View>
              <View style={styles.gameInfo}>
                <Text style={styles.gameTitle}>Duo Quiz</Text>
                <Text style={styles.gameDesc}>
                  Milalao amin'ny namana amin'ny finday iray ihany (Split
                  Screen).
                </Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color="rgba(255,255,255,0.3)"
              />
            </LinearGradient>
          </TouchableOpacity>

          {/* Online Matchmaking Card */}
          <TouchableOpacity
            style={styles.gameCard}
            onPress={() =>
              navigation.navigate("Matchmaking", { mode: "random" })
            }
          >
            <LinearGradient
              colors={["rgba(255,215,0,0.15)", "rgba(255,165,0,0.05)"]}
              style={styles.gameCardGradient}
            >
              <View
                style={[
                  styles.gameIconWrapper,
                  { backgroundColor: "rgba(255,215,0,0.1)" },
                ]}
              >
                <MaterialCommunityIcons
                  name="lightning-bolt"
                  size={32}
                  color={COLORS.gold}
                />
              </View>
              <View style={styles.gameInfo}>
                <Text style={styles.gameTitle}>Lalao Vetivety</Text>
                <Text style={styles.gameDesc}>
                  Hifanandrina amin'ny mpilalao hafa kisendrasendra
                  (Matchmaking).
                </Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color="rgba(255,255,255,0.3)"
              />
            </LinearGradient>
          </TouchableOpacity>

          {/* Search Friend Card */}
          <TouchableOpacity
            style={styles.gameCard}
            onPress={() => navigation.navigate("FriendSearch")}
          >
            <LinearGradient
              colors={["rgba(64,196,255,0.15)", "rgba(0,176,255,0.05)"]}
              style={styles.gameCardGradient}
            >
              <View
                style={[
                  styles.gameIconWrapper,
                  { backgroundColor: "rgba(64,196,255,0.1)" },
                ]}
              >
                <MaterialCommunityIcons
                  name="account-search-outline"
                  size={32}
                  color="#40C4FF"
                />
              </View>
              <View style={styles.gameInfo}>
                <Text style={styles.gameTitle}>Mikaroka Namana</Text>
                <Text style={styles.gameDesc}>
                  Asao ny namanao hilalao (Search by username).
                </Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color="rgba(255,255,255,0.3)"
              />
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  iconCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(0,229,204,0.05)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0,229,204,0.2)",
    marginBottom: 30,
  },
  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "900",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 40,
  },
  mainButton: {
    width: "100%",
    height: 60,
    borderRadius: 20,
    overflow: "hidden",
  },
  buttonGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "900",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.05)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },
  lobbyContent: {
    padding: 20,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    marginBottom: 40,
    gap: 15,
  },
  avatarCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(0,229,204,0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.emerald,
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  badgeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 6,
  },
  infoBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,229,204,0.1)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  badgeText: {
    color: COLORS.emerald,
    fontSize: 10,
    fontWeight: "700",
  },
  welcomeText: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 14,
    fontWeight: "600",
  },
  usernameText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "900",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 20,
    marginLeft: 5,
  },
  gameCard: {
    borderRadius: 24,
    overflow: "hidden",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  gameCardGradient: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    gap: 15,
  },
  gameIconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: "rgba(0,229,204,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  gameInfo: {
    flex: 1,
  },
  gameTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 4,
  },
  gameDesc: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 12,
    lineHeight: 18,
  },
  betaTag: {
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  betaText: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 10,
    fontWeight: "900",
  },
});

export default MultiplayerScreen;
