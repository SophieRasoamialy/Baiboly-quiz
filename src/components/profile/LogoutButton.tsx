import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAlert } from "../../context/AlertContext";
import { useUser } from "../../context/user";
import i18n from "../../i18n";

interface Props {
  styles: any;
  onPress: () => void;
}

const LogoutButton: React.FC<Props> = ({ styles, onPress }) => {
  const { showAlert } = useAlert();
  const { logout } = useUser();

  const handleLogoutPress = () => {
    showAlert({
      title: i18n.t("logout_confirm_title"),
      message: i18n.t("logout_confirm_msg"),
      buttons: [
        { text: i18n.t("later"), style: "cancel" },
        { 
          text: i18n.t("logout_confirm_btn"), 
          style: "destructive",
          onPress: logout 
        },
      ],
    });
  };

  return (
    <TouchableOpacity 
      activeOpacity={0.8} 
      onPress={handleLogoutPress} 
      style={[styles.logoutButton, { alignSelf: "center", width: 140 }]}
    >
      <LinearGradient
        colors={["rgba(255,82,82,0.12)", "rgba(229,57,53,0.06)"]}
        style={[styles.logoutInner, { paddingVertical: 12 }]}
      >
        <MaterialCommunityIcons name="logout" size={18} color="#FF5252" />
        <Text style={[styles.logoutText, { color: "#FF5252", fontSize: 14 }]}>
          {i18n.t("logout_btn_text")}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default LogoutButton;