"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

interface ProjectFormData {
  title: string;
  description: string;
  client: string;
  completionTime: string;
  technologies: string;
  demo: string;
  github: string;
  imageFile: File | null;
}
function ProjectCreate() {
  const [formData, setFormData] = useState<ProjectFormData>({
    title: "",
    description: "",
    client: "",
    completionTime: "",
    technologies: "",
    demo: "",
    github: "",
    imageFile: null,
  });

  const [previewImage, setPreviewImage] = useState<string>("");

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, imageFile: file }));
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  const handleImageUploadClick = () => {
    document.getElementById("image_input")?.click();
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, imageFile: null }));
    setPreviewImage("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = new FormData();

    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("client", formData.client);
    data.append("completionTime", formData.completionTime);
    data.append("technologies", formData.technologies);
    data.append("demo", formData.demo);
    data.append("github", formData.github);
    if (formData.imageFile) {
      data.append("image", formData.imageFile);
    }

    try {
      const res = await fetch("/api/project", {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        throw new Error("Failed to create project");
      }

      const result = await res.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <section className="pt-[130px] pb-3">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="text-3xl font-bold">Create New Project</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <label className="relative w-full">
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleInputChange}
              className="peer border-border bg-transparent border rounded-md outline-none px-4 py-3 w-full focus:border-primary transition-colors duration-300"
            />
            <span className="absolute top-3.5 left-5 peer-focus:-top-3 peer-focus:left-2 peer-focus:scale-[0.9] peer-focus:text-primary text-[#777777] peer-focus:px-1 transition-all duration-300">
              Project Title
            </span>
          </label>

          {/* Description */}
          <label className="relative w-full">
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleInputChange}
              className="peer border-[#e5eaf2] border rounded-md outline-none px-4 min-h-[200px] py-3 w-full focus:border-[#3B9DF8] transition-colors duration-300"
            />
            <span className="absolute top-3.5 left-5 peer-focus:-top-3  peer-focus:left-2 peer-focus:scale-[0.9] peer-focus:text-[#3B9DF8] text-[#777777] peer-focus:px-1 transition-all duration-300">
              Project Description
            </span>
          </label>

          {/* Client */}
          <label className="relative w-full">
            <input
              type="text"
              name="client"
              id="client"
              value={formData.client}
              onChange={handleInputChange}
              className="peer border-border bg-transparent border rounded-md outline-none px-4 py-3 w-full focus:border-primary transition-colors duration-300"
            />
            <span className="absolute top-3.5 left-5 peer-focus:-top-3  peer-focus:left-2 peer-focus:scale-[0.9] peer-focus:text-primary text-[#777777] peer-focus:px-1 transition-all duration-300">
              Client Name
            </span>
          </label>

          {/* Completion Time */}
          <label className="relative w-full">
            <input
              type="text"
              name="completionTime"
              id="completionTime"
              value={formData.completionTime}
              onChange={handleInputChange}
              className="peer border-border bg-transparent border rounded-md outline-none px-4 py-3 w-full focus:border-primary transition-colors duration-300"
            />
            <span className="absolute top-3.5 left-5 peer-focus:-top-3  peer-focus:left-2 peer-focus:scale-[0.9] peer-focus:text-primary text-[#777777] peer-focus:px-1 transition-all duration-300">
              Completion Time
            </span>
          </label>

          {/* Technologies */}
          <label className="relative w-full">
            <input
              type="text"
              name="technologies"
              id="technologies"
              value={formData.technologies}
              onChange={handleInputChange}
              className="peer border-border bg-transparent border rounded-md outline-none px-4 py-3 w-full focus:border-primary transition-colors duration-300"
            />
            <span className="absolute top-3.5 left-5 peer-focus:-top-3  peer-focus:left-2 peer-focus:scale-[0.9] peer-focus:text-primary text-[#777777] peer-focus:px-1 transition-all duration-300">
              Technologies Used
            </span>
          </label>

          {/* Demo Link */}
          <label className="relative w-full">
            <input
              type="text"
              name="demo"
              id="demo"
              value={formData.demo}
              onChange={handleInputChange}
              className="peer border-border bg-transparent border rounded-md outline-none px-4 py-3 w-full focus:border-primary transition-colors duration-300"
            />
            <span className="absolute top-3.5 left-5 peer-focus:-top-3  peer-focus:left-2 peer-focus:scale-[0.9] peer-focus:text-primary text-[#777777] peer-focus:px-1 transition-all duration-300">
              Demo Link
            </span>
          </label>

          {/* Github Link */}
          <label className="relative w-full">
            <input
              type="text"
              name="github"
              id="github"
              value={formData.github}
              onChange={handleInputChange}
              className="peer border-border bg-transparent border rounded-md outline-none px-4 py-3 w-full focus:border-primary transition-colors duration-300"
            />
            <span className="absolute top-3.5 left-5 peer-focus:-top-3  peer-focus:left-2 peer-focus:scale-[0.9] peer-focus:text-primary text-[#777777] peer-focus:px-1 transition-all duration-300">
              Github Link
            </span>
          </label>

          {/* Image Upload */}
          <div className="flex flex-col items-center gap-5">
            <input
              type="file"
              id="image_input"
              name="image"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />

            {previewImage === "" ? (
              <div
                className="w-full flex flex-col items-center justify-center gap-4 border border-dashed border-gray-300 rounded-md py-8 cursor-pointer"
                onClick={handleImageUploadClick}
              >
                <FiUpload className="text-3xl text-gray-400" />
                <p className="text-gray-400">Browse to upload your image</p>
              </div>
            ) : (
              <div className="relative w-full h-auto">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-md"
                />
                <MdDelete
                  className="absolute top-2 right-2 text-3xl text-red-600 bg-white rounded-full p-1 cursor-pointer"
                  onClick={handleRemoveImage}
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-4 py-3 bg-[#85f330] rounded-2 hover:bg-[#62a92b] font-semibold"
            >
              Submit Project
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ProjectCreate;
