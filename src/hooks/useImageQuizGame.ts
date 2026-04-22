import { useState, useEffect } from "react";
import quizImageData from "../data/quiz-image.json";
import { useUser } from "../context/user/UserContext";
import { soundHelper } from "../utils/SoundHelper";

export const useImageQuizGame = (p1?: any, p2?: any, questionsCount: number = 5) => {
  const { addPoints, isLoggedIn, soundEnabled } = useUser();
  const [questions, setQuestions] = useState<any[]>([]);
  const [index, setIndex] = useState(0);

  const [p1Score, setP1Score] = useState(0);
  const [p2Score, setP2Score] = useState(0);

  const [p1Answered, setP1Answered] = useState(false);
  const [p2Answered, setP2Answered] = useState(false);

  const [isGameOver, setIsGameOver] = useState(false);
  const [questionDone, setQuestionDone] = useState(false);

  // Shuffle logic
  const shuffle = (arr: any[]) => {
    const newArr = [...arr];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  useEffect(() => {
    const shuffled = shuffle(quizImageData).map((q) => ({
      ...q,
      options: shuffle(q.options),
    }));
    setQuestions(shuffled.slice(0, questionsCount));
  }, [questionsCount]);

  const nextQuestion = () => {
    setTimeout(() => {
      if (index < questions.length - 1) {
        setIndex(i => i + 1);
        setP1Answered(false);
        setP2Answered(false);
        setQuestionDone(false);
      } else {
        setIsGameOver(true);
      }
    }, 2000);
  };

  const answer = (player: 1 | 2, option: string) => {
    if (questionDone) return;
    if (player === 1 && p1Answered) return;
    if (player === 2 && p2Answered) return;

    const correct = option === questions[index].answer;

    if (player === 1) setP1Answered(true);
    else setP2Answered(true);

    if (correct) {
      if (player === 1) {
        setP1Score(p => p + 1);
        if (isLoggedIn) addPoints(10);
      } else {
        setP2Score(p => p + 1);
      }
      setQuestionDone(true);
      soundHelper.playCorrect(soundEnabled);
      nextQuestion();
    } else {
      if (player === 1) {
        setP1Score(p => Math.max(0, p - 1));
        if (isLoggedIn) addPoints(-5);
      } else {
        setP2Score(p => Math.max(0, p - 1));
      }
      soundHelper.playWrong(soundEnabled);

      const otherAnswered = player === 1 ? p2Answered : p1Answered;
      if (otherAnswered) {
        setQuestionDone(true);
        nextQuestion();
      }
    }
  };

  useEffect(() => {
    if (isGameOver) {
      soundHelper.playWin(soundEnabled);
    }
  }, [isGameOver, soundEnabled]);

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
