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
  const { userData, logout } = useAuth();
  const [userInfo, setUserInfo] = useState<UserInfo[] | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllUsers();
  }, [userData]);

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

  const handleDeleteUser = (id: string) => {
    navigate("/register");
    logout();
    console.log("Delete user:", id);
  };

  const handleUpdateUser = (id: string) => {
    // You can add the logic to update the user here.
    console.log("Update user:", id);
  };

  return (
    <div className="flex-1 flex items-center justify-center mt-20 p-4">
      <div className="max-w-[1440px] w-full">
        <Link to={`/dashboard`}>Go Back</Link>
        <div className="mt-10 flex items-center justify-between w-full gap-4 border-b border-black pb-4 max-md:flex-col max-md:items-start">
          <div className="flex items-center gap-3">
            <label htmlFor="search">Search user</label>
            <input
              type="search"
              id="search"
              className="py-2 px-2 rounded-md border bg-semiGray border-black focus:outline-none"
            />
          </div>
          <div>Sort User a/z</div>
        </div>
        {/* Responsive Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 text-left">Profile</th>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Role</th>
                <th className="py-2 px-4 text-left">Age</th>
                <th className="py-2 px-4 text-left">Contact</th>
                <th className="py-2 px-4 text-left">Address</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userInfo ? (
                userInfo.map((user) => (
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
