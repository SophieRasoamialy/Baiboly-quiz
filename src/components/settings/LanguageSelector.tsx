import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LANGUAGE_OPTIONS, LanguageCode } from "../../constants/settings";
import SettingsCard from "./SettingsCard";

interface Props {
  styles: any;
  colors: any;
  language: LanguageCode;
  onChangeLanguage: (language: LanguageCode) => void;
}

const LanguageSelector: React.FC<Props> = ({
  styles,
  colors,
  language,
  onChangeLanguage,
}) => {
  return (
    <SettingsCard styles={styles}>
      {LANGUAGE_OPTIONS.map((item, index) => {
        const isActive = language === item.code;

        return (
          <React.Fragment key={item.code}>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => onChangeLanguage(item.code)}
              style={[styles.row, isActive && styles.selectedRow]}
            >
              <View style={styles.rowLeft}>
                <View
                  style={[
                    styles.rowIconWrap,
                    { backgroundColor: isActive ? colors.secondarySoft : colors.surfaceSoft },
                  ]}
                >
                  <MaterialCommunityIcons
                    name="translate"
                    size={20}
                    color={isActive ? colors.secondary : colors.textSecondary}
                  />
                </View>

                <View style={styles.rowTextWrap}>
                  <Text style={styles.rowTitle}>{item.label}</Text>
                  <Text style={styles.rowSubtitle}>
                    {item.code === "mg" ? "Fiteny Malagasy" : "Langue française"}
                  </Text>
                </View>
              </View>

              {isActive && (
                <MaterialCommunityIcons
                  name="check-circle"
                  size={22}
                  color={colors.secondary}
                />
              )}
            </TouchableOpacity>

            {index < LANGUAGE_OPTIONS.length - 1 && <View style={styles.separator} />}
          </React.Fragment>
        );
      })}
    </SettingsCard>
  );
};

export default LanguageSelector;