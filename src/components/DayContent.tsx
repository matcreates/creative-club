"use client";

import { useState } from "react";
import type { DayModule } from "@/data/modules";

interface DayContentProps {
  module: DayModule;
  checkedItems: boolean[];
  onToggleItem: (index: number) => void;
  onMarkDone: () => void;
  isDayComplete: boolean;
}

function isValidSkoolLink(url: string): boolean {
  try {
    const parsed = new URL(url.trim());
    // Skool post URLs look like: https://www.skool.com/community-name/post-id
    return (
      (parsed.hostname === "www.skool.com" || parsed.hostname === "skool.com") &&
      /^\/[^/]+\/[^/]+/.test(parsed.pathname)
    );
  } catch {
    return false;
  }
}

export default function DayContent({
  module,
  checkedItems,
  onToggleItem,
  onMarkDone,
  isDayComplete,
}: DayContentProps) {
  const allChecked = checkedItems.length > 0 && checkedItems.every(Boolean);
  const [skoolLink, setSkoolLink] = useState("");
  const [linkError, setLinkError] = useState("");

  const skoolValid = isValidSkoolLink(skoolLink);
  const canSubmit = allChecked && skoolValid && !isDayComplete;

  function handleDone() {
    if (!allChecked) return;

    if (!skoolLink.trim()) {
      setLinkError("Please paste your Skool post link.");
      return;
    }

    if (!skoolValid) {
      setLinkError(
        "This doesn't look like a valid Skool post link. It should look like: https://www.skool.com/community/post-id"
      );
      return;
    }

    setLinkError("");
    onMarkDone();
  }

  return (
    <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-sm sm:p-10">
      {/* Day label + author */}
      <div className="flex items-center gap-2">
        <span className="font-serif text-sm text-muted">Day {module.day}</span>
        {module.author && module.author !== "TBA" && (
          <>
            <span className="text-sm text-muted/40">·</span>
            <span className="text-sm text-muted">{module.author}</span>
          </>
        )}
      </div>

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
            className="group flex cursor-pointer items-start gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-card-hover"
          >
            <input
              type="checkbox"
              className="custom-checkbox mt-0.5"
              checked={checkedItems[index] ?? false}
              onChange={() => onToggleItem(index)}
            />
            <span
              className={`text-sm leading-relaxed transition-colors ${
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

      {/* Skool link field */}
      <div className="mt-8">
        <label
          htmlFor="skool-link"
          className="mb-2 block text-sm font-medium text-foreground/70"
        >
          Paste your Skool post link
        </label>
        <input
          id="skool-link"
          type="url"
          value={isDayComplete ? "Submitted" : skoolLink}
          onChange={(e) => {
            setSkoolLink(e.target.value);
            setLinkError("");
          }}
          disabled={isDayComplete}
          placeholder="https://www.skool.com/community/your-post"
          className={`w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition-colors ${
            isDayComplete
              ? "border-emerald-200 bg-emerald-50 text-emerald-600 placeholder:text-emerald-400"
              : linkError
                ? "border-red-300 bg-red-50 text-foreground placeholder:text-muted focus:border-red-400"
                : skoolValid && skoolLink
                  ? "border-emerald-300 bg-emerald-50/50 text-foreground placeholder:text-muted"
                  : "border-border bg-card-hover text-foreground placeholder:text-muted focus:border-foreground/30 focus:bg-white"
          }`}
        />
        {linkError && (
          <p className="mt-2 text-xs text-red-500">{linkError}</p>
        )}
        {skoolValid && skoolLink && !isDayComplete && (
          <p className="mt-2 text-xs text-emerald-600">Valid Skool link</p>
        )}
      </div>

      {/* Done button */}
      <div className="mt-4">
        <button
          onClick={handleDone}
          disabled={!allChecked || isDayComplete}
          className={`rounded-lg border px-6 py-2.5 text-sm font-medium transition-all ${
            isDayComplete
              ? "cursor-default border-emerald-200 bg-emerald-50 text-emerald-600"
              : canSubmit
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
