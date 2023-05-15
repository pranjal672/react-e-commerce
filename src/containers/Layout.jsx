import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import ScrollToTop from "../component/ScrollToTop";
import BreadCrumb from "../component/BreadCrumb";

const Layout = () => {
    return (
        <>
            <Navbar />
            <BreadCrumb />
            <Outlet />
            <ScrollToTop />
            <Footer />
        </>
    )
}

export default Layout