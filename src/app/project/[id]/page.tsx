"use client";
import { use, useEffect, useState } from "react";
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
  imageURL: File | string;
}

export default function EditProject({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ProjectFormData>({
    title: "",
    description: "",
    client: "",
    completionTime: "",
    technologies: "",
    demo: "",
    github: "",
    imageURL: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        imageURL: file || "",
      }));

      // Generate a preview of the image
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setPreviewImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUploadClick = () => {
    document.getElementById("image_input")?.click();
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      imageURL: "",
    }));
    setPreviewImage("");
  };

  const fetchProject = async () => {
    try {
      const response = await fetch(`/api/project/${id}`);
      const data = await response.json();
      setFormData({
        title: data.title || "",
        description: data.description || "",
        client: data.client || "",
        completionTime: data.completionTime || "",
        technologies: data.technologies || "",
        demo: data.demo || "",
        github: data.github || "",
        imageURL: data.imageURL,
      });
      if (data.imageURL) {
        setPreviewImage(data.imageURL);
      }
    } catch (error) {
      console.error("Failed to fetch project:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("description", formData.description);
      payload.append("client", formData.client);
      payload.append("completionTime", formData.completionTime);
      payload.append("technologies", formData.technologies);
      payload.append("demo", formData.demo);
      payload.append("github", formData.github);

      if (formData.imageURL instanceof File) {
        payload.append("imageURL", formData.imageURL);
      }

      const res = await fetch(`/api/project/${id}`, {
        method: "PUT",
        body: payload,
      });

      if (!res.ok) {
        throw new Error("Failed to update project");
      }

      const data = await res.json();
      alert("Project updated successfully!");

      await fetchProject();
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  return (
    <section className="pt-[130px] pb-3">
      <div className="container">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6 text-center">Edit Project</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <label className="relative w-full block">
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder=" "
                className="peer border-border bg-transparent border rounded-md outline-none px-4 py-3 w-full focus:border-primary transition-colors duration-300"
              />
              <span
                className={`absolute left-5 text-[#777777] transition-all duration-300
            ${
              formData.title
                ? "-top-3 left-2 scale-[0.9] text-primary bg-white px-1"
                : "top-3.5 left-5 scale-100"
            }
            peer-focus:-top-3 peer-focus:left-2 peer-focus:scale-[0.9] peer-focus:text-primary peer-focus:px-1`}
              >
                Project Title
              </span>
            </label>

            {/* Description */}
            <label className="relative w-full block">
              <textarea
                id="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder=" "
                rows={4}
                className="peer border-border bg-transparent border rounded-md outline-none px-4 py-3 w-full focus:border-primary transition-colors duration-300 resize-none"
              />
              <span
                className={`absolute left-5 text-[#777777] transition-all duration-300
            ${
              formData.description
                ? "-top-3 left-2 scale-[0.9] text-primary bg-white px-1"
                : "top-3.5 left-5 scale-100"
            }
            peer-focus:-top-3 peer-focus:left-2 peer-focus:scale-[0.9] peer-focus:text-primary peer-focus:px-1`}
              >
                Project Description
              </span>
            </label>

            {/* Client */}
            <label className="relative w-full block">
              <input
                type="text"
                id="client"
                value={formData.client}
                onChange={handleInputChange}
                placeholder=" "
                className="peer border-border bg-transparent border rounded-md outline-none px-4 py-3 w-full focus:border-primary transition-colors duration-300"
              />
              <span
                className={`absolute left-5 text-[#777777] transition-all duration-300
            ${
              formData.client
                ? "-top-3 left-2 scale-[0.9] text-primary bg-white px-1"
                : "top-3.5 left-5 scale-100"
            }
            peer-focus:-top-3 peer-focus:left-2 peer-focus:scale-[0.9] peer-focus:text-primary peer-focus:px-1`}
              >
                Client Name
              </span>
            </label>

            {/* Completion Time */}
            <label className="relative w-full block">
              <input
                type="text"
                id="completionTime"
                value={formData.completionTime}
                onChange={handleInputChange}
                placeholder=" "
                className="peer border-border bg-transparent border rounded-md outline-none px-4 py-3 w-full focus:border-primary transition-colors duration-300"
              />
              <span
                className={`absolute left-5 text-[#777777] transition-all duration-300
            ${
              formData.completionTime
                ? "-top-3 left-2 scale-[0.9] text-primary bg-white px-1"
                : "top-3.5 left-5 scale-100"
            }
            peer-focus:-top-3 peer-focus:left-2 peer-focus:scale-[0.9] peer-focus:text-primary peer-focus:px-1`}
              >
                Completion Time
              </span>
            </label>

            {/* Technologies */}
            <label className="relative w-full block">
              <input
                type="text"
                id="technologies"
                value={formData.technologies}
                onChange={handleInputChange}
                placeholder=" "
                className="peer border-border bg-transparent border rounded-md outline-none px-4 py-3 w-full focus:border-primary transition-colors duration-300"
              />
              <span
                className={`absolute left-5 text-[#777777] transition-all duration-300
            ${
              formData.technologies
                ? "-top-3 left-2 scale-[0.9] text-primary bg-white px-1"
                : "top-3.5 left-5 scale-100"
            }
            peer-focus:-top-3 peer-focus:left-2 peer-focus:scale-[0.9] peer-focus:text-primary peer-focus:px-1`}
              >
                Technologies Used
              </span>
            </label>

            {/* Demo Link */}
            <label className="relative w-full block">
              <input
                type="url"
                id="demo"
                value={formData.demo}
                onChange={handleInputChange}
                placeholder=" "
                className="peer border-border bg-transparent border rounded-md outline-none px-4 py-3 w-full focus:border-primary transition-colors duration-300"
              />
              <span
                className={`absolute left-5 text-[#777777] transition-all duration-300
            ${
              formData.demo
                ? "-top-3 left-2 scale-[0.9] text-primary bg-white px-1"
                : "top-3.5 left-5 scale-100"
            }
            peer-focus:-top-3 peer-focus:left-2 peer-focus:scale-[0.9] peer-focus:text-primary peer-focus:px-1`}
              >
                Demo URL
              </span>
            </label>

            {/* GitHub Link */}
            <label className="relative w-full block">
              <input
                type="url"
                id="github"
                value={formData.github}
                onChange={handleInputChange}
                placeholder=" "
                className="peer border-border bg-transparent border rounded-md outline-none px-4 py-3 w-full focus:border-primary transition-colors duration-300"
              />
              <span
                className={`absolute left-5 text-[#777777] transition-all duration-300
            ${
              formData.github
                ? "-top-3 left-2 scale-[0.9] text-primary bg-white px-1"
                : "top-3.5 left-5 scale-100"
            }
            peer-focus:-top-3 peer-focus:left-2 peer-focus:scale-[0.9] peer-focus:text-primary peer-focus:px-1`}
              >
                GitHub URL
              </span>
            </label>

            {/* Image Upload */}
            <div className="flex flex-col items-center gap-5">
              <input
                type="file"
                id="image_input"
                name="imageURL"
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
                disabled={isLoading}
              >
                Update Project
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
