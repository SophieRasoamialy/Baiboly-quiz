import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import i18n from "../../i18n";

interface Props {
  styles: any;
  colors: any;
  onPressAuth: () => void;
}

const GuestCard: React.FC<Props> = ({ styles, colors, onPressAuth }) => {
  return (
    <View style={styles.guestCard}>
      <View style={styles.giftBanner}>
        <LinearGradient
          colors={[colors.secondary, colors.mode === "light" ? "#FBBF24" : "#B45309"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.giftBannerContent}
        >
          <View style={styles.giftIconWrap}>
            <MaterialCommunityIcons name="gift" size={24} color="#0D0B15" />
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: "#0D0B15",
                fontSize: 13,
                fontWeight: "900",
              }}
            >
              {i18n.t("gift_50_gems")}
            </Text>
            <Text
              style={{
                color: "rgba(0,0,0,0.6)",
                fontSize: 11,
                fontWeight: "600",
                marginTop: 2,
              }}
            >
              {i18n.t("create_account_to_get")}
            </Text>
          </View>
        </LinearGradient>
      </View>

      <Text style={styles.guestTitle}>{i18n.t("no_account_yet")}</Text>
      <Text style={styles.guestText}>
        {i18n.t("guest_desc")}
      </Text>

      <TouchableOpacity activeOpacity={0.88} onPress={onPressAuth} style={styles.primaryCta}>
        <LinearGradient
          colors={[colors.primary, colors.mode === "light" ? "#34D399" : "#065F46"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.primaryCtaInner}
        >
          <MaterialCommunityIcons name="login" size={20} color="#0D0B15" />
          <Text
            style={{
              color: "#0D0B15",
              fontSize: 16,
              fontWeight: "900",
              letterSpacing: 0.4,
            }}
          >
            {i18n.t("create_account_btn")}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default GuestCard;