import React from "react";
import { Image, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AVATAR_MAP } from "../../constants/avatar";

interface UserLobbyCardProps {
  username: string | null;
  avatar: string | null;
  churchName?: string;
  city?: string;
  styles: any;
  colors: any;
}

export const UserLobbyCard: React.FC<UserLobbyCardProps> = ({
  username,
  avatar,
  churchName,
  city,
  styles,
  colors,
}) => {
  return (
    <View style={styles.userCard}>
      <View style={styles.avatarCircle}>
        {avatar ? (
          <Image
            source={AVATAR_MAP[avatar as keyof typeof AVATAR_MAP] || AVATAR_MAP.david}
            style={styles.avatarImage}
          />
        ) : (
          <MaterialCommunityIcons name="account" size={32} color={colors.textMuted} />
        )}
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.welcomeText}>Efa vonona ve ianao?</Text>
        <Text style={styles.usernameText}>{username || "Mpitsidika"}</Text>

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
