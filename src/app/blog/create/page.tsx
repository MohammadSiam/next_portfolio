"use client";
import dynamic from "next/dynamic";
import { useRef } from "react";
const NoSSR = dynamic(() => import("@/pages/blog/RichTextEditor"), {
  ssr: false,
});

function CreateBlog() {
  const editorRef = useRef<any>(null);
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
