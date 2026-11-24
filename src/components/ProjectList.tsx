import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import type { IProject, ProjectStatus } from "../models/Project";
import {
  DUE_DATE_FILTER_LABELS,
  filterProjects,
  parseProjectFilters,
  type ProjectFilters,
  type StatusFilter,
} from "../utils/filterProjects";
import { DUE_DATE_TONE_STYLES, getDueDateLabel } from "../utils/getDueDateLabel";
import { STATUS_DISPLAY_ORDER, sortProjects } from "../utils/sortProjects";
import { formatDate } from "../utils/formatDate";
import { OVERDUE_BORDER, STATUS_STYLES } from "../styles/statusStyles";
import { getTaskProgress } from "../utils/tasks";

const LABEL = "mb-1 block text-xs font-medium";
const SELECT = "w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-sm";
const CARDS_PER_SECTION = 3;

interface ProjectListProps {
  projects: IProject[];
}

export default function ProjectList({ projects }: ProjectListProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [expandedSections, setExpandedSections] = useState<ProjectStatus[]>([]);
  const filters = parseProjectFilters(searchParams);
  const visibleProjects = sortProjects(filterProjects(projects, filters));

  const sections = STATUS_DISPLAY_ORDER.map((status) => ({
    status,
    projects: visibleProjects.filter((project) => project.status === status),
  })).filter((section) => section.projects.length > 0);
  const hasActiveFilters =
    filters.search.trim() !== "" || filters.status !== "all" || filters.dueDate !== "all";

  const statusCounts: { value: StatusFilter; label: string; count: number }[] = [
    { value: "all", label: "All projects", count: projects.length },
    ...STATUS_DISPLAY_ORDER.map((status) => ({
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

  function toggleSection(status: ProjectStatus) {
    setExpandedSections((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  }

  function renderCard(project: IProject, isGhost = false) {
    const dueDateLabel = getDueDateLabel(project);
    const styles = STATUS_STYLES[project.status];
    const isOverdue = dueDateLabel?.tone === "overdue";
    const progress = getTaskProgress(project.tasks);

    return (
      <Link
        to={`/projects/${project.id}`}
        tabIndex={isGhost ? -1 : undefined}
        className={`flex h-full flex-col rounded-3xl border p-6 shadow-sm transition-all duration-200 hover:scale-[1.03] hover:shadow-xl ${styles.card} ${styles.cardHover} ${
          isOverdue ? OVERDUE_BORDER : styles.border
        }`}>
        <span className="line-clamp-2 text-lg font-bold text-gray-900">{project.name}</span>
        <span className="mt-2 line-clamp-2 text-sm text-gray-600">{project.description}</span>

        {progress && (
          <span className="mt-4 flex items-center gap-2">
            <span className="h-1.5 flex-1 rounded-full bg-black/10">
              <span
                className="block h-full rounded-full bg-green-500"
                style={{ width: `${progress.percent}%` }}
              />
            </span>
            <span className="text-xs text-gray-500">{progress.done}/{progress.total}</span>
          </span>
        )}

        <span className="mt-auto flex items-end justify-between gap-3 pt-4">
          <span className="text-xs text-gray-500">
            {project.dueDate ? `Due ${formatDate(project.dueDate, "short")}` : "No due date"}
          </span>
          <span className="flex flex-wrap justify-end gap-2">
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${styles.badge}`}>
              {project.status}
            </span>
            {dueDateLabel && (
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${DUE_DATE_TONE_STYLES[dueDateLabel.tone]}`}>
                {dueDateLabel.text}
              </span>
            )}
          </span>
        </span>
      </Link>
    );
  }

  return (
    <section className="mx-auto w-full max-w-5xl p-6 pt-12">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-normal text-green">My Projects</h1>
          <p className="mt-1 text-sm text-gray-600">Manage, track and create projects</p>
        </div>
        <Link
          to="/projects/new"
          className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-green-400 to-green px-5 py-3 font-semibold text-white shadow-sm transition-all duration-200 hover:scale-[1.03] hover:shadow-xl">
          + New project
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
                  isActive ? "bg-light-green-400/60" : "hover:bg-gray-100"
                }`}>
                <span className="text-3xl font-bold text-green">{count}</span>
                <span className="text-xs text-gray-600">{label}</span>
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
            <div className="relative">
              <svg 
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <input
                id="search"
                type="search"
                placeholder="Search by project name"
                className={`${SELECT} pl-8`}
                value={filters.search}
                onChange={(e) => updateFilter("search", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {visibleProjects.length > 0 ? (
        <div className="flex flex-col gap-10">
          {sections.map((section) => {
            const isExpanded = expandedSections.includes(section.status) || filters.status !== "all";
            const hasMore = section.projects.length > CARDS_PER_SECTION;
            const shownProjects = isExpanded ? section.projects : section.projects.slice(0, CARDS_PER_SECTION);

            return (
              <section key={section.status}>
                <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                  <span className={`h-2.5 w-2.5 rounded-full ${STATUS_STYLES[section.status].dot}`} />
                  {section.status}
                  <span className="text-sm font-medium text-gray-500">{section.projects.length}</span>
                </h2>

                <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {shownProjects.map((project) => (
                    <li key={project.id}>{renderCard(project)}</li>
                  ))}
                </ul>

                {hasMore && !isExpanded && (
                  <div className="relative mt-6 max-h-16 overflow-hidden" aria-hidden="true">
                    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {section.projects.slice(CARDS_PER_SECTION, CARDS_PER_SECTION * 2).map((project) => (
                        <li key={project.id}>{renderCard(project, true)}</li>
                      ))}
                    </ul>
                    <div
                      onClick={() => toggleSection(section.status)}
                      className="absolute inset-0 cursor-pointer bg-gradient-to-b from-gray-50/0 to-gray-50"
                    />
                  </div>
                )}

                {hasMore && filters.status === "all" && (
                  <button
                    type="button"
                    onClick={() => toggleSection(section.status)}
                    aria-expanded={isExpanded}
                    className="mx-auto mt-4 block text-sm font-medium text-green-500 hover:underline">
                    {isExpanded ? "Show less" : `Show all`}
                  </button>
                )}
              </section>
            );
          })}
        </div>
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
