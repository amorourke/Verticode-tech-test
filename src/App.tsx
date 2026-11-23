import { useState } from "react";
import ProjectForm from "./components/ProjectForm";
import type { IProject } from "./models/Project";

export default function App() {
  const [projects, setProjects] = useState<IProject[]>([]);

  return (
    <main className="flex flex-col">
      <header className="flex h-24 bg-light-green">
        <img src="/logo.png" height={64} className="h-16 m-auto" />
      </header>

      <ProjectForm
        onSubmit={(newProject) =>
          setProjects((current) => [...current,{ ...newProject, id: Date.now().toString() }])
        }
      />
      <pre className="mx-auto w-full max-w-xl whitespace-pre-wrap p-6">
        {JSON.stringify(projects, null, 2)}
      </pre>
    </main>
  );
}
