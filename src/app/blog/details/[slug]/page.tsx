"use client";

import { IBlog } from "@/models/Blog";
import Image from "next/image";
import { useEffect, useState } from "react";

function BlogDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const [blog, setBlog] = useState<IBlog | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const { slug } = await params;
        const res = await fetch(`/api/blog/${slug}`);
        const data = await res.json();
        setBlog(data);
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [params]);

  return (
    <main className="pt-130 pb-3">
      {loading ? (
        <div className="w-[70%] mx-auto bg-secondary p-4 rounded-md border border-[e5eaf2] boxShadow animate-pulse">
          <p className="w-[70%] min-h-[300px] bg-[e5eaf2] rounded-md"></p>
        </div>
      ) : (
        <div className="container w-full mx-auto">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-2">
            {blog?.title}
          </h1>
          <p className="text-xl text-gray-600">{blog?.subTitle}</p>

          {blog?.blogImageURL && (
            <Image
              src={blog?.blogImageURL || "/placeholder.jpg"}
              alt={blog?.title || ""}
              width={800}
              height={400}
              className="rounded-lg shadow-sm mb-6 m-auto py-6"
            />
          )}

          <article
            dangerouslySetInnerHTML={{ __html: blog?.description || "" }}
          ></article>

          <div className="mt-8 flex flex-wrap gap-2">
            {blog?.blogTags.map((tag) => (
              <span
                key={tag.name}
                className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

export default BlogDetailsPage;
