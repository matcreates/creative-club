"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { DayModule } from "@/data/modules";
import DayCarousel from "./DayCarousel";
import ProfileSidebar from "./ProfileSidebar";
import DayContent from "./DayContent";

function buildCheckedMap(
  mods: DayModule[],
  saved?: Record<string, boolean[]>
): Record<number, boolean[]> {
  const map: Record<number, boolean[]> = {};
  mods.forEach((mod) => {
    const savedArr = saved?.[String(mod.day)];
    if (savedArr && savedArr.length === mod.items.length) {
      // Saved progress matches current item count — restore it
      map[mod.day] = savedArr;
    } else {
      // No saved data or item count changed — reset
      map[mod.day] = new Array(mod.items.length).fill(false);
    }
  });
  return map;
}

export default function Dashboard() {
  const router = useRouter();
  const [modules, setModules] = useState<DayModule[]>([]);
  const [selectedDay, setSelectedDay] = useState(1);
  const [email, setEmail] = useState("");
  const [loaded, setLoaded] = useState(false);

  const [checkedItemsMap, setCheckedItemsMap] = useState<
    Record<number, boolean[]>
  >({});

  const [completedDays, setCompletedDays] = useState<Set<number>>(new Set());

  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load modules, user session, and progress
  useEffect(() => {
    async function load() {
      try {
        const [modulesRes, meRes, progressRes] = await Promise.all([
          fetch("/api/modules"),
          fetch("/api/auth/me"),
          fetch("/api/progress"),
        ]);

        if (!meRes.ok) {
          router.push("/login");
          return;
        }

        const modulesData = await modulesRes.json();
        const mods: DayModule[] = modulesData.modules;
        setModules(mods);

        const meData = await meRes.json();
        setEmail(meData.email);

        let savedChecked: Record<string, boolean[]> | undefined;
        let savedCompleted: number[] | undefined;

        if (progressRes.ok) {
          const progressData = await progressRes.json();
          savedChecked = progressData.checkedItems;
          savedCompleted = progressData.completedDays;
        }

        setCheckedItemsMap(buildCheckedMap(mods, savedChecked));

        if (savedCompleted) {
          setCompletedDays(new Set(savedCompleted));
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

  const currentModule = modules.find((m) => m.day === selectedDay);
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

  const progress = useMemo(() => {
    if (modules.length === 0) return 0;
    return (completedDays.size / modules.length) * 100;
  }, [completedDays, modules.length]);

  if (!loaded || modules.length === 0) {
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

      {/* Fixed bottom-left: profile + logo — hidden on small screens */}
      <div className="fixed bottom-6 left-6 z-30 hidden flex-col gap-4 md:flex lg:left-8">
        <ProfileSidebar
          email={email}
          progress={progress}
          onLogout={handleLogout}
        />
        <Image
          src="/logo.png"
          alt="Creative Club"
          width={100}
          height={60}
          priority
        />
      </div>

      {/* Main layout: content */}
      <div className="flex flex-1 justify-center px-4 pb-12 pt-4 lg:px-8">
        <main className="flex w-full max-w-2xl justify-center">
          {currentModule && (
            <DayContent
              module={currentModule}
              checkedItems={currentChecked}
              onToggleItem={handleToggleItem}
              onMarkDone={handleMarkDone}
              isDayComplete={completedDays.has(selectedDay)}
            />
          )}
        </main>
      </div>

      {/* Fixed logo — bottom left (mobile only) */}
      <div className="fixed bottom-6 left-6 z-30 md:hidden">
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
