import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  gems: number;
  styles: any;
  colors: any;
}

const GemsCounter: React.FC<Props> = ({ gems, styles, colors }) => {
  return (
    <View style={styles.statPill}>
      <MaterialCommunityIcons name="diamond-stone" size={16} color={colors.primary} />
      <Text style={styles.statText}>{gems}</Text>
    </View>
  );
};

export default GemsCounter;