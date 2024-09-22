import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../Contexts/AuthContext";
import UserImg from "/assets/user-solid.svg";

interface Blog {
  _id: string;
  blogName: string;
  blogDescription: string;
  blogImage: string;
  blogUserName: string;
  blogUserId: string;
  blogUserImage: string;
  createdAt: string;
  likes: number;
  views: number;
}

function BlogsAdmin() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [blogs, setBlogs] = useState<Blog[] | null>(null);

  const { userData } = useAuth();

  useEffect(() => {
    fetchAllBlogs();
  }, [userData]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const fetchAllBlogs = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3005/api/blogs/getBlogs`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredBlogs = blogs
    ?.filter(
      (blog) =>
        blog.blogName?.toLocaleLowerCase().includes(searchTerm.toLowerCase()) ||
        ""
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.blogName.localeCompare(b.blogName);
      } else {
        return b.blogName.localeCompare(a.blogName);
      }
    });

  const handleDeleteblog = async (id: string) => {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:3005/api/blogs/deleteBlog/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    alert("The blog has been deleted");
    fetchAllBlogs();
  };
  return (
    <div className="flex-1 flex items-center justify-center mt-20 p-4">
      <div className="max-w-[1440px] w-full">
        <Link to={`/dashboard`} className="text-yellow">
          Go Back
        </Link>
        <div className="mt-10 flex items-center justify-between w-full gap-4 border-b border-black pb-4 max-md:flex-col max-md:items-start">
          <div className="flex items-center gap-3">
            <label htmlFor="search">Search Blog</label>
            <input
              type="search"
              id="search"
              value={searchTerm}
              onChange={handleSearch}
              className="py-2 px-2 rounded-md border bg-semiGray border-black focus:outline-none"
            />
          </div>
          <button
            onClick={handleSortOrder}
            className="text-yellow hover:underline"
          >
            Sort Blogs {sortOrder === "asc" ? "A-Z" : "Z-A"}
          </button>
        </div>
        {/* Responsive Table for Blogs */}
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 text-left">Blog Image</th>
                <th className="py-2 px-4 text-left">Blog Name</th>
                <th className="py-2 px-4 text-left">Blog Description</th>
                <th className="py-2 px-4 text-left">Author</th>
                <th className="py-2 px-4 text-left">Views</th>
                <th className="py-2 px-4 text-left">Created At</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBlogs ? (
                filteredBlogs.map((blog) => (
                  <tr key={blog._id} className="border-b border-gray-300">
                    <td className="py-2 px-4">
                      <img
                        src={blog.blogImage}
                        alt="Blog"
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="py-2 px-4">{blog.blogName || "No Info"}</td>
                    <td className="py-2 px-4 max-w-[200px] overflow-x-auto">
                      {blog.blogDescription || "No Info"}
                    </td>
                    <td className="py-2 px-4 flex items-center gap-2">
                      <img
                        src={blog.blogUserImage || UserImg}
                        alt="Author"
                        className="w-8 h-8 object-cover rounded-full"
                      />
                      <span className="max-w-[200px] overflow-x-auto">
                        {blog.blogUserName || "No Info"}
                      </span>
                    </td>

                    <td className="py-2 px-4">{blog.views}</td>
                    <td className="py-2 px-4">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4">
                      <Link
                        to={`/editblogs/${blog._id}`}
                        className="mr-2 text-blue-500 hover:underline"
                      >
                        Update
                      </Link>
                      <button
                        onClick={() => handleDeleteblog(blog._id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-2 px-4 text-center">
                    Loading blogs...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BlogsAdmin;
