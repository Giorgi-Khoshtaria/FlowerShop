import axios from "axios";
import { useEffect, useState } from "react";
import BlogsSection from "../../components/SemiComponents/BlogsSection";
import { useAuth } from "../../Contexts/AuthContext";
interface Blog {
  _id: string;
  id: string;
  blogUserImage: string;
  createdAt: string;
  blogImage: string;
  blogName: string;
  blogDescription: string;
  blogUserName: string;
  likes: number;
  views: number;
}

function Blogs() {
  const [blogsData, setBlogData] = useState<Blog[]>([]);
  // const [blogId, setBlogId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("All");
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
      // setBlogId(response.data.id);
      setBlogData(response.data);
    } catch (error) {
      console.error("error fetChing blogs", error);
    }
  };
  const filteredBlogs =
    filter === "All"
      ? blogsData
      : blogsData.filter((blog) =>
          blog.blogUserName.toLowerCase().includes(filter.toLowerCase())
        );
  return (
    <div className="flex items-center justify-center mt-10 p-4">
      <div className=" max-w-[1440px] w-full flex flex-col items-start  p-6  ">
        <div className=" max-md:flex-col mb-10 bg-white p-6 rounded-md flex w-full gap-5 items-center justify-between">
          <h2 className="text-yellow font-bold">Find Your Blog</h2>
          <div className="flex gap-3 items-center justify-end">
            <input
              type="search"
              name=""
              id=""
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Search blog by username"
              className="rounded-xl w-80 max-md:w-60 border border-semiGray focus:outline-none p-2 text-yellow text-sm"
            />
          </div>
        </div>
        <div className="w-full">
          <div className="flex items-center justify-between w-full gap-5 flex-wrap max-[825px]:justify-center ">
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog) => (
                <div key={blog._id}>
                  <BlogsSection
                    blogUserImage={blog.blogUserImage}
                    name={blog.blogUserName}
                    date={blog.createdAt}
                    mainImage={blog.blogImage}
                    blogName={blog.blogName}
                    description={blog.blogDescription}
                    blogId={blog._id}
                    like={blog.likes}
                    view={blog.views}
                  />
                </div>
              ))
            ) : (
              <p>No blogs found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blogs;
