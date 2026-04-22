import React from "react";
import { Text, View } from "react-native";
import { AVATARS } from "../../constants/avatar";
import AuthAvatarOption from "./AuthAvatarOption";

interface Props {
  styles: any;
  colors: any;
  selectedAvatar: string;
  onSelectAvatar: (avatarId: string) => void;
}

function AuthAvatarPicker({
  styles,
  colors,
  selectedAvatar,
  onSelectAvatar,
}: Props) {
  return (
    <View style={{ marginTop: 8 }}>
      {/* Section Header — matches Profile AvatarSection style */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginBottom: 16,
          marginTop: 6,
        }}
      >
        <View
          style={{
            width: 4,
            height: 20,
            borderRadius: 2,
            backgroundColor: colors.secondary,
          }}
        />
        <Text
          style={{
            color: colors.text,
            fontSize: 16,
            fontWeight: "800",
            letterSpacing: 0.3,
          }}
        >
          Misafidiana Sary
        </Text>
      </View>

      {/* Avatar Grid */}
      <View style={styles.avatarGrid}>
        {AVATARS.map((item, index) => (
          <AuthAvatarOption
            key={item.id}
            styles={styles}
            item={item}
            isSelected={selectedAvatar === item.id}
            index={index}
            colors={colors}
            onPress={() => onSelectAvatar(item.id)}
          />
        ))}
      </View>
    </View>
  );
}

export default AuthAvatarPicker;