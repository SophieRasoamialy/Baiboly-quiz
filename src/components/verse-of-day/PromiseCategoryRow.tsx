import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { PromiseCategory } from "../../constants/promises";

interface Props {
  styles: any;
  colors: any;
  category: PromiseCategory;
  isOpen: boolean;
  onPress: () => void;
}

const PromiseCategoryRow: React.FC<Props> = ({
  styles,
  colors,
  category,
  isOpen,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[styles.categoryRow, isOpen && styles.categoryRowActive]}
    >
      <View style={styles.categoryRowLeft}>
        <Text style={styles.categoryRowEmoji}>{category.emoji}</Text>

        <View>
          <Text style={styles.categoryRowTitle}>{category.category}</Text>
          <Text style={styles.categoryRowSubtitle}>
            {category.verses.length} teny fikasana
          </Text>
        </View>
      </View>

      <MaterialCommunityIcons
        name={isOpen ? "chevron-down" : "chevron-right"}
        size={22}
        color={isOpen ? colors.primary : "rgba(255,255,255,0.35)"}
      />
    </TouchableOpacity>
  );
};

export default PromiseCategoryRow;