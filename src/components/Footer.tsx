import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="flex justify-center items-center p-4 w-full bg-[#454545]">
      <div className="flex justify-between items-top max-w-[1440px] w-full max-lg:grid max-lg:grid-cols-2 max-lg:items-start max-lg:gap-4  max-md:flex max-md:flex-col">
        <div>
          <Link to="/" className="text-[32px] font-medium text-yellow">
            Flower{" "}
            <span className="text-[32px] font-medium text-black">Shop</span>
          </Link>
          <p className="w-[400px] text-justify text-base font-normal text-semiGray max-md:w-[327px]">
            Flowers are nature's vibrant and delicate creations, each one a
            unique expression of beauty. From the bold and striking colors of
            roses to the gentle and soothing petals of daisies, flowers
            captivate our senses with their variety and charm. They symbolize
            love, hope, and renewal, often carrying deep meanings in different
            cultures.
          </p>
        </div>
        <div className="flex flex-col items-center max-md:items-start">
          <h1 className=" text-xl mb-3 text-white">Links</h1>
          <nav>
            <ul className="flex flex-col items-center gap-2 max-md:grid max-md:grid-cols-5 max-md:items-start ">
              <li>
                <Link
                  to="/home"
                  className="text-base font-normal text-semiGray hover:text-yellow"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="text-base font-normal text-semiGray hover:text-yellow"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-base font-normal text-semiGray hover:text-yellow"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-basefont-normal text-semiGray hover:text-yellow"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-base font-normal text-semiGray hover:text-yellow"
                >
                  Login
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex flex-col items-start">
          <h1 className="text-xl mb-3 text-white">Contacts</h1>
          <div className=" flex flex-col items-start gap-5">
            <div className="flex items-top justify-start gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="18"
                viewBox="0 0 13 18"
                fill="none"
              >
                <g clip-path="url(#clip0_40_128)">
                  <path
                    d="M5.69766 17.55C3.93047 15.293 0 9.82266 0 6.75C0 3.02203 2.9101 0 6.5 0C10.0885 0 13 3.02203 13 6.75C13 9.82266 9.03906 15.293 7.30234 17.55C6.88594 18.0879 6.11406 18.0879 5.69766 17.55ZM6.5 9C7.69505 9 8.66667 7.99102 8.66667 6.75C8.66667 5.50898 7.69505 4.5 6.5 4.5C5.30495 4.5 4.33333 5.50898 4.33333 6.75C4.33333 7.99102 5.30495 9 6.5 9Z"
                    fill="#838383"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_40_128">
                    <rect width="13" height="18" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <p className="text-base font-normal text-semiGray hover:text-yellow">
                26985 Brighton Lane, Lake Forest, CA
              </p>
            </div>
            <div className="flex items-top justify-start gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <g clip-path="url(#clip0_40_135)">
                  <path
                    d="M7.30547 0.728783C4.02012 1.37285 1.37461 4.02152 0.731248 7.30652C-0.240471 12.26 3.14472 16.6651 7.73086 17.3296C8.39918 17.4311 9.00246 16.8985 9.00246 16.2225L9.00246 16.1992C9.00246 15.6458 8.60028 15.1839 8.05887 15.1009C5.09344 14.6446 2.81356 12.0729 2.81356 8.97668C2.81356 5.3591 5.92875 2.4552 9.61277 2.81028C12.831 3.12208 15.1886 6.01828 15.1886 9.2509V9.81903C15.1886 10.5956 14.5579 11.227 13.7823 11.227C13.0068 11.227 12.3757 10.5956 12.3757 9.81903V5.59676C12.3757 5.28573 12.124 5.03356 11.8129 5.03356L10.6886 5.03368C10.4319 5.03368 10.2245 5.20918 10.157 5.44431C9.28336 5.01716 8.25012 4.86845 7.13145 5.2648C5.76914 5.7475 4.7366 6.98429 4.53973 8.41621C4.20634 10.8423 6.07992 12.9162 8.43856 12.9162C9.36809 12.9162 10.2115 12.5807 10.8851 12.0415C11.7288 13.1419 13.1783 13.7533 14.7312 13.3595C16.3547 12.9832 17.4375 11.3941 17.4059 9.74531V9.01054C17.4059 3.76523 12.6984 -0.328085 7.30547 0.728783ZM8.40586 10.698C7.47527 10.698 6.71836 9.94007 6.71836 9.00878C6.71836 8.07749 7.47527 7.31952 8.40586 7.31952C9.33644 7.31952 10.0934 8.07749 10.0934 9.00878C10.0934 9.94007 9.36914 10.698 8.40586 10.698Z"
                    fill="#838383"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_40_135">
                    <rect width="18" height="18" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <p className="text-base font-normal text-semiGray hover:text-yellow">
                support@Flowers.com
              </p>
            </div>
            <div className="flex items-top justify-start gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <g clip-path="url(#clip0_40_132)">
                  <path
                    d="M17.9719 13.6054L17.1545 17.1492C17.0397 17.6502 16.5994 18.0007 16.0836 18.0007C7.21406 18 0 10.7859 0 1.91598C0 1.40059 0.350473 0.959728 0.851484 0.845471L4.39523 0.0280878C4.91133 -0.0915138 5.43867 0.176377 5.65313 0.665119L7.28859 4.47957C7.47977 4.92887 7.35082 5.45235 6.97289 5.76102L5.08008 7.28082C6.27469 9.71434 8.25328 11.6929 10.6875 12.8882L12.2372 10.9968C12.5426 10.6179 13.07 10.4867 13.5193 10.6813L17.3338 12.3164C17.7926 12.5578 18.0914 13.0922 17.9719 13.6054Z"
                    fill="#838383"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_40_132">
                    <rect width="18" height="18" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <p className="text-base font-normal text-semiGray hover:text-yellow">
                +1 236 5489w
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
