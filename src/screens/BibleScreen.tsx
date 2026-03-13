import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Animated,
  Easing,
  SectionList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

const { width, height } = Dimensions.get("window");

interface Verse {
  verse: number;
  text: string;
  title?: string;
}
interface Chapter {
  chapter: number;
  verses: Verse[];
}
interface Book {
  name: string;
  chapters: Chapter[];
}

type BibleScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Bible"
>;
interface Props {
  navigation: BibleScreenNavigationProp;
}

// ── Old Testament book names (66 total: 39 OT + 27 NT) ──────────────────────
const OLD_TESTAMENT_BOOKS = [
  "Genesisy",
  "Eksodosy",
  "Levitikosy",
  "Nomery",
  "Deoteronomia",
  "Josoa",
  "Mpitsara",
  "Rota",
  "1 Samoela",
  "2 Samoela",
  "1 Mpanjaka",
  "2 Mpanjaka",
  "1 Tantara",
  "2 Tantara",
  "Ezra",
  "Nehemia",
  "Estera",
  "Joba",
  "Salamo",
  "Ohabolana",
  "Mpitoriteny",
  "Tononkiran'i Solomona",
  "Isaia",
  "Jeremia",
  "Fitomaniana",
  "Ezekiela",
  "Daniela",
  "Hosea",
  "Joela",
  "Amosa",
  "Obadia",
  "Jona",
  "Mika",
  "Nahoma",
  "Habakoka",
  "Zefania",
  "Hagay",
  "Zakaria",
  "Malakia",
];

// ── Floating Gem ─────────────────────────────────────────────────────────────
const FloatingGem = ({ x, size, delay, duration, opacity }: any) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = () => {
      translateY.setValue(0);
      rotate.setValue(0);
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: -height,
          duration,
          delay,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(rotate, {
          toValue: 1,
          duration,
          delay,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]).start(() => loop());
    };
    loop();
  }, []);

  const spin = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });
  const animOpacity = translateY.interpolate({
    inputRange: [-height, -height * 0.7, -height * 0.15, 0],
    outputRange: [0, opacity, opacity, 0],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      pointerEvents="none"
      style={{
        position: "absolute",
        left: x,
        bottom: 20,
        opacity: animOpacity,
        transform: [{ translateY }, { rotate: spin }],
        zIndex: 0,
      }}
    >
      <LinearGradient
        colors={["#A7FFEB", "#00E5CC", "#00897B", "#004D40"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          width: size,
          height: size,
          transform: [{ rotate: "45deg" }],
          borderRadius: size * 0.12,
          shadowColor: "#00E5CC",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 1,
          shadowRadius: size,
          elevation: 14,
        }}
      />
      <View
        style={{
          position: "absolute",
          width: size * 0.28,
          height: size * 0.28,
          borderRadius: 2,
          backgroundColor: "rgba(255,255,255,0.8)",
          top: size * 0.15,
          left: size * 0.2,
          transform: [{ rotate: "45deg" }],
        }}
      />
    </Animated.View>
  );
};

// ── Book Card ─────────────────────────────────────────────────────────────────
const BookCard = ({
  item,
  index,
  isOT,
  onPress,
}: {
  item: Book;
  index: number;
  isOT: boolean;
  onPress: () => void;
}) => {
  const mountAnim = useRef(new Animated.Value(0)).current;
  const pressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(mountAnim, {
      toValue: 1,
      delay: (index % 20) * 40,
      friction: 7,
      tension: 70,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePressIn = () =>
    Animated.spring(pressAnim, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  const handlePressOut = () =>
    Animated.spring(pressAnim, {
      toValue: 0,
      friction: 5,
      useNativeDriver: true,
    }).start();

  const scale = pressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.96],
  });
  const mountTX = mountAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-24, 0],
  });
  const mountOp = mountAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const accentColor = isOT ? "#F9A825" : "#00E5CC";
  const shadowColor = isOT ? "#F9A825" : "#00E5CC";
  const badgeBg = isOT ? "rgba(249,168,37,0.12)" : "rgba(0,229,204,0.12)";
  const badgeBorder = isOT ? "rgba(249,168,37,0.25)" : "rgba(0,229,204,0.25)";

  return (
    <Animated.View
      style={{
        opacity: mountOp,
        transform: [{ translateX: mountTX }],
        marginBottom: 10,
      }}
    >
      {/* 3D shadow */}
      <View
        style={{
          position: "absolute",
          bottom: -5,
          left: 4,
          right: 4,
          height: "100%",
          borderRadius: 20,
          backgroundColor: shadowColor,
          opacity: 0.12,
        }}
      />

      <Animated.View style={{ transform: [{ scale }] }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={{
            borderRadius: 20,
            overflow: "hidden",
            borderWidth: 1.5,
            borderColor: "rgba(255,255,255,0.08)",
            elevation: 4,
            shadowColor,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 8,
          }}
        >
          <LinearGradient
            colors={["rgba(255,255,255,0.06)", "rgba(255,255,255,0.02)"]}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 18,
              paddingVertical: 16,
            }}
          >
            {/* Left accent line */}
            <View
              style={{
                width: 3,
                height: 36,
                borderRadius: 2,
                backgroundColor: accentColor,
                marginRight: 16,
                opacity: 0.8,
              }}
            />

            {/* Index number */}
            <Text
              style={{
                color: "rgba(255,255,255,0.25)",
                fontSize: 13,
                fontWeight: "800",
                width: 28,
                marginRight: 4,
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </Text>

            {/* Book name */}
            <Text
              style={{
                flex: 1,
                color: "#fff",
                fontSize: 17,
                fontWeight: "700",
                letterSpacing: 0.2,
              }}
            >
              {item.name}
            </Text>

            {/* Chapter count badge */}
            <View
              style={{
                backgroundColor: badgeBg,
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: badgeBorder,
                marginRight: 10,
              }}
            >
              <Text
                style={{ color: accentColor, fontSize: 11, fontWeight: "800" }}
              >
                {item.chapters.length} toko
              </Text>
            </View>

            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color="rgba(255,255,255,0.3)"
            />
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

// ── Chapter Grid Item ─────────────────────────────────────────────────────────
const ChapterItem = ({ item, index, onPress }: any) => {
  const mountAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.spring(mountAnim, {
      toValue: 1,
      delay: index * 25,
      friction: 7,
      tension: 80,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View
      style={{
        opacity: mountAnim,
        transform: [{ scale: mountAnim }],
        marginRight: 10,
        marginBottom: 10,
      }}
    >
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={{
          width: (width - 40 - 30) / 4,
          height: 58,
          borderRadius: 14,
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1.5,
          borderColor: "rgba(255,255,255,0.1)",
          backgroundColor: "rgba(255,255,255,0.05)",
          shadowColor: "#00E5CC",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "800" }}>
          {item.chapter}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

// ── Verse Item ────────────────────────────────────────────────────────────────
const VerseItem = ({ item, index }: { item: Verse; index: number }) => {
  const mountAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(mountAnim, {
      toValue: 1,
      delay: Math.min(index * 15, 400),
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={{ opacity: mountAnim, marginBottom: 16 }}>
      {item.title && !item.title.includes("[*]") && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            marginBottom: 10,
            marginTop: 6,
          }}
        >
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: "rgba(0,229,204,0.2)",
            }}
          />
          <Text
            style={{
              color: "rgba(0,229,204,0.85)",
              fontSize: 13,
              fontWeight: "800",
              fontStyle: "italic",
              textAlign: "center",
              flex: 3,
            }}
          >
            {item.title}
          </Text>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: "rgba(0,229,204,0.2)",
            }}
          />
        </View>
      )}
      <View style={{ flexDirection: "row", gap: 12 }}>
        <View
          style={{
            width: 26,
            height: 26,
            borderRadius: 8,
            backgroundColor: "rgba(249,168,37,0.15)",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 1,
            borderWidth: 1,
            borderColor: "rgba(249,168,37,0.25)",
          }}
        >
          <Text style={{ color: "#F9A825", fontSize: 11, fontWeight: "900" }}>
            {item.verse}
          </Text>
        </View>
        <Text
          style={{
            color: "rgba(255,255,255,0.88)",
            fontSize: 16,
            lineHeight: 26,
            flex: 1,
          }}
        >
          {item.text}
        </Text>
      </View>
    </Animated.View>
  );
};

// ── Main ──────────────────────────────────────────────────────────────────────
const BibleScreen: React.FC<Props> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [bibleData, setBibleData] = useState<Book[]>([]);
  const [viewState, setViewState] = useState<"BOOKS" | "CHAPTERS" | "VERSES">(
    "BOOKS",
  );
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [activeTab, setActiveTab] = useState<"OT" | "NT">("OT");

  const headerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loadBible = async () => {
      try {
        const data = require("../../raw_data/baiboly.json");
        setBibleData(data.books);
      } catch (e) {
        console.error("Failed to load bible data", e);
      } finally {
        setLoading(false);
      }
    };
    loadBible();
    Animated.spring(headerAnim, {
      toValue: 1,
      friction: 7,
      tension: 60,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleBack = () => {
    if (viewState === "VERSES") {
      setViewState("CHAPTERS");
      setSelectedChapter(null);
    } else if (viewState === "CHAPTERS") {
      setViewState("BOOKS");
      setSelectedBook(null);
    } else {
      navigation.goBack();
    }
  };

  const otBooks = bibleData.filter((b) => OLD_TESTAMENT_BOOKS.includes(b.name));
  const ntBooks = bibleData.filter(
    (b) => !OLD_TESTAMENT_BOOKS.includes(b.name),
  );
  const displayBooks = activeTab === "OT" ? otBooks : ntBooks;

  const gemsConfig = [
    { x: width * 0.05, size: 12, delay: 0, duration: 8000, opacity: 0.45 },
    { x: width * 0.3, size: 9, delay: 2000, duration: 7000, opacity: 0.35 },
    { x: width * 0.6, size: 15, delay: 1000, duration: 9000, opacity: 0.5 },
    { x: width * 0.85, size: 10, delay: 3000, duration: 7500, opacity: 0.4 },
  ];

  const headerTY = headerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-20, 0],
  });

  // ── Loading ──
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#0D0B15",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LinearGradient
          colors={["#0D0B15", "#0A1A12"]}
          style={StyleSheet.absoluteFill}
        />
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 24,
            backgroundColor: "rgba(0,229,204,0.1)",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1.5,
            borderColor: "rgba(0,229,204,0.25)",
            marginBottom: 16,
          }}
        >
          <ActivityIndicator size="large" color="#00E5CC" />
        </View>
        <Text
          style={{
            color: "rgba(255,255,255,0.5)",
            fontWeight: "700",
            letterSpacing: 1,
          }}
        >
          Mampiditra ny Baiboly...
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#0D0B15" }}>
      <StatusBar style="light" />

      <LinearGradient
        colors={["#0D0B15", "#0A1A12", "#080B10"]}
        style={StyleSheet.absoluteFill}
      />

      {/* Glow orbs */}
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: -80,
          left: -60,
          width: 280,
          height: 280,
          borderRadius: 140,
          backgroundColor: "rgba(0,180,148,0.08)",
        }}
      />
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          bottom: height * 0.3,
          right: -80,
          width: 220,
          height: 220,
          borderRadius: 110,
          backgroundColor: "rgba(249,168,37,0.05)",
        }}
      />

      {/* Gems */}
      {gemsConfig.map((g, i) => (
        <FloatingGem key={i} {...g} />
      ))}

      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        {/* ── HEADER ── */}
        <Animated.View
          style={{
            opacity: headerAnim,
            transform: [{ translateY: headerTY }],
            paddingHorizontal: 20,
            paddingTop: 10,
            paddingBottom: 16,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 14,
              marginBottom: 20,
            }}
          >
            <TouchableOpacity
              onPress={handleBack}
              style={{
                width: 42,
                height: 42,
                borderRadius: 14,
                backgroundColor: "rgba(255,255,255,0.1)",
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.15)",
              }}
            >
              <MaterialCommunityIcons
                name="arrow-left"
                size={22}
                color="#fff"
              />
            </TouchableOpacity>

            <View style={{ flex: 1 }}>
              {viewState === "BOOKS" ? (
                <>
                  <Text
                    style={{
                      color: "rgba(0,229,204,0.7)",
                      fontSize: 11,
                      fontWeight: "700",
                      letterSpacing: 2.5,
                      textTransform: "uppercase",
                      marginBottom: 2,
                    }}
                  >
                    Soratra Masina
                  </Text>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 26,
                      fontWeight: "900",
                      letterSpacing: 0.5,
                    }}
                  >
                    Baiboly
                  </Text>
                </>
              ) : viewState === "CHAPTERS" ? (
                <>
                  <Text
                    style={{
                      color: "rgba(0,229,204,0.7)",
                      fontSize: 11,
                      fontWeight: "700",
                      letterSpacing: 2,
                      textTransform: "uppercase",
                      marginBottom: 2,
                    }}
                  >
                    {OLD_TESTAMENT_BOOKS.includes(selectedBook?.name ?? "")
                      ? "Testamenta Taloha"
                      : "Testamenta Vaovao"}
                  </Text>
                  <Text
                    style={{ color: "#fff", fontSize: 24, fontWeight: "900" }}
                  >
                    {selectedBook?.name}
                  </Text>
                </>
              ) : (
                <>
                  <Text
                    style={{
                      color: "rgba(0,229,204,0.7)",
                      fontSize: 11,
                      fontWeight: "700",
                      letterSpacing: 2,
                      textTransform: "uppercase",
                      marginBottom: 2,
                    }}
                  >
                    {selectedBook?.name}
                  </Text>
                  <Text
                    style={{ color: "#fff", fontSize: 22, fontWeight: "900" }}
                  >
                    Toko faha {selectedChapter?.chapter}
                  </Text>
                </>
              )}
            </View>

            {/* Book/Chapter count badge */}
            {viewState === "BOOKS" && (
              <View
                style={{
                  backgroundColor: "rgba(0,229,204,0.12)",
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: "rgba(0,229,204,0.25)",
                }}
              >
                <Text
                  style={{
                    color: "rgba(0,229,204,0.85)",
                    fontSize: 12,
                    fontWeight: "800",
                  }}
                >
                  {bibleData.length} boky
                </Text>
              </View>
            )}
            {viewState === "CHAPTERS" && selectedBook && (
              <View
                style={{
                  backgroundColor: "rgba(0,229,204,0.12)",
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: "rgba(0,229,204,0.25)",
                }}
              >
                <Text
                  style={{
                    color: "rgba(0,229,204,0.85)",
                    fontSize: 12,
                    fontWeight: "800",
                  }}
                >
                  {selectedBook.chapters.length} toko
                </Text>
              </View>
            )}
          </View>

          {/* Decorative divider */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              marginBottom: viewState === "BOOKS" ? 0 : -8,
            }}
          >
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: "rgba(0,229,204,0.12)",
              }}
            />
            <MaterialCommunityIcons
              name="star-four-points"
              size={8}
              color="rgba(0,229,204,0.35)"
            />
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: "rgba(0,229,204,0.12)",
              }}
            />
          </View>

          {/* ── OT / NT TABS (only on BOOKS view) ── */}
          {viewState === "BOOKS" && (
            <View
              style={{
                flexDirection: "row",
                marginTop: 20,
                backgroundColor: "rgba(255,255,255,0.05)",
                borderRadius: 18,
                padding: 4,
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.08)",
              }}
            >
              {(["OT", "NT"] as const).map((tab) => {
                const isActive = activeTab === tab;
                const label =
                  tab === "OT" ? "Testamenta Taloha" : "Testamenta Vaovao";
                const count = tab === "OT" ? otBooks.length : ntBooks.length;
                return (
                  <TouchableOpacity
                    key={tab}
                    onPress={() => setActiveTab(tab)}
                    style={{
                      flex: 1,
                      paddingVertical: 11,
                      borderRadius: 14,
                      alignItems: "center",
                      overflow: "hidden",
                    }}
                    activeOpacity={0.85}
                  >
                    {isActive ? (
                      <LinearGradient
                        colors={
                          tab === "OT"
                            ? ["#FFB300", "#E65100"]
                            : ["#00E5CC", "#00695C"]
                        }
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{
                          ...StyleSheet.absoluteFillObject,
                          borderRadius: 14,
                        }}
                      />
                    ) : null}
                    <Text
                      style={{
                        color: isActive ? "#fff" : "rgba(255,255,255,0.45)",
                        fontWeight: "800",
                        fontSize: 13,
                        letterSpacing: 0.3,
                      }}
                    >
                      {label}
                    </Text>
                    <Text
                      style={{
                        color: isActive
                          ? "rgba(255,255,255,0.75)"
                          : "rgba(255,255,255,0.25)",
                        fontWeight: "700",
                        fontSize: 10,
                        marginTop: 1,
                      }}
                    >
                      {count} boky
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </Animated.View>

        {/* ── BOOKS VIEW ── */}
        {viewState === "BOOKS" && (
          <FlatList
            data={displayBooks}
            renderItem={({ item, index }) => (
              <BookCard
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
            contentContainerStyle={{
              paddingHorizontal: 20,
              paddingBottom: 50,
              paddingTop: 12,
            }}
            showsVerticalScrollIndicator={false}
          />
        )}

        {/* ── CHAPTERS VIEW ── */}
        {viewState === "CHAPTERS" && selectedBook && (
          <FlatList
            data={selectedBook.chapters}
            renderItem={({ item, index }) => (
              <ChapterItem
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
            contentContainerStyle={{
              paddingHorizontal: 20,
              paddingBottom: 50,
              paddingTop: 8,
            }}
            showsVerticalScrollIndicator={false}
          />
        )}

        {/* ── VERSES VIEW (Swipable) ── */}
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
            onMomentumScrollEnd={(e) => {
              const index = Math.round(e.nativeEvent.contentOffset.x / width);
              setSelectedChapter(selectedBook.chapters[index]);
            }}
            renderItem={({ item: chapter }) => (
              <View style={{ width, flex: 1 }}>
                <FlatList
                  data={chapter.verses}
                  renderItem={({ item, index }) => (
                    <VerseItem item={item} index={index} />
                  )}
                  keyExtractor={(item) => `v-${chapter.chapter}-${item.verse}`}
                  contentContainerStyle={{
                    paddingHorizontal: 20,
                    paddingBottom: 60,
                    paddingTop: 8,
                  }}
                  showsVerticalScrollIndicator={false}
                  ListHeaderComponent={
                    <View
                      style={{
                        backgroundColor: "rgba(255,255,255,0.04)",
                        borderRadius: 16,
                        padding: 14,
                        marginBottom: 20,
                        borderWidth: 1,
                        borderColor: "rgba(255,255,255,0.07)",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <MaterialCommunityIcons
                        name="book-open-variant"
                        size={18}
                        color="rgba(0,229,204,0.7)"
                      />
                      <Text
                        style={{
                          color: "rgba(255,255,255,0.5)",
                          fontSize: 13,
                          fontWeight: "600",
                          fontStyle: "italic",
                          flex: 1,
                        }}
                      >
                        {selectedBook?.name} — Toko faha {chapter.chapter} —
                        misy {chapter.verses.length} andininy
                      </Text>
                    </View>
                  }
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
