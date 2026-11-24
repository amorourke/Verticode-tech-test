import { useState, type FormEvent } from "react";
import { ProjectStatus, type NewProject } from "../models/Project";
import { validateProject, type ProjectFormErrors } from "../utils/validateProject";

const LABEL = "mb-1 block text-sm font-medium";
const INPUT = "w-full rounded-md border border-gray-300 px-3 py-2";
const ERROR = "mt-1 text-sm text-red-600";

interface ProjectFormProps {
  onSubmit: (project: NewProject) => void;
  initialValues?: NewProject;
  submitLabel?: string;
  onCancel?: () => void;
}

export default function ProjectForm({
  onSubmit,
  initialValues,
  submitLabel = "Create project",
  onCancel,
}: ProjectFormProps) {
  const [name, setName] = useState(initialValues?.name ?? "");
  const [description, setDescription] = useState(initialValues?.description ?? "");
  const [startDate, setStartDate] = useState(initialValues?.startDate ?? "");
  const [dueDate, setDueDate] = useState(initialValues?.dueDate ?? "");
  const [status, setStatus] = useState<ProjectStatus>(initialValues?.status ?? ProjectStatus.NotStarted);
  const [errors, setErrors] = useState<ProjectFormErrors>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const project: NewProject = {
      name: name.trim(),
      description: description.trim(),
      startDate,
      dueDate: dueDate || undefined,
      status,
    };

    const newErrors = validateProject(project);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit(project);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
      <div>
        <label htmlFor="name" className={LABEL}>Project name *</label>
        <input id="name" className={INPUT} value={name} onChange={(e) => setName(e.target.value)} />
        {errors.name && <p className={ERROR}>{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="description" className={LABEL}>Description *</label>
        <textarea id="description" rows={4} className={INPUT} value={description} onChange={(e) => setDescription(e.target.value)} />
        {errors.description && <p className={ERROR}>{errors.description}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="startDate" className={LABEL}>Start date *</label>
          <input id="startDate" type="date" className={INPUT} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          {errors.startDate && <p className={ERROR}>{errors.startDate}</p>}
        </div>

        <div>
          <label htmlFor="dueDate" className={LABEL}>Due date</label>
          <input id="dueDate" type="date" className={INPUT} value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          {errors.dueDate && <p className={ERROR}>{errors.dueDate}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="status" className={LABEL}>Status</label>
        <select id="status" className={INPUT} value={status} onChange={(e) => setStatus(e.target.value as ProjectStatus)}>
          {Object.values(ProjectStatus).map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="flex gap-3">
        <button type="submit" className="flex-1 rounded-md bg-green px-4 py-2 font-medium text-white">
          {submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-md border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
