import { Link } from "react-router-dom";
import user from "/assets/user-solid.svg";
interface BlogsProps {
  blogUserImage: string;
  name: string;
  date: string; // Pass the createdAt date as a string
  mainImage: string;
  blogName: string;
  description: string;
  like: number;
  view: number;
  blogId: string;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Adding 1 to get the correct month
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}/${day}/${month}`;
};

const BlogsSection: React.FC<BlogsProps> = ({
  blogUserImage,
  name,
  date,
  mainImage,
  blogName,
  description,
  blogId,
  like,
  view,
}) => {
  const formattedDate = formatDate(date); // Format the date here

  return (
    <div className="bg-white pb-[18px] w-[360px]">
      <div className=" w-[360px] flex items-center justify-between px-[10px] pt-[10px]">
        <div className="flex items-center justify-start gap-2">
          <div>
            {blogUserImage ? (
              <Link to={`/userProfile/:id`}>
                <img
                  src={blogUserImage}
                  alt="userimage"
                  className="w-10 h-10 rounded-full"
                />
              </Link>
            ) : (
              <Link to={``}>
                <img
                  src={user}
                  alt="userimage"
                  className="w-10 h-10 rounded-full"
                />
              </Link>
            )}
          </div>

          <p className="text-base not-italic font-normal leading-[normal] text-black">
            {name}
          </p>
        </div>
        <p className="text-base not-italic font-normal leading-[normal] text-darkGray">
          {formattedDate}
        </p>
      </div>
      <img
        src={mainImage}
        alt="blogimage"
        className="w-[360px] h-[250px] mt-[11px] mb-[17px] bg-white"
      />
      <div className="px-[10px]">
        <h2 className="mb-[13px] w-[255px] text-xl not-italic font-normal leading-[normal] text-black">
          {blogName}
        </h2>
        <p className="w-[354px] text-base not-italic font-normal leading-[25px] text-darkGray">
          {description}
        </p>
      </div>

      <div className="pl-[17px] pr-[27px] flex items-center justify-between mt-[26px]">
        <div className="flex items-baseline justify-start gap-3">
          <div className="flex items-center justify-start gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="12"
              viewBox="0 0 15 12"
              fill="none"
            >
              <path
                d="M0 4.0767V3.91774C0 2.002 1.38459 0.368009 3.27237 0.0533794C4.49745 -0.154638 5.7938 0.252627 6.68726 1.14746L6.69937 1.15955C6.87237 1.33227 7.15421 1.32678 7.32035 1.14746C8.23848 0.252627 9.51016 -0.154638 10.7599 0.0533794C12.6482 0.368009 14.0323 2.002 14.0323 3.91774V4.0767C14.0323 5.21408 13.5609 6.30213 12.7277 7.07774L7.77531 11.7013C7.56976 11.8931 7.29843 12 7.01614 12C6.73385 12 6.46252 11.8931 6.25697 11.7013L1.30429 7.07774C0.472219 6.30213 0 5.21408 0 4.0767Z"
                fill="#838383"
              />
            </svg>
            <p className="text-xs not-italic font-normal leading-[normal] text-darkGray">
              {like}
            </p>
          </div>
          <div className="flex items-center justify-start gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="12"
              viewBox="0 0 16 12"
              fill="none"
            >
              <path
                d="M7.44594 3.64239C7.40676 3.54143 7.47066 3.42857 7.57895 3.42857C8.97369 3.42857 10.1053 4.55625 10.1053 6C10.1053 7.41964 8.97369 8.57143 7.57895 8.57143C6.16053 8.57143 5.05263 7.41964 5.05263 6C5.05263 5.89066 5.16723 5.82653 5.26878 5.86705C5.4621 5.94417 5.6735 6 5.89474 6C6.82369 6 7.57895 5.23125 7.57895 4.28571C7.57895 4.05816 7.52294 3.84084 7.44594 3.64239ZM12.6474 2.15893C13.879 3.32143 14.7026 4.69018 15.0921 5.67054C15.1789 5.88214 15.1789 6.11786 15.0921 6.32946C14.7026 7.28571 13.879 8.65446 12.6474 9.84107C11.4079 11.0143 9.70527 12 7.57895 12C5.45263 12 3.75 11.0143 2.51106 9.84107C1.27948 8.65446 0.456319 7.28571 0.0647664 6.32946C-0.0215888 6.11786 -0.0215888 5.88214 0.0647664 5.67054C0.456319 4.69018 1.27948 3.32143 2.51106 2.15893C3.75 0.986786 5.45263 0 7.57895 0C9.70527 0 11.4079 0.986786 12.6474 2.15893ZM7.57895 2.14286C5.48685 2.14286 3.78948 3.87054 3.78948 6C3.78948 8.12946 5.48685 9.85714 7.57895 9.85714C9.67105 9.85714 11.3684 8.12946 11.3684 6C11.3684 3.87054 9.67105 2.14286 7.57895 2.14286Z"
                fill="#838383"
              />
            </svg>
            <p className="text-xs not-italic font-normal leading-[normal] text-darkGray">
              {view}
            </p>
          </div>
        </div>
        <div>
          <Link
            to={`/blogDetails/${blogId}`}
            className="text-lg not-italic font-normal leading-[normal] text-black"
          >
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogsSection;
