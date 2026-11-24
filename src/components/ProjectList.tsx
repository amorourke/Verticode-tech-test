import { Link, useSearchParams } from "react-router-dom";
import { ProjectStatus, type IProject } from "../models/Project";
import {
  DUE_DATE_FILTER_LABELS,
  filterProjects,
  parseProjectFilters,
  type ProjectFilters,
} from "../utils/filterProjects";

const LABEL = "mb-1 block text-sm font-medium";
const SELECT = "w-full rounded-md border border-gray-300 px-3 py-2";

interface ProjectListProps {
  projects: IProject[];
}

export default function ProjectList({ projects }: ProjectListProps) {
  // Filters live in the URL so they survive opening a project and going back
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = parseProjectFilters(searchParams);
  const visibleProjects = filterProjects(projects, filters);
  const hasActiveFilters = filters.status !== "all" || filters.dueDate !== "all";

  function updateFilter(key: keyof ProjectFilters, value: string) {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value === "all") next.delete(key);
        else next.set(key, value);
        return next;
      },
      { replace: true }
    );
  }

  return (
    <section className="mx-auto w-full max-w-xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-green">Projects</h1>
        <Link to="/projects/new" className="rounded-md bg-green px-4 py-2 font-medium text-white">
          New project
        </Link>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="statusFilter" className={LABEL}>Status</label>
          <select
            id="statusFilter"
            className={SELECT}
            value={filters.status}
            onChange={(e) => updateFilter("status", e.target.value)}>
            <option value="all">All statuses</option>
            {Object.values(ProjectStatus).map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="dueDateFilter" className={LABEL}>Due date</label>
          <select
            id="dueDateFilter"
            className={SELECT}
            value={filters.dueDate}
            onChange={(e) => updateFilter("dueDate", e.target.value)}>
            {Object.entries(DUE_DATE_FILTER_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      {visibleProjects.length > 0 ? (
        <ul className="flex flex-col gap-3">
          {visibleProjects.map((project) => (
            <li key={project.id}>
              <Link to={`/projects/${project.id}`} className="block rounded-md border border-gray-300 p-4 hover:bg-light-green-400">
                <span className="block font-medium">{project.name}</span>
                <span className="block text-sm text-gray-600">{project.status}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-md border border-dashed border-gray-300 p-6 text-center text-gray-600">
          <p>{hasActiveFilters ? "No projects match these filters." : "No projects yet."}</p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={() => setSearchParams({}, { replace: true })}
              className="mt-2 font-medium text-green-500 hover:underline">
              Clear filters
            </button>
          )}
        </div>
      )}
    </section>
  );
}
