import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  styles: any;
  colors: any;
  version: string;
  onPressShare?: () => void;
}

const AboutCard: React.FC<Props> = ({
  styles,
  colors,
  version,
  onPressShare,
}) => {
  return (
    <View style={styles.aboutCard}>
      <Text style={styles.aboutTitle}>Baiboly Quiz {version}</Text>
      <Text style={styles.aboutText}>
        Namboarina ho app tsotra, madio ary mahafinaritra hianarana ny Baiboly.
      </Text>

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPressShare}
        style={[
          styles.shareButton,
          {
            borderColor: colors.border,
            backgroundColor: colors.surfaceSoft,
          },
        ]}
      >
        <MaterialCommunityIcons
          name="share-variant-outline"
          size={18}
          color={colors.secondary}
        />
        <Text style={[styles.shareText, { color: colors.secondary }]}>
          Hizara ny lalao
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AboutCard;