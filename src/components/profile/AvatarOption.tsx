import React, { useEffect, useRef } from "react";
import { Animated, Image, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  styles: any;
  item: any;
  isSelected: boolean;
  index: number;
  colors: any;
  onPress: () => void;
}

function AvatarOption({
  styles,
  item,
  isSelected,
  index,
  colors,
  onPress,
}: Props) {
  const mountAnim = useRef(new Animated.Value(0)).current;
  const pressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(mountAnim, {
      toValue: 1,
      delay: 500 + index * 60,
      friction: 7,
      tension: 70,
      useNativeDriver: true,
    }).start();
  }, [index, mountAnim]);

  const handlePressIn = () => {
    Animated.spring(pressAnim, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(pressAnim, {
      toValue: 0,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  const scale = pressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.95],
  });

  return (
    <Animated.View
      style={{
        opacity: mountAnim,
        transform: [
          {
            scale: mountAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.7, 1],
            }),
          },
          { scale },
        ],
      }}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.avatarOption,
          {
            borderColor: isSelected ? colors.secondary : colors.border,
            backgroundColor: isSelected ? colors.secondarySoft : colors.surfaceSoft,
            shadowColor: isSelected ? colors.secondary : "transparent",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 10,
            elevation: isSelected ? 8 : 2,
          },
        ]}
      >
        <Image
          source={item.img}
          style={{
            width: "65%",
            height: "65%",
            resizeMode: "contain",
          }}
        />

        <Text style={styles.avatarName}>
          {item.id.charAt(0).toUpperCase() + item.id.slice(1)}
        </Text>

        {isSelected && (
          <View style={styles.avatarCheck}>
            <MaterialCommunityIcons
              name="check-circle"
              size={20}
              color={colors.secondary}
            />
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default AvatarOption;