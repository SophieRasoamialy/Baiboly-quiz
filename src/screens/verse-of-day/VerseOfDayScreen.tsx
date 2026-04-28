import React, { useCallback, useMemo, useRef, useState } from "react";
import { Animated, Share, StyleSheet, Text, View, ScrollView } from "react-native";
import * as Clipboard from "expo-clipboard";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import { StackNavigationProp } from "@react-navigation/stack";
import { LinearGradient } from "expo-linear-gradient";

import { RootStackParamList } from "../../navigation/types";
import { useAppTheme } from "../../hooks/useAppTheme";
import { useDailyPromiseVerse } from "../../hooks/useDailyPromiseVerse";
import { PromiseCategory, PromiseVerse } from "../../constants/promises";
import { createVerseOfDayStyles } from "./verse-of-day.styles";

import VerseDayHeader from "../../components/verse-of-day/VerseDayHeader";
import VerseHeroCard from "../../components/verse-of-day/VerseHeroCard";
import VerseActionsRow from "../../components/verse-of-day/VerseActionsRow";
import PromiseCategoryList from "../../components/verse-of-day/PromiseCategoryList";
import VerseShareCard from "../../components/verse-of-day/VerseShareCard";
import i18n from "../../i18n";

type VerseOfDayScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "VerseOfDay"
>;

interface Props {
  navigation: VerseOfDayScreenNavigationProp;
}

const VerseOfDayScreen: React.FC<Props> = ({ navigation }) => {
  const { colors, isLight } = useAppTheme();
  const styles = createVerseOfDayStyles(colors);

  const shareCardRef = useRef<View>(null);
  const scrollRef = useRef<ScrollView>(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  const { dateDisplay, dailyVerse, dailyCategory, getCategoryForVerse } =
    useDailyPromiseVerse();

  const [selectedVerse, setSelectedVerse] = useState<PromiseVerse>(dailyVerse);
  const [selectedCategory, setSelectedCategory] = useState<
    PromiseCategory | undefined
  >(dailyCategory);
  const [openedCategory, setOpenedCategory] = useState<string | null>(null);

  const displayedVerse = selectedVerse;
  const displayedCategory = selectedCategory;
  const isManualSelection = displayedVerse.reference !== dailyVerse.reference;

  const handleOpenBible = useCallback(
    (verse: PromiseVerse) => {
      navigation.navigate("Bible", {
        initialBook: verse.book,
        initialChapter: verse.chapter,
        initialVerse: verse.verse,
      });
    },
    [navigation],
  );

  const handleSelectVerse = useCallback(
    (verse: PromiseVerse) => {
      setSelectedVerse(verse);
      setSelectedCategory(getCategoryForVerse(verse));
      scrollRef.current?.scrollTo({ y: 0, animated: true });
    },
    [getCategoryForVerse],
  );

  const handleResetToDailyVerse = useCallback(() => {
    setSelectedVerse(dailyVerse);
    setSelectedCategory(dailyCategory);
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  }, [dailyVerse, dailyCategory]);

  const handleCopyText = useCallback(async () => {
    await Clipboard.setStringAsync(
      `"${displayedVerse.text}" (${displayedVerse.reference})`,
    );
  }, [displayedVerse]);

  const handleShare = useCallback(
    async (type: "image" | "text") => {
      try {
        if (type === "image") {
          if (!shareCardRef.current) return;

          const uri = await captureRef(shareCardRef, {
            format: "png",
            quality: 1,
          });

          if (await Sharing.isAvailableAsync()) {
            await Sharing.shareAsync(uri, {
              mimeType: "image/png",
              dialogTitle: i18n.t("share_promise_title"),
            });
          }
          return;
        }

        await Share.share({
          message: `${
            displayedCategory?.emoji || "✨"
          } ${displayedCategory?.category || i18n.t("promise_default")}\n\n📖 ${
            displayedVerse.reference
          }\n"${displayedVerse.text}"\n\n— Baiboly Quiz App`,
        });
      } catch (error) {
        console.error("Share error:", error);
      }
    },
    [displayedVerse, displayedCategory],
  );

  const heroScale = useMemo(
    () =>
      scrollY.interpolate({
        inputRange: [-150, 0],
        outputRange: [1.05, 1],
        extrapolate: "clamp",
      }),
    [scrollY],
  );

  const handleScroll = useMemo(
    () =>
      Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
        useNativeDriver: true,
      }),
    [scrollY],
  );

  return (
    <View style={styles.container}>
      <StatusBar style={isLight ? "dark" : "light"} />

      <View style={StyleSheet.absoluteFill}>
        <LinearGradient
          colors={
            isLight
              ? [colors.background, colors.backgroundSecondary]
              : ["#022C22", "#064E3B", "#022C22"]
          }
          style={{ flex: 1 }}
        />
      </View>

      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <VerseDayHeader
          styles={styles}
          colors={colors}
          title={i18n.t("promise_default")}
          onBack={() => navigation.goBack()}
        />

        <Animated.ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          contentContainerStyle={styles.scrollContent}
          onScroll={handleScroll}
        >
          <VerseHeroCard
            styles={styles}
            heroScale={heroScale}
            displayedVerse={displayedVerse}
            displayedCategory={displayedCategory}
            dateDisplay={dateDisplay}
            isManualSelection={isManualSelection}
            onReset={handleResetToDailyVerse}
            onOpenBible={() => handleOpenBible(displayedVerse)}
            primaryColor={colors.primary}
          />

          <VerseActionsRow
            styles={styles}
            onShareImage={() => handleShare("image")}
            onShareText={() => handleShare("text")}
            onCopy={handleCopyText}
          />

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{i18n.t("all_categories")}</Text>
            <Text style={styles.sectionSubtitle}>
              {i18n.t("category_click_hint")}
            </Text>
          </View>

          <PromiseCategoryList
            styles={styles}
            colors={colors}
            openedCategory={openedCategory}
            setOpenedCategory={setOpenedCategory}
            displayedVerse={displayedVerse}
            onSelectVerse={handleSelectVerse}
          />

          <View style={{ height: 100 }} />
        </Animated.ScrollView>
      </SafeAreaView>

      <View style={styles.hiddenLayer} pointerEvents="none">
        <VerseShareCard
          ref={shareCardRef}
          styles={styles}
          verse={displayedVerse}
          category={displayedCategory}
          primaryColor={colors.primary}
        />
      </View>
    </View>
  );
};

export default VerseOfDayScreen;
