import React from "react";
import { Text, View } from "react-native";

interface Props {
  styles: any;
}

const SettingsHeader: React.FC<Props> = ({ styles }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Settings</Text>
      <Text style={styles.headerSubtitle}>
        Ataovy araka izay itiavanao azy ny fisehon’ny app sy ny safidy fototra.
      </Text>
    </View>
  );
};

export default SettingsHeader;