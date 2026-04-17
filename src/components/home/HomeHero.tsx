import React from "react";
import { Text, View } from "react-native";

interface Props {
  colors: any;
  styles: any;
}

const HomeHero: React.FC<Props> = ({ colors, styles }) => {
  return (
    <View style={styles.welcomeSection}>
      <Text style={styles.eyebrow}>Ho tsara ny andro</Text>

      <Text style={[styles.heroTitle, { color: colors.text }]}>
        Baiboly Quiz
      </Text>

      <Text style={[styles.heroSubtitle, { color: colors.textMuted }]}>
        Mianara, milalao, ary mihaika namana amin’ny fomba tsotra sy mahafinaritra.
      </Text>
    </View>
  );
};

export default HomeHero;