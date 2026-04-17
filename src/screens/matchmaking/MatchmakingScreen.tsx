import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useAppTheme } from "../../hooks/useAppTheme";
import { BOT_DATA } from "../../constants/bots";

import { createMatchmakingStyles } from "./matchmaking.styles";
import { RadarSearch } from "../../components/matchmaking/RadarSearch";
import { MatchFoundCard } from "../../components/matchmaking/MatchFoundCard";
import FloatingGem from "../../components/home/FloatingGem";

const { width } = Dimensions.get("window");

type MatchmakingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Matchmaking"
>;

interface Props {
  navigation: MatchmakingScreenNavigationProp;
  route: any;
}

const MatchmakingScreen: React.FC<Props> = ({ navigation, route }) => {
  const { mode, friendName } = route.params;
  const [status, setStatus] = useState("searching"); // searching, found
  const [opponent, setOpponent] = useState<any>(null);
  
  const { colors, isLight } = useAppTheme();
  const styles = createMatchmakingStyles(colors);

  useEffect(() => {
    const searchTime = mode === "invite" ? 4000 : 3000 + Math.random() * 3000;

    const timer = setTimeout(() => {
      let selectedOpponent;
      if (mode === "invite" && friendName) {
        selectedOpponent = {
          name: friendName,
          church: "Tsy fantatra",
          city: "Tsy fantatra",
          avatar: "david",
        };
      } else {
        selectedOpponent = BOT_DATA[Math.floor(Math.random() * BOT_DATA.length)];
      }

      setOpponent(selectedOpponent);
      setStatus("found");

      setTimeout(() => {
        navigation.replace("OnlineQuiz", { opponent: selectedOpponent });
      }, 3000);
    }, searchTime);

    return () => clearTimeout(timer);
  }, [mode, friendName, navigation]);

  const gemsConfig = [
    { x: width * 0.15, size: 16, delay: 0, duration: 8000, opacity: 0.5 },
    { x: width * 0.8, size: 12, delay: 2500, duration: 7000, opacity: 0.4 },
  ];

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

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.cancelBtn}
          >
            <MaterialCommunityIcons
              name="close"
              size={24}
              color={colors.textMuted}
            />
          </TouchableOpacity>

          <View style={styles.mainGroup}>
            {status === "searching" ? (
              <RadarSearch mode={mode} friendName={friendName} />
            ) : (
              <MatchFoundCard opponent={opponent} />
            )}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default MatchmakingScreen;
