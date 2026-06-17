import { useState, useEffect } from 'react';

const WORLD_CUP_START = new Date('2026-06-11T19:00:00-04:00').getTime();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(): TimeLeft {
  const diff = Math.max(0, WORLD_CUP_START - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function DigitCard({ value, label }: { value: number; label: string }) {
  const digits = String(value).padStart(2, '0');

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-1">
        {digits.split('').map((d, i) => (
          <div
            key={i}
            className="flip-card w-10 h-14 sm:w-14 sm:h-20 flex items-center justify-center rounded-lg bg-wc-surface border border-wc-border font-heading text-2xl sm:text-4xl font-bold text-wc-accent glow-text shadow-[0_0_12px_rgba(0,230,118,0.15)]"
          >
            <div className="flip-card-inner">{d}</div>
          </div>
        ))}
      </div>
      <span className="text-xs sm:text-sm font-medium text-wc-muted tracking-wider">
        {label}
      </span>
    </div>
  );
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calcTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calcTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <h3 className="font-heading text-lg sm:text-xl font-semibold text-white tracking-wide">
        距离世界杯开幕
      </h3>
      <div className="flex items-center gap-3 sm:gap-5">
        <DigitCard value={timeLeft.days} label="天" />
        <span className="text-2xl sm:text-3xl font-heading font-bold text-wc-accent mt-[-20px]">:</span>
        <DigitCard value={timeLeft.hours} label="时" />
        <span className="text-2xl sm:text-3xl font-heading font-bold text-wc-accent mt-[-20px]">:</span>
        <DigitCard value={timeLeft.minutes} label="分" />
        <span className="text-2xl sm:text-3xl font-heading font-bold text-wc-accent mt-[-20px]">:</span>
        <DigitCard value={timeLeft.seconds} label="秒" />
      </div>
    </div>
  );
}
