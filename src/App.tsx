import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./Pages/MainPages/Home";
import ShopPage from "./Pages/MainPages/ShopPage";
import Blogs from "./Pages/MainPages/Blogs";
import About from "./Pages/MainPages/About";
import Login from "./Pages/AuthPages/Login";
import Register from "./Pages/AuthPages/Register";
import ForgotPassword from "./Pages/AuthPages/ForgotPassword";
import Profile from "./Pages/UserPages/Profile";
import AddBlogs from "./Pages/UserPages/AddBlogs";
import AddFlowers from "./Pages/AdminPages/AddFolwers";
import BlogDetails from "./Pages/UserPages/BlogDetails";

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
