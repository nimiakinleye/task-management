export const DATE_FORMAT = "MMM Do YYYY";

export const TIME_FORMAT = "h:mma";

export const PRIORITY_OPTIONS = ["high", "medium", "low"] as const;

export enum CATEGORIES {
  "to_do" = "To do",
  "in_progress" = "In progress",
  "completed" = "Completed",
}

export type CATEGORY_TYPE = keyof typeof CATEGORIES;
export type PRIORITY_TYPE = (typeof PRIORITY_OPTIONS)[number];
