import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

interface Props {
  item: {
    title: string;
    subtitle: string;
    icon: string;
    accent: string;
    softAccent: string;
    route: string;
  };
  index: number;
  colors: any;
  isLight: boolean;
  onPress: () => void;
}

const MenuCard: React.FC<Props> = ({ item, index, colors, isLight, onPress }) => {
  const pressAnim = useRef(new Animated.Value(0)).current;
  const mountAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(mountAnim, {
      toValue: 1,
      delay: index * 80,
      friction: 8,
      tension: 70,
      useNativeDriver: true,
    }).start();
  }, [index, mountAnim]);

  const handlePressIn = () => {
    Animated.spring(pressAnim, {
      toValue: 1,
      friction: 7,
      tension: 90,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(pressAnim, {
      toValue: 0,
      friction: 7,
      tension: 90,
      useNativeDriver: true,
    }).start();
  };

  const scale = pressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.97],
  });

  const pressTranslateY = pressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 2],
  });

  const opacity = mountAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const mountTranslateY = mountAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0],
  });

  const cardWidth = (width - 56) / 2;

  return (
    <Animated.View
      style={{
        width: cardWidth,
        height: 158,
        opacity,
        transform: [{ translateY: mountTranslateY }, { scale }, { translateY: pressTranslateY }],
      }}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={{
          flex: 1,
          backgroundColor: colors.card,
          borderRadius: 24,
          padding: 16,
          borderWidth: 1,
          borderColor: colors.border,
          justifyContent: "space-between",
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: isLight ? 0.08 : 0.2,
          shadowRadius: 18,
          elevation: 4,
        }}
      >
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: 16,
            backgroundColor: item.softAccent,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MaterialCommunityIcons
            name={item.icon as any}
            size={24}
            color={item.accent}
          />
        </View>

        <View>
          <Text
            style={{
              color: colors.text,
              fontSize: 17,
              fontWeight: "800",
            }}
          >
            {item.title}
          </Text>
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: 12,
              marginTop: 4,
              lineHeight: 16,
            }}
          >
            {item.subtitle}
          </Text>
        </View>

        <MaterialCommunityIcons
          name={item.icon as any}
          size={68}
          color={isLight ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.05)"}
          style={{ position: "absolute", right: 10, bottom: 8 }}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default MenuCard;