import React from "react";
import { FlatList, Text, View } from "react-native";
import ThemeCard from "./ThemeCard";

interface Props {
  themes: any[];
  onSelect: (id: string) => void;
  ListHeaderComponent: React.ReactElement;
  contentContainerStyle: any;
  styles: any;
  colors: any;
}

const ThemeList: React.FC<Props> = ({ 
  themes, 
  onSelect, 
  ListHeaderComponent, 
  contentContainerStyle,
  styles,
  colors
}) => {
  return (
    <FlatList
      data={themes}
      keyExtractor={(item) => item.id}
      contentContainerStyle={contentContainerStyle}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <>
          {ListHeaderComponent}
          <Text style={styles.sectionLabel}>Lohahevitra</Text>
        </>
      }
      renderItem={({ item }) => (
        <ThemeCard item={item} onPress={() => onSelect(item.id)} styles={styles} colors={colors} />
      )}
    />
  );
};

export default ThemeList;