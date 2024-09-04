import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import "../components/Css/profile.css";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { userData, logout } = useAuth();
  const [profileData, setProfileData] = useState({
    email: "",
    username: "",
    fullName: "",
    contactNumber: "",
    age: "",
    fullAddreess: "",
  });

  const [base64Image, setBase64Image] = useState<string | null>(null);
  const navigate = useNavigate();
  const userId = userData?.user.id;

  const handleLogout = () => {
    logout();
    navigate("/home");
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3005/api/user/getUserProfile/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              userId,
            },
          }
        );
        setProfileData({
          email: response.data.email || "",
          username: response.data.username || "",
          fullName: response.data.fullName || "",
          contactNumber: response.data.contactNumber || "",
          age: response.data.age || "",
          fullAddreess: response.data.fullAddress || "",
        });
        if (response.data.profilePicture) {
          setBase64Image(response.data.profilePicture);
        }
      } catch (error) {
        if (error.response?.status === 401) {
          handleLogout();
        } else {
          console.error("Error fetching user profile data:", error);
        }
      }
    };

    if (userId) {
      fetchProfileData();
    }
  }, [userId]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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

  const handleSaveChanges = async () => {
    const formData = {
      email: profileData.email,
      username: profileData.username,
      fullName: profileData.fullName,
      contactNumber: profileData.contactNumber,
      age: profileData.age,
      fullAddreess: profileData.fullAddreess,
      profilePicture: base64Image,
    };

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:3005/api/user/updateProfile/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          params: {
            userId,
          },
        }
      );
      alert("Profile updated successfully.");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="flex items-center justify-center mt-20 p-4">
      <div className="max-w-[1440px] w-full flex flex-col items-start bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-yellow-600 mb-6 text-yellow">
          Profile
        </h1>

        {/* Profile Picture Upload */}
        <div className="flex items-center justify-between w-full">
          <div className="mb-6">
            <label className="block text-lg font-medium text-yellow mb-2">
              Upload Profile Picture
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
                alt="Profile Preview"
                className="w-24 h-24 object-cover rounded-full"
              />
            )}
          </div>
        </div>

        {/* User Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <div>
            <label
              htmlFor="username"
              className=" text-lg font-medium text-yellow mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={profileData.username}
              onChange={handleChange}
              className="focus:outline-none w-full border border-darkGray p-3 rounded-lg text-yellow"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className=" text-lg font-medium text-yellow mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
              className="focus:outline-none w-full border border-darkGray p-3 rounded-lg text-yellow"
            />
          </div>
        </div>

        {/* More Information */}
        <div className="mt-8 w-full">
          <h2 className="text-2xl font-semibold text-yellow mb-6">
            More Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="fullname"
                className="text-lg font-medium text-yellow mb-2"
              >
                User FullName
              </label>
              <input
                type="text"
                id="fullname"
                name="fullName"
                value={profileData.fullName}
                onChange={handleChange}
                className="focus:outline-none w-full border border-darkGray p-3 rounded-lg text-yellow"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className=" text-lg font-medium text-yellow mb-2"
              >
                Contact Number
              </label>
              <input
                type="number"
                id="phone"
                name="contactNumber"
                value={profileData.contactNumber}
                onChange={handleChange}
                className="focus:outline-none w-full border border-darkGray p-3 rounded-lg text-yellow"
              />
            </div>

            <div>
              <label
                htmlFor="age"
                className="text-lg font-medium text-yellow mb-2"
              >
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={profileData.age}
                onChange={handleChange}
                className="focus:outline-none w-full border border-darkGray p-3 rounded-lg text-yellow"
              />
            </div>

            <div>
              <label
                htmlFor="address"
                className="text-lg font-medium text-yellow mb-2"
              >
                Full Address
              </label>
              <input
                type="text"
                id="address"
                name="fullAddreess"
                value={profileData.fullAddreess}
                onChange={handleChange}
                className=" focus:outline-none w-full border border-darkGray p-3 rounded-lg text-yellow"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 w-full flex justify-end">
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

export default Profile;
