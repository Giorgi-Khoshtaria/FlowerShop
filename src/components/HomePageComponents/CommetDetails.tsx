import React from "react";
import yellowStar from "/assets/yellowStar.svg";
import whiteStar from "/assets/whiteStar.svg";

interface CommentDetailsProps {
  img: string;
  name: string;
  comment: string;
  rate: number; // The rating value, max is 5
}

const CommentDetails: React.FC<CommentDetailsProps> = ({
  img,
  name,
  comment,
  rate,
}) => {
  const maxStars = 5;

  return (
    <div className="flex items-start justify-between gap-4 bg-white w-[365px] pt-[20px] pr-[28px] pb-[28px] pl-[29px]">
      <img src={img} alt={`${name}'s avatar`} />
      <div>
        <h3 className=" text-[22px] not-italic font-medium leading-[normal] text-black">
          {name}
        </h3>
        <p className="mt-[11px]  text-xl not-italic font-normal leading-[30px] text-darkGray">
          {comment}
        </p>
        <div
          className="flex items-start justify-start mt-[11px]
        "
        >
          {Array.from({ length: maxStars }, (_, index) => (
            <img
              key={index}
              src={index < rate ? yellowStar : whiteStar}
              alt={index < rate ? "Yellow star" : "White star"}
              style={{ width: "20px", height: "20px" }} // Adjust the size as needed
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentDetails;
