import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Book, Chapter, BibleViewState, OLD_TESTAMENT_BOOKS } from "../../constants/bible";

interface Props {
  styles: any;
  colors: any;
  viewState: BibleViewState;
  selectedBook: Book | null;
  selectedChapter: Chapter | null;
  searchQuery: string;
  onChangeSearch: (text: string) => void;
  onBack: () => void;
  onOpenSearch: () => void;
  totalBooks: number;
}

const BibleHeader: React.FC<Props> = ({
  styles,
  colors,
  viewState,
  selectedBook,
  selectedChapter,
  searchQuery,
  onChangeSearch,
  onBack,
  onOpenSearch,
  totalBooks,
}) => {
  return (
    <View style={styles.headerWrap}>
      <View style={styles.headerTopRow}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={22} color={colors.text} />
        </TouchableOpacity>

        <View style={{ flex: 1 }}>
          {viewState === "BOOKS" ? (
            <>
              <Text style={styles.headerEyebrow}>Soratra Masina</Text>
              <Text style={styles.headerTitle}>Baiboly</Text>
            </>
          ) : viewState === "SEARCH" ? (
            <>
              <Text style={styles.headerEyebrow}>Fikarohana</Text>
              <TextInput
                style={{
                  color: colors.text,
                  fontSize: 18,
                  fontWeight: "600",
                  paddingVertical: 2,
                  width: "100%",
                }}
                placeholder="Hitady ao amin'ny Baiboly..."
                placeholderTextColor={colors.textMuted}
                value={searchQuery}
                onChangeText={onChangeSearch}
                autoFocus
              />
            </>
          ) : viewState === "CHAPTERS" ? (
            <>
              <Text style={styles.headerEyebrow}>
                {OLD_TESTAMENT_BOOKS.includes(selectedBook?.name ?? "")
                  ? "Testamenta Taloha"
                  : "Testamenta Vaovao"}
              </Text>
              <Text style={styles.headerTitle}>{selectedBook?.name}</Text>
            </>
          ) : (
            <>
              <Text style={styles.headerEyebrow}>{selectedBook?.name}</Text>
              <Text style={styles.headerSubtitleTitle}>
                Toko faha {selectedChapter?.chapter}
              </Text>
            </>
          )}
        </View>

        {viewState === "BOOKS" && (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{totalBooks} boky</Text>
            </View>

            <TouchableOpacity onPress={onOpenSearch} style={styles.backButton}>
              <MaterialCommunityIcons name="magnify" size={20} color={colors.secondary} />
            </TouchableOpacity>
          </View>
        )}

        {viewState === "CHAPTERS" && selectedBook && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{selectedBook.chapters.length} toko</Text>
          </View>
        )}
      </View>

      <View style={styles.dividerRow}>
        <View style={styles.dividerLine} />
        <MaterialCommunityIcons
          name="star-four-points"
          size={8}
          color={colors.secondary}
        />
        <View style={styles.dividerLine} />
      </View>
    </View>
  );
};

export default BibleHeader;