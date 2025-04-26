"use client";
import { IProject } from "@/models/Project";
import ProjectCard from "@/pages/project/ProjectCard";
import { useEffect, useState } from "react";

function AllProjects() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/project");
        const result = await response.json();
        setProjects(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);
  return (
    <div>
      <section className="pt-130 pb-3">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10">
              <div className="section-title text-center mb-2">
                <h2 className="title">All Projects</h2>
                <p>Here are some of my projects that I have worked on.</p>
              </div>
            </div>
          </div>
          <div>
            {loading ? (
              <div className="w-full mx-auto bg-secondary p-4 rounded-md border border-[e5eaf2] boxShadow animate-pulse">
                <p className="w-[90%] min-h-[300px] bg-[e5eaf2] rounded-md"></p>
              </div>
            ) : (
              projects.map((project) => (
                <div key={project._id}>
                  <ProjectCard project={project} />
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AllProjects;
