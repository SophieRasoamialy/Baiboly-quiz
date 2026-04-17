import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  hearts: number;
  styles: any;
  colors: any;
}

const HeartsBar: React.FC<Props> = ({ hearts, styles, colors }) => {
  return (
    <View style={styles.statPill}>
      <MaterialCommunityIcons name="heart" size={16} color={colors.accent} />
      <Text style={styles.statText}>{hearts}</Text>
    </View>
  );
};

export default HeartsBar;