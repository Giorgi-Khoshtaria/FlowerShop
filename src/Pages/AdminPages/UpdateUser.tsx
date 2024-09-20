import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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

function UpdateUser() {
  const { id } = useParams<{ id: string }>(); // Get the user ID from the URL
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3005/api/user/getUserProfile/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserInfo(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (userInfo) {
      setUserInfo({ ...userInfo, [name]: value });
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3005/api/user/updateUser/${id}`,
        {
          ...userInfo,
          password, // Include password in the update if provided
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("User updated successfully");
      navigate("/users");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="flex-1 flex items-start justify-center mt-20 p-4">
      <div className="max-w-[1440px] w-full">
        <h1 className="text-2xl mb-6">Update User</h1>
        {userInfo ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={userInfo.fullName || ""}
                onChange={handleChange}
                className="py-2 px-4 border border-gray-400 w-full rounded"
              />
            </div>
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={userInfo.username || ""}
                onChange={handleChange}
                className="py-2 px-4 border border-gray-400 w-full rounded"
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={userInfo.email || ""}
                onChange={handleChange}
                className="py-2 px-4 border border-gray-400 w-full rounded"
              />
            </div>
            <div>
              <label htmlFor="age">Age</label>
              <input
                type="text"
                id="age"
                name="age"
                value={userInfo.age || ""}
                onChange={handleChange}
                className="py-2 px-4 border border-gray-400 w-full rounded"
              />
            </div>
            <div>
              <label htmlFor="contactNumber">Contact Number</label>
              <input
                type="text"
                id="contactNumber"
                name="contactNumber"
                value={userInfo.contactNumber || ""}
                onChange={handleChange}
                className="py-2 px-4 border border-gray-400 w-full rounded"
              />
            </div>
            <div>
              <label htmlFor="fullAddress">Full Address</label>
              <textarea
                id="fullAddress"
                name="fullAddress"
                value={userInfo.fullAddress || ""}
                onChange={handleChange}
                className="py-2 px-4 border border-gray-400 w-full rounded"
              />
            </div>
            <div>
              <label htmlFor="password">New Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                className="py-2 px-4 border border-gray-400 w-full rounded"
              />
            </div>
            <button
              type="submit"
              className="bg-yellow text-white py-2 px-4 rounded "
            >
              Update User
            </button>
          </form>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}

export default UpdateUser;
