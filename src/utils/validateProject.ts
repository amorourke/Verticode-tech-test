import type { ProjectFormValues } from "../models/Project";

export type ProjectFormErrors = Partial<
  Record<keyof ProjectFormValues, string>
>;

export function validateProject(values: ProjectFormValues): ProjectFormErrors {
  const errors: ProjectFormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Project name is required.";
  }

  if (!values.description.trim()) {
    errors.description = "Description is required.";
  }

  if (!values.startDate) {
    errors.startDate = "Start date is required.";
  }

  if (values.dueDate && values.startDate && values.dueDate < values.startDate) {
    errors.dueDate = "Due date cannot be before the start date.";
  }

  return errors;
}