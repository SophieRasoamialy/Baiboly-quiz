import React from "react";
import { Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import i18n from "../../i18n";

interface Props {
  styles: any;
  colors: any;
  isEditing?: boolean;
  isLogin?: boolean;
}

function AuthHeader({ styles, colors, isEditing, isLogin }: Props) {
  const getIcon = () => {
    if (isEditing) return "account-edit-outline";
    if (isLogin) return "login-variant";
    return "account-plus-outline";
  };

  const getTitle = () => {
    if (isEditing) return i18n.t("auth_header_edit_title");
    if (isLogin) return i18n.t("login_title");
    return i18n.t("auth_header_create_title");
  };

  const getSubtitle = () => {
    if (isEditing) return i18n.t("auth_header_edit_subtitle");
    if (isLogin) return i18n.t("login_subtitle");
    return i18n.t("auth_header_create_subtitle");
  };

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
          name={getIcon()}
          size={42}
          color={colors.secondary}
        />
      </View>

      <Text style={styles.title}>{getTitle()}</Text>
      <Text style={styles.subtitle}>{getSubtitle()}</Text>
    </View>
  );
}

export default AuthHeader;