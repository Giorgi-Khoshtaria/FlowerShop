import hero1 from "/assets/hero1.png";
import hero2 from "/assets/hero2.png";
import hero3 from "/assets/hero3.png";
import hero4 from "/assets/hero4.png";
import hero5 from "/assets/hero5.png";
import hero6 from "/assets/hero6.png";
import { Link } from "react-router-dom";
function HomePageHero() {
  return (
    <div className="flex items-center justify-between w-full max-md:flex-col max-md:items-start ">
      <div className="max-md:text-start">
        <p className="max-sm:w-[327px] w-[450px] text-semiBlack text-6xl not-italic font-normal leading-[normal]">
          Flowers, 🌻 what the world needs{" "}
        </p>
        <p className="mt-9 mb-10 text-xl not-italic font-normal leading-[normal] text-darkGray">
          Browse between hounders of flowers
        </p>
        <Link
          to="/shop"
          className=" bg-yellow text-white rounded-[5px] py-[10px] px-[22px] text-lg not-italic font-normal leading-[normal]"
        >
          Browse
        </Link>
      </div>
      <div className=" grid grid-cols-3 gap-[20px] max-lg:grid-cols-2 max-md:flex max-md:items-center max-md:justify-between max-md:flex-wrap max-md:mt-7 max-[440px]:justify-center">
        <img
          src={hero1}
          alt="hero1"
          className="w-48 h-48 object-cover max-[440px]:w-80"
        />
        <img
          src={hero2}
          alt="hero2"
          className="w-48 h-48 object-cover max-[440px]:w-80"
        />
        <img
          src={hero3}
          alt="hero3"
          className="w-48 h-48 object-cover max-[440px]:w-80"
        />
        <img
          src={hero4}
          alt="hero4"
          className="w-48 h-48 object-cover max-[440px]:w-80"
        />
        <img
          src={hero5}
          alt="hero5"
          className="w-48 h-48 object-cover max-[440px]:w-80"
        />
        <img
          src={hero6}
          alt="hero6"
          className="w-48 h-48 object-cover max-[440px]:w-80"
        />
      </div>
    </div>
  );
}

export default HomePageHero;
