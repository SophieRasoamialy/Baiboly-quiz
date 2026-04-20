import React from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { PromiseCategory, PromiseVerse } from "../../constants/promises";

interface Props {
  styles: any;
  heroScale: Animated.AnimatedInterpolation<string | number>;
  displayedVerse: PromiseVerse;
  displayedCategory?: PromiseCategory;
  dateDisplay: string;
  isManualSelection: boolean;
  onReset: () => void;
  onOpenBible: () => void;
  primaryColor: string;
}

const VerseHeroCard: React.FC<Props> = ({
  styles,
  heroScale,
  displayedVerse,
  displayedCategory,
  dateDisplay,
  isManualSelection,
  onReset,
  onOpenBible,
  primaryColor,
}) => {
  return (
    <Animated.View
      style={[
        styles.heroCardContainer,
        { transform: [{ scale: heroScale }] },
      ]}
    >
      <LinearGradient
        colors={[primaryColor, "#065F46", "#022C22"]}
        style={styles.heroGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.heroTextureLayer}>
          <MaterialCommunityIcons
            name="star-four-points"
            size={180}
            color="rgba(16, 185, 129, 0.08)"
            style={styles.heroTextureBg}
          />
        </View>

        <View style={styles.heroContent}>
          <View style={styles.topMetaRow}>
            <View style={styles.heroStatusBadge}>
              <View style={styles.pulseDot} />
              <Text style={styles.heroStatusText}>
                {isManualSelection ? "Teny voafidy" : "Teny ho an'ny androany"}
              </Text>
            </View>

            {isManualSelection && (
              <TouchableOpacity
                onPress={onReset}
                style={styles.resetPill}
                activeOpacity={0.85}
              >
                <MaterialCommunityIcons
                  name="refresh"
                  size={14}
                  color={primaryColor}
                />
                <Text style={styles.resetPillText}>Averina</Text>
              </TouchableOpacity>
            )}
          </View>

          <Text style={styles.heroDateText}>{dateDisplay}</Text>

          <View style={styles.categoryMiniBadge}>
            <Text style={styles.categoryMiniEmoji}>
              {displayedCategory?.emoji || "✨"}
            </Text>
            <Text style={styles.categoryMiniText}>
              {displayedCategory?.category || "Teny Fikasana"}
            </Text>
          </View>

          <View style={styles.heroTextWrapper}>
            <MaterialCommunityIcons
              name="format-quote-open"
              size={26}
              color={primaryColor}
              style={{ marginBottom: 10 }}
            />
            <Text style={styles.heroVerseBody}>{displayedVerse.text}</Text>
            <Text style={styles.heroVerseRef}>{displayedVerse.reference}</Text>
          </View>

          <View style={styles.heroBottomActions}>
            <TouchableOpacity
              style={styles.readMoreBtn}
              onPress={onOpenBible}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={[
                  "rgba(255,255,255,0.15)",
                  "rgba(255,255,255,0.05)",
                ]}
                style={styles.readMoreGradient}
              >
                <MaterialCommunityIcons
                  name="book-open-variant"
                  size={18}
                  color="#fff"
                />
                <Text style={styles.readMoreText}>Vakio ao anaty Baiboly</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

export default VerseHeroCard;