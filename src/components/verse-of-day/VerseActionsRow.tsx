import React from "react";
import { View } from "react-native";
import VerseActionButton from "./VerseActionButton";

interface Props {
  styles: any;
  onShareImage: () => void;
  onShareText: () => void;
  onCopy: () => void;
}

const VerseActionsRow: React.FC<Props> = ({
  styles,
  onShareImage,
  onShareText,
  onCopy,
}) => {
  return (
    <View style={styles.heroActions}>
      <VerseActionButton
        styles={styles}
        colors={["#AB47BC", "#7B1FA2"]}
        icon="image-plus"
        label="Sary"
        onPress={onShareImage}
      />

      <VerseActionButton
        styles={styles}
        colors={["#34D399", "#10B981"]}
        icon="share-variant"
        label="Hizara"
        onPress={onShareText}
      />

      <VerseActionButton
        styles={styles}
        colors={["#FBBF24", "#F59E0B"]}
        icon="content-copy"
        label="Adika"
        onPress={onCopy}
      />
    </View>
  );
};

export default VerseActionsRow;