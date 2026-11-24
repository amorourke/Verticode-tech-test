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
    tasks: [
      { id: "1-1", name: "Audit current site", completed: true },
      { id: "1-2", name: "Design new homepage", completed: true },
      { id: "1-3", name: "Build responsive layouts", completed: false },
      { id: "1-4", name: "Launch and monitor", completed: false },
    ],
  },
  {
    id: "2",
    name: "Customer Onboarding Portal",
    description:
      "Build a guided setup flow that helps new customers configure their account and invite their team.",
    startDate: "2027-01-11",
    dueDate: "2027-03-26",
    status: ProjectStatus.NotStarted,
    tasks: [
      { id: "2-1", name: "Gather requirements", completed: false },
      { id: "2-2", name: "Draft setup flow", completed: false },
    ],
  },
  {
    id: "3",
    name: "Q3 Security Audit",
    description:
      "Review access controls, update dependencies and resolve all high-priority findings.",
    startDate: "2026-07-06",
    dueDate: "2026-09-25",
    status: ProjectStatus.Complete,
    tasks: [
      { id: "3-1", name: "Review access controls", completed: true },
      { id: "3-2", name: "Update dependencies", completed: true },
      { id: "3-3", name: "Fix high-priority findings", completed: true },
    ],
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
    tasks: [
      { id: "5-1", name: "Map existing subscriptions", completed: true },
      { id: "5-2", name: "Set up new payment provider", completed: false },
      { id: "5-3", name: "Migrate customer data", completed: false },
    ],
  },
  {
    id: "6",
    name: "Holiday Campaign Launch",
    description:
      "Prepare emails, landing pages and social posts for the end-of-year promotional campaign.",
    startDate: "2026-11-02",
    dueDate: "2026-11-28",
    status: ProjectStatus.InProgress,
    tasks: [
      { id: "6-1", name: "Write email copy", completed: true },
      { id: "6-2", name: "Design landing page", completed: true },
      { id: "6-3", name: "Schedule social posts", completed: true },
      { id: "6-4", name: "Final sign-off", completed: false },
    ],
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
    tasks: [
      { id: "8-1", name: "Collect financials", completed: true },
      { id: "8-2", name: "Pull product metrics", completed: true },
      { id: "8-3", name: "Add hiring update", completed: true },
      { id: "8-4", name: "Build slides", completed: true },
      { id: "8-5", name: "Rehearse presentation", completed: false },
    ],
  },
  {
    id: "9",
    name: "Support Ticket Triage",
    description:
      "Introduce priority tags and routing rules so urgent tickets reach the right team faster.",
    startDate: "2026-11-17",
    dueDate: "2026-11-25",
    status: ProjectStatus.InProgress,
    tasks: [
      { id: "9-1", name: "Define priority tags", completed: true },
      { id: "9-2", name: "Set up routing rules", completed: false },
      { id: "9-3", name: "Train support team", completed: false },
    ],
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
    tasks: [
      { id: "11-1", name: "Update logo rules", completed: true },
      { id: "11-2", name: "Finalise colour palette", completed: true },
    ],
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
