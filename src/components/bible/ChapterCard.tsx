import React, { useEffect, useRef } from "react";
import { Animated, Text, TouchableOpacity } from "react-native";

interface Props {
  styles: any;
  item: { chapter: number };
  index: number;
  onPress: () => void;
}

const ChapterCard: React.FC<Props> = ({ styles, item, index, onPress }) => {
  const mountAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(mountAnim, {
      toValue: 1,
      delay: index * 25,
      friction: 7,
      tension: 80,
      useNativeDriver: true,
    }).start();
  }, [index, mountAnim]);

  return (
    <Animated.View
      style={{
        opacity: mountAnim,
        transform: [{ scale: mountAnim }],
        marginRight: 10,
        marginBottom: 10,
      }}
    >
      <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.chapterItem}>
        <Text style={styles.chapterItemText}>{item.chapter}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default ChapterCard;