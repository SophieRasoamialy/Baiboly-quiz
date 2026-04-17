import React from "react";
import { View } from "react-native";
import ProfileStatCard from "./ProfileStatCard";

interface Props {
  styles: any;
  gems: number;
  medalCount: number;
  colors: any;
}

const ProfileStats: React.FC<Props> = ({ styles, gems, medalCount, colors }) => {
  return (
    <View style={styles.statsRow}>
      <ProfileStatCard
        styles={styles}
        icon="diamond-stone"
        iconColor={colors.secondary}
        label="Vato soa"
        value={gems}
        accentBg={colors.secondarySoft}
        accentBorder={colors.border}
        mountDelay={200}
      />

      <ProfileStatCard
        styles={styles}
        icon="medal"
        iconColor={colors.primary}
        label="Meday"
        value={medalCount}
        accentBg={colors.primarySoft}
        accentBorder={colors.border}
        mountDelay={300}
      />
    </View>
  );
};

export default ProfileStats;