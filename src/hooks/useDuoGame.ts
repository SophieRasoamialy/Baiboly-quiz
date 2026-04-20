import { useState, useEffect } from "react";
import questionsData from "../data/questions_mg.json";
import { GAME_CONFIG } from "../constants/duoGame";

export const useDuoGame = (p1: any, p2: any) => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [index, setIndex] = useState(0);

  const [p1Score, setP1Score] = useState(0);
  const [p2Score, setP2Score] = useState(0);

  // Track who already answered this question (to prevent double clicks)
  const [p1Answered, setP1Answered] = useState(false);
  const [p2Answered, setP2Answered] = useState(false);

  const [isGameOver, setIsGameOver] = useState(false);
  const [questionDone, setQuestionDone] = useState(false);

  useEffect(() => {
    const shuffled = [...questionsData].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, GAME_CONFIG.QUESTIONS_COUNT));
  }, []);

  const nextQuestion = () => {
    setTimeout(() => {
      if (index < GAME_CONFIG.QUESTIONS_COUNT - 1) {
        setIndex(i => i + 1);
        setP1Answered(false);
        setP2Answered(false);
        setQuestionDone(false);
      } else {
        setIsGameOver(true);
      }
    }, GAME_CONFIG.ANSWER_DELAY);
  };

  const answer = (player: 1 | 2, option: string) => {
    if (questionDone) return;
    if (player === 1 && p1Answered) return;
    if (player === 2 && p2Answered) return;

    const correct = option === questions[index].answer;

    if (player === 1) setP1Answered(true);
    else setP2Answered(true);

    if (correct) {
      if (player === 1) setP1Score(p => p + 1);
      else setP2Score(p => p + 1);
      // First correct answer ends the question
      setQuestionDone(true);
      nextQuestion();
    } else {
      // Wrong answer: lose a point, still can be answered by other player
      if (player === 1) setP1Score(p => Math.max(0, p - 1));
      else setP2Score(p => Math.max(0, p - 1));

      // If both players have answered and both were wrong, move on
      const otherAnswered = player === 1 ? p2Answered : p1Answered;
      if (otherAnswered) {
        setQuestionDone(true);
        nextQuestion();
      }
    }
  };

  return {
    questions,
    index,
    current: questions[index],

    p1Name: p1?.id ?? "Mpilalao 1",
    p2Name: p2?.id ?? "Mpilalao 2",
    p1Avatar: p1?.img,
    p2Avatar: p2?.img,

    p1Score,
    p2Score,

    p1Answered,
    p2Answered,
    questionDone,
    isGameOver,

    answer,
  };
};