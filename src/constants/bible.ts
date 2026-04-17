export const OLD_TESTAMENT_BOOKS = [
  "Genesisy",
  "Eksodosy",
  "Levitikosy",
  "Nomery",
  "Deoteronomia",
  "Josoa",
  "Mpitsara",
  "Rota",
  "1 Samoela",
  "2 Samoela",
  "1 Mpanjaka",
  "2 Mpanjaka",
  "1 Tantara",
  "2 Tantara",
  "Ezra",
  "Nehemia",
  "Estera",
  "Joba",
  "Salamo",
  "Ohabolana",
  "Mpitoriteny",
  "Tononkiran'i Solomona",
  "Isaia",
  "Jeremia",
  "Fitomaniana",
  "Ezekiela",
  "Daniela",
  "Hosea",
  "Joela",
  "Amosa",
  "Obadia",
  "Jona",
  "Mika",
  "Nahoma",
  "Habakoka",
  "Zefania",
  "Hagay",
  "Zakaria",
  "Malakia",
];

export const BIBLE_GEMS_CONFIG = [
  { xRatio: 0.05, size: 12, delay: 0, duration: 8000, opacity: 0.45 },
  { xRatio: 0.3, size: 9, delay: 2000, duration: 7000, opacity: 0.35 },
  { xRatio: 0.6, size: 15, delay: 1000, duration: 9000, opacity: 0.5 },
  { xRatio: 0.85, size: 10, delay: 3000, duration: 7500, opacity: 0.4 },
];

export type BibleViewState = "BOOKS" | "CHAPTERS" | "VERSES" | "SEARCH";

export interface Verse {
  verse: number;
  text: string;
  title?: string;
}

export interface Chapter {
  chapter: number;
  verses: Verse[];
}

export interface Book {
  name: string;
  chapters: Chapter[];
}