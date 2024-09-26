import axios from "axios";
import React, { useEffect, useState } from "react";
import Flowers from "../../components/SemiComponents/Flowers";
import { RiseLoader } from "react-spinners";

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
  const [searchTerm, setSearchTerm] = useState<string>(""); // State for search input
  const [sortByPrice, setSortByPrice] = useState<"cheap" | "expensive">(
    "cheap"
  ); // State for sorting by price

  useEffect(() => {
    fetchFlowersData();
  }, []);
  const apiUrl = import.meta.env.VITE_API_URL;
  const fetchFlowersData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${apiUrl}/api/flowers/getFlowers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFlowersData(response.data);
    } catch (error) {
      console.error("Error fetching flowers data:", error);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const toggleSortByPrice = () => {
    setSortByPrice((prevSortByPrice) =>
      prevSortByPrice === "cheap" ? "expensive" : "cheap"
    );
  };

  const filteredFlowers = flowersData
    .filter((flower) =>
      flower.flowersName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortByPrice === "cheap") {
        return a.flowersPrice - b.flowersPrice;
      } else {
        return b.flowersPrice - a.flowersPrice;
      }
    });

  return (
    <div className="flex-1 flex items-center justify-center mt-20 p-4">
      <div className="max-w-[1440px] w-full">
        {filteredFlowers.length > 0 ? (
          <div>
            <div className="flex items-center justify-between gap-5 mb-10 bg-white py-[30px] rounded-md px-[18px] max-lg:flex-col">
              <div className="flex items-center justify-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="20"
                  viewBox="0 0 22 20"
                  fill="none"
                >
                  <path
                    d="M0.165558 1.3577C0.449883 0.757422 1.05445 0.375 1.71875 0.375H20.2812C20.9473 0.375 21.5488 0.757422 21.8324 1.3577C22.1203 1.95797 22.0301 2.66824 21.5746 3.18215L13.75 12.7887V18.25C13.75 18.7699 13.4578 19.2469 12.9895 19.4789C12.5254 19.7109 11.9668 19.6637 11.55 19.35L8.8 17.2875C8.45195 17.0297 8.25 16.6215 8.25 16.1875V12.7887L0.388523 3.18215C-0.0320119 2.66824 -0.118809 1.95797 0.165601 1.3577H0.165558Z"
                    fill="#FF8F52"
                  />
                </svg>
                <p>Filtering</p>
              </div>

              {/* Search Input */}
              <div className="flex items-center justify-center gap-2 relative">
                <input
                  type="search"
                  name=""
                  id=""
                  value={searchTerm}
                  onChange={handleSearch}
                  className="  py-[15px] pl-[29px] w-[491px] text-darkGray text-[18px] border border-semiGray rounded-md focus:outline-none placeholder:text-darkGray placeholder:text-[18px] max-md:w-[310px]"
                  placeholder="Search...."
                />
                <div className="absolute right-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23"
                    height="23"
                    viewBox="0 0 23 23"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_40_231)">
                      <path
                        d="M22.4746 19.9319L17.0975 14.5547C18.3202 12.7394 18.9235 10.4713 18.6005 8.05454C18.0498 3.94374 14.6807 0.598405 10.5658 0.077446C4.44791 -0.696693 -0.696546 4.44776 0.0776375 10.5657C0.598731 14.6823 3.94451 18.0541 8.05576 18.6022C10.4726 18.9251 12.7411 18.3221 14.556 17.0991L19.9331 22.4763C20.6348 23.1779 21.7727 23.1779 22.4743 22.4763C23.1754 21.7737 23.1754 20.6327 22.4746 19.9319ZM3.55351 9.34379C3.55351 6.17321 6.13293 3.5938 9.30351 3.5938C12.4741 3.5938 15.0535 6.17321 15.0535 9.34379C15.0535 12.5144 12.4741 15.0938 9.30351 15.0938C6.13293 15.0938 3.55351 12.5153 3.55351 9.34379Z"
                        fill="#838383"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_40_231">
                        <rect width="23" height="23" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>

              {/* Sort by Price */}
              <div
                className="flex items-center justify-center gap-2 cursor-pointer"
                onClick={toggleSortByPrice}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="22"
                  viewBox="0 0 25 22"
                  fill="none"
                >
                  <g clipPath="url(#clip0_40_225)">
                    <path
                      d="M13.78 9.625H17.914C18.6749 9.625 19.292 9.00926 19.292 8.25C19.292 7.49074 18.6749 6.875 17.914 6.875H13.8187C13.0578 6.875 12.4407 7.49074 12.4407 8.25C12.4407 9.00926 13.0178 9.625 13.78 9.625ZM13.78 15.125H20.67C21.4309 15.125 22.0479 14.5093 22.0479 13.75C22.0479 12.9907 21.4309 12.375 20.67 12.375H13.8187C13.0578 12.375 12.4407 12.9907 12.4407 13.75C12.4407 14.5093 13.0178 15.125 13.78 15.125ZM13.78 4.125H15.158C15.9189 4.125 16.4972 3.50926 16.4972 2.75C16.4972 1.99074 15.8801 1.375 15.158 1.375H13.78C13.0191 1.375 12.402 1.99074 12.402 2.75C12.402 3.50926 13.0191 4.125 13.78 4.125ZM7.36978 16.5067L9.25418 18.3875C9.57178 18.7063 10.0786 18.7063 10.3962 18.3875L12.2806 16.5067C12.8551 15.9316 12.4568 14.9875 11.6593 14.9875H10.561V3.40625C10.561 2.64805 9.95007 2.03125 9.19256 2.03125C8.43504 2.03125 7.8241 2.64805 7.8241 3.40625V14.9875H6.72556C5.93094 14.9875 5.53046 15.9316 6.10503 16.5067H7.36978Z"
                      fill="#FF8F52"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_40_225">
                      <rect width="24.0794" height="21.5" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <p>
                  Sort by{" "}
                  {sortByPrice === "cheap" ? "Cheapest" : "Most Expensive"}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between gap-6 flex-wrap max-lg:justify-center">
              {filteredFlowers.map((flower) => (
                <div key={flower._id}>
                  <Flowers
                    img={flower.flowersPhoto}
                    name={flower.flowersName}
                    price={flower.flowersPrice.toString()}
                    flowerId={flower._id}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center ">
            <RiseLoader
              color="#FF8F52"
              margin={0}
              size={15}
              speedMultiplier={1}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ShopPage;
