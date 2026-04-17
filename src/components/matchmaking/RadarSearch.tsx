import React, { useEffect, useRef } from "react";
import { Animated, Easing, Image, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useUser } from "../../context/user";
import { useAppTheme } from "../../hooks/useAppTheme";
import { AVATAR_MAP } from "../../constants/avatar";
import { createMatchmakingStyles } from "../../screens/matchmaking/matchmaking.styles";

interface RadarSearchProps {
  mode: string;
  friendName?: string;
}

export const RadarSearch: React.FC<RadarSearchProps> = ({ mode, friendName }) => {
  const { avatar } = useUser();
  const { colors } = useAppTheme();
  const styles = createMatchmakingStyles(colors);
  
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <>
      <View style={styles.radarContainer}>
        <Animated.View style={[styles.radarLine, { transform: [{ rotate }] }]} />
        
        <View style={styles.centerAvatar}>
          {avatar ? (
            <Image
              source={AVATAR_MAP[avatar as keyof typeof AVATAR_MAP] || AVATAR_MAP.david}
              style={styles.avatarImg}
            />
          ) : (
            <MaterialCommunityIcons name="account" size={40} color={colors.textMuted} />
          )}
        </View>
      </View>

      <Text style={styles.statusTitle}>
        {mode === "invite" ? "Miantso namana..." : "Mikaroka mpilalao..."}
      </Text>
      
      <Text style={styles.statusSub}>
        {mode === "invite" 
          ? `Miandry an'i ${friendName} hanaiky ny antsonao...` 
          : "Mitady mpilalao sahaza anao amin'ity lalao ity ny rafitra."}
      </Text>
    </>
  );
};
