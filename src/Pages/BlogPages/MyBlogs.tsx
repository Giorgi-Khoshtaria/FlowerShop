import React, { useEffect, useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";

interface BlogDetails {
  _id: string;
  blogName: string;
  blogDescription: string;
  blogImage: string;
  createdAt: string;
}
function MyBlogs() {
  const { userData } = useAuth();

  const [isLoadingBlogs, setIsLoadingBlogs] = useState(true);
  const [blogsByUser, setBlogsByUser] = useState<BlogDetails[]>([]);

  useEffect(() => {
    fetchBlogsByBlogUserId();
  }, [userData]);
  const fetchBlogsByBlogUserId = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3005/api/blogs/getBlogByUserId/${userData?.user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBlogsByUser(response.data);
    } catch (error) {
      console.error("Error fetching blogs by user ID:", error);
    } finally {
      setIsLoadingBlogs(false);
    }
  };
  return (
    <div className=" flex-1 flex items-center justify-center">
      <div className="max-w-[1440px] w-full mt-10">
        <h1 className="text-2xl font-semibold mb-4">
          {userData?.user?.username}'s Uploaded Blogs
        </h1>

        {/* Loading Blogs */}
        {isLoadingBlogs ? (
          <p>Loading blogs...</p>
        ) : blogsByUser.length === 0 ? (
          <p>No blogs available for this user</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogsByUser.map((blog, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 flex flex-col items-start"
              >
                <Link
                  to={`/editblogs/${blog._id}`}
                  className="my-3 text-yellow"
                >
                  Edit this blog
                </Link>
                <img
                  src={blog.blogImage}
                  alt={blog.blogName}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {blog.blogName}
                </h2>
                <p className="text-gray-600 mb-2">{blog.blogDescription}</p>
                <div>
                  <p className="text-gray-400 text-sm">
                    Posted on: {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                  <Link to={`/blogDetails/${blog._id}`}>Read More</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBlogs;
