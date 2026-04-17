import React from "react";
import { View } from "react-native";
import MenuCard from "./MenuCard";

interface Props {
  items: any[];
  styles: any;
  colors: any;
  isLight: boolean;
  onPressItem: (route: string) => void;
}

const MenuGrid: React.FC<Props> = ({
  items,
  styles,
  colors,
  isLight,
  onPressItem,
}) => {
  return (
    <View style={styles.menuGrid}>
      {items.map((item, index) => (
        <MenuCard
          key={`${item.title}-${index}`}
          item={item}
          index={index}
          colors={colors}
          isLight={isLight}
          onPress={() => onPressItem(item.route)}
        />
      ))}
    </View>
  );
};

export default MenuGrid;