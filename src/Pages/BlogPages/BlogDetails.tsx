import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { RiseLoader } from "react-spinners";

interface BlogDetail {
  blogUserImage: string;
  blogUserName: string;
  createdAt: string;
  blogImage: string;
  blogName: string;
  blogDescription: string;
  blogPhrase: string;
  likes: number;
  views: number;
}

const BlogDetails: React.FC = () => {
  const { blogid } = useParams<{ blogid: string }>();
  const [blog, setBlog] = useState<BlogDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3005/api/blogs/getBlog/${blogid}`
        );
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [blogid]);

  const formattedDate = blog
    ? new Date(blog.createdAt).toLocaleDateString()
    : "";

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-800 text-white p-4">
        {/* Your Header Content */}
      </header>
      <main className="flex-1 flex items-center justify-center">
        {loading ? (
          <RiseLoader color="#FF8F52" size={15} />
        ) : (
          <div className="p-10 max-w-[1440px] w-full">
            <div className="flex items-center mb-6">
              {" "}
              {blog?.blogUserImage ? (
                <img
                  src={blog?.blogUserImage}
                  alt="User"
                  className="w-12 h-12 rounded-full"
                />
              ) : (
                <img
                  src="/assets/user-solid.svg"
                  alt="User"
                  className="w-12 h-12 rounded-full"
                />
              )}
              <div className="ml-4">
                <p className="font-semibold">{blog?.blogUserName}</p>
                <p className="text-sm text-gray-500">{formattedDate}</p>
              </div>
            </div>
            <img
              src={blog?.blogImage}
              alt="Blog"
              className="w-[800px] h-auto mb-6"
            />
            <h1 className="text-3xl font-bold mb-4">Title:{blog?.blogName}</h1>
            <p className="text-lg mb-4">
              Phrase: <span className="italic">"{blog?.blogPhrase}"</span>{" "}
            </p>
            <p className="text-lg mb-4">Description:{blog?.blogDescription}</p>
            <div className="flex items-center gap-4">
              <p className="flex items-center">
                {/* Views Icon */}
                {blog?.views} Views
              </p>
            </div>
          </div>
        )}
      </main>
      <footer className="bg-gray-800 text-white p-4">
        {/* Your Footer Content */}
      </footer>
    </div>
  );
};

export default BlogDetails;
