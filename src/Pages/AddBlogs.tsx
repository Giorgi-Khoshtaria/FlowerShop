import { ChangeEvent, useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import axios from "axios";

function AddBlogs() {
  const { userData } = useAuth();
  const userId = userData?.user.id;

  const [blogImage, setBlogImage] = useState<string | null>(null);
  const [blogData, setBlogData] = useState({
    blogName: "",
    blogDescription: "",
    blogUserId: userId,
  });
  // State for displaying validation errors

  // Handle input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBlogData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle file input change for image
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setBlogImage(reader.result as string); // Set the base64 image
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Check if all required fields are filled
    if (!blogData.blogName || !blogData.blogDescription || !blogImage) {
      alert("All fields, including the image, must be filled out.");
      return; // Stop submission if validation fails
    }
    const formData = {
      blogName: blogData.blogName,
      blogDescription: blogData.blogDescription,
      blogUserId: blogData.blogUserId,
      blogImage: blogImage,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3005/api/blogs/addBlog",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Blog created successfully:", response.data);
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("There was an error creating the blog.");
    }
  };

  return (
    <div className="flex items-center justify-center mt-20 p-4">
      <div className="max-w-[1440px] w-full flex flex-col items-start bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-yellow mb-6">Add Blog</h1>

        {/* Blog Image Upload */}
        <div className="mb-6 w-full flex items-center justify-between ">
          <div>
            <label
              htmlFor="blogimage"
              className="block text-lg font-medium text-yellow mb-2"
            >
              Blog Image
            </label>
            <input
              type="file"
              id="blogimage"
              onChange={handleFileChange}
              className="w-full text-sm text-yellow file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-yellow file:text-white hover:file:bg-yellow-100"
            />
          </div>
          <div>
            {/* Use blogImage instead of blogData */}
            {blogImage && (
              <img
                src={blogImage}
                className="w-24 h-24 object-cover rounded-full "
                alt="Blog Preview"
              />
            )}
          </div>
        </div>

        {/* Blog Name */}
        <div className="mb-6 w-full">
          <label
            htmlFor="blogname"
            className="text-lg font-medium text-yellow mb-2"
          >
            Blog Name
          </label>
          <input
            type="text"
            id="blogName"
            name="blogName"
            value={blogData.blogName}
            onChange={handleChange}
            className="w-full border border-semiGray p-3 rounded-lg text-yellow-600"
          />
        </div>

        {/* Blog Description */}
        <div className="mb-6 w-full">
          <label
            htmlFor="description"
            className="text-lg font-medium text-yellow mb-2"
          >
            Blog Description
          </label>
          <textarea
            id="description"
            rows={6}
            name="blogDescription"
            value={blogData.blogDescription}
            onChange={handleChange}
            className="w-full border border-semiGray p-3 rounded-lg text-yellow-600"
          ></textarea>
        </div>

        <div className="flex w-full justify-end">
          <button
            onClick={handleSubmit}
            className="bg-yellow text-white px-6 py-3 rounded-lg font-medium "
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddBlogs;
