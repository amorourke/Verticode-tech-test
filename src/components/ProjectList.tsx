import { Link, useSearchParams } from "react-router-dom";
import { ProjectStatus, type IProject } from "../models/Project";
import {
  DUE_DATE_FILTER_LABELS,
  filterProjects,
  parseProjectFilters,
  type ProjectFilters,
  type StatusFilter,
} from "../utils/filterProjects";

const LABEL = "mb-1 block text-xs font-medium";
const SELECT = "w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-sm";

interface ProjectListProps {
  projects: IProject[];
}

export default function ProjectList({ projects }: ProjectListProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = parseProjectFilters(searchParams);
  const visibleProjects = filterProjects(projects, filters);
  const hasActiveFilters =
    filters.search.trim() !== "" || filters.status !== "all" || filters.dueDate !== "all";

  const statusCounts: { value: StatusFilter; label: string; count: number }[] = [
    { value: "all", label: "All projects", count: projects.length },
    ...Object.values(ProjectStatus).map((status) => ({
      value: status,
      label: status,
      count: projects.filter((project) => project.status === status).length,
    })),
  ];

  function updateFilter(key: keyof ProjectFilters, value: string) {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value === "" || value === "all") next.delete(key);
        else next.set(key, value);
        return next;
      },
      { replace: true }
    );
  }

  return (
    <section className="mx-auto w-full max-w-5xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-green">Projects</h1>
        <Link to="/projects/new" className="rounded-md bg-green px-4 py-2 font-medium text-white">
          New project
        </Link>
      </div>

      <div className="mb-6 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-3">
          {statusCounts.map(({ value, label, count }) => {
            const isActive = filters.status === value;
            return (
              <button
                key={value}
                type="button"
                aria-pressed={isActive}
                onClick={() => updateFilter("status", value)}
                className={`flex aspect-square w-28 flex-col justify-center rounded-md p-2.5 text-left ${
                  isActive ? "bg-light-green-400/60" : "hover:bg-gray-50"
                }`}>
                <span className="block text-3xl font-bold text-green">{count}</span>
                <span className="block text-xs text-gray-600">{label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="sm:w-44">
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

          <div className="sm:w-52">
            <label htmlFor="search" className={LABEL}>Search</label>
            <input
              id="search"
              type="search"
              placeholder="Search by project name"
              className={SELECT}
              value={filters.search}
              onChange={(e) => updateFilter("search", e.target.value)}
            />
          </div>
        </div>
      </div>

      {visibleProjects.length > 0 ? (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project) => (
            <li key={project.id}>
              <Link to={`/projects/${project.id}`} className="block h-full rounded-md border border-gray-300 p-4 hover:bg-light-green-400">
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
