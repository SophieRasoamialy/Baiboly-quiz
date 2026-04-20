import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, Easing, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { height } = Dimensions.get("window");

export interface GemProps {
  x: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
  isLight: boolean;
}

const FloatingGem: React.FC<GemProps> = ({
  x,
  size,
  delay,
  duration,
  opacity,
  isLight,
}) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = () => {
      translateY.setValue(0);
      rotate.setValue(0);

      Animated.parallel([
        Animated.timing(translateY, {
          toValue: -height,
          duration,
          delay,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(rotate, {
          toValue: 1,
          duration,
          delay,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]).start(() => loop());
    };

    loop();
  }, [delay, duration, rotate, translateY]);

  const spin = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const animatedOpacity = translateY.interpolate({
    inputRange: [-height, -height * 0.7, -height * 0.15, 0],
    outputRange: [0, isLight ? opacity * 0.45 : opacity, isLight ? opacity * 0.45 : opacity, 0],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      pointerEvents="none"
      style={{
        position: "absolute",
        left: x,
        bottom: 30,
        opacity: animatedOpacity,
        transform: [{ translateY }, { rotate: spin }],
      }}
    >
      <LinearGradient
        colors={
          isLight
            ? ["#D1FAE5", "#6EE7B7", "#10B981", "#059669"]
            : ["#10B981", "#059669", "#064E3B", "#022C22"]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          width: size,
          height: size,
          transform: [{ rotate: "45deg" }],
          borderRadius: size * 0.12,
        }}
      />
      <View
        style={{
          position: "absolute",
          width: size * 0.28,
          height: size * 0.28,
          borderRadius: 2,
          backgroundColor: "rgba(255,255,255,0.8)",
          top: size * 0.15,
          left: size * 0.2,
          transform: [{ rotate: "45deg" }],
        }}
      />
    </Animated.View>
  );
};

export default FloatingGem;