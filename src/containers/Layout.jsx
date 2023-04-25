import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import ScrollToTop from "../component/ScrollToTop";


const Layout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <ScrollToTop />
            <Footer />
        </>
    )
}

export default Layout