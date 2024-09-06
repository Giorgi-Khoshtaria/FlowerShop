import axios from "axios";
import { useEffect, useState } from "react";
import BlogsSection from "../components/SemiComponents/BlogsSection";
import { useAuth } from "../Contexts/AuthContext";
interface Blog {
  blogUserImage: string;
  createdAt: string;
  blogImage: string;
  blogName: string;
  blogDescription: string;
  blogUserName: string;
}

function Blogs() {
  const [blogsData, setBlogData] = useState<Blog[]>([]);
  const { userData, isAuthenticated } = useAuth();
  useEffect(() => {
    fetchBlogs();
  }, [userData, isAuthenticated]);
  const fetchBlogs = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:3005/api/blogs/getBlogs",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(blogsData);
      setBlogData(response.data);
    } catch (error) {
      console.error("error fetChing blogs", error);
    }
  };

  return (
    <div className="flex items-center justify-center mt-10 p-4">
      <div className=" max-w-[1440px] w-full flex flex-col items-start  p-6  ">
        <div className=" mb-10 bg-white p-6 rounded-md flex w-full gap-5 items-center justify-between">
          <h2 className="text-yellow font-bold">Find Your Blog</h2>
          <div className="flex gap-3 items-center justify-end">
            <input
              type="search"
              name=""
              id=""
              className="border border-semiGray focus:outline-none p-2 text-yellow text-sm"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="23"
              viewBox="0 0 23 23"
              fill="none"
            >
              <g clipPath="url(#clip0_40_231)">
                <path
                  d="M22.4746 19.9319L17.0975 14.5547C18.3202 12.7394 18.9235 10.4713 18.6005 8.05454C18.0498 3.94374 14.6807 0.598405 10.5658 0.077446C4.44791 -0.696693 -0.696546 4.44776 0.0776375 10.5657C0.598731 14.6823 3.94451 18.0541 8.05576 18.6022C10.4726 18.9251 12.7411 18.3221 14.556 17.0991L19.9331 22.4763C20.6348 23.1779 21.7727 23.1779 22.4743 22.4763C23.1754 21.7737 23.1754 20.6327 22.4746 19.9319ZM3.55351 9.34379C3.55351 6.17321 6.13293 3.5938 9.30351 3.5938C12.4741 3.5938 15.0535 6.17321 15.0535 9.34379C15.0535 12.5144 12.4741 15.0938 9.30351 15.0938C6.13293 15.0938 3.55351 12.5153 3.55351 9.34379Z"
                  fill="#838383"
                />
              </g>
              <defs>
                <clipPath id="clip0_40_231">
                  <rect width="23" height="23" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
        <div>
          <div className="flex gap-5">
            {blogsData.map((blog, index) => (
              <div key={index} className="">
                <BlogsSection
                  blogUserImage={blog.blogUserImage}
                  name={blog.blogUserName}
                  date={blog.createdAt}
                  mainImage={blog.blogImage}
                  blogName={blog.blogName}
                  description={blog.blogDescription}
                  like={1}
                  view={1}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blogs;
