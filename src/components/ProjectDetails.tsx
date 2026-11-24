import { useState, type FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { ProjectStatus, type IProject, type ITask } from "../models/Project";
import ProjectForm from "./ProjectForm";
import { formatDate } from "../utils/formatDate";
import { DUE_DATE_TONE_STYLES, getDueDateLabel } from "../utils/getDueDateLabel";
import { createTask, getTaskProgress, removeTask, toggleTask } from "../utils/tasks";
import { OVERDUE_BORDER, STATUS_STYLES } from "../styles/statusStyles";

const PILL = "rounded-full px-3 py-1 text-sm font-medium";
const CARD_LAYOUT = "mt-4 rounded-xl border p-6 shadow-sm sm:p-8";
const WHITE_CARD = `${CARD_LAYOUT} border-gray-200 bg-white`;
const ICON_BUTTON = "rounded-md p-2";
const BACK_LINK =
  "inline-block rounded-md border border-green-500 bg-transparent px-4 py-2 text-sm font-medium text-green-500 hover:bg-light-green-400";

interface ProjectDetailsProps {
  projects: IProject[];
  onDelete: (id: string) => void;
  onUpdate: (project: IProject) => void;
}

export default function ProjectDetails({ projects, onDelete, onUpdate }: ProjectDetailsProps) {
  const { id } = useParams();
  const project = projects.find((project) => project.id === id);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [justCompletedId, setJustCompletedId] = useState<string | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  if (!project) {
    return (
      <section className="mx-auto w-full max-w-3xl p-6">
        <div className={`${WHITE_CARD} text-center`}>
          <p className="mb-4 text-gray-600">Project not found.</p>
          <Link to="/" className={BACK_LINK}>← All projects</Link>
        </div>
      </section>
    );
  }

  const isEditing = editingId === project.id;
  const dueDateLabel = getDueDateLabel(project);
  const styles = STATUS_STYLES[project.status];
  const isOverdue = dueDateLabel?.tone === "overdue";
  const showCompletedMessage = justCompletedId === project.id && project.status === ProjectStatus.Complete;

  function markAsComplete() {
    onUpdate({ ...project!, status: ProjectStatus.Complete });
    setJustCompletedId(project!.id);
  }

  function undoComplete() {
    onUpdate({ ...project!, status: ProjectStatus.InProgress });
    setJustCompletedId(null);
  }

  const tasks = project.tasks ?? [];
  const progress = getTaskProgress(tasks);

  function updateTasks(updatedTasks: ITask[]) {
    onUpdate({ ...project!, tasks: updatedTasks });
  }

  function handleAddTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!newTaskTitle.trim()) return;
    updateTasks([...tasks, createTask(newTaskTitle)]);
    setNewTaskTitle("");
  }

  return (
    <section className="mx-auto w-full max-w-3xl p-6">
      <Link to="/" className={BACK_LINK}>← All projects</Link>

      {isEditing ? (
        <div className={WHITE_CARD}>
          <h1 className="text-2xl font-bold text-green">Edit project</h1>
          <ProjectForm
            initialValues={project}
            submitLabel="Save"
            onSubmit={(updated) => {
              onUpdate({ ...updated, id: project.id });
              setEditingId(null);
            }}
            onCancel={() => setEditingId(null)}
          />
        </div>
      ) : (
        <article className={`${CARD_LAYOUT} ${styles.card} ${isOverdue ? OVERDUE_BORDER : styles.border}`}>
          <header className="flex items-start justify-between gap-4">
            <h1 className="text-3xl font-bold text-green">{project.name}</h1>
            <button
              type="button"
              onClick={() => setEditingId(project.id)}
              aria-label="Edit project"
              title="Edit project"
              className={`${ICON_BUTTON} shrink-0 text-green hover:bg-black/5`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>
            </button>
          </header>

          <p className="mt-4 leading-relaxed text-gray-700">{project.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className={`${PILL} ${styles.badge}`}>{project.status}</span>
            {dueDateLabel && (
              <span className={`${PILL} ${DUE_DATE_TONE_STYLES[dueDateLabel.tone]}`}>
                {dueDateLabel.text}
              </span>
            )}
          </div>

          <div className="mt-8 border-t border-gray-200 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-medium uppercase tracking-wide text-gray-500">Tasks</h2>
            {progress && <span className="text-sm text-gray-600">{progress.done} of {progress.total} done</span>}
          </div>

          {progress && (
            <div
              role="progressbar"
              aria-label="Task progress"
              aria-valuenow={progress.percent}
              aria-valuemin={0}
              aria-valuemax={100}
              className="mt-3 h-2 rounded-full bg-black/10">
              <div
                className="h-full rounded-full bg-green-500 transition-[width] duration-300"
                style={{ width: `${progress.percent}%` }}
              />
            </div>
          )}

          <ul className="mt-4 flex flex-col gap-2">
            {tasks.map((task) => (
              <li key={task.id} className="flex items-center justify-between gap-3">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => updateTasks(toggleTask(tasks, task.id))}
                    className="h-4 w-4 accent-green-500"
                  />
                  <span className={task.completed ? "text-gray-400 line-through" : "text-gray-800"}>{task.name}</span>
                </label>
                <button
                  type="button"
                  onClick={() => updateTasks(removeTask(tasks, task.id))}
                  aria-label={`Delete task ${task.name}`}
                  className="text-sm text-gray-400 hover:text-red-600">
                  ✕
                </button>
              </li>
            ))}
          </ul>

          <form onSubmit={handleAddTask} className="mt-4 flex gap-2">
            <input
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Add a task"
              aria-label="New task"
              className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
            />
            <button type="submit" className="rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600">
              Add
            </button>
          </form>
        </div>

          <dl className="mt-8 grid gap-6 border-t border-gray-200 pt-6 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">Start date</dt>
              <dd className="mt-1 font-medium text-gray-900">{formatDate(project.startDate)}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">Due date</dt>
              <dd className="mt-1 font-medium text-gray-900">
                {project.dueDate ? formatDate(project.dueDate) : <span className="text-gray-500">No due date</span>}
              </dd>
            </div>
          </dl>

          <div className="mt-8 flex items-center justify-between gap-3 border-t border-gray-200 pt-6">
            <button
              type="button"
              onClick={() => onDelete(project.id)}
              aria-label="Delete project"
              title="Delete project"
              className={`${ICON_BUTTON} text-red-600 hover:bg-red-100`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </button>

            {project.status === ProjectStatus.NotStarted && (
              <button
                type="button"
                onClick={() => onUpdate({ ...project, status: ProjectStatus.InProgress })}
                className="rounded-md bg-green px-4 py-2 font-medium text-white hover:bg-green-600">
                Start project
              </button>
            )}
            {project.status === ProjectStatus.InProgress && (
              <button
                type="button"
                onClick={markAsComplete}
                className="rounded-md bg-green-500 px-4 py-2 font-medium text-white hover:bg-green-600">
                Mark as complete
              </button>
            )}
            {showCompletedMessage && (
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={undoComplete}
                  className="rounded-md border border-green-500 px-4 py-2 text-sm font-medium text-green-500 hover:bg-black/5">
                  Undo
                </button>
                <span className="flex items-center gap-2 text-sm font-medium text-green-500">
                  <span className="flex h-7 w-7 animate-pop items-center justify-center rounded-full bg-green-500 text-white" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="h-4 w-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </span>
                  Marked as complete
                </span>
              </div>
            )}
          </div>
        </article>
      )}
    </section>
  );
}
