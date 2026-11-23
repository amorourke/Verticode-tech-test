export interface IProject {
  id: string;  
  name: string;
  description: string;
  startDate: string;
  dueDate?: string;
  status: ProjectStatus;
}

export type NewProject = Omit<IProject, "id">;

export enum ProjectStatus {
  NotStarted = "Not started",
  InProgress = "In progress",
  Complete = "Complete",
}

