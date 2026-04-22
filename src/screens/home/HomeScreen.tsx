import React from "react";
import { Animated, ScrollView, View, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { StackNavigationProp } from "@react-navigation/stack";

import { RootStackParamList } from "../../navigation/types";
import { useUser } from "../../context/user";
import { useAppTheme } from "../../hooks/useAppTheme";
import { useAlert } from "../../context/AlertContext";
import { getHomeMenuItems } from "../../constants/menuItems";
import { createHomeStyles } from "./home.styles";

import FloatingGem from "../../components/home/FloatingGem";
import HomeHeader from "../../components/home/HomeHeader";
import HomeHero from "../../components/home/HomeHero";
import MenuGrid from "../../components/home/MenuGrid";

const { width } = Dimensions.get("window");

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { gems, hearts, buyHeartWithGems, nextRefillIn, avatar, isLoggedIn, points } =
    useUser();

  const { showAlert } = useAlert();
  const { colors, isLight } = useAppTheme();
  const styles = createHomeStyles(colors);

  const gemsConfig = [
    { x: width * 0.05, size: 18, delay: 0, duration: 7000, opacity: 0.75 },
    { x: width * 0.18, size: 13, delay: 1200, duration: 6000, opacity: 0.65 },
    { x: width * 0.32, size: 22, delay: 600, duration: 8500, opacity: 0.8 },
    { x: width * 0.47, size: 15, delay: 2500, duration: 7200, opacity: 0.6 },
    { x: width * 0.58, size: 20, delay: 800, duration: 9000, opacity: 0.75 },
    { x: width * 0.71, size: 11, delay: 3200, duration: 6500, opacity: 0.55 },
    { x: width * 0.83, size: 17, delay: 1800, duration: 7800, opacity: 0.7 },
    { x: width * 0.92, size: 14, delay: 4000, duration: 8000, opacity: 0.65 },
  ];

  const menuItems = getHomeMenuItems(colors);

  const handleBuyHeart = () => {
    if (hearts < 5) {
      showAlert({
        title: "Mividy fo",
        message: "Mila vatosoa 20 ianao mba hividianana fo. Te hanohy ve ianao?",
        buttons: [
          { text: "Tsia", style: "cancel" },
          {
            text: "Eny",
            onPress: () => {
              if (!buyHeartWithGems()) {
                showAlert({ title: "Tsy ampy vatosoa", message: "Mila vatosoa 20 ianao." });
              }
            },
          },
        ],
      });
    }
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
        <HomeHeader
          styles={styles}
          colors={colors}
          gems={gems}
          hearts={hearts}
          nextRefillIn={nextRefillIn}
          avatar={avatar}
          isLoggedIn={isLoggedIn}
          points={points}
          onPressProfile={() => navigation.navigate("Profile")}
          onPressHeart={handleBuyHeart}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <HomeHero styles={styles} colors={colors} />

          <MenuGrid
            items={menuItems}
            styles={styles}
            colors={colors}
            isLight={isLight}
            onPressItem={(route) => {
              if (route === "TeamQuiz") {
                if (!isLoggedIn) {
                  showAlert({
                    title: "Mila Kaonty",
                    message: "Mila misoratra anarana ianao raha te hilalao amin'ny namana an-tserasera.",
                    buttons: [
                      { text: "Aoka ihany", style: "cancel" },
                      { text: "Hiditra", onPress: () => navigation.navigate("Auth") },
                    ],
                  });
                  return;
                }
                navigation.navigate("FriendSelection", { gameType: "team" });
                return;
              }
              navigation.navigate(route as never);
            }}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
