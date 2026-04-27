import React, { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AVATAR_MAP } from "../../constants/avatar";
import { useAppTheme } from "../../hooks/useAppTheme";

import { getMedalForPoints } from "../../utils/medal";

interface Props {
  avatar?: string | null;
  size?: number;
  showPulse?: boolean;
  borderWidth?: number;
  points?: number;
}

const UserAvatar: React.FC<Props> = ({
  avatar,
  size = 100,
  showPulse = false,
  borderWidth = 3,
  points = 0,
}) => {
  const { colors } = useAppTheme();
  const pulseAnim = useRef(new Animated.Value(0)).current;

  const medal = getMedalForPoints(points);
  const medalScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (medal) {
      Animated.spring(medalScale, {
        toValue: 1,
        tension: 50,
        friction: 4,
        useNativeDriver: true,
      }).start();
    } else {
      medalScale.setValue(0);
    }
  }, [medal]);

  // Scaling ratios based on the ProfileHero "Gold Standard"
  const outerSize = size * 1.16;
  const innerSize = size;
  const gradientPadding = borderWidth;

  // Radii ratios: ~0.24 for outer, ~0.22 for inner
  // Rounded square radii (matching asset aesthetics)
  const outerRadius = outerSize * 0.24;
  const innerRadius = innerSize * 0.22;
  const gradientRadius = (innerSize + gradientPadding * 2) * 0.22;

  useEffect(() => {
    if (showPulse) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      pulseAnim.setValue(0);
    }
  }, [showPulse, pulseAnim]);

  const ringScale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.06],
  });

  const ringOpacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <View
      style={{
        width: outerSize,
        height: outerSize,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {showPulse && (
        <Animated.View
          style={[
            styles.outerRing,
            {
              width: outerSize,
              height: outerSize,
              borderRadius: outerRadius,
              opacity: ringOpacity,
              transform: [{ scale: ringScale }],
              borderColor: colors.primary,
              shadowColor: colors.primary,
              shadowOpacity: 0.5,
              shadowRadius: 10,
            },
          ]}
        />
      )}

      <LinearGradient
        colors={[colors.primary, "#065F46", "#022C22"]}
        style={{
          borderRadius: gradientRadius,
          padding: gradientPadding,
        }}
      >
        <View
          style={{
            width: innerSize,
            height: innerSize,
            borderRadius: innerRadius,
            backgroundColor: colors.surface,
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {avatar ? (
            <Image
              source={
                AVATAR_MAP[avatar as keyof typeof AVATAR_MAP] ||
                AVATAR_MAP.abraham
              }
              style={{ width: "100%", height: "100%", resizeMode: "cover" }}
            />
          ) : (
            <MaterialCommunityIcons
              name="account"
              size={size * 0.6}
              color={colors.textMuted}
            />
          )}
        </View>
      </LinearGradient>

      {medal && (
        <Animated.View
          style={[
            styles.medalContainer,
            {
              bottom: -size * 0.02,
              right: -size * 0.02,
              width: size * 0.38,
              height: size * 0.38,
              borderRadius: size * 0.19,
              backgroundColor: colors.surface,
              borderWidth: 2,
              borderColor: colors.border,
              transform: [{ scale: medalScale }],
            },
          ]}
        >
          <LinearGradient
            colors={[medal.color, "#00000044"]}
            style={[styles.medalGradient, { borderRadius: size * 0.16 }]}
          >
            <MaterialCommunityIcons
              name={medal.icon as any}
              size={size * 0.24}
              color="#fff"
            />
          </LinearGradient>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  outerRing: {
    position: "absolute",
    borderWidth: 2,
  },
  medalContainer: {
    position: "absolute",
    padding: 2,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  medalGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UserAvatar;
