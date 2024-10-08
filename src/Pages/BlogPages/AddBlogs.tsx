import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function AddBlogs() {
  const { userData } = useAuth();
  const userId = userData?.user.id;

  const [blogImage, setBlogImage] = useState<string | null>(null);
  const [blogUserImage, setblogUserImage] = useState<string | null>(null);
  // const [BlogUserName, setBlogUserName] = useState("");
  const [blogData, setBlogData] = useState({
    blogName: "",
    blogDescription: "",
    blogPhrase: "",
    blogUserId: userId,
    blogUserName: userData?.user.username,
  });

  // Reference for the file input
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  // Reset all fields including file input
  const resetFields = () => {
    setBlogData({
      blogName: "",
      blogDescription: "",
      blogPhrase: "",
      blogUserId: userId,
      blogUserName: userData?.user.username,
    });
    setBlogImage(null);

    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clears the file input
    }
  };
  const apiUrl = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${apiUrl}/api/user/getUserProfile/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              userId,
            },
          }
        );

        if (response.data.profilePicture) {
          setblogUserImage(response.data.profilePicture);
        } else {
          setblogUserImage(null); // Ensure no image is set if none exists
        }
      } catch (error) {
        console.error("Error creating blog:", error);
      }
    };

    if (userId) {
      fetchProfileData();
    }
  }, [userId]);

  // Handle form submission
  const handleSubmit = async () => {
    // Check if all required fields are filled
    if (!blogData.blogName || !blogData.blogDescription || !blogImage) {
      toast.error("All fields, including the image, must be filled out.");
      return; // Stop submission if validation fails
    }

    const formData = {
      blogName: blogData.blogName,
      blogDescription: blogData.blogDescription,
      blogPhrase: blogData.blogPhrase,
      blogUserId: blogData.blogUserId,
      blogImage: blogImage,
      blogUserImage: blogUserImage,
      blogUserName: userData?.user.username,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${apiUrl}/api/blogs/addBlog`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        resetFields(); // Reset all fields on success
        toast.success("Blog created successfully:");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      toast.error("There was an error creating the blog.");
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center mt-20 p-4">
      <Toaster position="top-right" reverseOrder={false} />{" "}
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
              ref={fileInputRef}
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
        <div className="mb-6 w-full">
          <label
            htmlFor="BlogPhrase"
            className="text-lg font-medium text-yellow mb-2"
          >
            Blog Phrase
          </label>
          <input
            type="text"
            id="blogPhrase"
            name="blogPhrase"
            value={blogData.blogPhrase}
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
