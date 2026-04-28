import { useEffect, useState } from "react";
import { Book, Chapter, Verse } from "../constants/bible";
import { OLD_TESTAMENT_BOOKS } from "../constants/bible";
import i18n from "../i18n";

export interface SearchResult {
  book: Book;
  chapter: Chapter;
  verse: Verse;
}

export const useBibleSearch = (
  searchQuery: string,
  searchScope: string,
  bibleData: Book[],
) => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (searchQuery.trim().length < 3) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    const timeout = setTimeout(() => {
      const results: SearchResult[] = [];
      const lowerText = searchQuery.toLowerCase();

      for (const book of bibleData) {
        const isOT = OLD_TESTAMENT_BOOKS.includes(book.name);

        if (searchScope === i18n.t("old_testament") && !isOT) continue;
        if (searchScope === i18n.t("new_testament") && isOT) continue;

        if (
          searchScope !== i18n.t("all") &&
          searchScope !== i18n.t("old_testament") &&
          searchScope !== i18n.t("new_testament") &&
          searchScope !== book.name
        ) {
          continue;
        }

        for (const chapter of book.chapters) {
          for (const verse of chapter.verses) {
            if (verse.text.toLowerCase().includes(lowerText)) {
              results.push({ book, chapter, verse });
              if (results.length > 200) break;
            }
          }
          if (results.length > 200) break;
        }
        if (results.length > 200) break;
      }

      setSearchResults(results);
      setIsSearching(false);
    }, 200);

    return () => clearTimeout(timeout);
  }, [searchQuery, searchScope, bibleData]);

  return {
    searchResults,
    isSearching,
  };
};