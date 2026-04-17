import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AVATAR_MAP } from "../../constants/avatar";

interface Props {
  styles: any;
  colors: any;
  gems: number;
  hearts: number;
  nextRefillIn: number;
  avatar?: string | null;
  isLoggedIn: boolean;
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
  onPressProfile,
  onPressHeart,
}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.avatarBtn} onPress={onPressProfile} activeOpacity={0.8}>
        {isLoggedIn && avatar ? (
          <Image
            source={AVATAR_MAP[avatar] || AVATAR_MAP.david}
            style={{ width: "100%", height: "100%", borderRadius: 24 }}
          />
        ) : (
          <MaterialCommunityIcons name="account-circle" size={38} color={colors.text} />
        )}
      </TouchableOpacity>

      <View style={styles.userStats}>
        <View style={styles.statPill}>
          <MaterialCommunityIcons name="diamond-stone" size={14} color={colors.primary} />
          <Text style={styles.statText}>{gems}</Text>
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