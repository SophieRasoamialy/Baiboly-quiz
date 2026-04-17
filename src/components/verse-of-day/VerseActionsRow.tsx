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
        colors={["#00E5CC", "#00B894"]}
        icon="share-variant"
        label="Hizara"
        onPress={onShareText}
      />

      <VerseActionButton
        styles={styles}
        colors={["#F9A825", "#E65100"]}
        icon="content-copy"
        label="Adika"
        onPress={onCopy}
      />
    </View>
  );
};

export default VerseActionsRow;