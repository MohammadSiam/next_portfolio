import Image from "next/image";
import Link from "next/link";
import afbl from "../../../public/assets/imgs/experience/Akij-Food-and-Beverage-Ltd..png";
import bluebay from "../../../public/assets/imgs/experience/bluebay_it_limited_logo.png";
import bracnet from "../../../public/assets/imgs/experience/bracnet Ltd.png";

export default function Experience() {
  return (
    <>
      <section id="portfolio" className="section-experience pt-5">
        <div className="container">
          <div className="rounded-3 border border-1 position-relative overflow-hidden">
            <div className="box-linear-animation position-relative z-1">
              <div className="p-lg-8 p-md-6 p-3 position-relative z-1">
                <div className="d-flex align-items-center">
                  <svg
                    className="text-primary-2 me-2"
                    xmlns="http://www.w3.org/2000/svg"
                    width={5}
                    height={6}
                    viewBox="0 0 5 6"
                    fill="none"
                  >
                    <circle cx="2.5" cy={3} r="2.5" fill="#A8FF53" />
                  </svg>
                  <span className="text-linear-4 d-flex align-items-center">
                    {" "}
                    Expericence{" "}
                  </span>
                </div>
                <h3>
                  +3
                  <span className="text-300">years of </span>
                  passion
                  <span className="text-300">
                    for <br />
                    programming techniques
                  </span>
                </h3>
                <div className="row mt-5">
                  <div className="col-lg-4">
                    <div className="d-flex flex-column gap-2">
                      <Link
                        href="#"
                        className="technology border border-1 rounded-3 p-3"
                      >
                        <div className="d-flex align-items-center gap-2">
                          <Image
                            src={bluebay}
                            height={50}
                            width={50}
                            alt="zelio"
                          />
                          <div className="d-flex flex-column ms-2">
                            <h5 className="mb-0">UAPP</h5>
                            <span className="text-primary-2" style={{ fontSize: "0.75rem" }}>Senior Software Engineer</span>
                            <span className="text-300" style={{ fontSize: "0.75rem" }}>Oct 24 - Present</span>
                          </div>
                        </div>
                      </Link>
                      <Link
                        href="#"
                        className="technology border border-1 rounded-3 p-3"
                      >
                        <div className="d-flex align-items-center gap-2">
                          <Image
                            src={afbl}
                            height={50}
                            width={50}
                            alt="zelio"
                          />
                          <div className="d-flex flex-column ms-2">
                            <h5 className="mb-0">
                              Akij Food And Beverage Ltd.
                            </h5>
                            <span className="text-primary-2" style={{ fontSize: "0.75rem" }}>Software Engineer</span>
                            <span className="text-300" style={{ fontSize: "0.75rem" }}>Feb 24 - Oct 24</span>
                          </div>
                        </div>
                      </Link>
                      <Link
                        href="#"
                        className="technology border border-1 rounded-3 p-3"
                      >
                        <div className="d-flex align-items-center gap-2">
                          <Image
                            src={bracnet}
                            height={50}
                            width={50}
                            alt="zelio"
                          />
                          <div className="d-flex flex-column ms-2">
                            <h5 className="mb-0">BracNet Ltd.</h5>
                            <span className="text-primary-2" style={{ fontSize: "0.75rem" }}>Intern</span>
                            <span className="text-300" style={{ fontSize: "0.75rem" }}>Oct 23 - Dec 23</span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-8 ps-lg-5 mt-5 mt-lg-0">
                    <h6 className="text-linear-4">Senior Software Engineer — UAPP</h6>
                    <ul className="mt-4">
                      <li className="text-dark mb-3">
                        Design and implement user interfaces for{" "}
                        <span className="text-secondary-2">
                          Student, Consultant, Companion, and System Admin
                        </span>{" "}
                        modules using React.js, Next.js, and TypeScript.
                      </li>
                      <li className="text-dark mb-3">
                        Utilize{" "}
                        <span className="text-secondary-2">Zustand</span> and
                        Context API for efficient state management, and{" "}
                        <span className="text-secondary-2">Radix UI</span> with
                        Tailwind CSS for custom component interactions.
                      </li>
                      <li className="text-dark mb-3">
                        Integrate APIs for real-time student management and
                        consultation data; collaborate with cross-functional
                        teams to ensure smooth frontend-backend performance.
                      </li>
                      <li className="text-dark mb-3">
                        At{" "}
                        <span className="text-secondary-2">Akij Food & Beverage</span>
                        : built backend systems with NestJS &amp; TypeScript,
                        managed MySQL databases with TypeORM, and implemented
                        role-based access control.
                      </li>
                    </ul>
                    <div className="d-flex flex-wrap align-items-center gap-3 mt-7">
                      {["React.js", "Next.js", "TypeScript", "NestJS", "Zustand", "Tailwind", "TypeORM", "MySQL"].map((tech) => (
                        <span
                          key={tech}
                          className="text-300 border border-1 px-3 py-1"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <img
                className="position-absolute top-0 start-0 z-0"
                src="assets/imgs/home-page-2/services/bg.png"
                alt="zelio"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
