import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { PromiseCategory, PromiseVerse } from "../../constants/promises";

interface Props {
  styles: any;
  verse: PromiseVerse;
  category?: PromiseCategory;
  primaryColor: string;
}

const VerseShareCard = React.forwardRef<View, Props>(
  ({ styles, verse, category, primaryColor }, ref) => {
    return (
      <View ref={ref} collapsable={false} style={styles.shareCardContainer}>
        <LinearGradient
          colors={["#022C22", "#064E3B", "#022C22"]}
          style={StyleSheet.absoluteFill}
        />

        <View
          style={[
            styles.shareDecor,
            {
              top: -200,
              left: -200,
              width: 800,
              height: 800,
              backgroundColor: "rgba(16, 185, 129, 0.1)",
            },
          ]}
        />

        <View
          style={[
            styles.shareDecor,
            {
              bottom: -150,
              right: -150,
              width: 600,
              height: 600,
              backgroundColor: "rgba(16, 185, 129, 0.05)",
            },
          ]}
        />

        <View style={styles.shareCardInner}>
          <View style={styles.shareTopSection}>
            <View style={styles.shareEmojiBadge}>
              <Text style={styles.shareEmojiText}>{category?.emoji || "✨"}</Text>
            </View>
            <Text style={styles.shareCatName}>
              {category?.category || "Ny Tenin'Andriamanitra"}
            </Text>
          </View>

          <View style={styles.shareQuoteBox}>
            <MaterialCommunityIcons
              name="format-quote-open"
              size={100}
              color="rgba(16, 185, 129, 0.1)"
              style={styles.quoteIconTop}
            />
            <Text style={styles.shareMainText}>{verse.text}</Text>
            <Text style={styles.shareRefText}>{verse.reference}</Text>
            <MaterialCommunityIcons
              name="format-quote-close"
              size={100}
              color="rgba(16, 185, 129, 0.1)"
              style={styles.quoteIconBottom}
            />
          </View>

          <View style={styles.shareFooterOuter}>
            <View style={styles.shareLine} />
            <View style={styles.shareAppBadge}>
              <MaterialCommunityIcons
                name="book-cross"
                size={32}
                color={primaryColor}
              />
              <Text style={styles.shareAppTitle}>BAIBOLY QUIZ</Text>
            </View>
            <Text style={styles.shareTagline}>Teny fampaherezana isan'andro</Text>
          </View>
        </View>
      </View>
    );
  },
);

export default VerseShareCard;