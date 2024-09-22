import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Flowers {
  _id: string;
  flowersName: string;
  flowersDescription: string;
  flowersPrice: number;
  flowersRating: string;
  flowersPhoto: string;
}

function FlowersAdmin() {
  const [flowersData, setFlowersData] = useState<Flowers[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(""); // State for search input
  const [sortByPrice, setSortByPrice] = useState<"cheap" | "expensive">(
    "cheap"
  ); // State for sorting by price

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

  const deleteFlowers = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:3005/api/flowers/deleteFlowers/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        alert("flower deleted successfully");
        fetchFlowersData();
      }
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
        <Link to={`/dashboard`} className="text-yellow">
          Go Back
        </Link>

        {/* Search and Sort Section */}
        <div className="mt-10 flex items-center justify-between w-full gap-4 border-b border-black pb-4 max-md:flex-col max-md:items-start">
          <div className="flex items-center gap-3">
            <label htmlFor="search">Search Flowers</label>
            <input
              type="search"
              id="search"
              value={searchTerm}
              onChange={handleSearch}
              className="py-2 px-2 rounded-md border bg-semiGray border-black focus:outline-none"
            />
          </div>
          <button
            onClick={toggleSortByPrice}
            className="text-yellow hover:underline"
          >
            Sort By {sortByPrice === "cheap" ? "Lowest Price" : "Highest Price"}
          </button>
        </div>

        {/* Responsive Table for Flowers */}
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 text-left">Flower Image</th>
                <th className="py-2 px-4 text-left">Flower Name</th>
                <th className="py-2 px-4 text-left">Description</th>
                <th className="py-2 px-4 text-left">Price</th>
                <th className="py-2 px-4 text-left">Rating</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFlowers.length > 0 ? (
                filteredFlowers.map((flower) => (
                  <tr key={flower._id} className="border-b border-gray-300">
                    <td className="py-2 px-4">
                      <img
                        src={flower.flowersPhoto}
                        alt={flower.flowersName}
                        className="w-16 h-16 object-cover rounded-full"
                      />
                    </td>
                    <td className="py-2 px-4">{flower.flowersName}</td>
                    <td className="py-2 px-4 max-w-[200px] overflow-hidden text-ellipsis">
                      {flower.flowersDescription}
                    </td>
                    <td className="py-2 px-4">${flower.flowersPrice}</td>
                    <td className="py-2 px-4">{flower.flowersRating}</td>
                    <td className="py-2 px-4">
                      <Link
                        to={`/editFlower/${flower._id}`}
                        className="mr-2 text-blue-500 hover:underline"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteFlowers(flower._id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-2 px-4 text-center">
                    No flowers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default FlowersAdmin;
