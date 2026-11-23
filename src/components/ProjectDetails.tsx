import { Link, useParams } from "react-router-dom";
import type { IProject } from "../models/Project";

interface ProjectDetailsProps {
  projects: IProject[];
}

export default function ProjectDetails({ projects }: ProjectDetailsProps) {
  const { id } = useParams();
  const project = projects.find((project) => project.id === id);

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

  return (
    <section className="mx-auto w-full max-w-xl p-6">
      <Link to="/" className="font-medium text-green-500 hover:underline">
        ← All projects
      </Link>

      <h1 className="mt-4 text-2xl font-bold text-green">{project.name}</h1>
      <p className="mt-2 text-gray-700">{project.description}</p>

      <div className="mt-4 flex flex-col gap-1 text-sm text-gray-600">
        <p>Status: {project.status}</p>
        <p>Start date: {project.startDate}</p>
        <p>{project.dueDate ? `Due date: ${project.dueDate}` : "No due date"}</p>
      </div>
    </section>
  );
}