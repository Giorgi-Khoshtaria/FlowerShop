import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Comment from "../../components/ComentsComponents/Comment";
import yellowStar from "/assets/yellowStar.svg";
import whiteStar from "/assets/whiteStar.svg";
import { useAuth } from "../../Contexts/AuthContext";
import { useCart } from "../../Contexts/CartContext";
import { RiseLoader } from "react-spinners";
// import user from "/assets/user-solid.svg";

interface Flower {
  _id: string;
  flowersPhoto: string;
}

interface Comment {
  _id: string; // Unique identifier for the comment
  comment: string; // The comment text
  createdAt: string; // Date when the comment was created (ISO 8601 format)
  flowersId: string; // ID of the flower the comment is related to
  flowersName: string;
  rating: number; // Rating for the flower (e.g., out of 5)
  userId: string; // ID of the user who made the comment
  userName: string; // Name of the user who made the comment
  userImage: string; // Base64 encoded image of the user
  __v: number; // Version key used by Mongoose for document versioning
}

function FlowersDetails() {
  const { flowersId } = useParams();
  const { userData, logout, isAuthenticated } = useAuth();
  const userId = userData?.user.id;
  const [rating, setRating] = useState<number | null>(null);
  const [flowerDetails, setFlowerDetails] = useState({
    flowersPhoto: "",
    flowersName: "",
    flowersDescription: "",
    flowersPrice: "",
    flowersRating: "",
  });
  const [loading, setLoading] = useState(true);
  const [moreFlowerdata, setMoreFlowerdata] = useState<Flower[]>([]);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [userPicture, setUserPicture] = useState<string | null>();
  const [comment, setComment] = useState<string>("");
  const [getComments, setGetComments] = useState<Comment[]>([]);
  const [randomFlower, setRendomFlower] = useState<Flower[]>([]);
  const { addToCart, cartItems } = useCart();

  const handleOrder = () => {
    // Ensure flowerDetails and flowersId are valid
    if (!flowerDetails || !flowerDetails.flowersName || !flowersId) {
      alert("Flower details are incomplete or the flower ID is missing.");
      return;
    }

    // Check if the item is already in the cart by comparing the ID
    const isItemInCart = cartItems.some((cartItem) => {
      console.log("Cart Item ID:", cartItem.id);
      console.log("Flower ID:", flowersId);
      return cartItem.id === flowersId;
    });

    if (!isItemInCart) {
      // If the item is not in the cart, add it
      const cartItem = {
        id: flowersId,
        name: flowerDetails.flowersName,
        price: flowerDetails.flowersPrice,
        mainImage: flowerDetails.flowersPhoto,
        quantity: 1, // Set default quantity as 1 for the initial order
      };
      addToCart(cartItem);
      console.log(cartItem, "Cart item");
      alert("Item successfully added to cart");
    } else {
      // If the item is already in the cart, show an alert
      alert("This item is already in your cart.");
    }
  };

  useEffect(() => {
    fetchFlowersDetails();
    fetchFlowersData();
    fetchProfileData();
    getCommentsByFlowerId();
  }, [flowersId]);

  useEffect(() => {
    if (moreFlowerdata?.length > 0) {
      // Filter out the current flower by comparing the ID
      const filteredFlowers = moreFlowerdata.filter(
        (flower) => flower._id !== flowersId
      );

      // Shuffle the remaining flowers
      const shuffledFlowers = [...filteredFlowers].sort(
        () => 0.5 - Math.random()
      );

      // Set the first 4 flowers as random
      setRendomFlower(shuffledFlowers.slice(0, 4));
    } else {
      // If moreFlowerdata is undefined or empty, set an empty array
      setRendomFlower([]);
    }
  }, [moreFlowerdata, flowersId]);

  const handleRatingChange = (value: number) => {
    if (value > 5) {
      alert("Rating cannot be more than 5.");
    } else {
      return;
    }
  };

  const handloshowCommentModal = () => {
    setShowCommentModal(!showCommentModal);
  };

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
      console.log("add flowers data");
      setMoreFlowerdata(response.data);
    } catch (error) {
      console.error("Error fetching flowers data:", error);
    }
  };

  const fetchFlowersDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3005/api/flowers/getFlowersById/${flowersId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFlowerDetails(response.data);
      setLoading(false); // Stop loader once data is fetched
    } catch (error) {
      console.error("Error fetching flowers data:", error);
      setLoading(false); // Stop loader even if there's an error
    }
  };
  const fetchProfileData = async () => {
    if (isAuthenticated === true) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3005/api/user/getUserProfile/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              userId,
            },
          }
        );
        if (response.data.profilePicture) {
          setUserPicture(response.data.profilePicture);
        } else {
          setUserPicture(null); // Ensure no image is set if none exists
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            logout();
          } else {
            console.error("Error fetching user profile data:", error.message);
          }
        } else {
          console.error("Unexpected error:", error);
        }
      }
    }
  };

  const getCommentsByFlowerId = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3005/api/reviews/getCommentsByFlowerId/${flowersId}`
      );

      setGetComments(response.data);
    } catch (error) {
      console.error(error, "error fetching comments");
    }
  };

  const submitReview = async () => {
    if (isAuthenticated === true) {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.post(
          `http://localhost:3005/api/reviews/addComment`,
          {
            userId: userId,
            userImage: userPicture,
            userName: userData?.user.username,
            flowersId: flowersId,
            flowersName: flowerDetails.flowersName,
            comment: comment,
            rating: rating,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 201) {
          setShowCommentModal(false);
          getCommentsByFlowerId();
          setRating(0);
          alert("Review submitted!");
        }
      } catch (error) {
        console.error("Error submitting review:", error);
        alert("Error submitting review");
      }
    } else {
      setShowCommentModal(false);
      setRating(0);
      alert("you need to login first");
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center mt-20 p-4">
        <RiseLoader color="#FF8F52" margin={0} size={15} speedMultiplier={1} />
      </div>
    );
  }
  return (
    <div className="flex-1 flex items-center justify-center mt-20 p-4">
      <div className="max-w-[1440px] w-full">
        <div className="bg-white  rounded-md pt-12 pr-[37px] pb-12 pl-12 flex items-top justify-between gap-14  max-[960px]:flex-col ">
          <div>
            <img
              src={flowerDetails.flowersPhoto}
              alt=""
              className="w-[356px] h-[326px]  max-[960px]:w-full"
            />
          </div>
          <div>
            <div>
              <h2 className="text-black text-[22px] not-italic font-normal leading-[normal] mb-[22px]">
                {flowerDetails.flowersName}
              </h2>
              <p className="w-[700px] max-[1200px]:w-[450px] max-sm:w-full mb-[11px] text-darkGray text-[22px] not-italic font-normal leading-[normal] ">
                {flowerDetails.flowersDescription}
              </p>
              <p className="text-black text-[22px] not-italic font-normal leading-[normal] mb-[22px] flex items-center justify-start gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="18"
                  viewBox="0 0 20 18"
                  fill="none"
                >
                  <g clipPath="url(#clip0_127_214)">
                    <path
                      d="M13.2362 5.1372L18.2257 5.86181C18.6389 5.91992 18.9862 6.20703 19.1181 6.60009C19.25 6.99658 19.1424 7.42724 18.8438 7.72118L15.2257 11.2143L16.0799 16.2251C16.1493 16.6352 15.9792 17.0522 15.632 17.2949C15.2882 17.5376 14.8334 17.5684 14.4618 17.3735L10.0035 15.0322L5.54865 17.3735C5.17365 17.5684 4.71879 17.5376 4.37504 17.2949C4.03129 17.0522 3.85768 16.6352 3.9306 16.2251L4.78476 11.2143L1.16601 7.72118C0.867054 7.42724 0.760804 6.99658 0.892054 6.60009C1.02296 6.20703 1.36914 5.91992 1.78546 5.86181L6.77087 5.1372L9.00698 0.614203C9.19101 0.237679 9.5799 -0.00134277 10.0035 -0.00134277C10.4306 -0.00134277 10.8195 0.237679 11.0035 0.614203L13.2362 5.1372Z"
                      fill="#FF8F52"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_127_214">
                      <rect width="20" height="17.5" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                {flowerDetails.flowersRating}/5
              </p>
            </div>
            <div className="mt-12 flex w-full items-center justify-between">
              <div>
                <p className="text-black text-[22px] not-italic font-normal leading-[normal] ">
                  {flowerDetails.flowersPrice}$/ each
                </p>
              </div>
              <div>
                <button
                  onClick={handleOrder}
                  className=" bg-yellow text-lg not-italic font-normal leading-[normal] text-white flex items-center justify-end gap-2 py-[9px] px-5 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="19"
                    viewBox="0 0 21 19"
                    fill="none"
                  >
                    <path
                      d="M3.46832 0C3.88379 0 4.24146 0.30167 4.32095 0.71863C4.35185 0.980982 4.57421 1.17869 4.83838 1.17869H19.5743C20.3077 1.17869 20.893 1.92457 20.6871 2.67635L18.7361 9.74994C18.5952 10.2583 18.14 10.6082 17.6234 10.6082H7.23279C6.6791 10.6082 6.2617 11.1114 6.364 11.6555C6.44256 12.0734 6.80755 12.3762 7.23279 12.3762H17.6306C18.1111 12.3762 18.4977 12.7703 18.4977 13.2602C18.4977 13.7501 18.1111 14.1442 17.6306 14.1442H5.74801C5.36505 14.1442 5.00738 13.8422 4.9279 13.426L3.09661 3.61975C2.89614 2.54625 1.95913 1.76803 0.867079 1.76803C0.388379 1.76803 0 1.37206 0 0.884015C0 0.395965 0.388379 0 0.867079 0H3.46832ZM4.62442 17.091C4.62442 16.1149 5.40118 15.3229 6.35858 15.3229C7.31598 15.3229 8.09274 16.1149 8.09274 17.091C8.09274 18.067 7.31598 18.859 6.35858 18.859C5.40118 18.859 4.62442 18.067 4.62442 17.091ZM18.4977 17.091C18.4977 18.067 17.7209 18.859 16.7635 18.859C15.8061 18.859 15.0294 18.067 15.0294 17.091C15.0294 16.1149 15.8061 15.3229 16.7635 15.3229C17.7209 15.3229 18.4977 16.1149 18.4977 17.091Z"
                      fill="white"
                    />
                  </svg>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[37px] flex w-full items-top justify-between gap-5 max-[1200px]:flex-col-reverse ">
          <div className="overflow-y-auto flex flex-col items-center w-[580px] max-[1200px]:w-full  max-[1200px]:items-start bg-white  pt-[23px] pr-[34px] pb-[45px] pl-[42px] ">
            <div className="flex items-center justify-between w-full mb-9">
              <h2 className="text-[22px] text-black font-inter">Reviews</h2>
              <p
                onClick={handloshowCommentModal}
                className="text-[22px] text-yellow font-inter"
              >
                Add a review
              </p>
            </div>
            <div className="flex flex-col items-center gap-[35px]">
              {getComments.length > 0 ? (
                getComments.map((comment) => (
                  <div key={comment._id} className="">
                    <Comment
                      key={comment._id}
                      comment={comment.comment}
                      name={comment.userName}
                      userimage={comment.userImage}
                      rate={comment.rating}
                    />
                  </div>
                ))
              ) : (
                <p>No comments available for this flower.</p>
              )}
            </div>
          </div>
          <div className="bg-white pt-[23px] pr-[41px] pb-[34px] pl-[30px]">
            <p className=" font-inter mb-[19px] text-black text-[22px]">
              Maybe you like...
            </p>
            <div className="grid grid-cols-2  gap-5 1 max-[1200px]:flex   max-[1200px]:items-center  max-[1200px]:justify-center  max-[1200px]:flex-wrap ">
              {randomFlower.length > 0 ? (
                randomFlower.map((flower) => (
                  <div
                    key={flower._id}
                    className="w-[246px] h-[223px] max-[1200px]:w-[340px]"
                  >
                    <Link to={`/flowersDetails/${flower._id}`}>
                      <img
                        src={flower.flowersPhoto}
                        alt="flowerPhoto"
                        className="w-full h-full  max-[1200px]:"
                      />
                    </Link>
                  </div>
                ))
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
        </div>
        {showCommentModal && (
          <div className="fixed inset-0 w-full flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-md w-[400px] max-sm:w-[330px] ">
              <h2 className="text-lg mb-4">Add a review</h2>
              <input
                type="text"
                placeholder="Write your comment here..."
                className="border p-2 w-full mb-4"
                onChange={(e) => setComment(e.target.value)}
              />
              <div>
                <label className="block text-sm font-medium mb-1 text-yellow">
                  Rating:
                </label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <img
                      key={star}
                      src={
                        rating !== null && star <= rating
                          ? yellowStar
                          : whiteStar
                      }
                      alt="star"
                      className="w-6 h-6 cursor-pointer"
                      onClick={() => {
                        setRating(star);
                        handleRatingChange(star);
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-end mt-4 space-x-2">
                <button
                  className="bg-gray-300 py-2 px-4 rounded-md"
                  onClick={() => setShowCommentModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-yellow text-white py-2 px-4 rounded-md"
                  onClick={() => {
                    // handle form submission here
                    submitReview();
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FlowersDetails;
