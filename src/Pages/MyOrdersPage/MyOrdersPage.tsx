import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import dayjs from "dayjs";
import { RiseLoader } from "react-spinners"; // Import the loader

// Define the types for order items and user data
interface Order {
  _id: string;
  flowerName: string;
  flowerQuantity: number;
  flowerPrice: number;
  createdAt: string;
  flowerImage: string;
}

interface UserData {
  user: {
    id: string;
  };
}

interface AuthContextType {
  userData: UserData | null;
}

const MyOrdersPage: React.FC = () => {
  const [orderData, setOrderData] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const { userData } = useAuth() as AuthContextType;
  const userId = userData?.user.id;

  useEffect(() => {
    if (userId) {
      fetchOrders();
    }
  }, [userId]);
  const apiUrl = import.meta.env.VITE_API_URL;
  const fetchOrders = async () => {
    try {
      setLoading(true); // Set loading to true before the API call
      const token = localStorage.getItem("token");
      const response = await axios.get<Order[]>(
        `${apiUrl}/api/checkout/getOrdersByUserId/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrderData(response.data);
    } catch (error) {
      console.error("Error fetching orders data:", error);
    } finally {
      setLoading(false); // Set loading to false after the API call
    }
  };

  const delateOrder = async (orderId: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete<Order[]>(
        `${apiUrl}/api/checkout/detaleOrder/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchOrders();
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const groupOrdersByCreatedAt = (orders: Order[]) => {
    return orders.reduce<Record<string, Order[]>>((acc, order) => {
      const orderDate = dayjs(order.createdAt).format("YYYY-MM-DD HH:mm:ss");

      if (!acc[orderDate]) {
        acc[orderDate] = [];
      }
      acc[orderDate].push(order);
      return acc;
    }, {});
  };

  // Function to calculate total price for a group of orders
  const calculateTotalPrice = (orders: Order[]) => {
    return orders.reduce(
      (total, order) => total + order.flowerPrice * order.flowerQuantity,
      0
    );
  };

  const groupedOrders = groupOrdersByCreatedAt(orderData);

  return (
    <div className="flex-1 flex items-start justify-center mt-20 p-4">
      <div className="max-w-[1440px] w-full">
        {loading ? ( // Display loader when loading
          <div className="flex justify-center items-center  h-40">
            <RiseLoader color="#FF8F52" size={15} />
          </div>
        ) : (
          <>
            {orderData.length > 0 ? (
              <div>
                <h1 className="text-2xl font-bold mb-4">My Orders</h1>
                {Object.keys(groupedOrders).map((date, index) => (
                  <div key={date} className="mb-8">
                    <h2 className="text-xl font-semibold">
                      Order #{index + 1}
                    </h2>
                    <h2 className="text-xl font-semibold">
                      Order Date: {date}
                    </h2>
                    <div className="border p-4 rounded-md w-full flex items-center flex-col gap-4">
                      {groupedOrders[date].map((order) => (
                        <div key={order._id} className="w-full">
                          <div className="flex items-center justify-center">
                            <p
                              onClick={() => delateOrder(order._id)}
                              className="font-bold hover:text-yellow"
                            >
                              Delate Order
                            </p>
                          </div>
                          <div className="w-full flex items-center justify-between gap-4 max-sm:flex-col-reverse max-sm:items-start">
                            <div className="mb-2">
                              <p>Order ID: {order._id}</p>
                              <p>Item Name: {order.flowerName}</p>
                              <p>Quantity: {order.flowerQuantity}</p>
                              <p>Price: ${order.flowerPrice}</p>
                            </div>
                            <div>
                              <img
                                src={order.flowerImage}
                                alt="flowerImage"
                                className="w-40"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      <p className="font-bold hover:text-yellow">
                        Total Price of Order: $
                        {calculateTotalPrice(groupedOrders[date]).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>You have no orders</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyOrdersPage;
