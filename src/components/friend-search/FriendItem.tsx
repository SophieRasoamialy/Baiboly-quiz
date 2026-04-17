import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { AVATAR_MAP } from "../../constants/avatar";

interface FriendItemProps {
  item: any;
  onInvite: (friend: any) => void;
  styles: any;
  colors: any;
}

export const FriendItem: React.FC<FriendItemProps> = ({
  item,
  onInvite,
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
  );
};
