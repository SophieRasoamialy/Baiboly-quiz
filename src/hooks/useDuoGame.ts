import { useState, useEffect } from "react";
import questionsData from "../data/questions_mg.json";
import { GAME_CONFIG } from "../constants/duoGame";

export const useDuoGame = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [index, setIndex] = useState(0);

  const [p1Score, setP1Score] = useState(0);
  const [p2Score, setP2Score] = useState(0);

  const [buzzedPlayer, setBuzzedPlayer] = useState<1 | 2 | null>(null);
  const [showOptions, setShowOptions] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const shuffled = [...questionsData].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, GAME_CONFIG.QUESTIONS_COUNT));
  }, []);

  const buzz = (player: 1 | 2) => {
    if (buzzedPlayer || isGameOver) return;
    setBuzzedPlayer(player);
    setShowOptions(true);
  };

  const answer = (option: string) => {
    if (!buzzedPlayer) return;

    const correct = option === questions[index].answer;

    if (buzzedPlayer === 1) {
      setP1Score(p => correct ? p + 1 : Math.max(0, p - 1));
    } else {
      setP2Score(p => correct ? p + 1 : Math.max(0, p - 1));
    }

    setTimeout(() => {
      if (index < GAME_CONFIG.QUESTIONS_COUNT - 1) {
        setIndex(i => i + 1);
        setBuzzedPlayer(null);
        setShowOptions(false);
      } else {
        setIsGameOver(true);
      }
    }, GAME_CONFIG.ANSWER_DELAY);
  };

  return {
    questions,
    index,
    current: questions[index],

    p1Score,
    p2Score,

    buzzedPlayer,
    showOptions,
    isGameOver,

    buzz,
    answer,
  };
};