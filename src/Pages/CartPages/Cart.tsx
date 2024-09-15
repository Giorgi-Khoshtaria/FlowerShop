import React from "react";
import { useCart } from "../../Contexts/CartContext";
import { useAuth } from "../../Contexts/AuthContext";
import CartItemDetails from "../../components/Cartcomponents/CartItemDetails";
import axios from "axios";

function Cart() {
  const { cartItems, clearCart } = useCart();
  const { userData } = useAuth();
  const userId = userData?.user.id;
  console.log(cartItems, "cart");
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const fetchCheckout = async () => {
    const checkoutData = {
      cartItems: cartItems.map((item) => ({
        flowerId: item.id,
        flowerImage: item.mainImage,
        flowerName: item.name,
        flowerPrice: item.price,
        flowerQuantity: item.quantity,
      })),
      userId: userId,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:3005/api/checkout/addcheckout`,
        checkoutData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Show an alert if checkout was successful
      if (response.status === 201) {
        alert("Checkout successful! Your order has been placed.");
        clearCart();
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("There was an error during checkout. Please try again.");
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center mt-20 p-4">
      <div className="max-w-[1440px] w-full flex gap-4 items-baseline justify-between max-[900px]:flex-col">
        {cartItems.length > 0 ? (
          <div className="w-full pt-[33px] px-[41px] pb-[46px] bg-white">
            <h1 className="text-black text-[22px] not-italic font-normal leading-[normal] pb-12">
              Cart
            </h1>
            <div className="flex flex-col gap-7 w-full">
              {cartItems.map((item) => (
                <div key={item.id}>
                  <CartItemDetails
                    flowerImage={item.mainImage}
                    flowerName={item.name}
                    flowerPrice={item.price}
                    flowerQuantity={item.quantity}
                    flowerId={item.id}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>There are no items in the cart.</p>
        )}

        {cartItems.length > 0 && (
          <div className="w-[384px] max-sm:w-full pt-[33px] pr-4 pb-5 pl-4 bg-white">
            <p className="text-black text-xl not-italic font-normal leading-[normal]">
              Subtotal for {cartItems.length} items:{" "}
              <span className="font-bold">{total}$</span>
            </p>
            <button
              onClick={fetchCheckout}
              className="mt-[21px] w-full py-[10px] text-lg not-italic font-normal leading-[normal] text-white rounded-md bg-yellow"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
