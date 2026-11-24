import type { IProject } from "../models/Project";
import { Link } from "react-router-dom";

interface ProjectListProps {
    projects: IProject[]
}

export default function ProjectList({ projects }: ProjectListProps) {
    return (
    <section className="mx-auto w-full max-w-xl p-6">
        <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-green">Projects</h1>
        <Link to="/projects/new" className="rounded-md bg-green px-4 py-2 font-medium text-white">
            New project
        </Link>
        </div>

        <ul className="flex flex-col gap-3">
        {projects.map((project) => (
            <li key={project.id}>
                <Link to={`/projects/${project.id}`} className="block rounded-md border border-gray-300 p-4 hover:bg-light-green-400">
                    <span className="block font-medium">{project.name}</span>
                    <span className="block text-sm text-gray-600">{project.status}</span>
                </Link>
            </li>
        ))}
        </ul>
    </section>
    );
}