import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ProjectStatus, type IProject } from "../models/Project";
import ProjectForm from "./ProjectForm";
import { formatDate } from "../utils/formatDate";
import { DUE_DATE_TONE_STYLES, getDueDateLabel } from "../utils/getDueDateLabel";

const STATUS_STYLES: Record<ProjectStatus, string> = {
  [ProjectStatus.NotStarted]: "bg-gray-100 text-gray-700",
  [ProjectStatus.InProgress]: "bg-blue-100 text-blue-800",
  [ProjectStatus.Complete]: "bg-light-green text-green",
};

const PILL = "rounded-full px-3 py-1 text-sm font-medium";
const CARD ="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8";
const BACK_LINK = "text-sm font-medium text-green-500 hover:underline";

interface ProjectDetailsProps {
  projects: IProject[];
  onDelete: (id: string) => void;
  onUpdate: (project: IProject) => void;
}

export default function ProjectDetails({ projects, onDelete, onUpdate }: ProjectDetailsProps) {
  const { id } = useParams();
  const project = projects.find((project) => project.id === id);

  const [editingId, setEditingId] = useState<string | null>(null);

  if (!project) {
    return (
      <section className="mx-auto w-full max-w-3xl p-6">
        <div className={`${CARD} text-center`}>
          <p className="mb-4 text-gray-600">Project not found.</p>
          <Link to="/" className={BACK_LINK}>← All projects</Link>
        </div>
      </section>
    );
  }

  const isEditing = editingId === project.id;
  const isComplete = project.status === ProjectStatus.Complete;
  const dueDateLabel = getDueDateLabel(project);

  return (
    <section className="mx-auto w-full max-w-3xl p-6">
      <Link to="/" className={BACK_LINK}>← All projects</Link>

      {isEditing ? (
        <div className={CARD}>
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
        <article className={CARD}>
          <header className="flex flex-col-reverse items-start gap-3 sm:flex-row sm:justify-between">
            <h1 className="text-3xl font-bold text-green">{project.name}</h1>
            <div className="flex shrink-0 flex-wrap gap-2">
              {dueDateLabel && (
                <span className={`${PILL} ${DUE_DATE_TONE_STYLES[dueDateLabel.tone]}`}>
                  {dueDateLabel.text}
                </span>
              )}
              <span className={`${PILL} ${STATUS_STYLES[project.status]}`}>
                {project.status}
              </span>
            </div>
          </header>

          <p className="mt-4 leading-relaxed text-gray-700">{project.description}</p>

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

          <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-gray-200 pt-6">
            {!isComplete && (
              <button
                type="button"
                onClick={() => onUpdate({ ...project, status: ProjectStatus.Complete })}
                className="rounded-md bg-green px-4 py-2 font-medium text-white hover:bg-green-600">
                Mark as complete
              </button>
            )}
            <button
              type="button"
              onClick={() => setEditingId(project.id)}
              className="rounded-md border border-green px-4 py-2 font-medium text-green hover:bg-light-green-400">
              Edit project
            </button>
            <button
              type="button"
              onClick={() => onDelete(project.id)}
              className="ml-auto rounded-md px-4 py-2 font-medium text-red-600 hover:bg-red-50">
              Delete
            </button>
          </div>
        </article>
      )}
    </section>
  );
}
