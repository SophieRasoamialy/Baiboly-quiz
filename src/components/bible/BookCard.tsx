import React, { useEffect, useRef } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Book } from "../../constants/bible";

interface Props {
  styles: any;
  colors: any;
  item: Book;
  index: number;
  isOT: boolean;
  onPress: () => void;
}

const BookCard: React.FC<Props> = ({
  styles,
  colors,
  item,
  index,
  isOT,
  onPress,
}) => {
  const mountAnim = useRef(new Animated.Value(0)).current;
  const pressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(mountAnim, {
      toValue: 1,
      delay: (index % 20) * 40,
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
    outputRange: [1, 0.97],
  });

  const translateX = mountAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-24, 0],
  });

  const opacity = mountAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const accentColor = isOT ? colors.secondary : colors.primary;
  const badgeBg = isOT ? colors.secondarySoft : colors.primarySoft;
  const badgeBorder = colors.border;

  return (
    <Animated.View
      style={{
        opacity,
        transform: [{ translateX }, { scale }],
      }}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.bookCard}
      >
        <View style={styles.bookCardInner}>
          <View
            style={{
              width: 3,
              height: 36,
              borderRadius: 2,
              backgroundColor: accentColor,
              marginRight: 16,
              opacity: 0.8,
            }}
          />

          <Text style={[styles.bookIndex, { color: "rgba(255,255,255,0.25)" }]}>
            {String(index + 1).padStart(2, "0")}
          </Text>

          <Text style={styles.bookName}>{item.name}</Text>

          <View
            style={[
              styles.chapterBadge,
              {
                backgroundColor: badgeBg,
                borderColor: badgeBorder,
              },
            ]}
          >
            <Text style={[styles.chapterBadgeText, { color: accentColor }]}>
              {item.chapters.length} toko
            </Text>
          </View>

          <MaterialCommunityIcons
            name="chevron-right"
            size={20}
            color="rgba(255,255,255,0.3)"
          />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default BookCard;