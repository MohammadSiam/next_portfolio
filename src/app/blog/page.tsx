"use client";
import { IBlog } from "@/models/Blog";
import BlogCard from "@/pages/blog/BlogCard";
import { useEffect, useState } from "react";

function AllBlogs() {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/blog");
        const result = await response.json();
        setBlogs(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);
  return (
    <div>
      <section className="pt-130 pb-3">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10">
              <div className="section-title text-center mb-2">
                <h2 className="title">All Blogs</h2>
              </div>
            </div>
          </div>
          <div>
            {loading ? (
              <div className="w-full mx-auto bg-secondary p-4 rounded-md border border-[e5eaf2] boxShadow animate-pulse">
                <p className="w-[90%] min-h-[300px] bg-[e5eaf2] rounded-md"></p>
              </div>
            ) : (
              blogs.map((blog) => (
                <div key={blog._id}>
                  <BlogCard blog={blog} />
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AllBlogs;
