import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { RootStackParamList } from "../../navigation/types";
import { useUser } from "../../context/user";
import { useConnectivity } from "../../context/ConnectivityContext";
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
import { logger } from "../../utils/logger";

type AuthScreenNavigationProp = StackNavigationProp<RootStackParamList, "Auth">;
type AuthScreenRouteProp = RouteProp<RootStackParamList, "Auth">;

interface Props {
  navigation: AuthScreenNavigationProp;
  route: AuthScreenRouteProp;
}

const isInvalidEmailError = (error: unknown) => {
  if (!error || typeof error !== "object") return false;

  const authError = error as { code?: string; message?: string };
  const message = authError.message?.toLowerCase() || "";

  return (
    authError.code === "email_address_invalid" ||
    (message.includes("email address") && message.includes("invalid"))
  );
};

const GOOGLE_AUTH_REDIRECT_URL = "baibolyquiz://auth/callback";
const isExistingAccountError = (error: unknown) => {
  if (!error || typeof error !== "object") return false;

  const authError = error as { code?: string; message?: string };
  const message = authError.message?.toLowerCase() || "";

  return (
    authError.code === "user_already_exists" ||
    message.includes("already registered") ||
    message.includes("already exists") ||
    message.includes("already been registered")
  );
};

function AuthScreen({ navigation, route }: Props) {
  const {
    signUp,
    signIn,
    signInWithGoogle,
    updateProfile,
    addGems,
    setAvatar,
    avatar,
    email,
    username,
    churchName,
    city,
    isLoggedIn,
    profileId,
  } = useUser();
  const { colors, isLight } = useAppTheme();
  const { isOnline } = useConnectivity();
  const styles = createAuthStyles(colors);

  const [emailValue, setEmailValue] = useState(email || "");
  const [name, setName] = useState(username || "");
  const [church, setChurch] = useState(churchName || "");
  const [cityName, setCityName] = useState(city || "");
  const [selectedAvatar, setSelectedAvatar] = useState(avatar || AVATARS[0].id);
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(route.params?.mode !== "login");
  const [isChecking, setIsChecking] = useState(false);
  const { showAlert } = useAlert();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(24)).current;
  const handledGoogleUrlRef = useRef<string | null>(null);

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

  useEffect(() => {
    setIsSignUp(route.params?.mode !== "login");
  }, [route.params?.mode]);

  useEffect(() => {
    setEmailValue(email || "");
    setName(username || "");
    setChurch(churchName || "");
    setCityName(city || "");
    setSelectedAvatar(avatar || AVATARS[0].id);
  }, [avatar, city, churchName, email, username]);

  useEffect(() => {
    if (isLoggedIn) return;

    const handleGoogleCallback = async (callbackUrl: string) => {
      if (!callbackUrl.startsWith(GOOGLE_AUTH_REDIRECT_URL)) return;
      if (handledGoogleUrlRef.current === callbackUrl) return;

      handledGoogleUrlRef.current = callbackUrl;

      setIsChecking(true);
      try {
        const result = await signInWithGoogle(callbackUrl);
        if (result.profileComplete) {
          navigation.replace("Profile");
        }
      } catch (err) {
        handledGoogleUrlRef.current = null;
        logger.error("AuthScreen", "Google authentication flow failed", err);
        showAlert({
          title: i18n.t("auth_error_title"),
          message: i18n.t("auth_error_msg"),
          buttons: [{ text: i18n.t("ok") }]
        });
      } finally {
        setIsChecking(false);
      }
    };

    Linking.getInitialURL()
      .then((url) => {
        if (url) {
          handleGoogleCallback(url);
        }
      })
      .catch((err) => logger.error("AuthScreen", "Failed to inspect initial auth URL", err));

    const subscription = Linking.addEventListener("url", ({ url }) => {
      handleGoogleCallback(url);
    });

    return () => {
      subscription.remove();
    };
  }, [isLoggedIn, navigation, showAlert, signInWithGoogle]);

  const isValidEmail = (value: string) => /\S+@\S+\.\S+/.test(value.trim());

  const isFormValid = isLoggedIn
    ? (name.trim().length >= 3 &&
       church.trim().length > 0 &&
       cityName.trim().length > 0)
    : isSignUp
      ? (isValidEmail(emailValue) &&
         name.trim().length >= 3 &&
         church.trim().length > 0 &&
         cityName.trim().length > 0 &&
         password.trim().length >= 6)
      : (isValidEmail(emailValue) && password.trim().length >= 6);

  const handleStart = async () => {
    if (!isOnline) {
      showAlert({
        title: i18n.t("offline_required_title"),
        message: i18n.t("offline_required_msg"),
        buttons: [{ text: i18n.t("ok") }]
      });
      return;
    }

    if (!isFormValid || isChecking) return;

    setIsChecking(true);
    try {
      if (isLoggedIn) {
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

        await updateProfile({
          name: name.trim(),
          church: church.trim(),
          city: cityName.trim(),
        });

        navigation.goBack();
        return;
      }

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

        const result = await signUp(emailValue.trim(), password.trim(), {
          name: name.trim(),
          avatar: selectedAvatar,
          church: church.trim(),
          city: cityName.trim(),
        });

        if (result.needsEmailConfirmation) {
          showAlert({
            title: "Check your email",
            message: "Your account was created. Confirm your email address, then sign in.",
            buttons: [{ text: i18n.t("ok") }]
          });
          navigation.goBack();
          return;
        }

        setAvatar(selectedAvatar);
        addGems(50);
      } else {
        await signIn(emailValue.trim(), password.trim());
      }

      if (!isSignUp) {
        navigation.goBack();
      } else {
        navigation.replace("Home");
      }
    } catch (err) {
      logger.error("AuthScreen", "Authentication flow failed", err);

      if (isExistingAccountError(err)) {
        setIsSignUp(false);
        showAlert({
          title: i18n.t("account_exists_title"),
          message: i18n.t("account_exists_msg"),
          buttons: [{ text: i18n.t("ok") }]
        });
        return;
      }

      if (isInvalidEmailError(err)) {
        showAlert({
          title: i18n.t("invalid_email_title"),
          message: i18n.t("invalid_email_msg"),
          buttons: [{ text: i18n.t("ok") }]
        });
        return;
      }

      showAlert({
        title: i18n.t("auth_error_title"),
        message: i18n.t("auth_error_msg"),
        buttons: [{ text: i18n.t("ok") }]
      });
    } finally {
      setIsChecking(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (!isOnline) {
      showAlert({
        title: i18n.t("offline_required_title"),
        message: i18n.t("offline_required_msg"),
        buttons: [{ text: i18n.t("ok") }]
      });
      return;
    }

    if (isChecking || isLoggedIn) return;

    setIsChecking(true);
    try {
      const authUrl = await supabaseService.signInWithGoogle(GOOGLE_AUTH_REDIRECT_URL);
      await Linking.openURL(authUrl);
      setIsChecking(false);
    } catch (err) {
      logger.error("AuthScreen", "Unable to start Google authentication", err);
      showAlert({
        title: i18n.t("auth_error_title"),
        message: i18n.t("auth_error_msg"),
        buttons: [{ text: i18n.t("ok") }]
      });
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
                {!isLoggedIn && (
                  <>
                    <TouchableOpacity
                      style={styles.socialButton}
                      activeOpacity={0.85}
                      onPress={handleGoogleSignIn}
                      disabled={isChecking}
                    >
                      {isChecking ? (
                        <ActivityIndicator size="small" color={colors.text} />
                      ) : (
                        <MaterialCommunityIcons
                          name="google"
                          size={20}
                          color={colors.text}
                        />
                      )}
                      <Text style={styles.socialButtonText}>
                        {isChecking ? i18n.t("loading") : "Continue with Google"}
                      </Text>
                    </TouchableOpacity>

                    <View style={styles.socialDividerRow}>
                      <View style={styles.socialDividerLine} />
                      <Text style={styles.socialDividerText}>or</Text>
                      <View style={styles.socialDividerLine} />
                    </View>
                  </>
                )}

                {!isLoggedIn && (
                  <AuthFormInput
                    styles={styles}
                    label="Email"
                    icon="email-outline"
                    placeholder="Enter your email"
                    value={emailValue}
                    onChangeText={setEmailValue}
                    maxLength={60}
                  />
                )}

                {(isSignUp || isLoggedIn) && (
                  <AuthFormInput
                    styles={styles}
                    label={i18n.t("username_label")}
                    icon="at"
                    placeholder={i18n.t("username_placeholder")}
                    value={name}
                    onChangeText={setName}
                    maxLength={15}
                  />
                )}

                {!isLoggedIn && (
                  <AuthFormInput
                    styles={styles}
                    label={i18n.t("password_label")}
                    icon="lock-outline"
                    placeholder={i18n.t("password_placeholder")}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    maxLength={30}
                  />
                )}

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
                  loading={isChecking}
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
                        onPress={() => {
                          setPassword("");
                          setIsSignUp(!isSignUp);
                        }}
                      >
                        {isSignUp ? i18n.t("login_mode_btn") : i18n.t("signup_mode_btn")}
                      </Text>
                    </Text>
                  </View>
                )}
              </View>
            </Animated.View>
          </ScrollView>

          {isChecking && (
            <View style={styles.loadingOverlay}>
              <View style={styles.loadingCard}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={styles.loadingText}>{i18n.t("loading")}</Text>
              </View>
            </View>
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

export default AuthScreen;
