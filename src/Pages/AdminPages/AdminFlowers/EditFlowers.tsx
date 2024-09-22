import axios from "axios";
import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
// import "../../components/Css/profile.css"; // Assuming this contains common styles if needed

function EditFlowers() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [flowerDetails, setFlowerDetails] = useState({
    flowersPhoto: "",
    flowersName: "",
    flowersDescription: "",
    flowersPrice: "",
    flowersRating: "",
  });
  const [base64Image, setBase64Image] = useState<string | null>(null);

  useEffect(() => {
    fetchFlowersDetails();
  }, [id]);

  const fetchFlowersDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3005/api/flowers/getFlowersById/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFlowerDetails(response.data);
      setBase64Image(response.data.flowersPhoto);
    } catch (error) {
      console.error("Error fetching flowers data:", error);
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFlowerDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Image(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = async () => {
    const updatedFlower = {
      flowersName: flowerDetails.flowersName,
      flowersDescription: flowerDetails.flowersDescription,
      flowersPhoto: base64Image || "",
      flowersPrice: flowerDetails.flowersPrice,
      flowersRating: flowerDetails.flowersRating,
    };

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3005/api/flowers/updateFlower/${id}`,
        updatedFlower,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Flower details updated successfully!");
      navigate("/flowersAdmin");
    } catch (error) {
      console.error("Error updating flower details:", error);
    }
  };

  return (
    <div className="flex-1 w-full flex flex-col items-center justify-center p-4 mx-auto mt-10">
      <div className="max-w-[1440px] w-full flex flex-col items-start bg-white p-6 rounded-lg shadow-md">
        <Link to={`/flowersAdmin`} className="text-yellow ">
          Go Back
        </Link>
        <h1 className="text-3xl font-semibold text-yellow-600 mb-6 mt-6">
          Edit Flower
        </h1>

        {/* Flower Image Upload */}
        <div className="flex items-center justify-between w-full mb-6">
          <div>
            <label className="block text-lg font-medium text-yellow mb-2">
              Upload Flower Image
            </label>
            <input
              type="file"
              className="block w-full text-sm text-yellow file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-yellow file:text-white hover:file:bg-yellow-100"
              onChange={handleFileChange}
            />
          </div>
          <div>
            {base64Image ? (
              <img
                src={base64Image}
                alt="Flower Preview"
                className="w-24 h-24 object-cover rounded-full"
              />
            ) : (
              "Upload image"
            )}
          </div>
        </div>

        {/* Flower Information */}
        <div className="grid grid-cols-1 gap-6 w-full mb-6">
          <div>
            <label
              htmlFor="flowersName"
              className="text-lg font-medium text-yellow mb-2"
            >
              Flower Name
            </label>
            <input
              type="text"
              id="flowersName"
              name="flowersName"
              value={flowerDetails.flowersName}
              onChange={handleInputChange}
              className="focus:outline-none w-full border border-darkGray p-3 rounded-lg text-yellow"
            />
          </div>

          <div>
            <label
              htmlFor="flowersDescription"
              className="text-lg font-medium text-yellow mb-2"
            >
              Description
            </label>
            <textarea
              id="flowersDescription"
              name="flowersDescription"
              value={flowerDetails.flowersDescription}
              onChange={handleInputChange}
              className="focus:outline-none w-full border border-darkGray p-3 rounded-lg text-yellow"
            />
          </div>

          <div>
            <label
              htmlFor="flowersPrice"
              className="text-lg font-medium text-yellow mb-2"
            >
              Price
            </label>
            <input
              type="number"
              id="flowersPrice"
              name="flowersPrice"
              value={flowerDetails.flowersPrice}
              onChange={handleInputChange}
              className="focus:outline-none w-full border border-darkGray p-3 rounded-lg text-yellow"
            />
          </div>

          <div>
            <label
              htmlFor="flowersRating"
              className="text-lg font-medium text-yellow mb-2"
            >
              Rating
            </label>
            <input
              type="number"
              id="flowersRating"
              name="flowersRating"
              value={flowerDetails.flowersRating}
              onChange={handleInputChange}
              max="5"
              className="focus:outline-none w-full border border-darkGray p-3 rounded-lg text-yellow"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="w-full flex justify-end">
          <button
            type="button"
            onClick={handleSaveChanges}
            className="bg-yellow text-white py-3 px-6 rounded-lg shadow focus:outline-none"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditFlowers;
