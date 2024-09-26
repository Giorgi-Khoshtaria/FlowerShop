import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { RiseLoader } from "react-spinners";

interface UserDetails {
  id: string;
  username: string;
  email: string;
  fullName: string;
  contactNumber: string;
  age: string;
  fullAddress: string;
  profilePicture: string;
}

interface BlogDetails {
  _id: string;
  blogName: string;
  blogDescription: string;
  blogImage: string;
  createdAt: string;
}

function UserProfile() {
  const { blogUserId } = useParams();
  const [userDetailsData, setUserDetailsData] = useState<UserDetails | null>(
    null
  );
  const [blogsByUser, setBlogsByUser] = useState<BlogDetails[]>([]);
  const [isLoadingUserDetails, setIsLoadingUserDetails] = useState(true);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(true);

  useEffect(() => {
    fetchBlogUserDetails();
    fetchBlogsByBlogUserId();
  }, [blogUserId]);
  const apiUrl = import.meta.env.VITE_API_URL;
  const fetchBlogUserDetails = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/user/getUserDetails/${blogUserId}`
      );
      setUserDetailsData(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setIsLoadingUserDetails(false);
    }
  };

  const fetchBlogsByBlogUserId = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/blogs/getBlogByUserId/${blogUserId}`
      );
      setBlogsByUser(response.data);
    } catch (error) {
      console.error("Error fetching blogs by user ID:", error);
    } finally {
      setIsLoadingBlogs(false);
    }
  };

  return (
    <div className="flex-1 w-full flex flex-col items-center justify-center p-4 mx-auto mt-10">
      <div className="max-w-[1440px] w-full flex flex-col items-start p-6 bg-white rounded-lg shadow-md ">
        <h1 className="text-3xl font-semibold text-yellow-600 mb-6">
          User Profile
        </h1>

        {/* Loading User Details */}
        {isLoadingUserDetails ? (
          <div className="flex w-full items-center justify-center">
            <RiseLoader
              color="#FF8F52"
              margin={0}
              size={15}
              speedMultiplier={1}
            />
          </div>
        ) : (
          userDetailsData && (
            <div className="w-full flex items-start justify-between gap-6 max-sm:flex-col-reverse">
              {/* User Info Section */}
              <div className="w-full">
                <div className="mb-4">
                  <h2 className="text-lg font-medium text-gray-700">
                    Username:
                  </h2>
                  <p className="text-gray-500">
                    {userDetailsData.username || "No Information"}
                  </p>
                </div>
                <div className="mb-4">
                  <h2 className="text-lg font-medium text-gray-700">Email:</h2>
                  <p className="text-gray-500">
                    {userDetailsData.email || "No Information"}
                  </p>
                </div>
                <div className="mb-4">
                  <h2 className="text-lg font-medium text-gray-700">
                    Full Name:
                  </h2>
                  <p className="text-gray-500">
                    {userDetailsData.fullName || "No Information"}
                  </p>
                </div>
                <div className="mb-4">
                  <h2 className="text-lg font-medium text-gray-700">
                    Contact Number:
                  </h2>
                  <p className="text-gray-500">
                    {userDetailsData.contactNumber || "No Information"}
                  </p>
                </div>
                <div className="mb-4">
                  <h2 className="text-lg font-medium text-gray-700">Age:</h2>
                  <p className="text-gray-500">
                    {userDetailsData.age || "No Information"}
                  </p>
                </div>
                <div className="mb-4">
                  <h2 className="text-lg font-medium text-gray-700">
                    Full Address:
                  </h2>
                  <p className="text-gray-500">
                    {userDetailsData.fullAddress || "No Information"}
                  </p>
                </div>
              </div>

              {/* Profile Picture Section */}
              <div className="flex justify-center items-center">
                {userDetailsData.profilePicture ? (
                  <img
                    src={userDetailsData.profilePicture}
                    alt="User"
                    className="w-90 h-80 object-contain rounded-xl"
                  />
                ) : (
                  <p>No Profile Image</p>
                )}
              </div>
            </div>
          )
        )}
      </div>

      {/* Blog Section */}
      <div className="max-w-[1440px] w-full mt-10">
        {/* Loading Blogs */}{" "}
        <h1 className="text-2xl font-semibold mb-4">
          {userDetailsData?.username}'s Uploaded Blogs
        </h1>
        {isLoadingBlogs ? (
          <div className="flex items-center justify-center">
            <RiseLoader
              color="#FF8F52"
              margin={0}
              size={15}
              speedMultiplier={1}
            />
          </div>
        ) : blogsByUser.length === 0 ? (
          <p>No blogs available for this user</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogsByUser.map((blog, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 flex flex-col items-start"
              >
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

export default UserProfile;
