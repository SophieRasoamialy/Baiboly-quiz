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
            opacity: hasMedal ? 1 : 0.6,
            backgroundColor: hasMedal ? colors.card : colors.surfaceSoft,
          },
        ]}
      >
        <View
          style={[
            styles.medalIconWrap,
            {
              backgroundColor: hasMedal ? `${medal.color}20` : "rgba(0,0,0,0.05)",
              borderColor: hasMedal ? `${medal.color}40` : colors.border,
            },
          ]}
        >
          <MaterialCommunityIcons
            name={(hasMedal ? medal.icon : "lock") as any}
            size={28}
            color={hasMedal ? medal.color : colors.textMuted}
          />
        </View>

        <Text
          style={[
            styles.medalName,
            { 
              color: hasMedal ? colors.text : colors.textMuted,
              fontWeight: hasMedal ? "900" : "600" 
            },
          ]}
        >
          {medal.name}
        </Text>

        {hasMedal ? (
          <View
            style={[
              styles.medalBadge,
              { backgroundColor: `${medal.color}25` },
            ]}
          >
            <Text style={[styles.medalBadgeText, { color: medal.color, fontSize: 10, fontWeight: "900" }]}>
              AZONAO
            </Text>
          </View>
        ) : (
           <View
            style={[
              styles.medalBadge,
              { backgroundColor: colors.surfaceSoft, opacity: 0.5 },
            ]}
          >
            <Text style={[styles.medalBadgeText, { color: colors.textMuted, fontSize: 10, fontWeight: "700" }]}>
              Mbola mihidy
            </Text>
          </View>
        )}
      </View>
    </Animated.View>
  );
};

export default MedalCard;