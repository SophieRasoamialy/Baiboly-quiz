import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  styles: any;
  colors: any;
}

const BibleLoading: React.FC<Props> = ({ styles, colors }) => {
  return (
    <View style={styles.loadingWrap}>
      <LinearGradient
        colors={[colors.background, colors.backgroundSecondary]}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />
      <View style={styles.loadingCard}>
        <ActivityIndicator size="large" color={colors.secondary} />
      </View>
      <Text style={styles.loadingText}>Mampiditra ny Baiboly...</Text>
    </View>
  );
};

export default BibleLoading;