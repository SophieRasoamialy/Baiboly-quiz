import React from "react";
import { ScrollView, Text, View } from "react-native";
import i18n from "../../i18n";
import MedalCard from "./MedalCard";
import { ALL_MEDALS } from "../../constants/profile";

interface Props {
  styles: any;
  colors: any;
  medals: string[];
}

const MedalSection: React.FC<Props> = ({ styles, colors, medals }) => {
  return (
    <View style={styles.sectionWrap}>
      <View style={styles.sectionTitleRow}>
        <View style={[styles.sectionMarker, { backgroundColor: colors.primary }]} />
        <Text style={styles.sectionTitle}>{i18n.t("medals_count")}</Text>

        <View
          style={[
            styles.countBadge,
            {
              backgroundColor: colors.primarySoft,
              borderColor: colors.border,
            },
          ]}
        >
          <Text style={[styles.countBadgeText, { color: colors.primary }]}>
            {medals.length}/{ALL_MEDALS.length}
          </Text>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.medalsScroll}
      >
        {ALL_MEDALS.map((medal, index) => (
          <MedalCard
            key={medal.id}
            styles={styles}
            medal={medal}
            hasMedal={medals.includes(medal.id)}
            index={index}
            colors={colors}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default MedalSection;