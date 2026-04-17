import React from "react";
import { View } from "react-native";

interface Props {
  styles: any;
  children: React.ReactNode;
}

const SettingsCard: React.FC<Props> = ({ styles, children }) => {
  return <View style={styles.card}>{children}</View>;
};

export default SettingsCard;