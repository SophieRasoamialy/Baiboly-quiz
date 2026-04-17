import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { THEME_OPTIONS, ThemeMode } from "../../constants/settings";

interface Props {
  styles: any;
  colors: any;
  currentTheme: ThemeMode;
  onChangeTheme: (theme: ThemeMode) => void;
}

const ThemeSelector: React.FC<Props> = ({
  styles,
  colors,
  currentTheme,
  onChangeTheme,
}) => {
  return (
    <View style={styles.themeSelector}>
      {THEME_OPTIONS.map((item) => {
        const isActive = currentTheme === item.mode;

        return (
          <TouchableOpacity
            key={item.mode}
            activeOpacity={0.85}
            onPress={() => onChangeTheme(item.mode)}
            style={[
              styles.themeCard,
              isActive && styles.themeCardActive,
            ]}
          >
            {isActive && (
              <View
                style={[
                  styles.themeCardDot,
                  { backgroundColor: colors.primary },
                ]}
              />
            )}

            <View
              style={[
                styles.themeIconCircle,
                {
                  backgroundColor: isActive
                    ? colors.primary + "22"
                    : colors.surfaceSoft,
                },
              ]}
            >
              <MaterialCommunityIcons
                name={item.icon as any}
                size={28}
                color={isActive ? colors.primary : colors.textSecondary}
              />
            </View>

            <Text
              style={[
                styles.themeLabel,
                { color: isActive ? colors.primary : colors.text },
              ]}
            >
              {item.label}
            </Text>

            <Text
              style={[
                styles.themeSublabel,
                { color: isActive ? colors.primary : colors.textSecondary },
              ]}
            >
              {item.sublabel}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default ThemeSelector;