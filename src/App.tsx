import { useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import type { IProject, NewProject } from "./models/Project";
import ProjectForm from "./components/ProjectForm";
import ProjectList from "./components/ProjectList";
import ProjectDetails from "./components/ProjectDetails";
import { mockProjects } from "./data/mockProjects";

export default function App() {
  const [projects, setProjects] = useState<IProject[]>(mockProjects);
  const navigate = useNavigate();

  function handleCreateProject(newProject: NewProject) {
    const project = { ...newProject, id: Date.now().toString() };
    setProjects((prevProjects) => [...prevProjects, project]);
    navigate(`/projects/${project.id}`);
  }

  function handleUpdateProject(updatedProject: IProject) {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === updatedProject.id ? updatedProject : project
      )
    );
  }

  function handleDeleteProject(id: string) {
    if (!window.confirm("Delete this project? This can't be undone.")) {
      return;
    }

    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== id)
    );
    navigate("/");
  }

  return (
    <main className="flex flex-col">
      <header className="flex h-24 bg-light-green">
        <img src="/logo.png" height={64} className="h-16 m-auto" />
      </header>

      <Routes>
        <Route path="/" element={<ProjectList projects={projects} />} />
        <Route path="/projects" element={<ProjectList projects={projects} />} />
        <Route
          path="/projects/new"
          element={
            <section className="mx-auto w-full max-w-xl p-6">
              <Link to="/" className="font-medium text-green-500 hover:underline">
                ← All projects
              </Link>
              <ProjectForm onSubmit={handleCreateProject} />
            </section>
          }
        />
        <Route path="/projects/:id" element={<ProjectDetails projects={projects} onDelete={handleDeleteProject} onUpdate={handleUpdateProject} />} />
      </Routes>
    </main>
  );
}
