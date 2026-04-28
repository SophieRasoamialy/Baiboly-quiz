import React from "react";
import { Text, View } from "react-native";
import i18n from "../../i18n";

interface Props {
  colors: any;
  styles: any;
}

const HomeHero: React.FC<Props> = ({ colors, styles }) => {
  return (
    <View style={styles.heroContainer}>
      <Text style={styles.heroGreeting}>{i18n.t("hero_greeting")}</Text>

      <Text style={styles.heroTitle}>
        {i18n.t("hero_title")}
      </Text>

      <Text style={styles.heroSubtitle}>
        {i18n.t("hero_desc")}
      </Text>
    </View>
  );
};

export default HomeHero;