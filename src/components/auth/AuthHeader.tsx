import React from "react";
import { Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
        {isEditing ? "Amboary ny Profil" : "Hamorona Kaonty"}
      </Text>
      <Text style={styles.subtitle}>
        {isEditing
          ? "Azonao ovaina eto ny mombamomba anao raha misy diso na tianao hovana."
          : "Fenoy ireto manaraka ireto mba hahafahanao milalao miaraka amin'ny namana."}
      </Text>
    </View>
  );
};

export default AuthHeader;