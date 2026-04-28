import React from "react";
import { Text, View } from "react-native";
import i18n from "../../i18n";

import BackButton from "../ui/BackButton";

interface Props {
  styles: any;
  colors: any;
  onBack: () => void;
}

const SettingsHeader: React.FC<Props> = ({ styles, colors, onBack }) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerRow}>
        <BackButton colors={colors} onPress={onBack} />
        <Text style={styles.headerTitle}>{i18n.t("settings")}</Text>
      </View>
    </View>
  );
};

export default SettingsHeader;