import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { PromiseVerse } from "../../constants/promises";

const { width, height } = Dimensions.get("window");

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onViewDetails: () => void;
  verse: PromiseVerse;
  dateDisplay: string;
  colors: any;
}

const VerseOfDayModal: React.FC<Props> = ({
  isVisible,
  onClose,
  onViewDetails,
  verse,
  dateDisplay,
  colors,
}) => {
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      scaleAnim.setValue(0.9);
      opacityAnim.setValue(0);
    }
  }, [isVisible]);

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill} />
        
        <Animated.View
          style={[
            styles.modalContainer,
            {
              transform: [{ scale: scaleAnim }],
              opacity: opacityAnim,
            },
          ]}
        >
          <LinearGradient
            colors={[colors.background, colors.backgroundSecondary]}
            style={styles.gradient}
          >
            <View style={styles.header}>
              <View style={styles.headerTop}>
                <View style={styles.iconCircle}>
                  <MaterialCommunityIcons name="book-open-variant" size={24} color={colors.primary} />
                </View>
                <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                  <MaterialCommunityIcons name="close" size={24} color={colors.textMuted} />
                </TouchableOpacity>
              </View>
              <Text style={[styles.title, { color: colors.text }]}>Teny Fikasana ho Anao</Text>
              <Text style={[styles.date, { color: colors.textMuted }]}>{dateDisplay}</Text>
            </View>

            <View style={styles.content}>
              <View style={styles.quoteIcon}>
                <MaterialCommunityIcons name="format-quote-open" size={32} color={colors.primary + "40"} />
              </View>
              
              <Text style={[styles.verseText, { color: colors.text }]}>
                {verse.text}
              </Text>
              
              <View style={styles.referenceContainer}>
                <View style={styles.refLine} />
                <Text style={[styles.reference, { color: colors.primary }]}>
                  {verse.reference}
                </Text>
                <View style={styles.refLine} />
              </View>
            </View>

            <View style={styles.footer}>
              <TouchableOpacity
                style={[styles.primaryBtn, { backgroundColor: colors.primary }]}
                onPress={onViewDetails}
              >
                <Text style={styles.primaryBtnText}>HIJERY </Text>
                <MaterialCommunityIcons name="arrow-right" size={20} color="#FFF" />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: width * 0.88,
    borderRadius: 32,
    overflow: "hidden",
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  gradient: {
    padding: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 16,
  },
  iconCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeBtn: {
    position: "absolute",
    right: 0,
    top: 0,
    padding: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: "900",
    textAlign: "center",
    letterSpacing: -0.5,
  },
  date: {
    fontSize: 13,
    fontWeight: "600",
    marginTop: 4,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  content: {
    alignItems: "center",
    paddingVertical: 10,
  },
  quoteIcon: {
    marginBottom: 8,
  },
  verseText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 28,
    fontStyle: "italic",
    paddingHorizontal: 10,
  },
  referenceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    gap: 12,
  },
  refLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  reference: {
    fontSize: 15,
    fontWeight: "800",
  },
  footer: {
    marginTop: 30,
  },
  primaryBtn: {
    flexDirection: "row",
    height: 60,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    shadowColor: "#10B981",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  primaryBtnText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
});

export default VerseOfDayModal;
