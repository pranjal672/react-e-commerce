import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"

const BreadCrumb = () => {
    const location = useLocation()
    let currentLink = ""

    const crumbs = location.pathname.split("/").filter(crumb => crumb !== "").map(crumb => {
        currentLink += `/${crumb}`

        return <div className="crumb" key={crumb}>
            <span>{"/"}</span>
            <Link to={currentLink}>{crumb}</Link>
        </div>
    })


    return (
        <section className="breadcrumb">
            <div className="container">
                <div className="breadcrumb-container">
                    {crumbs}
                </div>
            </div>
        </section>
    )
}

export default BreadCrumb