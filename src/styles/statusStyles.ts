import { ProjectStatus } from "../models/Project";

interface StatusStyle {
  card: string;
  cardHover: string;
  border: string;
  badge: string;
  dot: string;
}

export const STATUS_STYLES: Record<ProjectStatus, StatusStyle> = {
  [ProjectStatus.NotStarted]: {
    card: "bg-gray-50",
    cardHover: "hover:bg-gray-100",
    border: "border-gray-200",
    badge: "bg-gray-200 text-gray-700",
    dot: "bg-gray-400",
  },
  [ProjectStatus.InProgress]: {
    card: "bg-blue-50",
    cardHover: "hover:bg-blue-100",
    border: "border-blue-200",
    badge: "bg-blue-100 text-blue-800",
    dot: "bg-blue-500",
  },
  [ProjectStatus.Complete]: {
    card: "bg-light-green-400/50",
    cardHover: "hover:bg-light-green-400",
    border: "border-light-green-600",
    badge: "bg-light-green text-green",
    dot: "bg-green-400",
  },
};

export const OVERDUE_BORDER = "border-red-400 ring-2 ring-red-100";
