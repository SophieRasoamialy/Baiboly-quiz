import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  styles: any;
  onPress: () => void;
}

const LogoutButton: React.FC<Props> = ({ styles, onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.88} onPress={onPress} style={styles.logoutButton}>
      <LinearGradient
        colors={["rgba(255,82,82,0.14)", "rgba(229,57,53,0.08)"]}
        style={styles.logoutInner}
      >
        <MaterialCommunityIcons name="logout" size={20} color="#FF5252" />
        <Text style={[styles.logoutText, { color: "#FF5252" }]}>Hivoaka</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default LogoutButton;