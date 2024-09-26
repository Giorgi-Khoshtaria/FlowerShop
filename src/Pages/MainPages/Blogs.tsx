import axios from "axios";
import { useEffect, useState } from "react";
import BlogsSection from "../../components/SemiComponents/BlogsSection";
import { RiseLoader } from "react-spinners";

interface Blog {
  _id: string;
  id: string;
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

function Blogs() {
  const [blogsData, setBlogData] = useState<Blog[]>([]);
  const [filter, setFilter] = useState<string>("All");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3005/api/blogs/getBlogs"
      );
      console.log(response.data); // Change this to log the fetched data
      setBlogData(response.data);
    } catch (error) {
      console.error("Error fetching blogs", error);
    }
  };

  const filteredBlogs =
    filter === "All"
      ? blogsData
      : blogsData.filter((blog) =>
          blog.blogUserName.toLowerCase().includes(filter.toLowerCase())
        );

  return (
    <div className="flex-1 flex items-center justify-center mt-10 p-4">
      <div className="max-w-[1440px] w-full flex flex-col items-start ">
        {filteredBlogs.length > 0 ? (
          <div className="w-full">
            <div className="max-md:flex-col mb-10 bg-white p-6 rounded-md flex w-full gap-5 items-center justify-between">
              <h2 className="text-yellow font-bold">Find Your Blog</h2>
              <div className="flex gap-3 items-center justify-end">
                <input
                  type="search"
                  onChange={(e) => setFilter(e.target.value)}
                  placeholder="Search blog by username"
                  className="rounded-xl w-80 max-md:w-60 border border-semiGray focus:outline-none p-2 text-yellow text-sm"
                />
              </div>
            </div>
            <div className="w-full">
              <div className="flex items-center justify-between w-full gap-5 flex-wrap max-[825px]:justify-center">
                {filteredBlogs.map((blog) => (
                  <div key={blog._id}>
                    <BlogsSection
                      blogUserImage={blog.blogUserImage}
                      name={blog.blogUserName}
                      date={blog.createdAt}
                      mainImage={blog.blogImage}
                      blogName={blog.blogName}
                      blogId={blog._id}
                      blogUserId={blog.blogUserId}
                      view={blog.views}
                      phrase={blog.blogPhrase} // This should now correctly reference blogPhrase
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full w-full">
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
  );
}

export default Blogs;
