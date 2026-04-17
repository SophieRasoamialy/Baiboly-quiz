import React, { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  styles: any;
  medal: {
    id: string;
    name: string;
    color: string;
    icon: string;
  };
  hasMedal: boolean;
  index: number;
  colors: any;
}

const MedalCard: React.FC<Props> = ({ styles, medal, hasMedal, index, colors }) => {
  const mountAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(mountAnim, {
      toValue: 1,
      delay: 400 + index * 80,
      friction: 7,
      tension: 70,
      useNativeDriver: true,
    }).start();
  }, [index, mountAnim]);

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
        ],
      }}
    >
      <View
        style={[
          styles.medalCard,
          {
            borderColor: hasMedal ? medal.color : colors.border,
          },
        ]}
      >
        <View
          style={[
            styles.medalIconWrap,
            {
              backgroundColor: hasMedal ? `${medal.color}25` : colors.surfaceSoft,
              borderColor: hasMedal ? `${medal.color}50` : colors.border,
            },
          ]}
        >
          <MaterialCommunityIcons
            name={(hasMedal ? medal.icon : "lock-outline") as any}
            size={28}
            color={hasMedal ? medal.color : colors.textMuted}
          />
        </View>

        <Text
          style={[
            styles.medalName,
            { color: hasMedal ? colors.text : colors.textMuted },
          ]}
        >
          {medal.name}
        </Text>

        {hasMedal && (
          <View
            style={[
              styles.medalBadge,
              { backgroundColor: `${medal.color}30` },
            ]}
          >
            <Text style={[styles.medalBadgeText, { color: medal.color }]}>
              AZONAO
            </Text>
          </View>
        )}
      </View>
    </Animated.View>
  );
};

export default MedalCard;