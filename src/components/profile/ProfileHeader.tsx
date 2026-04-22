import React from "react";
import { Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import BackButton from "../ui/BackButton";

interface Props {
  styles: any;
  colors: any;
  onBack: () => void;
}

const ProfileHeader: React.FC<Props> = ({ styles, colors, onBack }) => {
  return (
    <View style={styles.headerWrap}>
      <View style={styles.headerRow}>
        <BackButton colors={colors} onPress={onBack} />

        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>Profiliko</Text>
        </View>
      </View>

      <View style={styles.dividerRow}>
        <View style={styles.dividerLine} />
        <MaterialCommunityIcons
          name="star-four-points"
          size={8}
          color={colors.secondary}
        />
        <View style={styles.dividerLine} />
      </View>
    </View>
  );
};

export default ProfileHeader;