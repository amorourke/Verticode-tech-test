import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import type { IProject, NewProject } from "./models/Project";
import ProjectForm from "./components/ProjectForm";
import ProjectList from "./components/ProjectList";
import ProjectDetails from "./components/ProjectDetails";

export default function App() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const navigate = useNavigate();

  function handleCreateProject(newProject: NewProject) {
    const project = { ...newProject, id: Date.now().toString() };
    setProjects((prevProjects) => [...prevProjects, project]);
    navigate(`/projects/${project.id}`);
  }

  return (
    <main className="flex flex-col">
      <header className="flex h-24 bg-light-green">
        <img src="/logo.png" height={64} className="h-16 m-auto" />
      </header>

      <Routes>
        <Route path="/" element={<ProjectList projects={projects} />} />
        <Route path="/projects" element={<ProjectList projects={projects} />} />
        <Route path="/projects/new" element={<ProjectForm onSubmit={handleCreateProject} />} />
        <Route path="/projects/:id" element={<ProjectDetails projects={projects} />} />
      </Routes>
    </main>
  );
}
