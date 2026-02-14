"use client";

import type { DayModule } from "@/data/modules";

interface DayContentProps {
  module: DayModule;
  checkedItems: boolean[];
  onToggleItem: (index: number) => void;
  onMarkDone: () => void;
  isDayComplete: boolean;
}

export default function DayContent({
  module,
  checkedItems,
  onToggleItem,
  onMarkDone,
  isDayComplete,
}: DayContentProps) {
  const allChecked = checkedItems.every(Boolean);

  return (
    <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-sm sm:p-10">
      {/* Day label */}
      <span className="font-serif text-sm text-muted">Day {module.day}</span>

      {/* Title */}
      <h1 className="font-serif mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {module.title}
      </h1>

      {/* Description */}
      <p className="mt-4 text-base leading-relaxed text-foreground/60">
        {module.description}
      </p>

      {/* Divider */}
      <hr className="my-6 border-border" />

      {/* Checklist */}
      <div className="flex flex-col gap-3">
        {module.items.map((item, index) => (
          <label
            key={index}
            className="group flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-card-hover"
          >
            <input
              type="checkbox"
              className="custom-checkbox"
              checked={checkedItems[index] ?? false}
              onChange={() => onToggleItem(index)}
            />
            <span
              className={`text-sm transition-colors ${
                checkedItems[index]
                  ? "text-muted line-through"
                  : "text-foreground"
              }`}
            >
              {item}
            </span>
          </label>
        ))}
      </div>

      {/* Done button */}
      <div className="mt-8">
        <button
          onClick={onMarkDone}
          disabled={!allChecked || isDayComplete}
          className={`rounded-lg border px-6 py-2.5 text-sm font-medium transition-all ${
            isDayComplete
              ? "cursor-default border-emerald-200 bg-emerald-50 text-emerald-600"
              : allChecked
                ? "cursor-pointer border-foreground bg-foreground text-white hover:bg-foreground/90 active:scale-[0.98]"
                : "cursor-not-allowed border-border bg-card-hover text-muted"
          }`}
        >
          {isDayComplete ? "Completed" : "Done"}
        </button>
      </div>
    </div>
  );
}
