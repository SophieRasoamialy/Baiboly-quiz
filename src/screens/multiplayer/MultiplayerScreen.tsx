import React, { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Animated, ScrollView, Dimensions, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/types";
import { useUser } from "../../context/user";
import { useAppTheme } from "../../hooks/useAppTheme";
import { useAlert } from "../../context/AlertContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

import { createMultiplayerStyles } from "./multiplayer.styles";
import { MultiplayerGuestPrompt } from "../../components/multiplayer/MultiplayerGuestPrompt";
import { UserLobbyCard } from "../../components/multiplayer/UserLobbyCard";
import { GameModeCard } from "../../components/multiplayer/GameModeCard";
import FloatingGem from "../../components/home/FloatingGem";
import BackButton from "../../components/ui/BackButton";

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
  const { colors, isLight } = useAppTheme();
  const { showAlert } = useAlert();
  const styles = createMultiplayerStyles(colors);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [isLoggedIn]);

  const gemsConfig = [
    { x: width * 0.08, size: 14, delay: 0, duration: 7000, opacity: 0.5 },
    { x: width * 0.85, size: 18, delay: 1500, duration: 8500, opacity: 0.6 },
    { x: width * 0.45, size: 22, delay: 3000, duration: 10000, opacity: 0.45 },
  ];

  const handleOnlineMode = (navFn: () => void) => {
    if (!isLoggedIn) {
      showAlert({
        title: "Mila Kaonty",
        message: "Mila misoratra anarana ianao raha te hilalao amin'ny namana an-tserasera na hifaninana amin'ny mpilalao hafa.",
        buttons: [
          { text: "Aoka ihany", style: "cancel" },
          { text: "Hiditra", onPress: () => navigation.navigate("Auth") },
        ]
      });
      return;
    }
    navFn();
  };

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
          <Text style={styles.headerTitle}>Lalao Maromaro</Text>
        </View>

        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.lobbyContent}
        >
          <UserLobbyCard
            username={username}
            avatar={avatar}
            churchName={churchName}
            city={city}
            styles={styles}
            colors={colors}
            onLoginPress={() => navigation.navigate("Auth")}
          />

          <Text style={styles.sectionTitle}>Lalao Afaka Atao</Text>

          <GameModeCard
            title="Duo Quiz (Local)"
            description="Milalao amin'ny namana amin'ny finday iray ihany (Split Screen)."
            icon="sword-cross"
            iconColor={colors.secondary}
            gradientColors={[colors.secondarySoft, colors.secondarySoft]}
            onPress={() => navigation.navigate("DuoSetup")}
            styles={styles}
            colors={colors}
          />

          <GameModeCard
            title="Duo Quiz (Online)"
            description="Lalao an-tserasera (Matchmaking na fanasana namana)."
            icon="earth"
            iconColor={colors.primary}
            gradientColors={[colors.primarySoft, colors.primarySoft]}
            onPress={() => handleOnlineMode(() => navigation.navigate("FriendSelection", { gameType: "duo", quizType: "standard" }))}
            isLocked={!isLoggedIn}
            styles={styles}
            colors={colors}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default MultiplayerScreen;
