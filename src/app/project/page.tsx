import ProjectCard from "@/pages/project/ProjectCard";

function AllProjects() {
  return (
    <div>
      <section className="pt-130 pb-3">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10">
              <div className="section-title text-center mb-5">
                <h2 className="title">All Projects</h2>
                <p className="text-light">
                  Here are some of my projects that I have worked on.
                </p>
              </div>
            </div>
          </div>
          {/* project section */}
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
        </div>
      </section>
    </div>
  );
}

export default AllProjects;
