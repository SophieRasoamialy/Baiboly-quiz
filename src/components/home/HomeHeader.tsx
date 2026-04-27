import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AVATAR_MAP } from "../../constants/avatar";
import UserAvatar from "../ui/UserAvatar";

interface Props {
  styles: any;
  colors: any;
  gems: number;
  hearts: number;
  nextRefillIn: number;
  avatar?: string | null;
  isLoggedIn: boolean;
  points: number;
  onPressProfile: () => void;
  onPressHeart: () => void;
}

const HomeHeader: React.FC<Props> = ({
  styles,
  colors,
  gems,
  hearts,
  nextRefillIn,
  avatar,
  isLoggedIn,
  points,
  onPressProfile,
  onPressHeart,
}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.avatarBtn} onPress={onPressProfile} activeOpacity={0.8}>
        <UserAvatar 
          avatar={isLoggedIn ? avatar : null} 
          size={46} 
          borderWidth={2}
          points={isLoggedIn ? points : 0}
        />
      </TouchableOpacity>

      <View style={styles.userStats}>
        <View style={styles.statPill}>
          <MaterialCommunityIcons name="diamond-stone" size={14} color={colors.primary} />
          <Text style={styles.statText}>{gems}</Text>
        </View>

        <View style={styles.statPill}>
          <MaterialCommunityIcons
            name="trophy-variant"
            size={14}
            color={isLoggedIn ? "#F59E0B" : colors.textMuted}
          />
          <Text style={[styles.statText, !isLoggedIn && { color: colors.textMuted }]}>
            {points}
          </Text>
        </View>

        <TouchableOpacity style={styles.statPill} onPress={onPressHeart} activeOpacity={0.8}>
          <MaterialCommunityIcons name="heart" size={14} color={colors.accent} />
          <Text style={styles.statText}>{hearts}</Text>

          {hearts < 5 && (
            <Text style={styles.timerText}>
              {Math.floor(nextRefillIn / 60)}:{(nextRefillIn % 60).toString().padStart(2, "0")}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeHeader;