import { ProjectStatus, type IProject } from "../models/Project";
import { parseDate } from "./formatDate";

export type DueDateTone = "overdue" | "soon" | "later";

export interface DueDateLabel {
  text: string;
  tone: DueDateTone;
}

export const DUE_DATE_TONE_STYLES: Record<DueDateTone, string> = {
  overdue: "bg-red-100 text-red-700",
  soon: "bg-amber-100 text-amber-800",
  later: "bg-gray-100 text-gray-700",
};

const MS_PER_DAY = 24 * 60 * 60 * 1000;

export function getDueDateLabel(project: IProject, today: Date = new Date()): DueDateLabel | null {
  if (!project.dueDate || project.status === ProjectStatus.Complete) {
    return null;
  }

  const days = daysBetween(today, parseDate(project.dueDate));

  if (days < 0) return { text: `${describeDuration(-days)} overdue`, tone: "overdue" };
  if (days === 0) return { text: "Due today", tone: "soon" };
  if (days === 1) return { text: "Due tomorrow", tone: "soon" };

  return { text: `Due in ${describeDuration(days)}`, tone: days <= 7 ? "soon" : "later" };
}

/** Whole calendar days from `from` to `to`, ignoring the time of day. */
function daysBetween(from: Date, to: Date): number {
  const start = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  // Math.round absorbs the hour gained or lost when clocks change
  return Math.round((to.getTime() - start.getTime()) / MS_PER_DAY);
}

function describeDuration(days: number): string {
  if (days < 14) return plural(days, "day");
  if (days < 60) return plural(Math.floor(days / 7), "week");
  return plural(Math.floor(days / 30), "month");
}

function plural(count: number, unit: string): string {
  return `${count} ${unit}${count === 1 ? "" : "s"}`;
}
