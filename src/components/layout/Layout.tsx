import Header from "../Header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="">
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;
