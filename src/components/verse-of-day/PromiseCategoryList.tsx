import React from "react";
import { View } from "react-native";
import { ALL_PROMISES, PromiseVerse } from "../../constants/promises";
import PromiseCategoryRow from "./PromiseCategoryRow";
import PromiseVerseRow from "./PromiseVerseRow";

interface Props {
  styles: any;
  colors: any;
  openedCategory: string | null;
  setOpenedCategory: (value: string | null | ((prev: string | null) => string | null)) => void;
  displayedVerse: PromiseVerse;
  onSelectVerse: (verse: PromiseVerse) => void;
}

const PromiseCategoryList: React.FC<Props> = ({
  styles,
  colors,
  openedCategory,
  setOpenedCategory,
  displayedVerse,
  onSelectVerse,
}) => {
  return (
    <View style={styles.groupedList}>
      {ALL_PROMISES.map((category) => {
        const isOpen = openedCategory === category.category;

        return (
          <View key={category.category} style={styles.groupBlock}>
            <PromiseCategoryRow
              styles={styles}
              colors={colors}
              category={category}
              isOpen={isOpen}
              onPress={() =>
                setOpenedCategory((prev) =>
                  prev === category.category ? null : category.category,
                )
              }
            />

            {isOpen && (
              <View style={styles.versesPanel}>
                {category.verses.map((verse, index) => (
                  <PromiseVerseRow
                    key={`${verse.reference}-${index}`}
                    styles={styles}
                    colors={colors}
                    verse={verse}
                    isSelected={displayedVerse.reference === verse.reference}
                    onPress={() => onSelectVerse(verse)}
                  />
                ))}
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
};

export default PromiseCategoryList;