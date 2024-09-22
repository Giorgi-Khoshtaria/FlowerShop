import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="flex-1 flex items-center justify-center mt-20 p-4">
      <div className="max-w-[1440px] w-full flex items-center justify-center">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 w-full">
          <Link
            to={`/users`}
            className="block text-center bg-yellow text-white py-6 px-4 rounded-lg text-xl font-semibold hover:bg-blue-600 transition-colors"
          >
            Users
          </Link>
          <Link
            to={`/blogsAdmin`}
            className="block text-center bg-yellow text-white py-6 px-4 rounded-lg text-xl font-semibold hover:bg-green-600 transition-colors"
          >
            Blogs
          </Link>
          <Link
            to={`/comments`}
            className="block text-center bg-yellow text-white py-6 px-4 rounded-lg text-xl font-semibold hover:bg-red-600 transition-colors"
          >
            Comments
          </Link>
          <Link
            to={`/flowersAdmin`}
            className="block text-center bg-yellow text-white py-6 px-4 rounded-lg text-xl font-semibold hover:bg-pink-600 transition-colors"
          >
            Flowers
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
