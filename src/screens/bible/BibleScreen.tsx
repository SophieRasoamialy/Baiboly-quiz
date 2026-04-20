import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Keyboard,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { RootStackParamList } from "../../navigation";
import { useAppTheme } from "../../hooks/useAppTheme";
import { useBibleData } from "../../hooks/useBibleData";
import { useBibleSearch } from "../../hooks/useBibleSearch";
import {
  BibleViewState,
  Book,
  Chapter,
  OLD_TESTAMENT_BOOKS,
  BIBLE_GEMS_CONFIG,
} from "../../constants/bible";
import { createBibleStyles } from "./bible.styles";

import FloatingGem from "../../components/home/FloatingGem";
import BibleHeader from "../../components/bible/BibleHeader";
import TestamentTabs from "../../components/bible/TestamentTabs";
import BookCard from "../../components/bible/BookCard";
import ChapterCard from "../../components/bible/ChapterCard";
import VerseItem from "../../components/bible/VerseItem";
import SearchScopeList from "../../components/bible/SearchScopeList";
import SearchResultCard from "../../components/bible/SearchResultCard";
import BibleLoading from "../../components/bible/BibleLoading";

const { width } = Dimensions.get("window");

type BibleScreenNavigationProp = StackNavigationProp<RootStackParamList, "Bible">;
type BibleScreenRouteProp = RouteProp<RootStackParamList, "Bible">;

interface Props {
  navigation: BibleScreenNavigationProp;
  route: BibleScreenRouteProp;
}

const BibleScreen: React.FC<Props> = ({ navigation, route }) => {
  const { colors, isLight } = useAppTheme();
  const styles = createBibleStyles(colors);

  const { loading, bibleData } = useBibleData();

  const [viewState, setViewState] = useState<BibleViewState>("BOOKS");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [activeTab, setActiveTab] = useState<"OT" | "NT">("OT");

  const [searchQuery, setSearchQuery] = useState("");
  const [searchScope, setSearchScope] = useState<string>("Rehetra");
  const [previousState, setPreviousState] = useState<BibleViewState | null>(null);
  const [highlightedVerse, setHighlightedVerse] = useState<number | null>(null);

  const { searchResults, isSearching } = useBibleSearch(
    searchQuery,
    searchScope,
    bibleData,
  );

  const innerListRef = useRef<FlatList>(null);
  const headerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(headerAnim, {
      toValue: 1,
      friction: 7,
      tension: 60,
      useNativeDriver: true,
    }).start();
  }, [headerAnim]);

  useEffect(() => {
    if (!bibleData.length) return;

    const params = route.params;
    if (params?.initialBook) {
      const targetBook = bibleData.find((b) => b.name === params.initialBook);

      if (targetBook) {
        setSelectedBook(targetBook);
        const isOT = OLD_TESTAMENT_BOOKS.includes(targetBook.name);
        setActiveTab(isOT ? "OT" : "NT");

        if (params.initialChapter) {
          const targetChapter = targetBook.chapters.find(
            (c) => c.chapter === params.initialChapter,
          );

          if (targetChapter) {
            setSelectedChapter(targetChapter);
            setViewState("VERSES");

            if (params.initialVerse) {
              setHighlightedVerse(params.initialVerse);
            }
          } else {
            setViewState("CHAPTERS");
          }
        } else {
          setViewState("CHAPTERS");
        }
      }
    }
  }, [bibleData, route.params]);

  const handleBack = () => {
    if (viewState === "VERSES") {
      if (previousState === "SEARCH") {
        setViewState("SEARCH");
        setPreviousState(null);
      } else {
        setViewState("CHAPTERS");
        setSelectedChapter(null);
      }
    } else if (viewState === "CHAPTERS") {
      setViewState("BOOKS");
      setSelectedBook(null);
    } else if (viewState === "SEARCH") {
      setViewState("BOOKS");
      setSearchQuery("");
      setSearchScope("Rehetra");
      setPreviousState(null);
      Keyboard.dismiss();
    } else {
      navigation.goBack();
    }
  };

  const otBooks = bibleData.filter((b) => OLD_TESTAMENT_BOOKS.includes(b.name));
  const ntBooks = bibleData.filter((b) => !OLD_TESTAMENT_BOOKS.includes(b.name));
  const displayBooks = activeTab === "OT" ? otBooks : ntBooks;

  const gemsConfig = BIBLE_GEMS_CONFIG.map((item) => ({
    ...item,
    x: width * item.xRatio,
    isLight,
  }));

  const headerTY = headerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-20, 0],
  });

  if (loading) {
    return <BibleLoading styles={styles} colors={colors} />;
  }

  return (
    <View style={styles.container}>
      <StatusBar style={isLight ? "dark" : "light"} />

      <LinearGradient
        colors={
          isLight
            ? [colors.background, colors.backgroundSecondary]
            : [colors.background, colors.backgroundSecondary, colors.background]
        }
        style={styles.backgroundFill}
      />

      {!isLight && (
        <>
          <View pointerEvents="none" style={styles.topGlowLeft} />
          <View pointerEvents="none" style={styles.topGlowRight} />
        </>
      )}

      {gemsConfig.map((gem, index) => (
        <FloatingGem key={index} {...gem} />
      ))}

      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <Animated.View
          style={{
            opacity: headerAnim,
            transform: [{ translateY: headerTY }],
          }}
        >
          <BibleHeader
            styles={styles}
            colors={colors}
            viewState={viewState}
            selectedBook={selectedBook}
            selectedChapter={selectedChapter}
            searchQuery={searchQuery}
            onChangeSearch={setSearchQuery}
            onBack={handleBack}
            onOpenSearch={() => setViewState("SEARCH")}
            totalBooks={bibleData.length}
          />

          {viewState === "BOOKS" && (
            <View style={{ paddingHorizontal: 20 }}>
              <TestamentTabs
                styles={styles}
                activeTab={activeTab}
                otCount={otBooks.length}
                ntCount={ntBooks.length}
                onChangeTab={setActiveTab}
                colors={colors}
              />
            </View>
          )}
        </Animated.View>

        {viewState === "SEARCH" && (
          <View style={{ flex: 1 }}>
            <SearchScopeList
              styles={styles}
              colors={colors}
              searchScope={searchScope}
              onChangeScope={setSearchScope}
              bibleData={bibleData}
            />

            {isSearching ? (
              <BibleLoading styles={styles} colors={colors} />
            ) : (
              <FlatList
                data={searchResults}
                keyExtractor={(_, index) => `search-${index}`}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <SearchResultCard
                    styles={styles}
                    item={item}
                    searchQuery={searchQuery}
                    onPress={() => {
                      setPreviousState("SEARCH");
                      setSelectedBook(item.book);
                      setSelectedChapter(item.chapter);
                      setHighlightedVerse(item.verse.verse);
                      setViewState("VERSES");
                    }}
                  />
                )}
                ListEmptyComponent={
                  searchQuery.length >= 3 ? (
                    <View>
                      <MaterialCommunityIcons
                        name="file-search-outline"
                        size={42}
                        color={colors.textMuted}
                        style={{ textAlign: "center", marginTop: 34 }}
                      />
                      <Animated.Text style={styles.emptyText}>
                        Tsy misy valiny ho an'ny "{searchQuery}".
                      </Animated.Text>
                    </View>
                  ) : (
                    <Animated.Text style={styles.emptyText}>
                      Mampidira teny 3 farafahakeliny entina mikaroka.
                    </Animated.Text>
                  )
                }
              />
            )}
          </View>
        )}

        {viewState === "BOOKS" && (
          <FlatList
            data={displayBooks}
            renderItem={({ item, index }) => (
              <BookCard
                styles={styles}
                colors={colors}
                item={item}
                index={index}
                isOT={activeTab === "OT"}
                onPress={() => {
                  setSelectedBook(item);
                  setViewState("CHAPTERS");
                }}
              />
            )}
            keyExtractor={(item) => item.name}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}

        {viewState === "CHAPTERS" && selectedBook && (
          <FlatList
            data={selectedBook.chapters}
            renderItem={({ item, index }) => (
              <ChapterCard
                styles={styles}
                item={item}
                index={index}
                onPress={() => {
                  setSelectedChapter(item);
                  setViewState("VERSES");
                }}
              />
            )}
            keyExtractor={(item) => item.chapter.toString()}
            numColumns={4}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}

        {viewState === "VERSES" && selectedBook && (
          <FlatList
            horizontal
            pagingEnabled
            data={selectedBook.chapters}
            keyExtractor={(item) => `chapter-${item.chapter}`}
            initialScrollIndex={selectedBook.chapters.findIndex(
              (c) => c.chapter === selectedChapter?.chapter,
            )}
            getItemLayout={(_, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(event.nativeEvent.contentOffset.x / width);
              setSelectedChapter(selectedBook.chapters[index]);
              setHighlightedVerse(null);
            }}
            renderItem={({ item: chapter }) => (
              <View style={{ width, flex: 1 }}>
                <FlatList
                  data={chapter.verses}
                  renderItem={({ item, index }) => (
                    <VerseItem
                      styles={styles}
                      item={item}
                      index={index}
                      isHighlighted={
                        chapter.chapter === selectedChapter?.chapter &&
                        item.verse === highlightedVerse
                      }
                      colors={colors}
                    />
                  )}
                  keyExtractor={(item) => `v-${chapter.chapter}-${item.verse}`}
                  contentContainerStyle={styles.listContent}
                  showsVerticalScrollIndicator={false}
                  ListHeaderComponent={
                    <View style={styles.chapterInfoCard}>
                      <MaterialCommunityIcons
                        name="book-open-variant"
                        size={18}
                        color={colors.secondary}
                      />
                      <Animated.Text style={styles.chapterInfoText}>
                        {selectedBook?.name} — Toko faha {chapter.chapter} —
                        misy {chapter.verses.length} andininy
                      </Animated.Text>
                    </View>
                  }
                  ref={chapter.chapter === selectedChapter?.chapter ? innerListRef : null}
                  initialScrollIndex={
                    chapter.chapter === selectedChapter?.chapter && highlightedVerse
                      ? Math.max(
                          0,
                          chapter.verses.findIndex((v) => v.verse === highlightedVerse),
                        )
                      : 0
                  }
                  getItemLayout={(_, index) => ({
                    length: 80,
                    offset: 80 * index,
                    index,
                  })}
                  onScrollToIndexFailed={(info) => {
                    setTimeout(() => {
                      innerListRef.current?.scrollToIndex({
                        index: info.index,
                        animated: true,
                      });
                    }, 400);
                  }}
                />
              </View>
            )}
          />
        )}
      </SafeAreaView>
    </View>
  );
};

export default BibleScreen;