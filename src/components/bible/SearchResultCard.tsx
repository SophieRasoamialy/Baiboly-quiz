import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  styles: any;
  item: any;
  searchQuery: string;
  onPress: () => void;
}

const SearchResultCard: React.FC<Props> = ({
  styles,
  item,
  searchQuery,
  onPress,
}) => {
  const renderHighlightedText = (text: string, query: string) => {
    if (!query) return text;

    const parts = text.split(new RegExp(`(${query})`, "gi"));

    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <Text
          key={index}
          style={{
            color: "#00E5CC",
            fontWeight: "900",
            backgroundColor: "rgba(0,229,204,0.15)",
          }}
        >
          {part}
        </Text>
      ) : (
        <Text key={index}>{part}</Text>
      ),
    );
  };

  return (
    <TouchableOpacity style={styles.searchResultCard} onPress={onPress}>
      <View style={styles.searchResultTop}>
        <Text style={styles.searchResultBook}>
          {item.book.name} {item.chapter.chapter}
        </Text>
        <Text style={styles.searchResultVerse}>And {item.verse.verse}</Text>
      </View>

      <Text style={styles.searchResultText}>
        {renderHighlightedText(item.verse.text, searchQuery)}
      </Text>
    </TouchableOpacity>
  );
};

export default SearchResultCard;