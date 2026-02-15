"use client";

import { useEffect, useState } from "react";

interface RewardModalProps {
  day: number;
  reward: string;
  onClose: () => void;
}

function Sparkle({ style }: { style: React.CSSProperties }) {
  return (
    <div
      className="absolute h-2 w-2 rounded-full"
      style={{
        background:
          "radial-gradient(circle, rgba(255,215,0,1) 0%, rgba(255,165,0,0) 70%)",
        animation: "sparkle-float 1.5s ease-out forwards",
        ...style,
      }}
    />
  );
}

export default function RewardModal({ day, reward, onClose }: RewardModalProps) {
  const [visible, setVisible] = useState(false);
  const [sparkles] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 0.6}s`,
      size: Math.random() * 6 + 4,
      dx: (Math.random() - 0.5) * 200,
      dy: (Math.random() - 0.5) * 200 - 80,
    }))
  );

  useEffect(() => {
    // Trigger enter animation
    requestAnimationFrame(() => setVisible(true));
  }, []);

  function handleClose() {
    setVisible(false);
    setTimeout(onClose, 250);
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
        visible ? "bg-black/40 backdrop-blur-sm" : "bg-black/0"
      }`}
      onClick={handleClose}
    >
      {/* Sparkles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {sparkles.map((s) => (
          <Sparkle
            key={s.id}
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              animationDelay: s.delay,
              // @ts-expect-error custom properties for keyframes
              "--dx": `${s.dx}px`,
              "--dy": `${s.dy}px`,
            }}
          />
        ))}
      </div>

      {/* Modal card */}
      <div
        className={`relative mx-4 w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl transition-all duration-300 sm:p-10 ${
          visible
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-90 opacity-0 translate-y-4"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-muted transition-colors hover:bg-card-hover hover:text-foreground"
          aria-label="Close"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M4 4l8 8M12 4l-8 8" />
          </svg>
        </button>

        {/* Trophy icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            className="text-amber-500"
          >
            <path
              d="M8 21h8m-4-4v4m-5-8a5 5 0 0 1-3-4.5V4h16v4.5A5 5 0 0 1 13 13h-2ZM5 4H3v3a3 3 0 0 0 3 3m10-6h2v3a3 3 0 0 1-3 3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Title */}
        <h2 className="font-serif text-center text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          You&apos;ve unlocked your Day {day} reward!
        </h2>

        {/* Subtitle */}
        <p className="mt-4 text-center text-base leading-relaxed text-foreground/60">
          It gives you{" "}
          <span className="font-medium text-foreground/80">{reward}</span>
        </p>

        {/* Claim button */}
        <button
          onClick={handleClose}
          className="mt-8 w-full cursor-pointer rounded-xl bg-foreground px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-foreground/90 active:scale-[0.98]"
        >
          Claim Reward
        </button>
      </div>
    </div>
  );
}
