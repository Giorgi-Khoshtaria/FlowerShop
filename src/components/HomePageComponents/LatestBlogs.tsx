import Blogs from "../SemiComponents/Blogs";
import userImage from "/assets/userImage.png";
import blogImage from "/assets/blogImage.png";

function LatestBlogs() {
  return (
    <div className="mt-[116px] w-full ">
      <div className="flex items-center justify-center gap-[19px]  max-sm:gap-3">
        <div className="h-[2px] w-[165px] bg-semiGray max-sm:w-10"></div>
        <h2 className=" text-black text-[32px] not-italic font-normal leading-[normal]  ">
          Latest posts
        </h2>
        <div className="h-[2px] w-[165px] bg-semiGray  max-sm:w-10"> </div>
      </div>
      <div className="flex items-center justify-between  flex-wrap mt-[33px] gap-5 max-xl:justify-center">
        <Blogs
          userImage={userImage}
          name="Emily "
          date="2022/22/8"
          mainImage={blogImage}
          blogName="Best flowers for inside home"
          description="All the flowers are best for your lovly house
just get the one you love the most 😊"
          like={15}
          view={2000}
        />
        <Blogs
          userImage={userImage}
          name="Emily "
          date="2022/22/8"
          mainImage={blogImage}
          blogName="Best flowers for inside home"
          description="All the flowers are best for your lovly house
just get the one you love the most 😊"
          like={15}
          view={2000}
        />
        <Blogs
          userImage={userImage}
          name="Emily "
          date="2022/22/8"
          mainImage={blogImage}
          blogName="Best flowers for inside home"
          description="All the flowers are best for your lovly house
just get the one you love the most 😊"
          like={15}
          view={2000}
        />
      </div>
    </div>
  );
}

export default LatestBlogs;
