import { useState } from "react";
import yellowStar from "/assets/yellowStar.svg";
import whiteStar from "/assets/whiteStar.svg";

function AddFlowers() {
  const [photo, setPhoto] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [alertMessage, setAlertMessage] = useState("");

  const handleRatingChange = (value: number) => {
    if (value > 5) {
      setAlertMessage("Rating cannot be more than 5.");
    } else {
      setAlertMessage("");
      setRating(value);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (rating === null || rating > 5) {
      alert("Rating cannot exceed 5");
      setRating(null); // Reset rating
      setAlertMessage("");
      return;
    }

    // Handle form submission (e.g., send data to the server)
    console.log({ photo, name, description, price, rating });

    // Clear form after submission
    setPhoto(null);
    setName("");
    setDescription("");
    setPrice("");
    setRating(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  return (
    <div className=" flex-1 flex justify-center items-center p-4 w-full">
      <div className="flex justify-between items-center p-6 bg-white max-w-[1440px] w-full">
        <div className="w-full">
          <h2 className="text-xl font-bold mb-4 text-yellow">Add New Flower</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
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
              />
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
