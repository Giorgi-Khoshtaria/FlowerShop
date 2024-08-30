import houseimg from "/assets/house.svg";
import { Link } from "react-router-dom";

function ForgotPassword() {
  return (
    <div className=" px-[20px] min-h-screen flex items-center justify-center max-lg:flex-col-reverse">
      <div className=" pt-[33px] pr-[49px] pb-[67px] pl-[48px] bg-white w-[488px] max-sm:w-[327px]">
        <div className=" flex items-baseline flex-col mb-[40px]  max-sm:gap-2">
          <div className="flex items-center justify-center mb-3">
            <img src={houseimg} alt="" />
            <Link
              to="/home"
              className="text-black text-[18px]  font-normal leading-[normal]"
            >
              Back to home
            </Link>
          </div>
          <h1 className="text-black text-[32px] not-italic font-normal leading-[normal] mb-[13px]">
            Forgot Password
          </h1>
        </div>
        <div className="flex flex-col items-start gap-[14px] w-full">
          <input
            type="text"
            placeholder="Username"
            className="w-full focus:outline-0 border border-semiGray py-[21px] pl-[29px] rounded-[5px]"
          />
          <input
            type="password"
            placeholder="New Password"
            className="w-full focus:outline-0 border border-semiGray py-[21px] pl-[29px] rounded-[5px]"
          />
          <input
            type="password"
            placeholder="Repeat Password"
            className="w-full focus:outline-0 border border-semiGray py-[21px] pl-[29px] rounded-[5px]"
          />
        </div>{" "}
        <div className="w-full mb-10">
          <button className="w-full pt-[19px] pb-[15px] bg-yellow rounded-[5px] mt-[45px]  text-white text-xl not-italic font-normal leading-[normal]">
            Change Password
          </button>
        </div>
        <p className="flex items-center justify-center text-xl not-italic font-normal leading-[normal] text-darkGray max-sm:flex-col ">
          dont have an account?{" "}
          <Link to="/register" className="text-yellow">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
