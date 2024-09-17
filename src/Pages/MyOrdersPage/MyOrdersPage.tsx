import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import dayjs from "dayjs";

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
  const { userData } = useAuth() as AuthContextType;
  const userId = userData?.user.id;

  useEffect(() => {
    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get<Order[]>(
        `http://localhost:3005/api/checkout/getOrdersByUserId/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrderData(response.data);
    } catch (error) {
      console.error("Error fetching orders data:", error);
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
        {orderData.length > 0 ? (
          <div>
            <h1 className="text-2xl font-bold mb-4">My Orders</h1>
            {Object.keys(groupedOrders).map((date, index) => (
              <div key={date} className="mb-8">
                <h2 className="text-xl font-semibold">Order #{index + 1}</h2>
                <h2 className="text-xl font-semibold">Order Date: {date}</h2>
                <div className="border p-4 rounded-md w-full flex items-center flex-col gap-4 ">
                  {groupedOrders[date].map((order) => (
                    <div
                      key={order._id}
                      className="w-full flex items-center justify-between gap-4 max-sm:flex-col-reverse max-sm:items-start"
                    >
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
                  ))}
                  <p className="font-bold">
                    Total Price of Order: $
                    {calculateTotalPrice(groupedOrders[date]).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p> you have no Order</p>
        )}
      </div>
    </div>
  );
};

export default MyOrdersPage;
