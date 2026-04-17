import { useMemo } from "react";
import questionsData from "../data/questions_mg.json";

export interface QuizTheme {
  id: string;
  title: string;
  totalQuestions: number;
  colors: string[];
}

const THEME_COLORS = [
  ["#FF6B6B", "#EE5253"], // Red
  ["#48DBFB", "#0ABDE3"], // Cyan
  ["#1DD1A1", "#10AC84"], // Green
  ["#FF9F43", "#FECA57"], // Orange
  ["#5F27CD", "#341F97"], // Purple
  ["#FF9FF3", "#F368E0"], // Pink
];

export const useQuizThemes = () => {
  const themes = useMemo<QuizTheme[]>(() => {
    const uniqueNames = Array.from(
      new Set(questionsData.map((q: any) => q.theme))
    ) as string[];

    return uniqueNames.map((name, index) => ({
      id: name,
      title: name,
      totalQuestions: questionsData.filter((q: any) => q.theme === name).length,
      colors: THEME_COLORS[index % THEME_COLORS.length],
    }));
  }, []);

  const totalQuestions = useMemo(() => {
    return questionsData.length;
  }, []);

  return {
    themes,
    totalQuestions,
  };
};