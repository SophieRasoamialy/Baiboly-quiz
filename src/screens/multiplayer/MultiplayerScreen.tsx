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

import i18n from "../../i18n";
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
  const { isLoggedIn, username, avatar, churchName, city, points } = useUser();
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
        title: i18n.t("account_required"),
        message: i18n.t("multiplayer_online_msg"),
        buttons: [
          { text: i18n.t("later"), style: "cancel" },
          { text: i18n.t("login"), onPress: () => navigation.navigate("Auth") },
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
          <Text style={styles.headerTitle}>{i18n.t("multiplayer_title")}</Text>
        </View>

        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.lobbyContent}
        >
          <UserLobbyCard
            username={username}
            avatar={avatar}
            points={points}
            churchName={churchName}
            city={city}
            styles={styles}
            colors={colors}
            isLoggedIn={isLoggedIn}
            onLoginPress={() => navigation.navigate("Auth")}
          />

          <Text style={styles.sectionTitle}>{i18n.t("available_games")}</Text>

          <GameModeCard
            title={i18n.t("duo_local_title")}
            description={i18n.t("duo_local_desc")}
            icon="sword-cross"
            iconColor={colors.secondary}
            gradientColors={[colors.secondarySoft, colors.secondarySoft]}
            onPress={() => navigation.navigate("DuoSetup")}
            styles={styles}
            colors={colors}
          />

          <GameModeCard
            title={i18n.t("duo_online_title")}
            description={i18n.t("duo_online_desc")}
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
