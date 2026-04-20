import { useState } from "react";
import { QUIZ_CONFIG } from "../constants/quiz";
import { useUser } from "../context/user/UserContext";

export const useQuizGame = (questions: any[]) => {
  const { addPoints, isLoggedIn, hearts, gems, addGems, removeHeart } = useUser();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);

  const currentQuestion = questions[index];

  const answer = (choice: string) => {
    if (selected) return;

    setSelected(choice);

    if (choice === currentQuestion.correctAnswer) {
      addGems(QUIZ_CONFIG.REWARD_GEMS);
      if (isLoggedIn) addPoints(10);
    } else {
      removeHeart();
      if (isLoggedIn) addPoints(-5);
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