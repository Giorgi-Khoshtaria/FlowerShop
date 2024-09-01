import CommentDetails from "./CommetDetails";
import commentImage from "/assets/commentImage.svg";

function Coments() {
  return (
    <div className="mt-[116px] w-full">
      <div className="flex items-center justify-center gap-[19px] mt-4 max-sm:gap-3">
        <div className="h-[2px] w-[165px] bg-semiGray max-sm:w-10"></div>
        <h2 className=" text-black text-[32px] not-italic font-normal leading-[normal]  ">
          Comments
        </h2>
        <div className="h-[2px] w-[165px] bg-semiGray  max-sm:w-10"> </div>
      </div>
      <div className=" flex items-center justify-between flex-wrap gap-5 mt-4 max-xl:justify-center ">
        <CommentDetails
          img={commentImage}
          name="Atena"
          comment="i’m buying flower from them every weak, always fresh flowers and beutiful😍🌻... love’em so nuch..keep going 💯💯"
          rate={3}
        />
        <CommentDetails
          img={commentImage}
          name="Atena"
          comment="i’m buying flower from them every weak, always fresh flowers and beutiful😍🌻... love’em so nuch..keep going 💯💯"
          rate={5}
        />
        <CommentDetails
          img={commentImage}
          name="Atena"
          comment="i’m buying flower from them every weak, always fresh flowers and beutiful😍🌻... love’em so nuch..keep going 💯💯"
          rate={2}
        />
      </div>
    </div>
  );
}

export default Coments;
