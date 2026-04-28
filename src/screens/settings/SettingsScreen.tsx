import { useEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { NotificationService } from "../../services/NotificationService";

import { useUser } from "../../context/user";
import { useAppTheme } from "../../hooks/useAppTheme";
import { useAlert } from "../../context/AlertContext";
import i18n from "../../i18n";
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

  useEffect(() => {
    const checkNotifStatus = async () => {
      const enabled = await NotificationService.isDailyVerseEnabled();
      setNotificationEnabled(enabled);
    };
    checkNotifStatus();
  }, []);

  const handleToggleNotification = async (value: boolean) => {
    if (value) {
      const hasPermission = await NotificationService.requestPermissions();
      if (hasPermission) {
        await NotificationService.scheduleDailyVerseNotification();
        setNotificationEnabled(true);
      } else {
        showAlert({
          title: i18n.t("notifications"),
          message: i18n.t("notif_permission_msg"),
        });
      }
    } else {
      await NotificationService.cancelDailyVerseNotification();
      setNotificationEnabled(false);
    }
  };

  const handleBuyHeart = () => {
    if (hearts >= 5) {
      showAlert({
        title: i18n.t("already_full"),
        message: i18n.t("hearts_full_msg"),
      });
      return;
    }

    if (gems >= 50) {
      removeGems(50);
      addHeart();
      showAlert({
        title: i18n.t("finish"),
        message: i18n.t("received_heart_msg"),
      });
    } else {
      showAlert({
        title: i18n.t("insufficient"),
        message: i18n.t("need_gems_shop_msg"),
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
          <SettingsSection title={i18n.t("language")} styles={styles}>
            <LanguageSelector
              styles={styles}
              colors={colors}
              language={language}
              onChangeLanguage={setLanguage}
            />
          </SettingsSection>

          <SettingsSection title={i18n.t("appearance")} styles={styles}>
            <ThemeSelector
              styles={styles}
              colors={colors}
              currentTheme={theme}
              onChangeTheme={setTheme}
            />
          </SettingsSection>

          <SettingsSection title={i18n.t("shop")} styles={styles}>
            <ShopCard
              styles={styles}
              colors={colors}
              price={50}
              title={i18n.t("buy_heart_shop")}
              subtitle={i18n.t("boost_luck")}
              onPress={handleBuyHeart}
            />
          </SettingsSection>

          <SettingsSection title={i18n.t("preferences")} styles={styles}>
            <PreferencesCard
              styles={styles}
              colors={colors}
              soundEnabled={soundEnabled}
              notificationEnabled={notificationEnabled}
              onToggleSound={setSoundEnabled}
              onToggleNotification={handleToggleNotification}
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
