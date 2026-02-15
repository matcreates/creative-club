"use client";

import { useEffect, useState } from "react";

interface RewardModalProps {
  day: number;
  reward: string;
  onClose: () => void;
}

const CONFETTI_COLORS = [
  "#FF6B6B", "#FF8E53", "#FFBD44", "#FFE66D", "#4ECB71",
  "#36D6A0", "#4DABF7", "#748FFC", "#9775FA", "#DA77F2",
  "#F06595", "#FF922B", "#20C997", "#339AF0", "#845EF7",
];

interface ConfettiPiece {
  id: number;
  left: string;
  delay: number;
  color: string;
  size: number;
  dx: number;
  dy: number;
  rotation: number;
  duration: number;
  shape: "circle" | "rect" | "star";
}

function Confetti({ piece }: { piece: ConfettiPiece }) {
  const shapeStyle: React.CSSProperties = {
    position: "absolute",
    left: piece.left,
    top: "50%",
    width: piece.size,
    height: piece.shape === "rect" ? piece.size * 0.6 : piece.size,
    backgroundColor: piece.color,
    borderRadius: piece.shape === "circle" ? "50%" : piece.shape === "rect" ? "2px" : "0",
    animation: `confetti-burst ${piece.duration}s ease-out forwards`,
    animationDelay: `${piece.delay}s`,
    opacity: 0,
    // @ts-expect-error custom CSS properties for keyframes
    "--dx": `${piece.dx}px`,
    "--dy": `${piece.dy}px`,
    "--rot": `${piece.rotation}deg`,
  };

  if (piece.shape === "star") {
    return (
      <div style={{ ...shapeStyle, backgroundColor: "transparent" }}>
        <svg width={piece.size} height={piece.size} viewBox="0 0 10 10">
          <polygon
            points="5,0 6.2,3.5 10,3.8 7.2,6.2 8,10 5,8 2,10 2.8,6.2 0,3.8 3.8,3.5"
            fill={piece.color}
          />
        </svg>
      </div>
    );
  }

  return <div style={shapeStyle} />;
}

export default function RewardModal({ day, reward, onClose }: RewardModalProps) {
  const [visible, setVisible] = useState(false);
  const [confetti] = useState<ConfettiPiece[]>(() => {
    const shapes: ConfettiPiece["shape"][] = ["circle", "rect", "star"];
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: `${30 + Math.random() * 40}%`,
      delay: Math.random() * 0.5,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      size: Math.random() * 8 + 5,
      dx: (Math.random() - 0.5) * 500,
      dy: (Math.random() - 0.5) * 600 - 150,
      rotation: Math.random() * 720 - 360,
      duration: 1.2 + Math.random() * 0.8,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
    }));
  });

  useEffect(() => {
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
      {/* Confetti */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {confetti.map((piece) => (
          <Confetti key={piece.id} piece={piece} />
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

        {/* Gift icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4 4.5C4 5.02384 4.11743 5.53557 4.33772 6H2C1.44772 6 1 6.44772 1 7V12C1 12.5523 1.44772 13 2 13H3V21C3 21.5523 3.44772 22 4 22H20C20.5523 22 21 21.5523 21 21V13H22C22.5523 13 23 12.5523 23 12V7C23 6.44772 22.5523 6 22 6H19.6623C19.8826 5.53557 20 5.02384 20 4.5C20 3.57174 19.6313 2.6815 18.9749 2.02513C18.3185 1.36875 17.4283 1 16.5 1C15.1769 1 14.1209 1.37202 13.3032 1.97769C12.7384 2.39606 12.316 2.90438 12 3.42396C11.684 2.90438 11.2616 2.39606 10.6968 1.97769C9.87913 1.37202 8.82309 1 7.5 1C6.57174 1 5.6815 1.36875 5.02513 2.02513C4.36875 2.6815 4 3.57174 4 4.5ZM7.5 3C7.10218 3 6.72064 3.15804 6.43934 3.43934C6.15804 3.72064 6 4.10218 6 4.5C6 4.89782 6.15804 5.27936 6.43934 5.56066C6.72064 5.84196 7.10218 6 7.5 6H10.8745C10.8032 5.66322 10.6934 5.2833 10.5256 4.91036C10.2937 4.39508 9.96597 3.92528 9.50633 3.58481C9.05837 3.25298 8.42691 3 7.5 3ZM13.1255 6H16.5C16.8978 6 17.2794 5.84196 17.5607 5.56066C17.842 5.27936 18 4.89782 18 4.5C18 4.10218 17.842 3.72064 17.5607 3.43934C17.2794 3.15804 16.8978 3 16.5 3C15.5731 3 14.9416 3.25298 14.4937 3.58481C14.034 3.92528 13.7063 4.39508 13.4744 4.91036C13.3066 5.2833 13.1968 5.66322 13.1255 6ZM13 8V11H21V8H13ZM11 8V11H3V8H11ZM13 20H19V13H13V20ZM11 13V20H5V13H11Z"
              fill="currentColor"
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
