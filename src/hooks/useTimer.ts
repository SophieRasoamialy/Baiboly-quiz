import { useEffect, useState } from "react";

export const useTimer = (duration: number, onEnd: () => void) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isActive) return;

    if (timeLeft <= 0) {
      onEnd();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, isActive, onEnd]);

  const reset = () => {
    setTimeLeft(duration);
    setIsActive(true);
  };

  const stop = () => setIsActive(false);

  return { timeLeft, reset, stop };
};