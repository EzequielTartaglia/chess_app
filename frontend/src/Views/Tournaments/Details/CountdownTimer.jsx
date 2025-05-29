'use client';
import { useEffect, useState } from "react";

export default function CountdownTimer({ isoDateTime }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const targetDate = new Date(isoDateTime);

    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        setTimeLeft(null); // indica que ya comenzó
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [isoDateTime]);

  if (timeLeft === null) {
    return (
      <span className="font-bold text-[40px] text-[var(--background-yellow)]">
        TORNEO EN CURSO
      </span>
    );
  }

  return (
    <span className="font-bold text-[40px] text-[var(--background-yellow)]">
      COMIENZA EN {timeLeft}
    </span>
  );
}
