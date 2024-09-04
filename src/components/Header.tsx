import { Link, useLocation } from "react-router-dom";
import user from "/assets/user-solid.svg";
import cart from "/assets/cart-shopping-solid.svg";
import { useState, useEffect } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Header() {
  const [show, setShow] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout, userData } = useAuth();
  console.log(userData);
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
  const handleLogout = () => {
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
                About
              </Link>
            </li>
          </ul>
        </nav>
        <div className="relative flex items-center gap-4">
          <img
            src={user}
            alt="User Icon"
            className="w-7 h-7 cursor-pointer"
            onClick={showUserModal}
          />
          <img src={cart} alt="Cart Icon" className="w-7 h-7" />
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
                      {" "}
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
                  {userData?.user.role === "admin" ? (
                    <li>
                      <Link
                        to="/addflowers"
                        className="text-white text-lg font-semibold "
                      >
                        Add Flowers
                      </Link>
                    </li>
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
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
