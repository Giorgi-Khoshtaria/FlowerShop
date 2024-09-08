import { useState } from "react";
import yellowStar from "/assets/yellowStar.svg";
import whiteStar from "/assets/whiteStar.svg";

function About() {
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const handleRatingChange = (value: number) => {
    if (value > 5) {
      setAlertMessage("Rating cannot be more than 5.");
    } else {
      setAlertMessage("");
      setRating(value);
    }
  };

  const countWords = (text: string) => {
    return text.trim().split(/\s+/).length;
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newComment = e.target.value;
    if (countWords(newComment) > 20) {
      setAlertMessage("Comment cannot be more than 20 words.");
    } else {
      setAlertMessage("");
      setComment(newComment);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating && rating <= 5 && countWords(comment) <= 20) {
      // Submit the comment and rating (e.g., send to an API or update state)
      console.log("Comment:", comment);
      console.log("Rating:", rating);
      setComment("");
      setRating(null); // Reset rating
      setAlertMessage("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-20 p-4">
      <div className="max-w-[1440px] w-full flex flex-col items-start bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-yellow mb-6">About Us</h1>

        {/* Company Information */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-yellow mb-4">
            Our Company
          </h2>
          <p className="text-lg text-semiBlack mb-4">
            Welcome to our flower shop! We have been serving our community with
            fresh, beautiful flowers for over a decade. Our mission is to
            provide our customers with the highest quality floral arrangements
            and exceptional customer service.
          </p>
          <p className="text-lg text-semiBlack">
            Whether you're looking for a bouquet for a special occasion or just
            want to brighten your day, we have a wide variety of flowers to
            choose from. Thank you for choosing us for all your floral needs!
          </p>
        </section>

        {/* About Flowers */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-yellow mb-4">
            About Our Flowers
          </h2>
          <p className="text-lg text-semiBlack mb-4">
            Our flowers are sourced from the best growers locally and
            internationally. We take pride in offering a wide range of flowers,
            from classic roses to exotic orchids. Each bloom is carefully
            selected to ensure freshness and longevity.
          </p>
          <p className="text-lg text-semiBlack">
            We also offer personalized floral arrangements to suit any occasion.
            Let us help you create the perfect arrangement for your needs!
          </p>
        </section>

        {/* Comments Section */}
        <section className="w-full">
          <h2 className="text-2xl font-semibold text-yellow mb-4">Comments</h2>

          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-4">
              <label
                htmlFor="comment"
                className="block text-lg font-medium text-yellow mb-2"
              >
                Write a Comment
              </label>
              <textarea
                id="comment"
                rows={4}
                value={comment}
                onChange={handleCommentChange}
                className="w-full border border-semiGray p-3 rounded-lg text-yellow-600"
                required
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-lg font-medium text-yellow mb-2">
                Rate Us (Out of 5)
              </label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <img
                    key={star}
                    src={rating && star <= rating ? yellowStar : whiteStar}
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

            <button
              type="submit"
              className="bg-yellow text-white px-6 py-3 rounded-lg font-medium"
            >
              Submit
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default About;
