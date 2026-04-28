import React from "react";
import { Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import i18n from "../../i18n";

interface Props {
  styles: any;
  colors: any;
  isEditing?: boolean;
}

function AuthHeader({ styles, colors, isEditing }: Props) {
  return (
    <View style={styles.header}>
      <View
        style={[
          styles.headerIconWrap,
          {
            backgroundColor: colors.secondarySoft,
            borderColor: colors.border,
          },
        ]}
      >
        <MaterialCommunityIcons
          name={isEditing ? "account-edit-outline" : "account-plus-outline"}
          size={42}
          color={colors.secondary}
        />
      </View>

      <Text style={styles.title}>
        {isEditing ? i18n.t("auth_header_edit_title") : i18n.t("auth_header_create_title")}
      </Text>
      <Text style={styles.subtitle}>
        {isEditing
          ? i18n.t("auth_header_edit_subtitle")
          : i18n.t("auth_header_create_subtitle")}
      </Text>
    </View>
  );
};

export default AuthHeader;