import { IProject } from "@/models/Project";
import Image from "next/image";

const ProjectCard = ({ project }: { project: IProject }) => {
  return (
    <div className="py-2 w-full md:py-2">
      <div className="relative md:px-20 md:p-0 rounded-2xl transform duration-500 hover:shadow-2xl hover:-translate-y-1">
        <Image
          className="h-full object-cover py-2 rounded-2xl"
          src={project.imageURL}
          width={733}
          height={412}
          alt={project.title}
        />
        <div className="content bg-white p-2 pt-8 md:p-12 pb-12 lg:max-w-lg w-full lg:absolute top-20 right-5">
          <div className="flex justify-between font-bold text-sm">
            <p>Project Review</p>
            <p className="text-gray-400">{project.completionTime}</p>
          </div>
          <h2 className="font-semibold mt-4 md:mt-10">{project.title}</h2>
          <button className="mt-2 md:mt-5 p-3 px-5 bg-black text-white font-bold text-sm cursor-pointer dark:bg-white">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
