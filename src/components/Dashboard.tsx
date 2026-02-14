"use client";

import { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { modules } from "@/data/modules";
import DayCarousel from "./DayCarousel";
import ProfileSidebar from "./ProfileSidebar";
import DayContent from "./DayContent";

export default function Dashboard() {
  const [selectedDay, setSelectedDay] = useState(1);

  // Track checked items per day: { [day]: boolean[] }
  const [checkedItemsMap, setCheckedItemsMap] = useState<
    Record<number, boolean[]>
  >(() => {
    const map: Record<number, boolean[]> = {};
    modules.forEach((mod) => {
      map[mod.day] = new Array(mod.items.length).fill(false);
    });
    return map;
  });

  // Track completed days
  const [completedDays, setCompletedDays] = useState<Set<number>>(new Set());

  const currentModule = modules.find((m) => m.day === selectedDay)!;
  const currentChecked = checkedItemsMap[selectedDay] ?? [];

  const handleToggleItem = useCallback(
    (index: number) => {
      setCheckedItemsMap((prev) => {
        const updated = [...(prev[selectedDay] ?? [])];
        updated[index] = !updated[index];
        return { ...prev, [selectedDay]: updated };
      });
    },
    [selectedDay]
  );

  const handleMarkDone = useCallback(() => {
    const allChecked = currentChecked.every(Boolean);
    if (allChecked) {
      setCompletedDays((prev) => new Set(prev).add(selectedDay));
    }
  }, [selectedDay, currentChecked]);

  // Calculate overall progress
  const progress = useMemo(() => {
    return (completedDays.size / modules.length) * 100;
  }, [completedDays]);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Top carousel */}
      <header className="sticky top-0 z-20 bg-background/80 py-4 backdrop-blur-md">
        <DayCarousel
          modules={modules}
          selectedDay={selectedDay}
          completedDays={completedDays}
          onSelectDay={setSelectedDay}
        />
      </header>

      {/* Main layout: sidebar + content */}
      <div className="flex flex-1 gap-8 px-4 pb-12 pt-4 lg:px-8">
        {/* Profile sidebar — hidden on small screens */}
        <aside className="hidden flex-shrink-0 md:block">
          <ProfileSidebar email="user@example.com" progress={progress} />
        </aside>

        {/* Main scrollable content */}
        <main className="flex flex-1 justify-center">
          <DayContent
            module={currentModule}
            checkedItems={currentChecked}
            onToggleItem={handleToggleItem}
            onMarkDone={handleMarkDone}
            isDayComplete={completedDays.has(selectedDay)}
          />
        </main>
      </div>

      {/* Fixed logo — bottom left */}
      <div className="fixed bottom-6 left-6 z-30">
        <Image
          src="/logo.png"
          alt="Creative Club"
          width={100}
          height={60}
          className="opacity-60 transition-opacity hover:opacity-100"
          priority
        />
      </div>
    </div>
  );
}
