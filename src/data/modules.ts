export interface DayModule {
  day: number;
  title: string;
  description: string;
  items: string[];
}

const defaultItems = ["Item 1", "Item 2", "Item 3", "Item 4"];

const day2Items = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);

export const modules: DayModule[] = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  title: `Day ${i + 1} Module`,
  description:
    "This is the description of the module. Complete all the items below to mark this day as done.",
  items: i + 1 === 2 ? day2Items : defaultItems,
}));
