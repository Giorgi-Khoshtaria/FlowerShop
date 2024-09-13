import React from "react";
import yellowStar from "/assets/yellowStar.svg";
import whiteStar from "/assets/whiteStar.svg";

interface CommentProps {
  userimage: string;
  name: string;
  comment: string;
  rate: number;
}

const Comment: React.FC<CommentProps> = ({
  userimage,
  name,
  comment,
  rate,
}) => {
  return (
    <div className="flex items-center justify-center">
      <img
        src={userimage}
        alt="img"
        className="w-[77px] h-[77px] rounded-full mr-[23px]"
      />
      <div className="w-[356px]">
        <p className="text-black font-inter text-[22px] mb-[10px]">{name}</p>
        <p className="text-darkGray font-inter text-[22px] mb-[15px]">
          {comment}
        </p>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <img
              key={star}
              src={rate !== null && star <= rate ? yellowStar : whiteStar}
              alt="star"
              className="w-6 h-6 cursor-pointer flex items-center"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comment;
