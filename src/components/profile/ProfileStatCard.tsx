import React, { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  styles: any;
  icon: string;
  iconColor: string;
  label: string;
  value: number;
  accentBg: string;
  accentBorder: string;
  mountDelay: number;
}

const ProfileStatCard: React.FC<Props> = ({
  styles,
  icon,
  iconColor,
  label,
  value,
  accentBg,
  accentBorder,
  mountDelay,
}) => {
  const mountAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(mountAnim, {
      toValue: 1,
      delay: mountDelay,
      friction: 7,
      tension: 70,
      useNativeDriver: true,
    }).start();
  }, [mountAnim, mountDelay]);

  return (
    <Animated.View
      style={{
        width: "31%",
        opacity: mountAnim,
        transform: [
          {
            scale: mountAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.85, 1],
            }),
          },
        ],
      }}
    >
      <View style={styles.statCard}>
        <View
          style={[
            styles.statIconWrap,
            {
              backgroundColor: accentBg,
              borderColor: accentBorder,
            },
          ]}
        >
          <MaterialCommunityIcons name={icon as any} size={24} color={iconColor} />
        </View>

        <Text style={styles.statLabel}>{label}</Text>
        <Text style={styles.statValue}>{value}</Text>
      </View>
    </Animated.View>
  );
};

export default ProfileStatCard;