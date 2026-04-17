import React from "react";
import { Alert, Text, View } from "react-native";
import AvatarOption from "./AvatarOption";
import { AVATARS } from "../../constants/avatar";

interface Props {
  styles: any;
  colors: any;
  isLoggedIn: boolean;
  avatar: string;
  setAvatar: (avatar: string) => void;
}

const AvatarSection: React.FC<Props> = ({
  styles,
  colors,
  isLoggedIn,
  avatar,
  setAvatar,
}) => {
  return (
    <View style={styles.sectionWrap}>
      <View style={styles.sectionTitleRow}>
        <View style={[styles.sectionMarker, { backgroundColor: colors.secondary }]} />
        <Text style={styles.sectionTitle}>Misafidiana Sary</Text>

        {!isLoggedIn && (
          <View
            style={[
              styles.lockedBadge,
              {
                backgroundColor: colors.primarySoft,
                borderColor: colors.border,
              },
            ]}
          >
            <Text style={[styles.lockedBadgeText, { color: colors.primary }]}>
              🔒 MILA KAONTY
            </Text>
          </View>
        )}
      </View>

      <View style={styles.avatarGrid}>
        {AVATARS.map((item, index) => (
          <AvatarOption
            key={item.id}
            styles={styles}
            item={item}
            isSelected={avatar === item.id}
            index={index}
            colors={colors}
            onPress={() => {
              if (!isLoggedIn) {
                Alert.alert(
                  "Mila Kaonty",
                  "Mamorona kaonty hahafahanao misafidy sary manokana ho anao.",
                );
                return;
              }

              setAvatar(item.id);
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default AvatarSection;