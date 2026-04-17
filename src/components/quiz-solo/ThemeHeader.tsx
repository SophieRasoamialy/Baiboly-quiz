import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  styles: any;
  colors: any;
  total: number;
}

const ThemeHeader: React.FC<Props> = ({ styles, colors, total }) => {
  return (
    <View style={styles.hero}>
      <Text style={styles.eyebrow}>Misafidiana</Text>
      <Text style={styles.heroTitle}>Lohahevitra</Text>
      <Text style={styles.heroSubtitle}>
        Fanontaniana {total} miandry anao ho valiana amin'ny lalao.
      </Text>
    </View>
  );
};

export default ThemeHeader;