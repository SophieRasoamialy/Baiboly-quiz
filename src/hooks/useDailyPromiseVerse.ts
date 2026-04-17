import { useMemo } from "react";
import {
  ALL_PROMISES,
  ALL_PROMISE_VERSES,
  PromiseCategory,
  PromiseVerse,
} from "../constants/promises";

const getDailyVerseIndex = (dateStr: string): number => {
  let hash = 0;

  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash * 31 + dateStr.charCodeAt(i)) | 0;
  }

  return Math.abs(hash) % ALL_PROMISE_VERSES.length;
};

const getDateString = (date: Date): string => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0",
  )}-${String(date.getDate()).padStart(2, "0")}`;
};

const getCategoryForVerse = (
  verse: PromiseVerse,
): PromiseCategory | undefined => {
  return ALL_PROMISES.find((category) =>
    category.verses.some((item) => item.reference === verse.reference),
  );
};

export const useDailyPromiseVerse = () => {
  const today = useMemo(() => new Date(), []);
  const dateStr = useMemo(() => getDateString(today), [today]);

  const dailyVerse = useMemo(() => {
    const index = getDailyVerseIndex(dateStr);
    return ALL_PROMISE_VERSES[index];
  }, [dateStr]);

  const dailyCategory = useMemo(
    () => getCategoryForVerse(dailyVerse),
    [dailyVerse],
  );

  const dateDisplay = useMemo(() => {
    const dayNames = [
      "Alahady",
      "Alatsinainy",
      "Talata",
      "Alarobia",
      "Alakamisy",
      "Zoma",
      "Sabotsy",
    ];

    const monthNames = [
      "Janoary",
      "Febroary",
      "Martsa",
      "Aprily",
      "Mey",
      "Jona",
      "Jolay",
      "Aogositra",
      "Septambra",
      "Oktobra",
      "Novambra",
      "Desambra",
    ];

    return `${dayNames[today.getDay()]} ${today.getDate()} ${
      monthNames[today.getMonth()]
    } ${today.getFullYear()}`;
  }, [today]);

  return {
    today,
    dateStr,
    dateDisplay,
    dailyVerse,
    dailyCategory,
    getCategoryForVerse,
  };
};