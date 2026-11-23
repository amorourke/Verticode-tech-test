export interface IProject {
  name: string;
  description: string;
  startDate: string;
  dueDate?: string;
  status: ProjectStatus;
}

export type ProjectFormValues = Required<IProject>;

export enum ProjectStatus {
  NotStarted = "Not started",
  InProgress = "In progress",
  Complete = "Complete",
}

