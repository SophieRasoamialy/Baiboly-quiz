import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  styles: any;
  colors: any;
  price: number;
  title: string;
  subtitle: string;
  onPress: () => void;
}

const ShopCard: React.FC<Props> = ({
  styles,
  colors,
  price,
  title,
  subtitle,
  onPress,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.88} onPress={onPress} style={styles.shopCard}>
      <View style={styles.shopLeft}>
        <View
          style={[
            styles.shopIconWrap,
            { backgroundColor: colors.accent + "18" },
          ]}
        >
          <MaterialCommunityIcons
            name="heart-plus"
            size={24}
            color={colors.accent}
          />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.shopTitle}>{title}</Text>
          <Text style={styles.shopSubtitle}>{subtitle}</Text>
        </View>
      </View>

      <View
        style={[
          styles.badge,
          { backgroundColor: colors.primarySoft },
        ]}
      >
        <Text style={[styles.badgeText, { color: colors.primary }]}>{price}</Text>
        <MaterialCommunityIcons
          name="diamond-stone"
          size={15}
          color={colors.primary}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ShopCard;