import React from "react";
import { View } from "react-native";
import VerseActionButton from "./VerseActionButton";
import i18n from "../../i18n";

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
        label={i18n.t("image_label")}
        onPress={onShareImage}
      />

      <VerseActionButton
        styles={styles}
        colors={["#34D399", "#10B981"]}
        icon="share-variant"
        label={i18n.t("share")}
        onPress={onShareText}
      />

      <VerseActionButton
        styles={styles}
        colors={["#FBBF24", "#F59E0B"]}
        icon="content-copy"
        label={i18n.t("copy_label")}
        onPress={onCopy}
      />
    </View>
  );
};

export default VerseActionsRow;