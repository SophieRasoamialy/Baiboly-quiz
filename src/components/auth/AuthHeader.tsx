import React from "react";
import { Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  styles: any;
  colors: any;
}

const AuthHeader: React.FC<Props> = ({ styles, colors }) => {
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
          name="account-plus-outline"
          size={42}
          color={colors.secondary}
        />
      </View>

      <Text style={styles.title}>Hamorona Kaonty</Text>
      <Text style={styles.subtitle}>
        Fenoy ireto manaraka ireto mba hahafahanao milalao miaraka amin&apos;ny namana.
      </Text>
    </View>
  );
};

export default AuthHeader;