"use client";
import { IBlog } from "@/models/Blog";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaRegCalendarAlt, FaRegCommentDots } from "react-icons/fa";

function BlogCard({ blog }: { blog: IBlog }) {
  const router = useRouter();
  const handleDetails = () => {
    router.push(`/blog/details/${blog._id}`);
  };
  return (
    <div>
      <div
        className="flex flex-col md:flex-row-reverse justify-between gap-4 p-4 cursor-pointer rounded-lg shadow hover:shadow-md transition-all bg-white"
        onClick={handleDetails}
      >
        <div className="w-32 h-20 relative rounded-md overflow-hidden">
          <Image
            src={blog?.blogImageURL}
            alt="Blog thumbnail"
            fill
            className="object-cover"
          />
        </div>
        <div className="">
          <h2 className="text-lg font-bold text-gray-900 leading-snug">
            {blog?.title}
          </h2>
          <p className="text-sm text-gray-600 mt-1">{blog?.subTitle}</p>
          <div className="flex items-center gap-4 text-xs text-gray-500 mt-3">
            <div className="flex items-center gap-1">
              <FaRegCalendarAlt className="w-4 h-4" />
              <span>{new Date(blog?.createdAt).toLocaleDateString()}</span>
            </div>

            <div className="hidden md:flex items-center gap-1">
              <FaRegCommentDots className="w-4 h-4" />
              <span>
                {blog?.blogTags?.map((tag, index) => (
                  <span
                    key={index}
                    className="p-1 mx-1 bg-gray-400 text-white rounded-md"
                  >
                    {tag?.name}
                  </span>
                ))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
