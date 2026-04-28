import { useEffect, useState } from "react";
import { Animated, ScrollView, View, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { StackNavigationProp } from "@react-navigation/stack";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { RootStackParamList } from "../../navigation/types";
import { useUser } from "../../context/user";
import { useAppTheme } from "../../hooks/useAppTheme";
import { useAlert } from "../../context/AlertContext";
import { useDailyPromiseVerse } from "../../hooks/useDailyPromiseVerse";
import i18n from "../../i18n";
import { getHomeMenuItems } from "../../constants/menuItems";
import { createHomeStyles } from "./home.styles";

import FloatingGem from "../../components/home/FloatingGem";
import HomeHeader from "../../components/home/HomeHeader";
import HomeHero from "../../components/home/HomeHero";
import MenuGrid from "../../components/home/MenuGrid";
import VerseOfDayModal from "../../components/home/VerseOfDayModal";

const { width } = Dimensions.get("window");

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const VERSE_SHOWN_DATE_KEY = "@verse_shown_date";

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { gems, hearts, buyHeartWithGems, nextRefillIn, avatar, isLoggedIn, points } =
    useUser();

  const { showAlert } = useAlert();
  const { colors, isLight } = useAppTheme();
  const styles = createHomeStyles(colors);

  const { dateStr, dailyVerse, dateDisplay } = useDailyPromiseVerse();
  const [isVerseModalVisible, setIsVerseModalVisible] = useState(false);

  useEffect(() => {
    const checkVerseModal = async () => {
      const lastShownDate = await AsyncStorage.getItem(VERSE_SHOWN_DATE_KEY);
      if (lastShownDate !== dateStr) {
        setIsVerseModalVisible(true);
        await AsyncStorage.setItem(VERSE_SHOWN_DATE_KEY, dateStr);
      }
    };

    const setupNotifications = () => {
      const subscription = Notifications.addNotificationResponseReceivedListener(response => {
        const data = response.notification.request.content.data;
        if (data?.screen === "VerseOfDay") {
          navigation.navigate("VerseOfDay");
        }
      });

      return () => subscription.remove();
    };

    checkVerseModal();
    return setupNotifications();
  }, [dateStr, navigation]);

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
        title: i18n.t("buy_heart_title"),
        message: i18n.t("buy_heart_msg"),
        buttons: [
          { text: i18n.t("later"), style: "cancel" },
          {
            text: i18n.t("ok"),
            onPress: () => {
              if (!buyHeartWithGems()) {
                showAlert({ title: i18n.t("not_enough_gems"), message: i18n.t("need_gems_msg") });
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

      <VerseOfDayModal
        isVisible={isVerseModalVisible}
        onClose={() => setIsVerseModalVisible(false)}
        onViewDetails={() => {
          setIsVerseModalVisible(false);
          navigation.navigate("VerseOfDay");
        }}
        verse={dailyVerse}
        dateDisplay={dateDisplay}
        colors={colors}
      />

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
                showAlert({
                  title: i18n.t("coming_soon"),
                  message: i18n.t("coming_soon_msg"),
                  buttons: [{ text: i18n.t("ok"), style: "cancel" }],
                });
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
