import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface BlogDetail {
  blogUserImage: string;
  blogUserName: string;
  createdAt: string;
  blogImage: string;
  blogName: string;
  blogDescription: string;
  likes: number;
  views: number;
}

const BlogDetails: React.FC = () => {
  const { blogid } = useParams<{ blogid: string }>(); // Access the blogId from the URL
  const [blog, setBlog] = useState<BlogDetail | null>(null);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3005/api/blogs/getBlog/${blogid}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(blog);
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };

    fetchBlogDetails();
  }, [blogid]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  const formattedDate = new Date(blog.createdAt).toLocaleDateString();

  return (
    <div className="p-10">
      <div className="flex items-center mb-6">
        {blog.blogUserImage ? (
          <img
            src={blog.blogUserImage}
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
          <p className="font-semibold">{blog.blogUserName}</p>
          <p className="text-sm text-gray-500">{formattedDate}</p>
        </div>
      </div>
      <img src={blog.blogImage} alt="Blog" className="w-full h-auto mb-6" />
      <h1 className="text-3xl font-bold mb-4">{blog.blogName}</h1>
      <p className="text-lg mb-4">{blog.blogDescription}</p>
      <div className="flex items-center gap-4">
        <p className="flex items-center">
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
          {blog.likes} Likes
        </p>
        <p className="flex items-center">
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
          {blog.views} Views
        </p>
      </div>
    </div>
  );
};

export default BlogDetails;
