import axios from "axios";
import React, { useEffect, useState } from "react";
import Flowers from "../../components/SemiComponents/Flowers";

interface Flowers {
  _id: string;
  flowersName: string;
  flowersDescription: string;
  flowersPrice: number;
  flowersRating: string;
  flowersPhoto: string;
}
function ShopPage() {
  const [flowersData, setFlowersData] = useState<Flowers[]>([]);

  useEffect(() => {
    fetchFlowersData();
  }, []);

  const fetchFlowersData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3005/api/flowers/getFlowers`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFlowersData(response.data);
    } catch (error) {
      console.error("Error fetching flowers data:", error);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center mt-20 p-4">
      <div className="max-w-[1440px] w-full">
        <div></div>
        <div className="flex items-center justify-between gap-6 flex-wrap">
          {flowersData.length > 0
            ? flowersData.map((flower) => (
                <div key={flower._id}>
                  <Flowers
                    img={flower.flowersPhoto}
                    name={flower.flowersName}
                    price={flower.flowersPrice}
                  />
                </div>
              ))
            : "No Flowers Found"}
        </div>
      </div>
    </div>
  );
}

export default ShopPage;
