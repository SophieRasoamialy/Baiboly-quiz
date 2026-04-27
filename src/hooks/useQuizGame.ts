import { useState } from "react";
import { QUIZ_CONFIG } from "../constants/quiz";
import { useUser } from "../context/user/UserContext";
import { soundHelper } from "../utils/SoundHelper";

export const useQuizGame = (questions: any[]) => {
  const { addPoints, isLoggedIn, hearts, gems, addGems, removeHeart, soundEnabled } = useUser();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);

  const currentQuestion = questions[index];

  const answer = (choice: string) => {
    if (selected) return;

    setSelected(choice);

    if (choice === currentQuestion.correctAnswer) {
      setCorrectCount(prev => prev + 1);
      addGems(QUIZ_CONFIG.REWARD_GEMS);
      if (isLoggedIn) addPoints(10);
      soundHelper.playCorrect(soundEnabled);
    } else {
      removeHeart();
      if (isLoggedIn) addPoints(-5);
      soundHelper.playWrong(soundEnabled);
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
    correctCount,
    answer,
    next,
    isFinished,
    isGameOver,
  };
};