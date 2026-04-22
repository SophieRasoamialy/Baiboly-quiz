import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAlert } from "../../context/AlertContext";
import { useUser } from "../../context/user";

interface Props {
  styles: any;
  onPress: () => void;
}

const LogoutButton: React.FC<Props> = ({ styles, onPress }) => {
  const { showAlert } = useAlert();
  const { logout } = useUser();

  const handleLogoutPress = () => {
    showAlert({
      title: "Hiala ve ianao?",
      message: "Tena te hiala amin'ny kaontinao ve ianao? Mety ho voafafa ny fivoaranao raha mbola tsy voatahiry.",
      buttons: [
        { text: "Aoka ihany", style: "cancel" },
        { 
          text: "Eny, Hiala", 
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
        <Text style={[styles.logoutText, { color: "#FF5252", fontSize: 14 }]}>Hiala</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default LogoutButton;