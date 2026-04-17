import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  styles: any;
  colors: any;
  title: string;
  onBack: () => void;
}

const VerseDayHeader: React.FC<Props> = ({ styles, colors, title, onBack }) => {
  return (
    <View style={styles.navBar}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <MaterialCommunityIcons name="arrow-left" size={28} color={colors.text} />
      </TouchableOpacity>

      <Text style={styles.navTitleText}>{title}</Text>

      <View style={{ width: 44 }} />
    </View>
  );
};

export default VerseDayHeader;