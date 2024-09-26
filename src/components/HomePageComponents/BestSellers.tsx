import { useEffect, useState } from "react";
import Flowers from "../SemiComponents/Flowers";
import axios from "axios";
import { RiseLoader } from "react-spinners";

interface Flowers {
  _id: string;
  flowersName: string;
  flowersDescription: string;
  flowersPrice: string;
  flowersRating: string;
  flowersPhoto: string;
}

function BestSellers() {
  const [flowerdata, setFlowersData] = useState<Flowers[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    fetchFlowersData();
  }, []);
  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchFlowersData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/flowers/getFlowers`);
      setFlowersData(response.data);
      setLoading(false); // Stop loading once data is fetched
    } catch (error) {
      console.error("Error fetching flowers data:", error);
      setLoading(false); // Stop loading in case of error
    }
  };

  // Filter for specific flower names
  const bestSellers = flowerdata.filter((flower) =>
    ["Rose", "Hellebore", "Gloriosa Lily", "Tulip"].includes(flower.flowersName)
  );

  return (
    <div className="mt-[116px] w-full">
      <div className="flex items-center justify-center gap-[19px] max-sm:gap-3">
        <div className="h-[2px] w-[165px] bg-semiGray max-sm:w-10"></div>
        <h2 className="text-black text-[32px] not-italic font-normal leading-[normal]">
          Best Sellers
        </h2>
        <div className="h-[2px] w-[165px] bg-semiGray max-sm:w-10"></div>
      </div>

      {/* Show loader while data is being fetched */}
      {loading ? (
        <div className="flex justify-center items-center mt-[33px]">
          <div className="loader">
            <RiseLoader
              color="#FF8F52"
              margin={0}
              size={15}
              speedMultiplier={1}
            />
          </div>{" "}
          {/* Replace this with your loader */}
        </div>
      ) : (
        <div className="flex items-center justify-between flex-wrap mt-[33px] gap-5 max-xl:justify-center">
          {bestSellers.map((flower) => (
            <Flowers
              key={flower._id}
              img={flower.flowersPhoto}
              name={flower.flowersName}
              price={flower.flowersPrice}
              flowerId={flower._id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default BestSellers;
