import React from "react";
import { Animated, Image, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AVATAR_MAP } from "../../constants/avatar";

interface Props {
  styles: any;
  colors: any;
  avatar: string;
  pulseAnim: Animated.Value;
  isLoggedIn: boolean;
  username?: string | null;
  churchName?: string | null;
  city?: string | null;
}

const ProfileHero: React.FC<Props> = ({
  styles,
  colors,
  avatar,
  pulseAnim,
  isLoggedIn,
  username,
  churchName,
  city,
}) => {
  const ringScale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.06],
  });

  const ringOpacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 0.95],
  });

  return (
    <View style={styles.heroWrap}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Animated.View
          style={[
            styles.avatarOuterRing,
            {
              opacity: ringOpacity,
              transform: [{ scale: ringScale }],
              shadowColor: colors.secondary,
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.6,
              shadowRadius: 16,
            },
          ]}
        />

        <LinearGradient
          colors={[colors.secondary, "#00897B", "#004D40"]}
          style={styles.avatarGradientWrap}
        >
          <View style={styles.avatarInnerWrap}>
            <Image
              source={AVATAR_MAP[avatar] || AVATAR_MAP.abraham}
              style={{ width: "100%", height: "100%", resizeMode: "cover" }}
            />
          </View>
        </LinearGradient>
      </View>

      {isLoggedIn && (
        <>
          <Text style={styles.userName}>{username}</Text>

          <View style={styles.chipsRow}>
            {churchName && (
              <View style={styles.infoChip}>
                <MaterialCommunityIcons
                  name="church"
                  size={13}
                  color={colors.secondary}
                />
                <Text style={styles.infoChipText}>{churchName}</Text>
              </View>
            )}

            {city && (
              <View style={styles.infoChip}>
                <MaterialCommunityIcons
                  name="map-marker"
                  size={13}
                  color={colors.secondary}
                />
                <Text style={styles.infoChipText}>{city}</Text>
              </View>
            )}
          </View>
        </>
      )}
    </View>
  );
};

export default ProfileHero;