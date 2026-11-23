import { ProjectStatus, type IProject } from "../models/Project";

export const mockProjects: IProject[] = [
  {
    id: "1",
    name: "Website Redesign",
    description:
      "Refresh the marketing site with a new visual identity, clearer navigation and improved mobile layouts.",
    startDate: "2026-10-05",
    dueDate: "2026-12-18",
    status: ProjectStatus.InProgress,
  },
  {
    id: "2",
    name: "Customer Onboarding Portal",
    description:
      "Build a guided setup flow that helps new customers configure their account and invite their team.",
    startDate: "2027-01-11",
    dueDate: "2027-03-26",
    status: ProjectStatus.NotStarted,
  },
  {
    id: "3",
    name: "Q3 Security Audit",
    description:
      "Review access controls, update dependencies and resolve all high-priority findings.",
    startDate: "2026-07-06",
    dueDate: "2026-09-25",
    status: ProjectStatus.Complete,
  },
  {
    id: "4",
    name: "Mobile App Research",
    description:
      "Interview customers and assess whether a dedicated mobile app would meet their needs.",
    startDate: "2026-11-16",
    status: ProjectStatus.InProgress,
  },
];
