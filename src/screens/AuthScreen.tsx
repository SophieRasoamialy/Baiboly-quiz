import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "../context/UserContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation";
import { COLORS } from "./HomeScreenStyles";

const { width } = Dimensions.get("window");

type AuthScreenNavigationProp = StackNavigationProp<RootStackParamList, "Auth">;
interface Props {
  navigation: AuthScreenNavigationProp;
}

const AVATARS = [
  { id: "elder", img: require("../../assets/avatars/elder.png") },
  { id: "woman", img: require("../../assets/avatars/woman.png") },
  { id: "boy", img: require("../../assets/avatars/boy.png") },
  { id: "girl", img: require("../../assets/avatars/girl.png") },
  { id: "kid", img: require("../../assets/avatars/kid.png") },
  { id: "pastor", img: require("../../assets/avatars/pastor.png") },
];

const AuthScreen: React.FC<Props> = ({ navigation }) => {
  const { login, setAvatar } = useUser();
  const [name, setName] = useState("");
  const [church, setChurch] = useState("");
  const [city, setCity] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0].id);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleStart = () => {
    if (name.trim().length < 3 || !church.trim() || !city.trim()) return;
    setAvatar(selectedAvatar);
    login(name.trim(), church.trim(), city.trim());
    navigation.replace("Home");
  };

  const isFormValid =
    name.trim().length >= 3 &&
    church.trim().length > 0 &&
    city.trim().length > 0;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#0D0B15", "#0A1A12", "#080B10"]}
        style={StyleSheet.absoluteFillObject}
      />

      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Animated.View
              style={[
                styles.header,
                { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
              ]}
            >
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name="account-plus-outline"
                  size={50}
                  color={COLORS.emerald}
                />
              </View>
              <Text style={styles.title}>Hanorona Kaonty</Text>
              <Text style={styles.subtitle}>
                Fenoy ireto manaraka ireto mba hahafahanao milalao miaraka
                amin'ny namana.
              </Text>
            </Animated.View>

            <Animated.View
              style={[
                styles.form,
                { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
              ]}
            >
              {/* Username Input */}
              <Text style={styles.label}>Solon'anarana</Text>
              <View style={styles.inputWrapper}>
                <MaterialCommunityIcons
                  name="at"
                  size={20}
                  color="rgba(255,255,255,0.4)"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Ohatra: Mpitory"
                  placeholderTextColor="rgba(255,255,255,0.3)"
                  value={name}
                  onChangeText={setName}
                  maxLength={15}
                  autoCorrect={false}
                />
              </View>

              {/* Church Input */}
              <Text style={styles.label}>Fiangonana</Text>
              <View style={styles.inputWrapper}>
                <MaterialCommunityIcons
                  name="church-outline"
                  size={20}
                  color="rgba(255,255,255,0.4)"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Ny anaran'ny fiangonanao"
                  placeholderTextColor="rgba(255,255,255,0.3)"
                  value={church}
                  onChangeText={setChurch}
                  maxLength={30}
                  autoCorrect={false}
                />
              </View>

              {/* City Input */}
              <Text style={styles.label}>Tanàna</Text>
              <View style={styles.inputWrapper}>
                <MaterialCommunityIcons
                  name="city-variant-outline"
                  size={20}
                  color="rgba(255,255,255,0.4)"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Ny tanàna misy anao"
                  placeholderTextColor="rgba(255,255,255,0.3)"
                  value={city}
                  onChangeText={setCity}
                  maxLength={25}
                  autoCorrect={false}
                />
              </View>

              {/* Avatar Selection */}
              <Text style={styles.label}>Misafidiana Sary</Text>
              <View style={styles.avatarGrid}>
                {AVATARS.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => setSelectedAvatar(item.id)}
                    style={[
                      styles.avatarOption,
                      selectedAvatar === item.id && styles.selectedAvatar,
                    ]}
                  >
                    <Image source={item.img} style={styles.avatarImage} />
                    {selectedAvatar === item.id && (
                      <View style={styles.checkIcon}>
                        <MaterialCommunityIcons
                          name="check-circle"
                          size={20}
                          color={COLORS.emerald}
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                onPress={handleStart}
                disabled={!isFormValid}
                style={[styles.button, !isFormValid && styles.buttonDisabled]}
              >
                <LinearGradient
                  colors={
                    !isFormValid
                      ? ["rgba(255,255,255,0.1)", "rgba(255,255,255,0.1)"]
                      : [COLORS.emerald, COLORS.emeraldDeep]
                  }
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.buttonGradient}
                >
                  <Text style={styles.buttonText}>Hanomboka</Text>
                  <MaterialCommunityIcons
                    name="arrow-right"
                    size={20}
                    color="#fff"
                  />
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 30,
    paddingTop: 30,
    paddingBottom: 60,
  },
  header: {
    alignItems: "center",
    marginBottom: 25,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: "rgba(0,229,204,0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0,229,204,0.3)",
    marginBottom: 12,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 6,
    textAlign: "center",
  },
  subtitle: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 18,
    paddingHorizontal: 10,
  },
  form: {
    width: "100%",
  },
  label: {
    color: COLORS.emerald,
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginBottom: 10,
    marginTop: 5,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  avatarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "center",
    marginBottom: 30,
    marginTop: 5,
  },
  avatarOption: {
    width: (width - 60 - 20) / 3,
    height: (width - 60 - 20) / 3,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.05)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.1)",
    overflow: "hidden",
  },
  selectedAvatar: {
    backgroundColor: "rgba(0,229,204,0.1)",
    borderColor: COLORS.emerald,
  },
  avatarImage: {
    width: "90%",
    height: "90%",
    resizeMode: "contain",
  },
  checkIcon: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 10,
  },
  button: {
    width: "100%",
    height: 60,
    borderRadius: 20,
    overflow: "hidden",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonGradient: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },
});

export default AuthScreen;
