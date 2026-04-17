import { useState } from "react";
import { QUIZ_CONFIG } from "../constants/quiz";

export const useQuizGame = (questions: any[]) => {
  const [index, setIndex] = useState(0);
  const [hearts, setHearts] = useState(QUIZ_CONFIG.MAX_HEARTS);
  const [gems, setGems] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);

  const currentQuestion = questions[index];

  const answer = (choice: string) => {
    if (selected) return;

    setSelected(choice);

    if (choice === currentQuestion.correctAnswer) {
      setGems((g) => g + QUIZ_CONFIG.REWARD_GEMS);
    } else {
      setHearts((h) => h - 1);
    }
  };

  const next = () => {
    setSelected(null);
    setIndex((i) => i + 1);
  };

  const isFinished = index >= QUIZ_CONFIG.TOTAL_QUESTIONS;
  const isGameOver = hearts <= 0;

  return {
    currentQuestion,
    index,
    hearts,
    gems,
    selected,
    answer,
    next,
    isFinished,
    isGameOver,
  };
};