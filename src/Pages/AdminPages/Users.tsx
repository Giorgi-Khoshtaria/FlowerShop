import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import UserImg from "/assets/user-solid.svg";

interface UserInfo {
  _id: string;
  fullName: string;
  username: string;
  email: string;
  role: string;
  age: string;
  contactNumber: string;
  fullAddress: string;
  profilePicture: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

function Users() {
  const { userData } = useAuth();
  const [userInfo, setUserInfo] = useState<UserInfo[] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  // const [comments, setComments] = useState<Comment[] | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllUsers();
  }, [userData]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const fetchAllUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3005/api/user/getAllUser`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserInfo(response.data);
    } catch (error) {
      console.error("Error fetching all users:", error);
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      // Fetch user's blogs (assuming the API endpoint exists)
      const token = localStorage.getItem("token");
      const userBlogs = await axios.get(
        `http://localhost:3005/api/blogs/getBlogByUserId/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const userComments = await axios.get(
        `http://localhost:3005/api/reviews/getCommets`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Fetched comments:", userComments.data);
      // setComments(userComments.data);

      // Delete all blogs for the user
      if (userBlogs.data.length > 0) {
        for (const blog of userBlogs.data) {
          await axios.delete(
            `http://localhost:3005/api/blogs/deleteBlog/${blog._id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }
      }
      if (userComments.data.length > 0) {
        for (const comment of userComments.data) {
          await axios.delete(
            `http://localhost:3005/api/reviews/deleteCommentByUserId/${comment.userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }
      }
      // Once blogs are deleted, delete the user
      await axios.delete(`http://localhost:3005/api/user/delateUser/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Fetch updated users list
      await fetchAllUsers();
    } catch (error) {
      console.error("Error deleting user or blogs:", error);
      alert(
        "Failed to delete the user and their blogs and commets. Please try again."
      );
    }
  };
  const handleUpdateUser = (id: string) => {
    navigate(`/updateUser/${id}`);
  };

  const handleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredUsers = userInfo
    ?.filter(
      (user) =>
        user.username
          ?.toLocaleLowerCase()
          .includes(searchTerm.toLocaleLowerCase()) || ""
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.username.localeCompare(b.username);
      } else {
        return b.username.localeCompare(a.username);
      }
    });

  return (
    <div className="flex-1 flex items-center justify-center mt-20 p-4">
      <div className="max-w-[1440px] w-full">
        <Link to={`/dashboard`} className="text-yellow">
          Go Back
        </Link>
        <div className="mt-10 flex items-center justify-between w-full gap-4 border-b border-black pb-4 max-md:flex-col max-md:items-start">
          <div className="flex items-center gap-3">
            <label htmlFor="search">Search user</label>
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
            Sort Users {sortOrder === "asc" ? "A-Z" : "Z-A"}
          </button>
        </div>
        {/* Responsive Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 text-left">Profile</th>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">UserName</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Role</th>
                <th className="py-2 px-4 text-left">Age</th>
                <th className="py-2 px-4 text-left">Contact</th>
                <th className="py-2 px-4 text-left">Address</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers ? (
                filteredUsers.map((user) => (
                  <tr key={user._id} className="border-b border-gray-300">
                    <td className="py-2 px-4">
                      <img
                        src={
                          user.profilePicture ? user.profilePicture : UserImg
                        }
                        alt="Profile"
                        className="w-16 h-16 object-cover rounded-full"
                      />
                    </td>
                    <td className="py-2 px-4">
                      {user.fullName || "No Information"}
                    </td>
                    <td className="py-2 px-4">
                      {user.username || "No Information"}
                    </td>
                    <td className="py-2 px-4">
                      {user.email || "No Information"}
                    </td>
                    <td className="py-2 px-4">
                      {user.role || "No Information"}
                    </td>
                    <td className="py-2 px-4">
                      {user.age || "No Information"}
                    </td>
                    <td className="py-2 px-4">
                      {user.contactNumber || "No Information"}
                    </td>
                    <td className="py-2 px-4">
                      {user.fullAddress || "No Information"}
                    </td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => handleUpdateUser(user._id)}
                        className="mr-2 text-blue-500 hover:underline"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-2 px-4 text-center">
                    Loading users...
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

export default Users;
