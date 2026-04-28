import React from "react";
import { Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import i18n from "../../i18n";

interface Props {
  styles: any;
  colors: any;
}

function AuthRewardCard({ styles, colors }: Props) {
  return (
    <View style={styles.rewardCard}>
      <View style={styles.rewardRow}>
        <View
          style={[
            styles.rewardIconWrap,
            { backgroundColor: colors.primarySoft },
          ]}
        >
          <MaterialCommunityIcons
            name="gift-outline"
            size={24}
            color={colors.primary}
          />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.rewardTitle}>{i18n.t("welcome_bonus_title")}</Text>
          <Text style={styles.rewardSubtitle}>
            {i18n.t("welcome_bonus_subtitle")}
          </Text>
        </View>

        <View
          style={[
            styles.rewardBadge,
            { backgroundColor: colors.primarySoft },
          ]}
        >
          <Text style={[styles.rewardBadgeText, { color: colors.primary }]}>50</Text>
          <MaterialCommunityIcons
            name="diamond-stone"
            size={14}
            color={colors.primary}
          />
        </View>
      </View>
    </View>
  );
};

export default AuthRewardCard;