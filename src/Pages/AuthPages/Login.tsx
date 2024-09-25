import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import houseimg from "/assets/house.svg";
import loginImage from "/assets/login.png";
import { useAuth } from "../../Contexts/AuthContext";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, setUserData } = useAuth();
  const navigate = useNavigate(); // Initialize the navigate function

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3005/api/user/login",
        {
          username,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // Save the token in localStorage first
        localStorage.setItem("token", response.data.token);

        // Set user context and login state
        login(response.data);
        setUserData(response.data);

        // Clear input fields
        setUsername("");
        setPassword("");
        console.log("Login successful, triggering toast...");
        // Show success alert only after user data and token are set
        toast.success("Login successful!");

        // Redirect to the home page
        navigate("/home");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response) {
          switch (error.response.status) {
            case 404:
              toast.error("User not found.");
              break;
            case 400:
              toast.error("Invalid username or password.");
              break;
            default:
              toast.error(
                error.response.data.message || "An error occurred during login."
              );
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
        <div className="flex items-baseline justify-between mb-[57px] max-sm:flex-col-reverse max-sm:gap-2">
          <div>
            <h1 className="text-black text-[32px] not-italic font-normal leading-[normal] mb-[13px]">
              Login
            </h1>
            <p className="text-darkGray text-[18px] font-normal leading-[normal]">
              Login and have more fun
            </p>
          </div>
          <div className="flex items-center justify-center">
            <img src={houseimg} alt="" />
            <Link
              to="/home"
              className="text-black text-[18px] font-normal leading-[normal]"
            >
              Back to home
            </Link>
          </div>
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
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full focus:outline-0 border border-semiGray py-[21px] pl-[29px] rounded-[5px]"
          />
          <div className="flex items-baseline justify-start gap-1 mt-[23px]">
            <input type="checkbox" id="checkbox" className="bg-[#D9D9D9]" />
            <p className="text-darkGray text-lg not-italic font-normal leading-[normal]">
              Remember me
            </p>
          </div>
          <div className="w-full">
            <button
              type="submit"
              className="w-full pt-[19px] pb-[15px] bg-yellow rounded-[5px] mt-[45px] text-white text-xl not-italic font-normal leading-[normal]"
            >
              Login
            </button>
          </div>
        </form>
        <div className="mb-[50px] mt-2">
          <Link
            to="/forgotpassword"
            className="text-darkGray text-lg not-italic font-normal leading-[normal]"
          >
            Forgot Password?
          </Link>
        </div>
        <p className="flex items-center justify-center text-xl not-italic font-normal leading-[normal] text-darkGray max-sm:flex-col">
          Don’t have an account?{" "}
          <Link to="/register" className="text-yellow">
            Register
          </Link>
        </p>
      </div>
      <div className="w-488px">
        <img
          src={loginImage}
          alt=""
          className="h-[632px] max-lg:h-[250px] object-cover max-lg:w-[490px] max-sm:w-[327px]"
        />
      </div>
    </div>
  );
}

export default Login;
