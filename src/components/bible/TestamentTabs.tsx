import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  styles: any;
  activeTab: "OT" | "NT";
  otCount: number;
  ntCount: number;
  onChangeTab: (tab: "OT" | "NT") => void;
}

const TestamentTabs: React.FC<Props> = ({
  styles,
  activeTab,
  otCount,
  ntCount,
  onChangeTab,
}) => {
  return (
    <View style={styles.tabWrap}>
      {(["OT", "NT"] as const).map((tab) => {
        const isActive = activeTab === tab;
        const label = tab === "OT" ? "Testamenta Taloha" : "Testamenta Vaovao";
        const count = tab === "OT" ? otCount : ntCount;

        return (
          <TouchableOpacity
            key={tab}
            onPress={() => onChangeTab(tab)}
            style={styles.tabItem}
            activeOpacity={0.85}
          >
            {isActive ? (
              <LinearGradient
                colors={
                  tab === "OT"
                    ? ["#FBBF24", "#F59E0B"]
                    : ["#34D399", "#10B981"]
                }
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderRadius: 14,
                }}
              />
            ) : null}

            <Text
              style={[
                styles.tabLabel,
                { color: isActive ? "#fff" : "rgba(255,255,255,0.45)" },
              ]}
            >
              {label}
            </Text>

            <Text
              style={[
                styles.tabSubLabel,
                { color: isActive ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.25)" },
              ]}
            >
              {count} boky
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TestamentTabs;