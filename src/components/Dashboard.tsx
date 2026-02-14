"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { modules } from "@/data/modules";
import DayCarousel from "./DayCarousel";
import ProfileSidebar from "./ProfileSidebar";
import DayContent from "./DayContent";

export default function Dashboard() {
  const router = useRouter();
  const [selectedDay, setSelectedDay] = useState(1);
  const [email, setEmail] = useState("");
  const [loaded, setLoaded] = useState(false);

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

  // Ref to track if we need to save
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load user session and progress
  useEffect(() => {
    async function load() {
      try {
        const [meRes, progressRes] = await Promise.all([
          fetch("/api/auth/me"),
          fetch("/api/progress"),
        ]);

        if (!meRes.ok) {
          router.push("/login");
          return;
        }

        const meData = await meRes.json();
        setEmail(meData.email);

        if (progressRes.ok) {
          const progressData = await progressRes.json();

          // Restore checked items
          if (progressData.checkedItems) {
            setCheckedItemsMap((prev) => {
              const restored = { ...prev };
              for (const [dayStr, items] of Object.entries(
                progressData.checkedItems
              )) {
                const day = parseInt(dayStr);
                if (restored[day]) {
                  restored[day] = items as boolean[];
                }
              }
              return restored;
            });
          }

          // Restore completed days
          if (progressData.completedDays) {
            setCompletedDays(new Set(progressData.completedDays as number[]));
          }
        }
      } catch {
        router.push("/login");
      } finally {
        setLoaded(true);
      }
    }

    load();
  }, [router]);

  // Save progress (debounced)
  const saveProgress = useCallback(
    (
      newCheckedItems: Record<number, boolean[]>,
      newCompletedDays: Set<number>
    ) => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = setTimeout(() => {
        fetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            checkedItems: newCheckedItems,
            completedDays: Array.from(newCompletedDays),
          }),
        });
      }, 500);
    },
    []
  );

  const currentModule = modules.find((m) => m.day === selectedDay)!;
  const currentChecked = checkedItemsMap[selectedDay] ?? [];

  const handleToggleItem = useCallback(
    (index: number) => {
      setCheckedItemsMap((prev) => {
        const updated = [...(prev[selectedDay] ?? [])];
        updated[index] = !updated[index];
        const newMap = { ...prev, [selectedDay]: updated };
        saveProgress(newMap, completedDays);
        return newMap;
      });
    },
    [selectedDay, completedDays, saveProgress]
  );

  const handleMarkDone = useCallback(() => {
    const allChecked = currentChecked.every(Boolean);
    if (allChecked) {
      setCompletedDays((prev) => {
        const newSet = new Set(prev).add(selectedDay);
        saveProgress(checkedItemsMap, newSet);
        return newSet;
      });
    }
  }, [selectedDay, currentChecked, checkedItemsMap, saveProgress]);

  const handleLogout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }, [router]);

  // Calculate overall progress
  const progress = useMemo(() => {
    return (completedDays.size / modules.length) * 100;
  }, [completedDays]);

  if (!loaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-muted">Loading...</p>
      </div>
    );
  }

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

      {/* Fixed profile sidebar — hidden on small screens */}
      <aside className="hidden md:block">
        <ProfileSidebar
          email={email}
          progress={progress}
          onLogout={handleLogout}
        />
      </aside>

      {/* Main layout: content */}
      <div className="flex flex-1 justify-center px-4 pb-12 pt-4 lg:px-8">
        {/* Main scrollable content */}
        <main className="flex w-full max-w-2xl justify-center">
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
          priority
        />
      </div>
    </div>
  );
}
