import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import houseimg from "/assets/house.svg";
import registerImage from "/assets/register.png";

function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize the navigate function

  // Function to validate the password
  const validatePassword = (password: string): boolean => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|:<>?~=\\[\];',./-])[A-Za-z\d!@#$%^&*()_+{}|:<>?~=\\[\];',./-]{8,25}$/;
    return passwordRegex.test(password);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      alert(
        "Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters."
      );
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3005/api/user/signup",
        {
          email,
          username,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle successful response
      if (response.status === 201) {
        alert("Registration successful!");
        setEmail("");
        setUsername("");
        setPassword("");
        navigate("/login"); // Redirect the user to the login page
      }
    } catch (error: unknown) {
      // Handle error response
      if (error instanceof AxiosError) {
        if (error.response) {
          switch (error.response.status) {
            case 400:
              alert("Error registering user: " + error.response.data.message);
              break;
            case 409:
              alert("Username or email already exists.");
              break;
            default:
              alert("Error registering user: " + error.response.data.message);
          }
        } else {
          alert("No response from the server.");
        }
      } else {
        alert("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="flex-1 px-[20px] min-h-screen flex items-center justify-center max-lg:flex-col-reverse">
      <div className="pt-[30px] pr-[49px] pb-[43px] pl-[48px] bg-white w-[488px] max-sm:w-[327px]">
        <div className="flex items-baseline justify-between mb-[57px] max-sm:flex-col-reverse max-sm:gap-2">
          <div>
            <h1 className="text-black text-[32px] not-italic font-normal leading-[normal] mb-[13px]">
              Register
            </h1>
            <p className="text-darkGray text-[18px] font-normal leading-[normal]">
              Register and help us help you
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
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full focus:outline-0 border border-semiGray py-[21px] pl-[29px] rounded-[5px]"
          />
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
          <p className="mt-[45px] mb-[12px] text-darkGray text-base not-italic font-normal leading-[25px]">
            By registering you accept our{" "}
            <span className="text-yellow">terms</span> and
            <span className="text-yellow">privacy policy</span>
          </p>
          <div className="w-full">
            <button
              type="submit"
              className="w-full pt-[19px] pb-[15px] bg-yellow rounded-[5px] text-white text-xl not-italic font-normal leading-[normal]"
            >
              Register
            </button>
          </div>
          <p className="mt-[50px] flex items-center justify-center text-xl not-italic font-normal leading-[normal] text-darkGray max-sm:flex-col">
            Already have an account?
            <Link to="/login" className="text-yellow">
              Login
            </Link>
          </p>
        </form>
      </div>
      <div className="w-488px">
        <img
          src={registerImage}
          alt=""
          className="h-[673px] max-lg:h-[250px] object-cover max-lg:w-[490px] max-sm:w-[327px]"
        />
      </div>
    </div>
  );
}

export default Register;
