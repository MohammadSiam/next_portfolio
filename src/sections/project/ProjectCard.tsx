import { IProject } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";

const ProjectCard = ({ project }: { project: IProject }) => {
  return (
    <div className="py-2 w-full md:py-2">
      <div className="relative md:px-20 md:p-0 rounded-2xl transform duration-500 hover:shadow-2xl hover:-translate-y-1">
        {project.imageURL ? (
          <Image
            className="h-[412px] object-cover py-2 rounded-2xl"
            src={project.imageURL}
            width={733}
            height={412}
            alt={project.title}
          />
        ) : (
          <div className="h-[412px] flex flex-col items-center justify-center bg-3 rounded-2xl text-center py-2">
            <i className="ri-image-line text-4xl text-300 mb-2" />
            <span className="text-300">Screenshot coming soon</span>
          </div>
        )}
        <div className="content bg-3 p-2 pt-8 md:p-12 pb-12 lg:max-w-lg w-full lg:absolute top-20 right-5">
          <div className="flex justify-between font-bold text-sm">
            <p>Project Review</p>
            <p className="text-300">{project.completionTime}</p>
          </div>
          <h2 className="font-semibold mt-2 md:mt-10">{project.title}</h2>
          <Link
            href={`/project/${project._id}`}
            className="mt-2 md:mt-5 p-3 px-5 btn btn-primary-2 text-sm inline-block"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
