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

const AuthAvatarPicker: React.FC<Props> = ({
  styles,
  colors,
  selectedAvatar,
  onSelectAvatar,
}) => {
  return (
    <View>
      <Text style={styles.sectionLabel}>Misafidiana Sary</Text>

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
};

export default AuthAvatarPicker;