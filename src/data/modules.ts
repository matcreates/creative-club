export interface DayModule {
  day: number;
  title: string;
  description: string;
  items: string[];
}

export const modules: DayModule[] = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  title: `Day ${i + 1} Module`,
  description:
    "This is the description of the module. Complete all the items below to mark this day as done.",
  items: [
    `Item ${1}`,
    `Item ${2}`,
    `Item ${3}`,
    `Item ${4}`,
  ],
}));
