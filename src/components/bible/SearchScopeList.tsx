import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { Book } from "../../constants/bible";
import i18n from "../../i18n";

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
    i18n.t("all"),
    i18n.t("old_testament"),
    i18n.t("new_testament"),
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
                    : colors.surfaceSoft,
                  borderColor: isActive
                    ? colors.primary
                    : colors.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.searchScopeChipText,
                  {
            color: isActive ? colors.primary : colors.textMuted,
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