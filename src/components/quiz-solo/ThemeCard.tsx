import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import i18n from "../../i18n";

interface Props {
  item: any;
  onPress: () => void;
  styles: any;
  colors: any;
}

const ThemeCard: React.FC<Props> = ({ item, onPress, styles, colors }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.themeCard}>
      <View style={styles.themeIconWrap}>
        <MaterialCommunityIcons name={item.icon || "book-open-variant"} size={22} color={colors.primary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.themeTitle}>{item.title}</Text>
        <Text style={styles.themeSub}>
          {i18n.t("n_questions", { count: item.totalQuestions })}
        </Text>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textMuted} style={styles.themeArrow} />
    </TouchableOpacity>
  );
};

export default ThemeCard;