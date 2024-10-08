import { Link, useLocation } from "react-router-dom";
import user from "/assets/user-solid.svg";
import cart from "/assets/cart-shopping-solid.svg";
import { useState, useEffect } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Header() {
  const [show, setShow] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const location = useLocation();
  const { isAuthenticated, logout, userData } = useAuth();
  const userId = userData?.user?.id;
  // console.log(userData);
  const navigate = useNavigate();

  const showModal = () => {
    setShow(!show);
  };

  const showUserModal = () => {
    setShowUser(!showUser);
  };

  useEffect(() => {
    setShowUser(false);
  }, [location]);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (isAuthenticated && userId) {
      // Fetch the user profile data using Axios
      const fetchUserProfile = async () => {
        try {
          const response = await axios.get(
            `${apiUrl}/api/user/getUserProfile/${userId}`,
            {
              params: {
                userId,
              },
            }
          ); // Replace with your API endpoint
          if (response.data.profilePicture) {
            setProfileImage(response.data.profilePicture);
          } else {
            setProfileImage(null); // Ensure no image is set if none exists
          } // Assuming the profile image URL is in this field
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
        }
      };

      fetchUserProfile();
    }
  }, [isAuthenticated, userData, userId]);
  // console.log(profileImage, "profileimage");
  const handleLogout = () => {
    setProfileImage(null);
    logout();
    navigate("/home");
  };
  return (
    <header className="relative flex justify-center items-center p-4 w-full bg-white">
      <div className="flex justify-between items-center max-w-[1440px] w-full">
        <div>
          <Link to="/" className="text-[32px] font-medium text-yellow">
            Flower{" "}
            <span className="text-[32px] font-medium text-black">Shop</span>
          </Link>
        </div>
        <nav className="hidden md:flex">
          <ul className="flex items-center gap-6">
            <li>
              <Link
                to="/home"
                className="text-xl font-normal hover:text-yellow"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/shop"
                className="text-xl font-normal hover:text-yellow"
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className="text-xl font-normal hover:text-yellow"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-xl font-normal hover:text-yellow"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-xl font-normal hover:text-yellow"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>
        <div className="relative flex items-center gap-4">
          <div>
            {profileImage ? (
              <img
                src={profileImage}
                alt="User Icon"
                className="w-10 h-10 cursor-pointer object-cover rounded-full"
                onClick={showUserModal}
              />
            ) : (
              <img
                src={user}
                alt="User Icon"
                className="w-7 h-7 cursor-pointer  "
                onClick={showUserModal}
              />
            )}
          </div>
          <Link to={`/cart`}>
            <img src={cart} alt="Cart Icon" className="w-7 h-7" />
          </Link>

          <div className="md:hidden" onClick={showModal}>
            <svg
              className="w-7 h-7 cursor-pointer"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 18H10"
                stroke="#FF8F52"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M4 12L16 12"
                stroke="#FF8F52"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M4 6L20 6"
                stroke="#FF8F52"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* User Dropdown */}
          {showUser && (
            <div className="absolute text-center w-[200px] top-[70px] right-0 p-4 bg-yellow z-20">
              {isAuthenticated ? (
                <ul>
                  <li>
                    <Link
                      to="/profile"
                      className="text-white text-lg font-semibold "
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/addblogs"
                      className="text-white text-lg font-semibold "
                    >
                      Add Blogs
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/myblogs"
                      className="text-white text-lg font-semibold "
                    >
                      My Blogs
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/myorders"
                      className="text-white text-lg font-semibold "
                    >
                      My Orders
                    </Link>
                  </li>
                  {userData?.user.role === "admin" ? (
                    <div>
                      {" "}
                      <li>
                        <Link
                          to="/addflowers"
                          className="text-white text-lg font-semibold "
                        >
                          Add Flowers
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/dashboard"
                          className="text-white text-lg font-semibold "
                        >
                          Dashboard
                        </Link>
                      </li>
                    </div>
                  ) : (
                    ""
                  )}

                  <li>
                    <button
                      onClick={handleLogout}
                      className="text-white text-lg font-semibold "
                    >
                      Log Out
                    </button>
                  </li>
                </ul>
              ) : (
                <div>
                  <p className="text-sm font-medium pb-2 border-b border-white">
                    Returning Customer?
                  </p>
                  <div className="py-1 mt-2 bg-red-200 rounded-lg">
                    <Link to="/login" className="text-sm font-medium mt-3">
                      Sign In
                    </Link>
                  </div>
                  <p className="text-sm font-medium pt-2 border-t mt-2 border-white">
                    Don't have an account?
                  </p>
                  <div className="py-1 mt-2 bg-red-200 rounded-lg">
                    <Link to="/register" className="text-sm font-medium mt-3">
                      Register
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {show && (
        <div>
          {/* Overlay */}
          <div
            className="fixed inset-x-0 top-[70px] bottom-0 bg-black bg-opacity-20 z-10"
            onClick={showModal}
          ></div>

          {/* Menu */}
          <div className="absolute top-[70px] left-0 bg-yellow w-full z-20">
            <ul className="flex flex-col items-center gap-2 py-5">
              <li>
                <Link
                  to="/home"
                  className="text-xl font-normal hover:text-white"
                  onClick={showModal}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="text-xl font-normal hover:text-white"
                  onClick={showModal}
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-xl font-normal hover:text-white"
                  onClick={showModal}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-xl font-normal hover:text-white"
                  onClick={showModal}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-xl font-normal hover:text-yellow"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
