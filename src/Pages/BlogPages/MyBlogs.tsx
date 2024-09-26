import React, { useEffect, useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { RiseLoader } from "react-spinners"; // Import the loader
import toast, { Toaster } from "react-hot-toast";

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
  const apiUrl = import.meta.env.VITE_API_URL;
  const fetchBlogsByBlogUserId = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${apiUrl}/api/blogs/getBlogByUserId/${userData?.user.id}`,
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

  const handleDeleteBlog = async (blogId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${apiUrl}/api/blogs/deleteBlog/${blogId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBlogsByUser((prevBlogs) =>
        prevBlogs.filter((blog) => blog._id !== blogId)
      );
      toast.success("Blog deleted successfully.");
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete the blog. Please try again.");
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center">
      <Toaster position="top-right" reverseOrder={false} />{" "}
      <div className="max-w-[1440px] w-full mt-10">
        <h1 className="text-2xl font-semibold mb-4">
          {userData?.user?.username}'s Uploaded Blogs
        </h1>

        {/* Loading Blogs */}
        {isLoadingBlogs ? (
          <div className="flex items-center justify-center h-40">
            <RiseLoader color="#FF8F52" size={15} />
          </div>
        ) : blogsByUser.length === 0 ? (
          <p>No blogs available for this user</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogsByUser.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-lg shadow-md p-6 flex flex-col items-start"
              >
                <div className="w-full flex items-center justify-between">
                  <Link
                    to={`/editblogs/${blog._id}`}
                    className="my-3 text-yellow"
                  >
                    Edit this blog
                  </Link>
                  <button
                    onClick={() => handleDeleteBlog(blog._id)}
                    className="text-yellow text-base"
                  >
                    Delete Blog
                  </button>
                </div>

                <img
                  src={blog.blogImage}
                  alt={blog.blogName}
                  className="w-full h-40 object-fill rounded-md mb-4"
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
