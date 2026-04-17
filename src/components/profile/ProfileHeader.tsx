import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  styles: any;
  colors: any;
  onBack: () => void;
}

const ProfileHeader: React.FC<Props> = ({ styles, colors, onBack }) => {
  return (
    <View style={styles.headerWrap}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={22} color={colors.text} />
        </TouchableOpacity>

        <View style={{ flex: 1 }}>
          <Text style={styles.headerEyebrow}>Mpiara-milalao</Text>
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