import userImage from "/assets/userImage.png";
import blogImage from "/assets/blogImage.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { RiseLoader } from "react-spinners"; // Import the RiseLoader
import BlogsSection from "../../components/SemiComponents/BlogsSection";

interface Blog {
  _id: string;
  blogUserImage: string;
  createdAt: string;
  blogImage: string;
  blogName: string;
  blogDescription: string;
  blogPhrase: string;
  blogUserName: string;
  blogUserId: string;
  views: number;
}

function LatestBlogs() {
  const [blogData, setBlogData] = useState<Blog[]>([]); // Store blog data
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3005/api/blogs/getBlogs"
      );
      setBlogData(response.data); // Set fetched blogs
      setLoading(false); // Stop loading once data is fetched
    } catch (error) {
      console.error("Error fetching blogs", error);
      setLoading(false); // Stop loading in case of error
    }
  };

  const blog = [
    "Spring Blooms: Fresh Flowers, Fresh Beginnings",
    "Rose Care: Keep Your Love Blossoming",
    "Eco-Friendly Florals: Beauty Without the Footprint",
  ];

  const filteredBlogs = blogData.filter((blogItem) =>
    blog.includes(blogItem.blogName)
  );

  return (
    <div className="mt-[116px] w-full ">
      <div className="flex items-center justify-center gap-[19px] max-sm:gap-3">
        <div className="h-[2px] w-[165px] bg-semiGray max-sm:w-10"></div>
        <h2 className="text-black text-[32px] not-italic font-normal leading-[normal]">
          Latest posts
        </h2>
        <div className="h-[2px] w-[165px] bg-semiGray max-sm:w-10"></div>
      </div>
      <div className="flex items-center justify-between flex-wrap mt-[33px] gap-5 max-xl:justify-center">
        {loading ? ( // Show loader while loading
          <div className="flex justify-center items-center w-full h-[300px]">
            <RiseLoader
              color="#FF8F52"
              margin={0}
              size={15}
              speedMultiplier={1}
            />
          </div>
        ) : filteredBlogs.length > 0 ? (
          filteredBlogs.map((blogItem) => (
            <BlogsSection
              key={blogItem._id}
              blogUserImage={userImage}
              name={blogItem.blogUserName}
              date={new Date(blogItem.createdAt).toLocaleDateString()}
              mainImage={blogItem.blogImage || blogImage}
              blogName={blogItem.blogName}
              view={blogItem.views}
              phrase={blogItem.blogPhrase}
              blogId={blogItem._id}
              blogUserId={blogItem.blogUserId}
            />
          ))
        ) : (
          <p>No matching blogs found.</p>
        )}
      </div>
    </div>
  );
}

export default LatestBlogs;
