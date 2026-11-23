import { useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { ProjectStatus, type NewProject } from "../models/Project";
import { validateProject, type ProjectFormErrors } from "../utils/validateProject";

const INITIAL_VALUES: NewProject = {
  name: "",
  description: "",
  startDate: "",
  dueDate: "",
  status: ProjectStatus.NotStarted,
};

const INPUT_CLASSES = "w-full rounded-md border px-3 py-2";

type FormField = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

interface FieldProps {
  id: keyof NewProject;
  label: string;
  error?: string;
  required?: boolean;
  children: ReactNode; 
}

function Field({ id, label, error, required, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium">
        {label}
        {required && <span className="text-red-600"> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

interface ProjectFormProps {
  onSubmit: (project: NewProject) => void;
}

export default function ProjectForm({ onSubmit }: ProjectFormProps) {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState<ProjectFormErrors>({});

  function handleChange(event: ChangeEvent<FormField>) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validateProject(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    onSubmit({
      ...values,
      name: values.name.trim(),
      description: values.description.trim(),
      dueDate: values.dueDate || undefined,
    });
  }

  function fieldProps(field: keyof NewProject) {
    const error = errors[field];

    return {
      id: field,
      name: field,
      value: values[field],
      onChange: handleChange,
      "aria-invalid": Boolean(error),
      "aria-describedby": error ? `${field}-error` : undefined,
      className: `${INPUT_CLASSES} ${
        error ? "border-red-500" : "border-gray-300"
      }`,
    };
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-xl flex-col gap-4 p-6"
    >
      <Field id="name" label="Project name" error={errors.name} required>
        <input type="text" {...fieldProps("name")} />
      </Field>

      <Field
        id="description"
        label="Description"
        error={errors.description}
        required
      >
        <textarea rows={4} {...fieldProps("description")} />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          id="startDate"
          label="Start date"
          error={errors.startDate}
          required
        >
          <input type="date" {...fieldProps("startDate")} />
        </Field>

        <Field id="dueDate" label="Due date" error={errors.dueDate}>
          <input type="date" {...fieldProps("dueDate")} />
        </Field>
      </div>

      <Field id="status" label="Status" error={errors.status}>
        <select {...fieldProps("status")}>
          {Object.values(ProjectStatus).map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </Field>

      <button
        type="submit"
        className="rounded-md bg-green px-4 py-2 font-medium text-white"
      >
        Create project
      </button>
    </form>
  );
}