import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { PromiseVerse } from "../../constants/promises";

interface Props {
  styles: any;
  colors: any;
  verse: PromiseVerse;
  isSelected: boolean;
  onPress: () => void;
}

const PromiseVerseRow: React.FC<Props> = ({
  styles,
  colors,
  verse,
  isSelected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.verseRow, isSelected && styles.verseRowSelected]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.verseRowText}>
        <Text style={styles.verseRowReference}>{verse.reference}</Text>
        <Text style={styles.verseRowSummary}>{verse.promise || verse.text}</Text>
      </View>

      {isSelected ? (
        <View style={styles.selectedPill}>
          <Text style={styles.selectedPillText}>Aseho</Text>
        </View>
      ) : (
        <MaterialCommunityIcons
          name="chevron-right"
          size={18}
          color="rgba(255,255,255,0.25)"
        />
      )}
    </TouchableOpacity>
  );
};

export default PromiseVerseRow;