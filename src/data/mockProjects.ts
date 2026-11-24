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
  {
    id: "5",
    name: "Billing System Migration",
    description:
      "Move all customer subscriptions to the new payments provider without interrupting active billing.",
    startDate: "2026-09-14",
    dueDate: "2026-11-13",
    status: ProjectStatus.InProgress,
  },
  {
    id: "6",
    name: "Holiday Campaign Launch",
    description:
      "Prepare emails, landing pages and social posts for the end-of-year promotional campaign.",
    startDate: "2026-11-02",
    dueDate: "2026-11-28",
    status: ProjectStatus.InProgress,
  },
  {
    id: "7",
    name: "Internal Wiki Clean-up",
    description:
      "Archive outdated pages, merge duplicates and add owners to every section of the team wiki.",
    startDate: "2026-12-07",
    dueDate: "2026-12-21",
    status: ProjectStatus.NotStarted,
  },
  {
    id: "8",
    name: "Quarterly Board Report",
    description:
      "Compile financials, product metrics and hiring updates into the Q4 board presentation.",
    startDate: "2026-11-09",
    dueDate: "2026-11-24",
    status: ProjectStatus.InProgress,
  },
  {
    id: "9",
    name: "Support Ticket Triage",
    description:
      "Introduce priority tags and routing rules so urgent tickets reach the right team faster.",
    startDate: "2026-11-17",
    dueDate: "2026-11-25",
    status: ProjectStatus.InProgress,
  },
  {
    id: "10",
    name: "Data Warehouse Upgrade",
    description:
      "Upgrade the analytics warehouse and rebuild the reporting pipelines on the new version.",
    startDate: "2027-02-01",
    dueDate: "2027-06-30",
    status: ProjectStatus.NotStarted,
  },
  {
    id: "11",
    name: "Brand Guidelines Refresh",
    description:
      "Update the logo usage rules, colour palette and typography guidance for all teams.",
    startDate: "2026-08-03",
    dueDate: "2026-10-16",
    status: ProjectStatus.Complete,
  },
  {
    id: "12",
    name: "Accessibility Review",
    description:
      "Audit the web app against WCAG guidelines and plan fixes for the most common issues.",
    startDate: "2026-11-23",
    status: ProjectStatus.NotStarted,
  },
];
