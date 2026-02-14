"use client";

import { useRef, useEffect } from "react";
import type { DayModule } from "@/data/modules";

interface DayCarouselProps {
  modules: DayModule[];
  selectedDay: number;
  completedDays: Set<number>;
  onSelectDay: (day: number) => void;
}

export default function DayCarousel({
  modules,
  selectedDay,
  completedDays,
  onSelectDay,
}: DayCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<number, HTMLButtonElement>>(new Map());

  // Scroll the selected day into view
  useEffect(() => {
    const el = itemRefs.current.get(selectedDay);
    if (el && scrollRef.current) {
      const container = scrollRef.current;
      const scrollLeft =
        el.offsetLeft - container.offsetWidth / 2 + el.offsetWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [selectedDay]);

  return (
    <div className="w-full">
      <div
        ref={scrollRef}
        className="scrollbar-hide flex gap-3 overflow-x-auto px-4 pb-2 pt-1"
      >
        {modules.map((mod) => {
          const isSelected = mod.day === selectedDay;
          const isCompleted = completedDays.has(mod.day);

          return (
            <button
              key={mod.day}
              ref={(el) => {
                if (el) itemRefs.current.set(mod.day, el);
              }}
              onClick={() => onSelectDay(mod.day)}
              className={`relative flex-shrink-0 cursor-pointer rounded-xl px-5 py-4 text-left transition-all duration-200 ${
                isSelected
                  ? "bg-white shadow-md ring-2 ring-black/5"
                  : "bg-white/60 hover:bg-white/80"
              }`}
              style={{ width: 172 }}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`font-serif text-sm ${
                    isSelected ? "text-foreground" : "text-muted"
                  }`}
                >
                  Day {mod.day}
                </span>
                {isCompleted && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2.5 6.5L5 9L9.5 3.5" />
                    </svg>
                  </span>
                )}
              </div>
              <p
                className={`mt-2 text-sm leading-snug ${
                  isSelected ? "text-foreground font-medium" : "text-foreground/70"
                }`}
              >
                {mod.title}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
