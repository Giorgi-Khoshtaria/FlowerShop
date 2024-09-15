import React from "react";
import { useCart } from "../../Contexts/CartContext";

interface CartItemDetailsProps {
  flowerImage: string; // URL for the image
  flowerName: string; // Name of the flower
  flowerPrice: number; // Price of the flower (assuming it's a number)
  flowerQuantity: number; // Quantity of the flower in the cart
  flowerId: string; // ID of the flower to uniquely identify the item
}

const CartItemDetails: React.FC<CartItemDetailsProps> = ({
  flowerImage,
  flowerName,
  flowerPrice,
  flowerQuantity,
  flowerId,
}) => {
  const { decreaseQuantity, increaseQuantity, removeFromCart } = useCart();

  return (
    <div className=" max-sm:flex-col flex w-full items-center justify-start gap-[31px]">
      <img
        src={flowerImage}
        alt="flower image"
        className="w-[146px] max-sm:w-full"
      />
      <div className="flex flex-col justify-between w-full gap-[35px]">
        <div className="flex w-full items-center justify-between">
          <p className="text-black text-[22px] not-italic font-normal leading-[normal]">
            {flowerName}
          </p>
          <div>
            <button onClick={() => removeFromCart(flowerId)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="19"
                viewBox="0 0 15 19"
                fill="none"
              >
                <path
                  d="M4.52679 0.656465C4.70759 0.254125 5.07924 0 5.48438 0H9.51562C9.92076 0 10.2924 0.254125 10.4732 0.656465L10.7143 1.1875H13.9286C14.5212 1.1875 15 1.71928 15 2.375C15 3.03072 14.5212 3.5625 13.9286 3.5625H1.07143C0.479799 3.5625 0 3.03072 0 2.375C0 1.71928 0.479799 1.1875 1.07143 1.1875H4.28571L4.52679 0.656465ZM1.04129 4.75H13.9286V16.625C13.9286 17.935 12.9676 19 11.7857 19H3.18415C2.03069 19 1.04129 17.935 1.04129 16.625V4.75ZM3.71987 7.71875V16.0312C3.71987 16.3578 3.99107 16.625 4.25558 16.625C4.58036 16.625 4.79129 16.3578 4.79129 16.0312V7.71875C4.79129 7.39219 4.58036 7.125 4.25558 7.125C3.99107 7.125 3.71987 7.39219 3.71987 7.71875ZM6.93415 7.71875V16.0312C6.93415 16.3578 7.20536 16.625 7.46987 16.625C7.79464 16.625 8.03571 16.3578 8.03571 16.0312V7.71875C8.03571 7.39219 7.79464 7.125 7.46987 7.125C7.20536 7.125 6.93415 7.39219 6.93415 7.71875ZM10.1786 7.71875V16.0312C10.1786 16.3578 10.4196 16.625 10.7143 16.625C11.0089 16.625 11.25 16.3578 11.25 16.0312V7.71875C11.25 7.39219 11.0089 7.125 10.7143 7.125C10.4196 7.125 10.1786 7.39219 10.1786 7.71875Z"
                  fill="#838383"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-darkGray text-[18px] not-italic font-normal leading-[normal]">
              Unit price: ${flowerPrice}/each
            </p>
            <div className="flex w-full items-center px-3 justify-between border border-yellow p-1 rounded-md">
              <button onClick={() => decreaseQuantity(flowerId)}>-</button>
              <p>{flowerQuantity}</p>
              <button onClick={() => increaseQuantity(flowerId)}>+</button>
            </div>
          </div>
          <div>
            <p className="text-black text-sm not-italic font-normal leading-[normal]">
              Total: ${(flowerPrice * flowerQuantity).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemDetails;
