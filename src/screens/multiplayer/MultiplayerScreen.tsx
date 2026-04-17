import React, { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Animated, ScrollView, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation";
import { useUser } from "../../context/user";
import { useAppTheme } from "../../hooks/useAppTheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

import { createMultiplayerStyles } from "./multiplayer.styles";
import { MultiplayerGuestPrompt } from "../../components/multiplayer/MultiplayerGuestPrompt";
import { UserLobbyCard } from "../../components/multiplayer/UserLobbyCard";
import { GameModeCard } from "../../components/multiplayer/GameModeCard";
import FloatingGem from "../../components/home/FloatingGem";

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

  if (!isLoggedIn) {
    return <MultiplayerGuestPrompt onNavigateToAuth={() => navigation.navigate("Auth")} />;
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
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Lalao Maromaro</Text>
          <View style={{ width: 40 }} />
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
          />

          <Text style={styles.sectionTitle}>Lalao Afaka Atao</Text>

          <GameModeCard
            title="Duo Quiz"
            description="Milalao amin'ny namana amin'ny finday iray ihany (Split Screen)."
            icon="sword-cross"
            iconColor={colors.secondary}
            gradientColors={[colors.secondarySoft, colors.secondarySoft]}
            onPress={() => navigation.navigate("DuoQuiz")}
            styles={styles}
            colors={colors}
          />

          <GameModeCard
            title="Lalao Vetivety"
            description="Hifanandrina amin'ny mpilalao hafa kisendrasendra (Matchmaking)."
            icon="lightning-bolt"
            iconColor={colors.primary}
            gradientColors={[colors.primarySoft, colors.primarySoft]}
            onPress={() => navigation.navigate("Matchmaking", { mode: "random" } as any)}
            styles={styles}
            colors={colors}
          />

          <GameModeCard
            title="Mikaroka Namana"
            description="Asao ny namanao hilalao (Search by username)."
            icon="account-search-outline"
            iconColor="#40C4FF"
            gradientColors={["rgba(64,196,255,0.1)", "rgba(0,176,255,0.05)"]}
            onPress={() => navigation.navigate("FriendSearch")}
            styles={styles}
            colors={colors}
          />

          <GameModeCard
            title="Teny Telo (2 vs 2)"
            description="Milalao ekipa: Manazava teny amin'ny alalan'ny teny 3 monja."
            icon="account-group"
            iconColor="#AB47BC"
            gradientColors={["rgba(171,71,188,0.1)", "rgba(123,31,162,0.05)"]}
            onPress={() => navigation.navigate("TeamQuiz")}
            isNew={true}
            styles={styles}
            colors={colors}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default MultiplayerScreen;
