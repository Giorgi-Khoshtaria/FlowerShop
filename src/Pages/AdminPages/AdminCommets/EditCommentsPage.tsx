import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams, useNavigate, Link } from "react-router-dom";

function EditCommentsPage() {
  const { id } = useParams(); // Get the comment ID from the URL
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState("");
  const [rating, setRating] = useState("");

  useEffect(() => {
    fetchCommentById();
  }, []);
  const apiUrl = import.meta.env.VITE_API_URL;
  const fetchCommentById = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${apiUrl}/api/reviews/getCommentById/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCommentText(response.data.comment);
      setRating(response.data.rating);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateComment = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const ratingNumber = Number(rating);

    // Validation for rating
    if (ratingNumber > 5) {
      toast.error("Please enter a rating of 5 or less.");
      return;
    } else if (ratingNumber < 1) {
      setRating("0"); // Reset to 0 if less than 1
    }

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${apiUrl}/api/reviews/updateComment/${id}`,
        { comment: commentText, rating: ratingNumber <= 5 ? ratingNumber : 5 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast
        .promise(
          new Promise((resolve) => {
            toast.success("Comment updated successfully!");
            // Resolve the promise after 1.5 seconds to give the toast time to show
            setTimeout(resolve, 1500);
          }),
          {
            loading: "Comment updating...",
            success: "Comment updated successfully!",
            error: "Comment update failed",
          }
        )
        .then(() => {
          // After the toast is displayed, navigate to the home page
          navigate("/comments"); // Redirect to comments list after update
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center mt-20 p-4">
      {" "}
      <Toaster position="top-right" reverseOrder={false} />{" "}
      <div className="max-w-[1440px] w-full">
        <Link to={`/comments`} className="text-yellow">
          Go Back
        </Link>
        <h2 className="text-2xl font-semibold">Edit Comment</h2>

        <form onSubmit={handleUpdateComment} className="mt-6 space-y-4">
          <div className="flex flex-col">
            <label htmlFor="commentText" className="font-semibold">
              Comment Text
            </label>
            <textarea
              id="commentText"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="rating" className="font-semibold">
              Rating
            </label>
            <input
              type="number"
              id="rating"
              value={rating}
              min={0}
              onChange={(e) => setRating(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="bg-yellow text-white py-2 px-4 rounded-md hover:bg-yellow-600"
          >
            Update Comment
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditCommentsPage;
