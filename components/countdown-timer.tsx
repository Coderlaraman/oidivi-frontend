import { useState, useEffect } from "react";
import { useLanguage } from "@/components/language-provider";

interface CountdownTimerProps {
  initialMinutes: number;
}

export function CountdownTimer({ initialMinutes }: CountdownTimerProps) {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <span>
      {t("verifyEmail.timeRemaining") || "Time remaining:"} {minutes}:
      {seconds.toString().padStart(2, "0")}
    </span>
  );
}
