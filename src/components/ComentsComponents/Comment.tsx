import React from "react";

interface CommentProps {
  userimage: string;
  name: string;
  comment: string;
  rate: string;
}

const Comment: React.FC<CommentProps> = ({
  userimage,
  name,
  comment,
  rate,
}) => {
  return (
    <div className="flex items-center justify-center">
      <img src={userimage} alt="img" className="w-[77px] h-[77px]" />
      <div className="w-[356px]">
        <p>{name}</p>
        <p>{comment}</p>
        <p>{rate}</p>
      </div>
    </div>
  );
};

export default Comment;
