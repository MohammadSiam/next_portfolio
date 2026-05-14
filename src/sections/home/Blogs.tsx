"use client";
import { IBlog } from "@/models/Blog";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Blog() {
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
    <>
      <section
        id="blog"
        className="section-blog-2 position-relative pt-60 pb-60"
      >
        <div className="container">
          <div className="text-center d-flex justify-between items-center">
            <div>
              <div className="d-flex align-items-center justify-content-center">
                <span className="text-linear-4 d-flex align-items-center">
                  {" "}
                  Latest Posts{" "}
                </span>
              </div>
            </div>
            <div>
              <button className="btn btn-primary-2 rounded-2">
                <Link href="/blog">
                  <span className="text-linear-4">View All Blogs</span>
                </Link>
              </button>
            </div>
          </div>
          {loading ? (
            <div className="w-full mx-auto bg-secondary p-4 rounded-md border border-[e5eaf2] boxShadow animate-pulse">
              <p className="w-[90%] min-h-[300px] bg-[e5eaf2] rounded-md"></p>
            </div>
          ) : (
            <div className="row mt-4">
              {blogs?.slice(0, 4)?.map((blog, index) => (
                <div className="col-lg-4" key={index}>
                  <div className="blog-card rounded-top-2 mb-lg-3 mb-md-5 mb-3">
                    <div className="blog-card__image position-relative">
                      <div className="zoom-img rounded-2 overflow-hidden">
                        <Image
                          src={blog?.blogImageURL}
                          alt={blog?.title}
                          height={500}
                          width={500}
                        />
                        <Link
                          className="position-absolute bottom-0 start-0 m-3 text-white-keep border border-white fw-medium px-3 py-1 fs-7 bg-white rounded-2"
                          href={`/blog/details/${blog?._id}`}
                        >
                          {blog?.blogTags?.map(
                            (tag, index) =>
                              index === 1 && (
                                <span key={index}>{tag?.name}</span>
                              )
                          )}
                        </Link>
                        <Link
                          href={`/blog/details/${blog?._id}`}
                          className="blog-card__link position-absolute top-50 start-50 translate-middle icon-md icon-shape rounded-circle"
                        >
                          <i className="ri-arrow-right-up-line" />
                        </Link>
                      </div>
                    </div>
                    <div className="blog-card__content position-relative text-center mt-4">
                      <span className="blog-card__date fs-7">
                        {new Date(blog?.createdAt).toDateString()} • 3 min read
                      </span>
                      <h6 className="blog-card__title mt-2">
                        {" "}
                        {blog?.title?.length > 50
                          ? `${blog.title.slice(0, 50)}...`
                          : blog.title}
                      </h6>
                      <p className="blog-card__description fs-7">
                        {blog?.subTitle.length > 50
                          ? `${blog.title.slice(0, 50)}...`
                          : blog.title}
                      </p>
                      <Link
                        href={`/blog/details/${blog?._id}`}
                        className="link-overlay position-absolute top-0 start-0 w-100 h-100"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
