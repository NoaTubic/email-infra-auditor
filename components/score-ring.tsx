"use client";

import { useEffect, useState } from "react";

interface ScoreRingProps {
  score: number;
  maxScore: number;
  color: string;
  bgColor: string;
  tierLabel: string;
}

export function ScoreRing({ score, maxScore, color, bgColor, tierLabel }: ScoreRingProps) {
  const [animated, setAnimated] = useState(false);
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const progress = score / maxScore;
  const offset = circumference - progress * circumference;

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="animate-scale-in flex flex-col items-center gap-4">
      <div
        className="relative h-48 w-48 rounded-full p-2"
        style={{ backgroundColor: `${bgColor}` }}
      >
        <svg
          className="h-full w-full -rotate-90"
          viewBox="0 0 160 160"
          aria-hidden="true"
        >
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="var(--ring-track)"
            strokeWidth="8"
          />
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={animated ? offset : circumference}
            style={{
              transition: "stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-mono text-4xl font-bold tracking-tight"
            style={{ color }}
            aria-label={`Score: ${score} out of ${maxScore}`}
          >
            {score}
          </span>
          <span className="text-xs font-medium text-grey-400">out of {maxScore}</span>
        </div>
      </div>
      <div
        className="rounded-full px-4 py-1.5 text-sm font-semibold"
        style={{ backgroundColor: bgColor, color }}
      >
        {tierLabel}
      </div>
    </div>
  );
}
