/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEvent, useRef, useState } from "react";
import axios from "axios";
import yellowStar from "/assets/yellowStar.svg";
import whiteStar from "/assets/whiteStar.svg";
import toast, { Toaster } from "react-hot-toast";

function AddFlowers() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [alertMessage, setAlertMessage] = useState("");
  // const [submitError, setSubmitError] = useState<string | null>(null);
  // const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  // Reference for the file input
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleRatingChange = (value: number) => {
    if (value > 5) {
      setAlertMessage("Rating cannot be more than 5.");
    } else {
      setAlertMessage("");
      setRating(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (rating === null || rating > 5) {
      toast.error("Rating cannot exceed 5");
      setRating(null); // Reset rating
      setAlertMessage("");
      return;
    }

    // Prepare the form data
    const formData = {
      flowersName: name,
      flowersDescription: description,
      flowersPrice: price,
      flowersRating: rating,
      flowersPhoto: photo,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3005/api/flowers/addFlowers",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Flower added successfully!");

        // Clear form after successful submission
        setPhoto(null);
        setName("");
        setDescription("");
        setPrice("");
        setRating(null);
        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        toast.error("Failed to submit the form.");
      }
    } catch (error) {
      toast.error("An error occurred while submitting the form.");
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string); // Set the base64 image
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex-1 flex justify-center items-center p-4 w-full">
      <Toaster position="top-right" reverseOrder={false} />{" "}
      <div className="flex justify-between items-center p-6 bg-white max-w-[1440px] w-full">
        <div className="w-full">
          <h2 className="text-xl font-bold mb-4 text-yellow">Add New Flower</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center justify-between w-full">
              <div>
                <label
                  htmlFor="flowersImage"
                  className="text-sm font-medium mb-1 text-yellow"
                >
                  Flower Photo:
                </label>
                <input
                  id="flowersImage"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="border border-semiGray rounded p-2 w-full"
                  ref={fileInputRef}
                />
              </div>
              <div>
                {photo ? (
                  <img
                    src={photo}
                    className="w-24 h-24 object-cover rounded-full"
                    alt="Blog Preview"
                  />
                ) : (
                  "No Image Uploaded"
                )}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 text-yellow">
                Name:
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-semiGray rounded p-2 w-full"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 text-yellow">
                Description:
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border border-semiGray rounded p-2 w-full"
                rows={4}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 text-yellow">
                Price:
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border border-semiGray rounded p-2 w-full"
                step="0.01"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-yellow">
                Rating:
              </label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <img
                    key={star}
                    src={
                      rating !== null && star <= rating ? yellowStar : whiteStar
                    }
                    alt="Star"
                    className="cursor-pointer w-6 h-6"
                    onClick={() => handleRatingChange(star)}
                  />
                ))}
              </div>
            </div>

            {/* Alert Message */}
            {alertMessage && (
              <div className="mb-4 text-red-600 font-medium">
                {alertMessage}
              </div>
            )}

            <div className="flex w-full justify-end">
              <button
                type="submit"
                className="bg-yellow text-white px-6 py-3 rounded-lg font-medium"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddFlowers;
