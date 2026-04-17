import React from "react";
import { Text, View } from "react-native";

interface Props {
  title: string;
  styles: any;
  children: React.ReactNode;
}

const SettingsSection: React.FC<Props> = ({ title, styles, children }) => {
  return (
    <View style={styles.sectionWrapper}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
};

export default SettingsSection;