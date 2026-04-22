import { useEffect, useState, useRef } from "react";

export const useTimer = (duration: number, onEnd: () => void) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(true);
  const onEndRef = useRef(onEnd);

  useEffect(() => {
    onEndRef.current = onEnd;
  }, [onEnd]);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(interval);
          onEndRef.current();
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  const reset = () => {
    setTimeLeft(duration);
    setIsActive(true);
  };

  const stop = () => setIsActive(false);

  return { timeLeft, reset, stop };
};