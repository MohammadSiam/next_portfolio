import { projects } from "@/data/projects";
import ProjectCard from "@/pages/project/ProjectCard";

export default function AllProjects() {
  return (
    <div>
      <section className="pt-130 pb-3">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10">
              <div className="section-title text-center mb-2">
                <h2 className="title">All Projects</h2>
                <p>Here are some of the projects I have worked on.</p>
              </div>
            </div>
          </div>
          <div>
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
