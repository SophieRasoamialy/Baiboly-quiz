import React, { useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

import { useUser } from "../../context/user";
import { useAppTheme } from "../../hooks/useAppTheme";
import { useAlert } from "../../context/AlertContext";
import { createSettingsStyles } from "./settings.styles";

import SettingsHeader from "../../components/settings/SettingsHeader";
import SettingsSection from "../../components/settings/SettingsSection";
import LanguageSelector from "../../components/settings/LanguageSelector";
import ThemeSelector from "../../components/settings/ThemeSelector";
import ShopCard from "../../components/settings/ShopCard";
import PreferencesCard from "../../components/settings/PreferencesCard";
import AboutCard from "../../components/settings/AboutCard";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/types";

const SettingsScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { showAlert } = useAlert();
  const {
    language,
    setLanguage,
    gems,
    hearts,
    theme,
    setTheme,
    addHeart,
    removeGems,
    soundEnabled,
    setSoundEnabled,
  } = useUser();

  const { colors, isLight } = useAppTheme();
  const styles = createSettingsStyles(colors);

  const [notificationEnabled, setNotificationEnabled] = useState(false);

  const handleBuyHeart = () => {
    if (hearts >= 5) {
      showAlert({
        title: "Efa feno",
        message: "Efa manana fo 5 ianao.",
      });
      return;
    }

    if (gems >= 50) {
      removeGems(50);
      addHeart();
      showAlert({
        title: "Vita",
        message: "Nahazo fo 1 ianao.",
      });
    } else {
      showAlert({
        title: "Tsy ampy",
        message: "Mila vatosoa 50 ianao hividianana fo.",
      });
    }
  };

  const handleShare = () => {
    //Alert.alert("Share", "Ampidiro eto ny logique de partage.");
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
          <View pointerEvents="none" style={styles.topGlowLeft} />
          <View pointerEvents="none" style={styles.topGlowRight} />
        </>
      )}

      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <SettingsHeader
          styles={styles}
          colors={colors}
          onBack={() => navigation.goBack()}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <SettingsSection title="Fiteny" styles={styles}>
            <LanguageSelector
              styles={styles}
              colors={colors}
              language={language}
              onChangeLanguage={setLanguage}
            />
          </SettingsSection>

          <SettingsSection title="Endrika" styles={styles}>
            <ThemeSelector
              styles={styles}
              colors={colors}
              currentTheme={theme}
              onChangeTheme={setTheme}
            />
          </SettingsSection>

          <SettingsSection title="Varotra" styles={styles}>
            <ShopCard
              styles={styles}
              colors={colors}
              price={50}
              title="Hividy fo (1)"
              subtitle="Ampitomboy ny vintanao"
              onPress={handleBuyHeart}
            />
          </SettingsSection>

          <SettingsSection title="Safidy" styles={styles}>
            <PreferencesCard
              styles={styles}
              colors={colors}
              soundEnabled={soundEnabled}
              notificationEnabled={notificationEnabled}
              onToggleSound={setSoundEnabled}
              onToggleNotification={setNotificationEnabled}
            />
          </SettingsSection>

          <AboutCard
            styles={styles}
            colors={colors}
            version="v1.0.0"
            onPressShare={handleShare}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default SettingsScreen;
