import React, { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AVATAR_MAP } from "../../constants/avatar";
import { useAppTheme } from "../../hooks/useAppTheme";

interface Props {
  avatar?: string | null;
  size?: number;
  showPulse?: boolean;
  borderWidth?: number;
}

const UserAvatar: React.FC<Props> = ({
  avatar,
  size = 100,
  showPulse = false,
  borderWidth = 3,
}) => {
  const { colors } = useAppTheme();
  const pulseAnim = useRef(new Animated.Value(0)).current;

  // Scaling ratios based on the ProfileHero "Gold Standard"
  const outerSize = size * 1.16;
  const innerSize = size;
  const gradientPadding = borderWidth;
  
  // Radii ratios: ~0.24 for outer, ~0.22 for inner
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
        ])
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
    <View style={{ width: outerSize, height: outerSize, justifyContent: "center", alignItems: "center" }}>
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
              source={AVATAR_MAP[avatar] || AVATAR_MAP.abraham}
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
    </View>
  );
};

const styles = StyleSheet.create({
  outerRing: {
    position: "absolute",
    borderWidth: 2,
  },
});

export default UserAvatar;
