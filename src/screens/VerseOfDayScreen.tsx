import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Share,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

const { width, height } = Dimensions.get("window");

interface VerseDisplay {
  text: string;
  reference: string;
}

type VerseOfDayScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "VerseOfDay"
>;
interface Props {
  navigation: VerseOfDayScreenNavigationProp;
}

const VerseOfDayScreen: React.FC<Props> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [verse, setVerse] = useState<VerseDisplay | null>(null);

  useEffect(() => {
    const getDailyVerse = async () => {
      try {
        const data = require("../../raw_data/baiboly.json");
        const books = data.books;

        // Use date as seed
        const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
        let hash = 0;
        for (let i = 0; i < today.length; i++) {
          hash = (hash << 5) - hash + today.charCodeAt(i);
          hash |= 0;
        }
        const seed = Math.abs(hash);

        // Pick a random book
        const bookIndex = seed % books.length;
        const book = books[bookIndex];

        // Pick a random chapter
        const chapterIndex = seed % book.chapters.length;
        const chapter = book.chapters[chapterIndex];

        // Pick a random verse
        const verseIndex = seed % chapter.verses.length;
        const verseData = chapter.verses[verseIndex];

        setVerse({
          text: verseData.text,
          reference: `${book.name} ${chapter.chapter}:${verseData.verse}`,
        });
      } catch (error) {
        console.error("Failed to get daily verse", error);
      } finally {
        setLoading(false);
      }
    };

    getDailyVerse();
  }, []);

  const handleShare = async () => {
    if (!verse) return;
    try {
      await Share.share({
        message: `"${verse.text}" (${verse.reference})\n\nLasa avy amin'ny Baiboly Quiz`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#AB47BC" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={["#2D0B35", "#140A1A", "#0D0B15"]}
        style={StyleSheet.absoluteFill}
      />

      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <MaterialCommunityIcons name="arrow-left" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Vers du jour</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.verseCard}>
            <LinearGradient
              colors={["rgba(255,255,255,0.1)", "rgba(255,255,255,0.02)"]}
              style={styles.cardGradient}
            >
              <MaterialCommunityIcons
                name="format-quote-open"
                size={40}
                color="#AB47BC"
              />

              <Text style={styles.verseText}>{verse?.text}</Text>

              <View style={styles.divider} />

              <Text style={styles.reference}>{verse?.reference}</Text>

              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={handleShare}
                >
                  <MaterialCommunityIcons
                    name="share-variant"
                    size={24}
                    color="#fff"
                  />
                  <Text style={styles.actionLabel}>Hizara</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>

          <Text style={styles.footerText}>Teny fampaherezana ho anao anio</Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0B15" },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#0D0B15",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 15,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  title: { color: "#fff", fontSize: 24, fontWeight: "900", letterSpacing: 0.5 },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingBottom: height * 0.1,
  },
  verseCard: {
    borderRadius: 32,
    overflow: "hidden",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.15)",
    elevation: 20,
    shadowColor: "#AB47BC",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  cardGradient: {
    padding: 30,
    alignItems: "center",
  },
  verseText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 34,
    marginTop: 10,
    fontStyle: "italic",
  },
  divider: {
    width: 60,
    height: 3,
    backgroundColor: "#AB47BC",
    borderRadius: 2,
    marginVertical: 25,
    opacity: 0.6,
  },
  reference: {
    color: "#AB47BC",
    fontSize: 18,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  actions: {
    marginTop: 40,
    flexDirection: "row",
    gap: 20,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    gap: 8,
  },
  actionLabel: { color: "#fff", fontWeight: "700", fontSize: 13 },
  footerText: {
    color: "rgba(255,255,255,0.4)",
    textAlign: "center",
    marginTop: 30,
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
});

export default VerseOfDayScreen;
