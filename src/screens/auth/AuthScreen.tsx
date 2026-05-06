import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { StackNavigationProp } from "@react-navigation/stack";

import { RootStackParamList } from "../../navigation/types";
import { useUser } from "../../context/user";
import { useAppTheme } from "../../hooks/useAppTheme";
import { createAuthStyles } from "./auth.styles";
import { supabaseService } from "../../services/SupabaseService";
import { useAlert } from "../../context/AlertContext";
import i18n from "../../i18n";

import AuthHeader from "../../components/auth/AuthHeader";
import AuthRewardCard from "../../components/auth/AuthRewardCard";
import AuthFormInput from "../../components/auth/AuthFormInput";
import AuthAvatarPicker from "../../components/auth/AuthAvatarPicker";
import AuthSubmitButton from "../../components/auth/AuthSubmitButton";
import BackButton from "../../components/ui/BackButton";

import { AVATARS } from "../../constants/avatar";

type AuthScreenNavigationProp = StackNavigationProp<RootStackParamList, "Auth">;

interface Props {
  navigation: AuthScreenNavigationProp;
}

function AuthScreen({ navigation }: Props) {
  const { login, setAvatar, addGems, username, churchName, city, isLoggedIn } =
    useUser();
  const { colors, isLight } = useAppTheme();
  const styles = createAuthStyles(colors);

  const [name, setName] = useState(username || "");
  const [church, setChurch] = useState(churchName || "");
  const [cityName, setCityName] = useState(city || "");
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0].id);
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);
  const [isChecking, setIsChecking] = useState(false);
  const { profileId } = useUser();
  const { showAlert } = useAlert();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const isFormValid = isSignUp 
    ? (name.trim().length >= 3 &&
       church.trim().length > 0 &&
       cityName.trim().length > 0 &&
       password.trim().length >= 4)
    : (name.trim().length >= 3 && password.trim().length >= 4);

  const handleStart = async () => {
    if (!isFormValid || isChecking) return;

    setIsChecking(true);
    try {
      if (isSignUp) {
        // Check for username uniqueness
        const isTaken = await supabaseService.isUsernameTaken(name.trim(), profileId || undefined);
        
        if (isTaken) {
          setIsChecking(false);
          showAlert({
            title: i18n.t("username_taken_title"),
            message: i18n.t("username_taken_msg"),
            buttons: [{ text: i18n.t("ok") }]
          });
          return;
        }

        if (!isLoggedIn) {
          setAvatar(selectedAvatar);
          addGems(50);
        }
        
        login(name.trim(), church.trim(), cityName.trim(), password.trim());
      } else {
        // Handle Login
        const profile = await supabaseService.verifyPassword(name.trim(), password.trim());
        
        if (!profile) {
          setIsChecking(false);
          showAlert({
            title: i18n.t("invalid_credentials_title"),
            message: i18n.t("invalid_credentials_msg"),
            buttons: [{ text: i18n.t("ok") }]
          });
          return;
        }

        loginWithExistingProfile(profile);
      }

      if (isLoggedIn || !isSignUp) {
        navigation.goBack();
      } else {
        navigation.replace("Home");
      }
    } catch (err) {
      console.error("Auth error:", err);
      showAlert({
        title: i18n.t("auth_error_title"),
        message: i18n.t("auth_error_msg"),
        buttons: [{ text: i18n.t("ok") }]
      });
    } finally {
      setIsChecking(false);
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
          <View pointerEvents="none" style={styles.topGlowLeft} />
          <View pointerEvents="none" style={styles.topGlowRight} />
        </>
      )}

      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
          <BackButton colors={colors} onPress={() => navigation.goBack()} />
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <Animated.View
              style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              }}
            >
              <AuthHeader
                styles={styles}
                colors={colors}
                isEditing={isLoggedIn}
                isLogin={!isSignUp && !isLoggedIn}
              />
              {!isLoggedIn && isSignUp && <AuthRewardCard styles={styles} colors={colors} />}
            </Animated.View>

            <Animated.View
              style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              }}
            >
              <View style={styles.formCard}>
                <AuthFormInput
                  styles={styles}
                  label={i18n.t("username_label")}
                  icon="at"
                  placeholder={i18n.t("username_placeholder")}
                  value={name}
                  onChangeText={setName}
                  maxLength={15}
                />

                <AuthFormInput
                  styles={styles}
                  label={i18n.t("password_label")}
                  icon="lock-outline"
                  placeholder={i18n.t("password_placeholder")}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  maxLength={20}
                />

                {(isSignUp || isLoggedIn) && (
                  <>
                    <AuthFormInput
                      styles={styles}
                      label={i18n.t("church_label")}
                      icon="church-outline"
                      placeholder={i18n.t("church_placeholder")}
                      value={church}
                      onChangeText={setChurch}
                      maxLength={30}
                    />

                    <AuthFormInput
                      styles={styles}
                      label={i18n.t("city_label")}
                      icon="city-variant-outline"
                      placeholder={i18n.t("city_placeholder")}
                      value={cityName}
                      onChangeText={setCityName}
                      maxLength={25}
                    />
                  </>
                )}

                {!isLoggedIn && isSignUp && (
                  <AuthAvatarPicker
                    styles={styles}
                    colors={colors}
                    selectedAvatar={selectedAvatar}
                    onSelectAvatar={setSelectedAvatar}
                  />
                )}

                <AuthSubmitButton
                  styles={styles}
                  colors={colors}
                  disabled={!isFormValid || isChecking}
                  label={
                    isLoggedIn 
                      ? i18n.t("update_profile_btn") 
                      : (isSignUp ? i18n.t("start_btn") : i18n.t("login_btn_text"))
                  }
                  onPress={handleStart}
                />

                {!isLoggedIn && (
                  <View style={styles.toggleModeButton}>
                    <Text style={styles.toggleModeText}>
                      {isSignUp ? i18n.t("already_have_account") : i18n.t("no_account_yet_msg")}{" "}
                      <Text
                        style={styles.toggleModeLink}
                        onPress={() => setIsSignUp(!isSignUp)}
                      >
                        {isSignUp ? i18n.t("login_mode_btn") : i18n.t("signup_mode_btn")}
                      </Text>
                    </Text>
                  </View>
                )}
              </View>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

export default AuthScreen;