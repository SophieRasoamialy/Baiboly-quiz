import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import BackButton from "../ui/BackButton";

interface Props {
  styles: any;
  colors: any;
  title: string;
  onBack: () => void;
}

const VerseDayHeader: React.FC<Props> = ({ styles, colors, title, onBack }) => {
  return (
    <View style={styles.navBar}>
      <BackButton colors={colors} onPress={onBack} size={28} />

      <Text style={styles.navTitleText}>{title}</Text>
    </View>
  );
};

export default VerseDayHeader;