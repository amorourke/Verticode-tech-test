import { ProjectStatus, type IProject } from "../models/Project";

export const STATUS_DISPLAY_ORDER: ProjectStatus[] = [
  ProjectStatus.InProgress,
  ProjectStatus.NotStarted,
  ProjectStatus.Complete,
];

function statusRank(status: ProjectStatus): number {
  return STATUS_DISPLAY_ORDER.indexOf(status);
}

export function sortProjects(projects: IProject[]): IProject[] {
  return [...projects].sort(
    (a, b) =>
      statusRank(a.status) - statusRank(b.status) || compareDueDates(a.dueDate, b.dueDate)
  );
}

function compareDueDates(a?: string, b?: string): number {
  if (a === b) return 0;
  if (!a) return 1;
  if (!b) return -1;
  return a.localeCompare(b);
}
