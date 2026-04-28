import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AVATAR_MAP } from "../../constants/avatar";
import i18n from "../../i18n";
import UserAvatar from "../ui/UserAvatar";

interface UserLobbyCardProps {
  username: string | null;
  avatar: string | null;
  points?: number;
  churchName?: string | null;
  city?: string | null;
  styles: any;
  colors: any;
  isLoggedIn: boolean;
  onLoginPress?: () => void;
}

export const UserLobbyCard: React.FC<UserLobbyCardProps> = ({
  username,
  avatar,
  points = 0,
  churchName,
  city,
  styles,
  colors,
  isLoggedIn,
  onLoginPress,
}) => {
  return (
    <View style={styles.userCard}>
      <UserAvatar 
        avatar={isLoggedIn ? avatar : null} 
        size={62} 
        borderWidth={2}
        points={isLoggedIn ? points : 0}
      />

      <View style={{ flex: 1 }}>
        <Text style={styles.welcomeText}>
          {username ? i18n.t("ready_msg") : i18n.t("welcome_msg")}
        </Text>
        <Text style={styles.usernameText}>{username || i18n.t("visitor")}</Text>

        {!username && onLoginPress && (
          <TouchableOpacity onPress={onLoginPress} style={styles.loginBtn}>
            <Text style={styles.loginBtnText}>{i18n.t("login_btn")}</Text>
          </TouchableOpacity>
        )}

        {(churchName || city) && (
          <View style={styles.badgeRow}>
            {churchName && (
              <View style={styles.infoBadge}>
                <MaterialCommunityIcons name="church" size={10} color={colors.secondary} />
                <Text style={styles.badgeText}>{churchName}</Text>
              </View>
            )}
            {city && (
              <View style={styles.infoBadge}>
                <MaterialCommunityIcons name="map-marker" size={10} color={colors.secondary} />
                <Text style={styles.badgeText}>{city}</Text>
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
};
