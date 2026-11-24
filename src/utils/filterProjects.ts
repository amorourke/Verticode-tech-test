import { ProjectStatus, type IProject } from "../models/Project";

export type StatusFilter = ProjectStatus | "all";
export type DueDateFilter = "all" | "overdue" | "next7" | "next30" | "none";

export interface ProjectFilters {
  search: string;
  status: StatusFilter;
  dueDate: DueDateFilter;
}

export const DUE_DATE_FILTER_LABELS: Record<DueDateFilter, string> = {
  all: "Any due date",
  overdue: "Overdue",
  next7: "Due in the next 7 days",
  next30: "Due in the next 30 days",
  none: "No due date",
};

export function parseProjectFilters(params: URLSearchParams): ProjectFilters {
  const status = params.get("status");
  const dueDate = params.get("dueDate");

  return {
    search: params.get("search") ?? "",
    status: isStatus(status) ? status : "all",
    dueDate: isDueDateFilter(dueDate) ? dueDate : "all",
  };
}

export function filterProjects(
  projects: IProject[],
  filters: ProjectFilters,
  today: Date = new Date()
): IProject[] {
  const search = filters.search.trim().toLowerCase();

  return projects.filter(
    (project) =>
      project.name.toLowerCase().includes(search) &&
      (filters.status === "all" || project.status === filters.status) &&
      matchesDueDate(project, filters.dueDate, today)
  );
}

function matchesDueDate(project: IProject, filter: DueDateFilter, today: Date): boolean {
  const { dueDate, status } = project;
  const todayString = toDateString(today);

  switch (filter) {
    case "all":
      return true;
    case "none":
      return !dueDate;
    case "overdue":
      return !!dueDate && dueDate < todayString && status !== ProjectStatus.Complete;
    case "next7":
      return !!dueDate && dueDate >= todayString && dueDate <= toDateString(addDays(today, 7));
    case "next30":
      return !!dueDate && dueDate >= todayString && dueDate <= toDateString(addDays(today, 30));
  }
}

function isStatus(value: string | null): value is ProjectStatus {
  return Object.values(ProjectStatus).includes(value as ProjectStatus);
}

function isDueDateFilter(value: string | null): value is DueDateFilter {
  return value !== null && value in DUE_DATE_FILTER_LABELS;
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function toDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
