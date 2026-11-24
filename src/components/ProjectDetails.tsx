import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ProjectStatus, type IProject } from "../models/Project";
import ProjectForm from "./ProjectForm";
import { formatDate } from "../utils/formatDate";

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
      <section className="mx-auto w-full max-w-xl p-6">
        <p className="mb-4 text-gray-600">Project not found.</p>
        <Link to="/" className="font-medium text-green-500 hover:underline">
          ← All projects
        </Link>
      </section>
    );
  }

  const isEditing = editingId === project.id;
  const isComplete = project.status === ProjectStatus.Complete;

  return (
    <section className="mx-auto w-full max-w-xl p-6">
      <Link to="/" className="font-medium text-green-500 hover:underline">
        ← All projects
      </Link>

      {isEditing ? (
        <>
          <h1 className="mt-4 text-2xl font-bold text-green">Edit project</h1>
          <ProjectForm
            initialValues={project}
            submitLabel="Save"
            onSubmit={(updated) => {
              onUpdate({ ...updated, id: project.id });
              setEditingId(null);
            }}
            onCancel={() => setEditingId(null)}
          />
        </>
      ) : (
        <>
          <h1 className="mt-4 text-2xl font-bold text-green">{project.name}</h1>
          <p className="mt-2 text-gray-700">{project.description}</p>

          <div className="mt-4 flex flex-col gap-1 text-sm text-gray-600">
            <p>Status: {project.status}</p>
            <p>Start date: {formatDate(project.startDate)}</p>
            <p>{project.dueDate ? `Due date: ${formatDate(project.dueDate)}` : "No due date"}</p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {!isComplete && (
              <button
                type="button"
                onClick={() => onUpdate({ ...project, status: ProjectStatus.Complete })}
                className="rounded-md bg-green px-4 py-2 font-medium text-white">
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
              className="rounded-md border border-red-600 px-4 py-2 font-medium text-red-600 hover:bg-red-50">
              Delete project
            </button>
          </div>
        </>
      )}
    </section>
  );
}
