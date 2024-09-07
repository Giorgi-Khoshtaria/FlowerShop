import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./Pages/Home";
import ShopPage from "./Pages/ShopPage";
import Blogs from "./Pages/Blogs";
import About from "./Pages/About";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ForgotPassword from "./Pages/ForgotPassword";
import Profile from "./Pages/Profile";
import AddBlogs from "./Pages/AddBlogs";
import AddFlowers from "./Pages/AddFolwers";
import BlogDetails from "./Pages/BlogDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "shop",
        element: <ShopPage />,
      },
      {
        path: "blog",
        element: <Blogs />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "addblogs",
        element: <AddBlogs />,
      },
      {
        path: "blogDetails/:blogid",
        element: <BlogDetails />,
      },
      {
        path: "addflowers",
        element: <AddFlowers />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "forgotpassword",
    element: <ForgotPassword />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
