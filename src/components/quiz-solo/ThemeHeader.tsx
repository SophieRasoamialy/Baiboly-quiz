import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import i18n from "../../i18n";

interface Props {
  styles: any;
  colors: any;
  total: number;
}

const ThemeHeader: React.FC<Props> = ({ styles, colors, total }) => {
  return (
    <View style={styles.hero}>
      <Text style={styles.eyebrow}>{i18n.t("choose_theme_eyebrow")}</Text>
      <Text style={styles.heroTitle}>{i18n.t("choose_theme_title")}</Text>
      <Text style={styles.heroSubtitle}>
        {i18n.t("choose_theme_subtitle", { count: total })}
      </Text>
    </View>
  );
};

export default ThemeHeader;