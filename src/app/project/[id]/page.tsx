import { projects } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return projects.map((p) => ({ id: p._id }));
}

export default async function ProjectDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => p._id === id);

  if (!project) notFound();

  return (
    <section className="pt-130 pb-60">
      <div className="container">
        <div className="mb-5">
          <Link href="/project" className="text-300 d-flex align-items-center gap-2">
            <i className="ri-arrow-left-line" /> Back to Projects
          </Link>
        </div>

        <div className="rounded-3 border border-1 overflow-hidden">
          <div className="box-linear-animation position-relative z-1">
            <div className="p-lg-8 p-md-6 p-4">

              {/* Image */}
              {project.imageURL ? (
                <Image
                  src={project.imageURL}
                  alt={project.title}
                  width={1200}
                  height={600}
                  className="w-full object-cover rounded-3 mb-6"
                  style={{ maxHeight: 480 }}
                />
              ) : (
                <div className="bg-3 rounded-3 d-flex flex-column align-items-center justify-content-center mb-6"
                  style={{ height: 320 }}>
                  <i className="ri-image-line fs-1 text-300 mb-2" />
                  <span className="text-300">Screenshot coming soon</span>
                </div>
              )}

              {/* Title */}
              <h2 className="text-linear-4 mb-3">{project.title}</h2>

              {/* Description */}
              <p className="text-300 mb-6" style={{ lineHeight: 1.8 }}>
                {project.description}
              </p>

              {/* Info table */}
              <div className="row g-3 mb-6">
                <div className="col-md-6">
                  <div className="bg-3 rounded-3 p-4">
                    <p className="text-secondary-2 mb-1" style={{ fontSize: "0.8rem" }}>CLIENT</p>
                    <p className="mb-0 fw-medium">{project.client}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="bg-3 rounded-3 p-4">
                    <p className="text-secondary-2 mb-1" style={{ fontSize: "0.8rem" }}>COMPLETION TIME</p>
                    <p className="mb-0 fw-medium">{project.completionTime}</p>
                  </div>
                </div>
              </div>

              {/* Tech badges */}
              <div className="mb-6">
                <p className="text-secondary-2 mb-2" style={{ fontSize: "0.8rem" }}>TECHNOLOGIES</p>
                <div className="d-flex flex-wrap gap-2">
                  {project.technologies.split(",").map((tech) => (
                    <span
                      key={tech.trim()}
                      className="px-3 py-1 rounded-2"
                      style={{
                        fontSize: "0.78rem",
                        border: "1px solid rgba(168,255,83,0.3)",
                        color: "#A8FF53",
                        background: "rgba(168,255,83,0.08)",
                      }}
                    >
                      {tech.trim()}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="d-flex flex-wrap gap-3">
                {project.demo && (
                  <Link
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary-2 rounded-2"
                  >
                    <i className="ri-external-link-line me-2" />
                    Live Demo
                  </Link>
                )}
                {project.github && (
                  <Link
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-secondary rounded-2"
                  >
                    <i className="ri-github-fill me-2" />
                    View on GitHub
                  </Link>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
