import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { Book } from "../../constants/bible";

interface Props {
  styles: any;
  colors: any;
  searchScope: string;
  onChangeScope: (scope: string) => void;
  bibleData: Book[];
}

const SearchScopeList: React.FC<Props> = ({
  styles,
  colors,
  searchScope,
  onChangeScope,
  bibleData,
}) => {
  const scopes = [
    "Rehetra",
    "Testamenta Taloha",
    "Testamenta Vaovao",
    ...bibleData.map((b) => b.name),
  ];

  return (
    <View style={styles.searchScopeWrap}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={scopes}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          const isActive = searchScope === item;

          return (
            <TouchableOpacity
              onPress={() => onChangeScope(item)}
              style={[
                styles.searchScopeChip,
                {
                  backgroundColor: isActive
                    ? colors.primarySoft
                    : "rgba(255,255,255,0.05)",
                  borderColor: isActive
                    ? colors.primary
                    : "rgba(255,255,255,0.1)",
                },
              ]}
            >
              <Text
                style={[
                  styles.searchScopeChipText,
                  {
            color: isActive ? colors.primary : "rgba(255,255,255,0.6)",
                    fontWeight: isActive ? "800" : "600",
                  },
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default SearchScopeList;