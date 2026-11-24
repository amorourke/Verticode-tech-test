import { ProjectStatus, type IProject } from "../models/Project";

/** The order statuses are shown in: sorting and the list page sections both use it. */
export const STATUS_DISPLAY_ORDER: ProjectStatus[] = [
  ProjectStatus.InProgress,
  ProjectStatus.NotStarted,
  ProjectStatus.Complete,
];

function statusRank(status: ProjectStatus): number {
  return STATUS_DISPLAY_ORDER.indexOf(status);
}

/** Sorts by status (in progress, not started, complete), then by most imminent due date. */
export function sortProjects(projects: IProject[]): IProject[] {
  // Copy first: .sort() changes the array in place, and props shouldn't be mutated
  return [...projects].sort(
    (a, b) =>
      statusRank(a.status) - statusRank(b.status) || compareDueDates(a.dueDate, b.dueDate)
  );
}

/** Earliest due date first. Projects without a due date go last. */
function compareDueDates(a?: string, b?: string): number {
  if (a === b) return 0;
  if (!a) return 1;
  if (!b) return -1;
  // "YYYY-MM-DD" strings sort in date order
  return a.localeCompare(b);
}
