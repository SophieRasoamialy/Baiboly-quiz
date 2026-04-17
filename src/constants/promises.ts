export interface PromiseVerse {
  reference: string;
  book: string;
  chapter: number;
  verse: number;
  text: string;
  promise: string;
}

export interface PromiseCategory {
  category: string;
  emoji: string;
  verses: PromiseVerse[];
}

export const ALL_PROMISES: PromiseCategory[] = require("../data/promises_mg.json");

export const ALL_PROMISE_VERSES: PromiseVerse[] = ALL_PROMISES.flatMap(
  (category) => category.verses,
);