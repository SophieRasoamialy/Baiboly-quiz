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

  const isFormValid =
    name.trim().length >= 3 &&
    church.trim().length > 0 &&
    cityName.trim().length > 0;

  const handleStart = async () => {
    if (!isFormValid || isChecking) return;

    setIsChecking(true);
    try {
      // Check for username uniqueness
      const isTaken = await supabaseService.isUsernameTaken(name.trim(), profileId || undefined);
      
      if (isTaken) {
        setIsChecking(false);
        showAlert({
          title: "Efa misy mampiasa io anarana io",
          message: "Azafady, fidio anarana hafa fa efa misy mampiasa ity anarana ity.",
          buttons: [{ text: "Eny" }]
        });
        return;
      }

      if (!isLoggedIn) {
        setAvatar(selectedAvatar);
        addGems(50);
      }
      
      login(name.trim(), church.trim(), cityName.trim());

      if (isLoggedIn) {
        navigation.goBack();
      } else {
        navigation.replace("Home");
      }
    } catch (err) {
      console.error("Auth error:", err);
      showAlert({
        title: "Olana",
        message: "Nisy olana teo am-panamarinana ny anaranao. Andramo indray azafady.",
        buttons: [{ text: "Eny" }]
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
              />
              {!isLoggedIn && <AuthRewardCard styles={styles} colors={colors} />}
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
                  label="Solon'anarana"
                  icon="at"
                  placeholder="Ohatra: Mpitory"
                  value={name}
                  onChangeText={setName}
                  maxLength={15}
                />

                <AuthFormInput
                  styles={styles}
                  label="Fiangonana"
                  icon="church-outline"
                  placeholder="Ny anaran'ny fiangonanao"
                  value={church}
                  onChangeText={setChurch}
                  maxLength={30}
                />

                <AuthFormInput
                  styles={styles}
                  label="Tanàna"
                  icon="city-variant-outline"
                  placeholder="Ny tanàna misy anao"
                  value={cityName}
                  onChangeText={setCityName}
                  maxLength={25}
                />

                {!isLoggedIn && (
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
                  label={isLoggedIn ? "HANAVAO PROFIL" : "HANOMBOKA"}
                  onPress={handleStart}
                />
              </View>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

export default AuthScreen;