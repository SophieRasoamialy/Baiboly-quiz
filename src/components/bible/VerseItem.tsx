import React, { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";

interface Props {
  styles: any;
  item: {
    verse: number;
    text: string;
    title?: string;
  };
  index: number;
  isHighlighted?: boolean;
  colors: any;
}

const VerseItem: React.FC<Props> = ({ styles, item, index, isHighlighted, colors }) => {
  const mountAnim = useRef(new Animated.Value(0)).current;
  const highlightAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(mountAnim, {
      toValue: 1,
      delay: Math.min(index * 15, 400),
      duration: 300,
      useNativeDriver: true,
    }).start();

    if (isHighlighted) {
      Animated.sequence([
        Animated.timing(highlightAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(highlightAnim, {
          toValue: 0.2,
          duration: 1000,
          delay: 2000,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [index, isHighlighted, mountAnim, highlightAnim]);

  const backgroundColor = highlightAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["transparent", "rgba(249,168,37,0.15)"],
  });

  return (
    <Animated.View
      style={[
        styles.verseContainer,
        {
          opacity: mountAnim,
          backgroundColor,
          borderRadius: 12,
          padding: isHighlighted ? 8 : 0,
          marginHorizontal: isHighlighted ? -8 : 0,
        },
      ]}
    >
      {item.title && !item.title.includes("[*]") && (
        <View style={styles.verseTitleRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.verseTitle}>{item.title}</Text>
          <View style={styles.dividerLine} />
        </View>
      )}

      <View style={styles.verseRow}>
        <View style={styles.verseNumberWrap}>
          <Text style={styles.verseNumberText}>{item.verse}</Text>
        </View>

        <Text style={styles.verseText}>{item.text}</Text>
      </View>
    </Animated.View>
  );
};

export default VerseItem;