import React from "react";
import { Switch, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SettingsCard from "./SettingsCard";

interface Props {
  styles: any;
  colors: any;
  soundEnabled: boolean;
  notificationEnabled: boolean;
  onToggleSound: (value: boolean) => void;
  onToggleNotification: (value: boolean) => void;
}

const PreferencesCard: React.FC<Props> = ({
  styles,
  colors,
  soundEnabled,
  notificationEnabled,
  onToggleSound,
  onToggleNotification,
}) => {
  return (
    <SettingsCard styles={styles}>
      <View style={styles.row}>
        <View style={styles.rowLeft}>
          <View
            style={[
              styles.rowIconWrap,
              { backgroundColor: colors.surfaceSoft },
            ]}
          >
            <MaterialCommunityIcons
              name="volume-high"
              size={20}
              color={colors.textSecondary}
            />
          </View>

          <View style={styles.rowTextWrap}>
            <Text style={styles.rowTitle}>Feo</Text>
            <Text style={styles.rowSubtitle}>Alefa na ajanona ny feon’ny lalao</Text>
          </View>
        </View>

        <Switch
          value={soundEnabled}
          onValueChange={onToggleSound}
          trackColor={{ false: "#767577", true: colors.primary }}
          thumbColor={colors.white}
        />
      </View>

      <View style={styles.separator} />

      <View style={styles.row}>
        <View style={styles.rowLeft}>
          <View
            style={[
              styles.rowIconWrap,
              { backgroundColor: colors.surfaceSoft },
            ]}
          >
            <MaterialCommunityIcons
              name="bell-outline"
              size={20}
              color={colors.textSecondary}
            />
          </View>

          <View style={styles.rowTextWrap}>
            <Text style={styles.rowTitle}>Fampilazana</Text>
            <Text style={styles.rowSubtitle}>Mahazoa fanairana sy vaovao vaovao</Text>
          </View>
        </View>

        <Switch
          value={notificationEnabled}
          onValueChange={onToggleNotification}
          trackColor={{ false: "#767577", true: colors.primary }}
          thumbColor={colors.white}
        />
      </View>
    </SettingsCard>
  );
};

export default PreferencesCard;