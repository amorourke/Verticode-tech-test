import type { ITask } from "../models/Project";

export function createTask(name: string): ITask {
  return { id: crypto.randomUUID(), name: name.trim(), completed: false };
}

export function toggleTask(tasks: ITask[], taskId: string): ITask[] {
  return tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task));
}

export function removeTask(tasks: ITask[], taskId: string): ITask[] {
  return tasks.filter((task) => task.id !== taskId);
}

export function getTaskProgress(tasks: ITask[] = []) {
  if (tasks.length === 0) return null;
  const done = tasks.filter((task) => task.completed).length;
  return { done, total: tasks.length, percent: Math.round((done / tasks.length) * 100) };
}