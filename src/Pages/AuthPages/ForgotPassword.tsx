import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import houseimg from "/assets/house.svg";
import toast, { Toaster } from "react-hot-toast";

function ForgotPassword() {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const validatePassword = (password: string): boolean => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|:<>?~=\\[\];',./-])[A-Za-z\d!@#$%^&*()_+{}|:<>?~=\\[\];',./-]{8,25}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validatePassword(newPassword)) {
      alert(
        "Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3005/api/user/forgot-password",
        {
          username,
          newPassword,
          confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Password updated successfully!");
        setUsername("");
        setNewPassword("");
        setConfirmPassword("");

        // Navigate to the login page after a short delay to allow the user to see the success message

        navigate("/login");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response) {
          switch (error.response.status) {
            case 400:
              alert(error.response.data.message);
              break;
            case 404:
              toast.error("User does not exist.");
              break;
            default:
              toast.error("An unexpected error occurred.");
          }
        } else {
          toast.error("No response from the server.");
        }
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };
  return (
    <div className=" flex-1 px-[20px] min-h-screen flex items-center justify-center max-lg:flex-col-reverse">
      <Toaster position="top-right" reverseOrder={false} />{" "}
      <div className="pt-[33px] pr-[49px] pb-[67px] pl-[48px] bg-white w-[488px] max-sm:w-[327px]">
        <div className="flex items-baseline flex-col mb-[40px] max-sm:gap-2">
          <div className="flex items-center justify-center mb-3">
            <img src={houseimg} alt="" />
            <Link
              to="/home"
              className="text-black text-[18px] font-normal leading-[normal]"
            >
              Back to home
            </Link>
          </div>
          <h1 className="text-black text-[32px] not-italic font-normal leading-[normal] mb-[13px]">
            Forgot Password
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-start gap-[14px] w-full"
        >
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full focus:outline-0 border border-semiGray py-[21px] pl-[29px] rounded-[5px]"
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full focus:outline-0 border border-semiGray py-[21px] pl-[29px] rounded-[5px]"
          />
          <input
            type="password"
            placeholder="Repeat Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full focus:outline-0 border border-semiGray py-[21px] pl-[29px] rounded-[5px]"
          />
          <div className="w-full mb-10">
            <button
              type="submit"
              className="w-full pt-[19px] pb-[15px] bg-yellow rounded-[5px] mt-[45px] text-white text-xl not-italic font-normal leading-[normal]"
            >
              Change Password
            </button>
          </div>
        </form>
        <p className="flex items-center justify-center text-xl not-italic font-normal leading-[normal] text-darkGray max-sm:flex-col">
          Don't have an account?{" "}
          <Link to="/register" className="text-yellow">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
