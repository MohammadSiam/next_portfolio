import { IProject } from "@/models/Project";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ModalProps {
  project: IProject;
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ project, isOpen, onClose }: ModalProps) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
      document.body.style.overflow = "hidden";
    } else {
      setTimeout(() => setShowModal(false), 100);
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen && !showModal) return null;

  // Handle clicking outside the modal to close it
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50 transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleBackdropClick}
    >
      <div
        className={`bg-white p-3 rounded-xl w-[95%] md:w-1/2 max-h-[70vh] overflow-y-auto scrollbar-hide transform transition-all duration-300 ${
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute cursor-pointer top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <div className="flex justify-center py-5">
          <Image
            className="h-full object-cover"
            src={project.imageURL}
            alt={project.title}
            width={500}
            height={600}
          />
        </div>
        <h2 className="text-2xl font-bold">{project.title}</h2>
        <p className="mt-4 text-gray-600">{project.description}</p>
        <div className="flex justify-between mt-4">
          <p className="font-semibold">Client:</p>
          <p>{project.client}</p>
        </div>
        <div className="flex flex-wrap justify-between mt-4">
          <p className="font-semibold">Technologies:</p>
          <p>{project.technologies}</p>
        </div>
        {project.demo && (
          <div className="flex justify-between mt-4">
            <p className="font-semibold">Demo Link:</p>
            <a href={project.demo} target="_blank" className="text-blue-600">
              View Demo
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
