import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  styles: any;
  colors: any;
  onBack: () => void;
}

const SettingsHeader: React.FC<Props> = ({ styles, colors, onBack }) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={22}
            color={colors.text}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>
      <Text style={styles.headerSubtitle}>
        Ataovy araka izay itiavanao azy ny fisehon’ny app sy ny safidy fototra.
      </Text>
    </View>
  );
};

export default SettingsHeader;