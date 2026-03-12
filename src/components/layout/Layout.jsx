import { Outlet } from "react-router-dom";
import Nav from "../page/Navbar/Nav";
import Footer from "../page/Footer/Footer";

const Layout = () => {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
