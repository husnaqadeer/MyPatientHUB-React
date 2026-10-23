
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

function Header({ toggleSidebar }) {
    const location = useLocation();

    let pageName = "Dashboard";

    if (location.pathname === "/dashboard") {
        pageName = "Dashboard";
    } else if (location.pathname === "/find-marketplace") {
        pageName = "Marketplace";
    } else if (location.pathname === "/find-doctor") {
        pageName = "Find Doctor";
    } else if (location.pathname === "/find-clinic") {
        pageName = "Find Clinic";
    } else if (location.pathname === "/find-pharmacy") {
        pageName = "Find Pharmacy";
    } else if (location.pathname === "/dependents") {
        pageName = "My Dependents";
    } else if (location.pathname === "/appointments") {
        pageName = "Appointments";
    } else if (location.pathname === "/chat") {
        pageName = "Chat";
    } else if (location.pathname === "/account") {
        pageName = "My Account";
    } else if (location.pathname === "/settings") {
        pageName = "Settings";
    }

    return (
        <header className="header">

            <div className="header-title">
                <div className="breadcrumb">
                    <i className="fa-solid fa-house"></i>
                    <span>/</span>
                    <span>{pageName}</span>

                    <i
                        className="fa-solid fa-bars mobile-menu"
                        onClick={toggleSidebar}
                    ></i>
                </div>

                <h2>{pageName}</h2>
            </div>

            <div className="header-right">

                <div className="header-search">
                    <i className="fa-solid fa-magnifying-glass"></i>

                    <input
                        type="text"
                        placeholder="Type here..."
                    />
                </div>

                <Link to="/login" className="logout">
                    <i className="fa-solid fa-circle-user"></i>
                    Log out
                </Link>

                <i className="fa-solid fa-gear header-icon"></i>

                <i className="fa-solid fa-bell header-icon"></i>

            </div>
        </header>
    );
}

export default Header;
