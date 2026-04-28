import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import i18n from "../../i18n";

interface Props {
  onPress: () => void;
  total: number;
  styles: any;
  colors: any;
}

const RandomThemeCard: React.FC<Props> = ({ onPress, total, styles, colors }) => {
  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={styles.sectionLabel}>{i18n.t("other_games")}</Text>
      <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={styles.randomCard}>
        <LinearGradient 
          colors={[colors.primary, colors.secondary]} 
          start={{ x: 0, y: 0 }} 
          end={{ x: 1, y: 1 }}
          style={styles.randomGradient}
        >
          <View style={styles.randomIconWrap}>
            <MaterialCommunityIcons name="dice-multiple" size={24} color="#fff" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.randomTitle}>{i18n.t("random_quiz_title")}</Text>
            <Text style={styles.randomSub}>{i18n.t("random_quiz_desc")}</Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#fff" style={styles.randomArrow} />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default RandomThemeCard;