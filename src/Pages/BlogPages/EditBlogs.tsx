import React, { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../components/Css/profile.css";

interface BlogDetail {
  createdAt: string;
  blogImage: string | null;
  blogName: string;
  blogDescription: string;
}

function EditBlogs() {
  const { blogId } = useParams<{ blogId: string }>();
  const [blog, setBlog] = useState<BlogDetail | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3005/api/blogs/getBlog/${blogId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBlog(response.data);
        setBase64Image(response.data.blogImage);
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };

    fetchBlogDetails();
  }, [blogId]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBlog((prevBlog) => {
      return prevBlog ? { ...prevBlog, [name]: value } : null;
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Image(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetFields = () => {
    setBlog((prevBlog) => {
      if (prevBlog) {
        return {
          ...prevBlog,
          blogName: "",
          blogDescription: "",
          blogImage: base64Image, // Use the base64 image if available
        };
      }
      return null;
    });
  };

  const handleSaveChanges = async () => {
    const updatedBlog = {
      blogName: blog?.blogName,
      blogDescription: blog?.blogDescription,
      blogImage: base64Image || "",
    };

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3005/api/blogs/updateBlog/${blogId}`,
        updatedBlog,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Blog updated successfully.");
      handleResetFields();
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  return (
    <div className="flex-1 w-full flex flex-col items-center justify-center p-4 mx-auto mt-10">
      <div className="max-w-[1440px] w-full flex flex-col items-start bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-yellow-600 mb-6">
          Edit Blog
        </h1>

        {/* Blog Image Upload */}
        <div className="flex items-center justify-between w-full mb-6">
          <div>
            <label className="block text-lg font-medium text-yellow mb-2">
              Upload Blog Image
            </label>
            <input
              type="file"
              className="block w-full text-sm text-yellow file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-yellow file:text-white hover:file:bg-yellow-100"
              onChange={handleFileChange}
            />
          </div>
          <div>
            {base64Image && (
              <img
                src={base64Image}
                alt="Blog Preview"
                className="w-24 h-24 object-cover rounded-full"
              />
            )}
          </div>
        </div>

        {/* Blog Information */}
        <div className="grid grid-cols-1 gap-6 w-full mb-6">
          <div>
            <label
              htmlFor="blogName"
              className="text-lg font-medium text-yellow mb-2"
            >
              Blog Name
            </label>
            <input
              type="text"
              id="blogName"
              name="blogName"
              value={blog?.blogName || ""}
              onChange={handleInputChange}
              className="focus:outline-none w-full border border-darkGray p-3 rounded-lg text-yellow"
            />
          </div>

          <div>
            <label
              htmlFor="blogDescription"
              className="text-lg font-medium text-yellow mb-2"
            >
              Blog Description
            </label>
            <textarea
              id="blogDescription"
              name="blogDescription"
              value={blog?.blogDescription || ""}
              onChange={handleInputChange}
              className="focus:outline-none w-full border border-darkGray p-3 rounded-lg text-yellow"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="w-full flex justify-end">
          <button
            type="button"
            onClick={handleSaveChanges}
            className="bg-yellow text-white py-3 px-6 rounded-lg shadow focus:outline-none"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditBlogs;
