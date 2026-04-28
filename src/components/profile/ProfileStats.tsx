import React from "react";
import { View } from "react-native";
import ProfileStatCard from "./ProfileStatCard";
import i18n from "../../i18n";

interface Props {
  styles: any;
  gems: number;
  medalCount: number;
  points: number;
  colors: any;
}

const ProfileStats: React.FC<Props> = ({ styles, gems, medalCount, points, colors }) => {
  return (
    <View style={styles.statsRow}>
      <ProfileStatCard
        styles={styles}
        icon="diamond-stone"
        iconColor={colors.secondary}
        label={i18n.t("gems")}
        value={gems}
        accentBg={colors.secondarySoft}
        accentBorder={colors.border}
        mountDelay={200}
      />

      <ProfileStatCard
        styles={styles}
        icon="trophy-variant"
        iconColor="#F59E0B"
        label={i18n.t("points")}
        value={points}
        accentBg="rgba(245, 158, 11, 0.12)"
        accentBorder={colors.border}
        mountDelay={250}
      />

      <ProfileStatCard
        styles={styles}
        icon="medal"
        iconColor={colors.primary}
        label={i18n.t("medals")}
        value={medalCount}
        accentBg={colors.primarySoft}
        accentBorder={colors.border}
        mountDelay={300}
      />
    </View>
  );
};

export default ProfileStats;