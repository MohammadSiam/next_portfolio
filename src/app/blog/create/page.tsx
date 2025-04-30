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
  description: string;
  blogTags: string;
  blogImageURL: File | null;
}

function CreateBlog() {
  const editorRef = useRef<any>(null);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    description: "",
    blogTags: "",
    blogImageURL: null,
  });

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

  const handleSubmit = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  return (
    <div>
      <section className="pt-[130px] pb-3">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="text-3xl font-bold">Create New Blog</h2>
          </div>
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
          <NoSSR editorRef={editorRef} />
          <div className="my-3 flex justify-center">
            <button
              className="px-5 py-3 bg-[#85f330] rounded-2 hover:bg-[#62a92b] font-semibold"
              onClick={handleSubmit}
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
