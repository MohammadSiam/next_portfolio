"use client";
import dynamic from "next/dynamic";
import { ChangeEvent, useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
const NoSSR = dynamic(() => import("@/pages/blog/RichTextEditor"), {
  ssr: false,
});

interface BlogFormData {
  title: string;
  subTitle: string;
  description: string;
  blogTags: string;
  blogImageURL: File | null;
}

function CreateBlog() {
  const editorRef = useRef<any>(null);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    subTitle: "",
    description: "",
    blogTags: "",
    blogImageURL: null,
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, blogImageURL: file }));
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  const handleImageUploadClick = () => {
    document.getElementById("image_input")?.click();
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, blogImageURL: null }));
    setPreviewImage("");
  };

  const handleSubmit = async () => {
    const description = editorRef.current?.getContent?.();

    const form = new FormData();
    form.append("title", formData.title);
    form.append("subTitle", formData.subTitle);
    form.append("description", description);
    form.append("tags", formData.blogTags);
    if (formData.blogImageURL) {
      form.append("blogImageURL", formData.blogImageURL);
    }

    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        body: form,
      });

      if (!res.ok) throw new Error("Failed to create blog");

      const result = await res.json();
      // Optionally reset the form or redirect
    } catch (error) {
      console.error("Error submitting blog:", error);
    }
  };

  return (
    <div>
      <section className="pt-[130px] pb-3">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="text-3xl font-bold">Create New Blog</h2>
          </div>

          <label className="!text-md !text-gray-500 pb-2 pl-1">
            Upload Heading Image
          </label>
          <div className="flex flex-col items-center gap-5 mb-3">
            <input
              type="file"
              id="image_input"
              name="blogImageURL"
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
          <label className="relative w-full mb-3">
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder=" "
              className="peer border-border bg-transparent border rounded-md outline-none px-4 py-3 w-full focus:border-primary transition-colors duration-300"
            />
            <span
              className={`
    absolute left-5 text-[#777777] transition-all duration-300
    ${
      formData.title
        ? "-top-3 left-2 scale-[0.9] text-primary bg-white px-1"
        : "top-3.5 left-5 scale-100"
    } // if empty, stay normal
    peer-focus:-top-3 peer-focus:left-2 peer-focus:scale-[0.9] peer-focus:text-primary peer-focus:px-1
  `}
            >
              Blog Title
            </span>
          </label>
          <label className="relative w-full mb-3">
            <input
              type="text"
              name="subTitle"
              id="subTitle"
              value={formData.subTitle}
              onChange={handleInputChange}
              placeholder=" "
              className="peer border-border bg-transparent border rounded-md outline-none px-4 py-3 w-full focus:border-primary transition-colors duration-300"
            />
            <span
              className={`
    absolute left-5 text-[#777777] transition-all duration-300
    ${
      formData.subTitle
        ? "-top-3 left-2 scale-[0.9] text-primary bg-white px-1"
        : "top-3.5 left-5 scale-100"
    } // if empty, stay normal
    peer-focus:-top-3 peer-focus:left-2 peer-focus:scale-[0.9] peer-focus:text-primary peer-focus:px-1
  `}
            >
              Blog Sub Title
            </span>
          </label>
          <label className="!text-md !text-gray-500 py-2 pl-1">
            Write Blog Description
          </label>
          <NoSSR editorRef={editorRef} />
          <label className="relative w-full mt-3">
            <input
              type="text"
              name="blogTags"
              id="blogTags"
              value={formData.blogTags}
              onChange={handleInputChange}
              placeholder=" "
              className="peer border-border bg-transparent border rounded-md outline-none px-4 py-3 w-full focus:border-primary transition-colors duration-300"
            />
            <span
              className={`
    absolute left-5 text-[#777777] transition-all duration-300
    ${
      formData.title
        ? "-top-3 left-2 scale-[0.9] text-primary bg-white px-1"
        : "top-3.5 left-5 scale-100"
    } // if empty, stay normal
    peer-focus:-top-3 peer-focus:left-2 peer-focus:scale-[0.9] peer-focus:text-primary peer-focus:px-1
  `}
            >
              Blog Tags
            </span>
          </label>
          <div className="my-3 flex justify-center">
            <button
              onClick={handleSubmit}
              className="px-5 py-3 bg-[#85f330] rounded-2 hover:bg-[#62a92b] font-semibold"
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CreateBlog;
