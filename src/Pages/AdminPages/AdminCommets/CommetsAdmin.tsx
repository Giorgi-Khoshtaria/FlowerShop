// ... other imports
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserImg from "/assets/user-solid.svg";
import toast, { Toaster } from "react-hot-toast";

interface Comment {
  _id: string;
  userName: string;
  userImage: string;
  rating: number;
  flowersName: string;
  flowersId: string;
  createdAt: string;
  comment: string;
}

function CommetsAdmin() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [comments, setComments] = useState<Comment[] | null>(null);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  useEffect(() => {
    fetchAllComments();
  }, []);
  const apiUrl = import.meta.env.VITE_API_URL;
  const fetchAllComments = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${apiUrl}/api/reviews/getCommets`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Fetched comments:", response.data);
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleDeleteComment = async (id: string) => {
    const token = localStorage.getItem("token");
    await axios.delete(`${apiUrl}/api/reviews/deleteComment/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("The comment has been deleted");
    fetchAllComments();
  };

  const filteredComments = comments
    ?.filter((comment) =>
      comment.flowersName.toLocaleLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.flowersName.localeCompare(b.flowersName);
      } else {
        return b.flowersName.localeCompare(a.flowersName);
      }
    });

  return (
    <div className="flex-1 flex items-center justify-center mt-20 p-4">
      <Toaster position="top-right" reverseOrder={false} />{" "}
      <div className="max-w-[1440px] w-full">
        <Link to={`/dashboard`} className="text-yellow">
          Go Back
        </Link>
        <div className="mt-10 flex items-center justify-between w-full gap-4 border-b border-black pb-4 max-md:flex-col max-md:items-start">
          <div className="flex items-center gap-3">
            <label htmlFor="search">Search Comment</label>
            <input
              type="search"
              id="search"
              value={searchTerm}
              onChange={handleSearch}
              className="py-2 px-2 rounded-md border bg-semiGray border-black focus:outline-none"
            />
          </div>
          <button
            onClick={handleSortOrder}
            className="text-yellow hover:underline"
          >
            Sort Comments {sortOrder === "asc" ? "A-Z" : "Z-A"}
          </button>
        </div>

        {/* Responsive Table for Comments */}
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 text-left">User Image</th>
                <th className="py-2 px-4 text-left">User Name</th>
                <th className="py-2 px-4 text-left">Flower Name</th>
                <th className="py-2 px-4 text-left">Comment</th>
                <th className="py-2 px-4 text-left">Rating</th>
                <th className="py-2 px-4 text-left">Created At</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {comments ? (
                filteredComments && filteredComments.length > 0 ? (
                  filteredComments.map((comment) => (
                    <tr key={comment._id} className="border-b border-gray-300">
                      <td className="py-2 px-4">
                        <img
                          src={comment.userImage || UserImg}
                          alt="User"
                          className="w-16 h-16 object-cover rounded-full"
                        />
                      </td>
                      <td className="py-2 px-4">
                        {comment.userName || "No Info"}
                      </td>
                      <td className="py-2 px-4">
                        {comment.flowersName || "No Info"}
                      </td>
                      <td className="py-2 px-4 max-w-[200px] overflow-hidden text-ellipsis">
                        {comment.comment || "No Info"}
                      </td>
                      <td className="py-2 px-4">{comment.rating}</td>
                      <td className="py-2 px-4">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-4">
                        <Link
                          to={`/editComment/${comment._id}`}
                          className="mr-2 text-blue-500 hover:underline"
                        >
                          Update
                        </Link>
                        <button
                          onClick={() => handleDeleteComment(comment._id)}
                          className="text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-2 px-4 text-center">
                      No comments found.
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td colSpan={7} className="py-2 px-4 text-center">
                    Loading comments...
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

export default CommetsAdmin;
