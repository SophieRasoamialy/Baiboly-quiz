import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

import { RootStackParamList } from "../../navigation/types";
import { useUser } from "../../context/user";
import { useAppTheme } from "../../hooks/useAppTheme";
import { createProfileStyles } from "./profile.styles";
import { PROFILE_GEMS_CONFIG } from "../../constants/profile";

import FloatingGem from "../../components/home/FloatingGem";
import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileHero from "../../components/profile/ProfileHero";
import GuestCard from "../../components/profile/GuestCard";
import ProfileStats from "../../components/profile/ProfileStats";
import MedalSection from "../../components/profile/MedalSection";
import AvatarSection from "../../components/profile/AvatarSection";
import LogoutButton from "../../components/profile/LogoutButton";

const { width } = Dimensions.get("window");

const ProfileScreen = () => {
  const {
    gems,
    medals,
    avatar,
    setAvatar,
    isLoggedIn,
    username,
    churchName,
    city,
    logout,
    points,
  } = useUser();

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { colors, isLight } = useAppTheme();
  const styles = createProfileStyles(colors);

  const avatarPulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(avatarPulse, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(avatarPulse, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [avatarPulse]);

  const gemsConfig = PROFILE_GEMS_CONFIG.map((item) => ({
    ...item,
    x: width * item.xRatio,
    isLight,
  }));

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

      {gemsConfig.map((gem, index) => (
        <FloatingGem key={index} {...gem} />
      ))}

      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <ProfileHeader
            styles={styles}
            colors={colors}
            onBack={() => navigation.goBack()}
          />

          {isLoggedIn && (
            <ProfileHero
              styles={styles}
              colors={colors}
              avatar={avatar ?? "default"}
              points={points}
              pulseAnim={avatarPulse}
              isLoggedIn={isLoggedIn}
              username={username}
              churchName={churchName}
              city={city}
              onEdit={() => navigation.navigate("Auth")}
            />
          )}

          {!isLoggedIn && (
            <View style={{ paddingHorizontal: 20 }}>
              <GuestCard
                styles={styles}
                colors={colors}
                onPressAuth={() => navigation.navigate("Auth")}
              />
            </View>
          )}

          {isLoggedIn && (
            <>
              <ProfileStats
                styles={styles}
                gems={gems}
                medalCount={medals.length}
                points={points}
                colors={colors}
              />

              <MedalSection
                styles={styles}
                colors={colors}
                medals={medals}
              />
            </>
          )}

          <AvatarSection
            styles={styles}
            colors={colors}
            isLoggedIn={isLoggedIn}
            avatar={avatar}
            setAvatar={setAvatar}
          />

          {isLoggedIn && (
            <View style={styles.logoutWrap}>
              <LogoutButton styles={styles} onPress={logout} />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ProfileScreen;