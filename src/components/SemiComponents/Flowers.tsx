import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../Contexts/CartContext";
import toast, { Toaster } from "react-hot-toast";

interface FlowersProps {
  img: string;
  name: string;
  price: string;
  flowerId: string;
}

const Flowers: React.FC<FlowersProps> = ({ img, name, price, flowerId }) => {
  const { addToCart, cartItems } = useCart();

  // Create the cart item object
  const cartItem = {
    id: flowerId,
    name: name,
    mainImage: img,
    price: price,
    quantity: 1, // default quantity to 1 when added to the cart
  };

  const handleOrder = () => {
    // Check if the item is already in the cart
    const itemExists = cartItems.some((item) => item.id === flowerId);

    if (!itemExists) {
      addToCart(cartItem);

      // alert("Item successfully added to cart");
      toast.success("Item successfully added to cart.");
    } else {
      // If the item is already in the cart, show an alert
      toast.error("This item is already in your cart.");
    }
  };

  return (
    <div className="bg-white p-4 rounded-[5px] w-[287px]">
      <Toaster position="top-right" reverseOrder={false} />
      <Link to={`/flowersDetails/${flowerId}`}>
        <img src={img} alt="flowers image" className=" w-[251px] h-[251px]" />
        <p className="text-[22px] not-italic font-normal leading-[normal] text-black mt-[9px] mb-[39px]">
          {name}
        </p>
      </Link>

      <div className="flex items-center justify-between">
        <p className="text-lg not-italic font-normal leading-[normal] text-darkGray">
          {price}$
        </p>
        <button
          onClick={handleOrder}
          className="flex items-center justify-center text-lg not-italic font-normal leading-[normal]  text-yellow"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="19"
            viewBox="0 0 21 19"
            fill="none"
          >
            <path
              d="M3.46832 0C3.88379 0 4.24146 0.30167 4.32095 0.71863C4.35185 0.980983 4.57421 1.17869 4.83838 1.17869H19.5743C20.3077 1.17869 20.893 1.92457 20.6871 2.67635L18.7361 9.74994C18.5952 10.2583 18.14 10.6082 17.6234 10.6082H7.23279C6.6791 10.6082 6.2617 11.1114 6.364 11.6555C6.44256 12.0734 6.80755 12.3762 7.23279 12.3762H17.6306C18.1111 12.3762 18.4977 12.7703 18.4977 13.2602C18.4977 13.7501 18.1111 14.1442 17.6306 14.1442H5.74801C5.36505 14.1442 5.00738 13.8422 4.9279 13.426L3.09661 3.61975C2.89614 2.54625 1.95913 1.76803 0.867079 1.76803C0.388379 1.76803 0 1.37206 0 0.884015C0 0.395965 0.388379 0 0.867079 0H3.46832ZM4.62442 17.091C4.62442 16.1148 5.40118 15.3229 6.35858 15.3229C7.31598 15.3229 8.09274 16.1148 8.09274 17.091C8.09274 18.067 7.31598 18.859 6.35858 18.859C5.40118 18.859 4.62442 18.067 4.62442 17.091ZM18.4977 17.091C18.4977 18.067 17.7209 18.859 16.7635 18.859C15.8061 18.859 15.0294 18.067 15.0294 17.091C15.0294 16.1148 15.8061 15.3229 16.7635 15.3229C17.7209 15.3229 18.4977 16.1148 18.4977 17.091Z"
              fill="#FF8F52"
            />
          </svg>
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Flowers;
