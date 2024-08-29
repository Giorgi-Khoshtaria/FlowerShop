import { Link } from "react-router-dom";
import user from "/assets/user-solid.svg"; // Ensure the file extension is correct
import cart from "/assets/cart-shopping-solid.svg"; // Ensure the file extension is correct

function Header() {
  return (
    <header className="flex justify-between items-center p-4 w-full">
      <div>
        <Link
          to="/"
          className="text-[32px] font-medium leading-[normal] text-yellow"
        >
          Flower{" "}
          <span className="text-[32px] font-medium leading-[normal] text-black">
            Shop
          </span>
        </Link>
      </div>
      <nav>
        <ul className="flex items-center justify-center gap-6">
          <li>
            <Link
              to="/home"
              className="text-xl not-italic font-normal leading-[normal] hover:text-yellow"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/shop"
              className="text-xl not-italic font-normal leading-[normal] hover:text-yellow"
            >
              Shop
            </Link>
          </li>
          <li>
            <Link
              to="/blog"
              className="text-xl not-italic font-normal leading-[normal] hover:text-yellow"
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-xl not-italic font-normal leading-[normal] hover:text-yellow"
            >
              About
            </Link>
          </li>
        </ul>
      </nav>
      <div className="flex space-x-4">
        <img src={user} alt="User Icon" className="w-6 h-6" />
        <img src={cart} alt="Cart Icon" className="w-6 h-6" />
      </div>
    </header>
  );
}

export default Header;
