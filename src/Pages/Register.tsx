import { Link } from "react-router-dom";
import houseimg from "/assets/house.svg";
import registerImage from "/assets/register.png";

function Register() {
  return (
    <div className=" px-[20px] min-h-screen flex items-center justify-center max-lg:flex-col-reverse">
      <div className=" pt-[30px] pr-[49px] pb-[43px] pl-[48px] bg-white w-[488px] max-sm:w-[327px]">
        <div className=" flex items-baseline justify-between mb-[57px] max-sm:flex-col-reverse max-sm:gap-2">
          <div>
            <h1 className="text-black text-[32px] not-italic font-normal leading-[normal] mb-[13px]">
              Register
            </h1>
            <p className="text-darkGray text-[18px]  font-normal leading-[normal]">
              Register and help us help you
            </p>
          </div>
          <div className="flex items-center justify-center">
            <img src={houseimg} alt="" />
            <Link
              to="/home"
              className="text-black text-[18px]  font-normal leading-[normal]"
            >
              Back to home
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-start gap-[14px] w-full">
          <input
            type="email"
            placeholder="email"
            className="w-full focus:outline-0 border border-semiGray py-[21px] pl-[29px] rounded-[5px]"
          />
          <input
            type="text"
            placeholder="Username"
            className="w-full focus:outline-0 border border-semiGray py-[21px] pl-[29px] rounded-[5px]"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full focus:outline-0 border border-semiGray py-[21px] pl-[29px] rounded-[5px]"
          />
        </div>{" "}
        <p className="mt-[45px] mb-[12px] text-darkGray text-base not-italic font-normal leading-[25px]">
          with registering your accepting our{" "}
          <span className="text-yellow">terms</span> and
          <span className="text-yellow">privacy policy</span>
        </p>
        <div className="w-full">
          <button className="w-full pt-[19px] pb-[15px] bg-yellow rounded-[5px]   text-white text-xl not-italic font-normal leading-[normal]">
            Register
          </button>
        </div>
        <p className=" mt-[50px] flex items-center justify-center text-xl not-italic font-normal leading-[normal] text-darkGray max-sm:flex-col ">
          Already have an account?
          <Link to="/login" className="text-yellow">
            Login
          </Link>
        </p>
      </div>
      <div className="w-488px">
        <img
          src={registerImage}
          alt=""
          className="h-[673px]  max-lg:h-[250px] object-cover max-lg:w-[490px] max-sm:w-[327px]"
        />
      </div>
    </div>
  );
}

export default Register;
