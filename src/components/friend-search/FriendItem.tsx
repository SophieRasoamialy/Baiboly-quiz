import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AVATAR_MAP } from "../../constants/avatar";

interface FriendItemProps {
  item: any;
  onInvite: (friend: any) => void;
  onAddFriend?: (friend: any) => void;
  isFriend?: boolean;
  styles: any;
  colors: any;
}

export const FriendItem: React.FC<FriendItemProps> = ({
  item,
  onInvite,
  onAddFriend,
  isFriend,
  styles,
  colors,
}) => {
  return (
    <View style={styles.userItem}>
      <View style={styles.avatarWrapper}>
        <Image
          source={AVATAR_MAP[item.avatar as keyof typeof AVATAR_MAP] || AVATAR_MAP.david}
          style={styles.itemAvatar}
        />
        <View
          style={[
            styles.statusDot,
            item.status === "online" ? styles.statusOnline : styles.statusOffline,
          ]}
        />
      </View>

      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userChurch} numberOfLines={1}>
          {item.church} • {item.city}
        </Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        {onAddFriend && (
          <TouchableOpacity
            style={[styles.addFriendBtn, isFriend && styles.addFriendBtnActive]}
            onPress={() => onAddFriend(item)}
            disabled={isFriend}
          >
            <MaterialCommunityIcons
              name={isFriend ? "account-check" : "account-plus-outline"}
              size={20}
              color={isFriend ? colors.primary : colors.textMuted}
            />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.inviteBtn, item.status !== "online" && styles.inviteBtnDisabled]}
          onPress={() => onInvite(item)}
          disabled={item.status !== "online"}
        >
          <Text style={[styles.inviteText, item.status !== "online" && styles.inviteTextDisabled]}>
            ASAO
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
