import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Dimensions, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/types";
import { useUser } from "../../context/user";
import { useAppTheme } from "../../hooks/useAppTheme";
import { useAlert } from "../../context/AlertContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

import { createMultiplayerStyles } from "../multiplayer/multiplayer.styles";
import { GameModeCard } from "../../components/multiplayer/GameModeCard";
import FloatingGem from "../../components/home/FloatingGem";
import BackButton from "../../components/ui/BackButton";

const { width } = Dimensions.get("window");

type ImageQuizModeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ImageQuizMode"
>;

interface Props {
  navigation: ImageQuizModeScreenNavigationProp;
}

const ImageQuizModeScreen: React.FC<Props> = ({ navigation }) => {
  const { isLoggedIn } = useUser();
  const { colors, isLight } = useAppTheme();
  const { showAlert } = useAlert();
  const styles = createMultiplayerStyles(colors);

  const gemsConfig = [
    { x: width * 0.08, size: 14, delay: 0, duration: 7000, opacity: 0.5 },
    { x: width * 0.85, size: 18, delay: 1500, duration: 8500, opacity: 0.6 },
    { x: width * 0.45, size: 22, delay: 3000, duration: 10000, opacity: 0.45 },
  ];

  const handleOnlineMode = (navFn: () => void) => {
    if (!isLoggedIn) {
      showAlert({
        title: "Mila Kaonty",
        message: "Mila misoratra anarana ianao raha te hilalao amin'ny namana an-tserasera.",
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

      {gemsConfig.map((gem, index) => (
        <FloatingGem key={index} {...gem} isLight={isLight} />
      ))}

      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <View style={styles.header}>
          <BackButton colors={colors} onPress={() => navigation.goBack()} />
          <Text style={styles.headerTitle}>Lalao Sary</Text>
        </View>

        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.lobbyContent}
        >
          <Text style={styles.sectionTitle}>Misafidy ny fomba filalao</Text>

          <GameModeCard
            title="Sary Solo (Irery)"
            description="Maminany sary irery ianao mba hahazoana vatosoa."
            icon="account-outline"
            iconColor={colors.primary}
            gradientColors={[colors.primarySoft, colors.primarySoft]}
            onPress={() => navigation.navigate("ImageQuiz")}
            styles={styles}
            colors={colors}
          />

          <GameModeCard
            title="Sary Duo (Local)"
            description="Hifaninana amin'ny sary amin'ny finday iray ihany (Split Screen)."
            icon="sword-cross"
            iconColor={colors.secondary}
            gradientColors={[colors.secondarySoft, colors.secondarySoft]}
            onPress={() => navigation.navigate("DuoSetup", { quizType: "image" })}
            styles={styles}
            colors={colors}
          />

          <GameModeCard
            title="Sary Duo (Online)"
            description="Hifaninana an-tserasera amin'ny sary amin'ny namana."
            icon="earth"
            iconColor={colors.primary}
            gradientColors={[colors.primarySoft, colors.primarySoft]}
            onPress={() => handleOnlineMode(() => navigation.navigate("FriendSelection", { gameType: "duo", quizType: "image" }))}
            isLocked={!isLoggedIn}
            styles={styles}
            colors={colors}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ImageQuizModeScreen;
