import { Link, NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({ sidebarOpen }) {
  return (
    <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
      {/* LOGO */}
      <Link to="/dashboard" className="logo">
        <div className="logo-icon">
          <span className="medical-cross"></span>
          <span className="hub-dot"></span>
        </div>

        <div className="logo-text">
          <span className="logo-name">
            MyPatient<span>HUB</span>
          </span>
          <small>Your health, connected</small>
        </div>
      </Link>

      {/* NAVIGATION */}
      <nav>
        <NavLink to="/dashboard" end className="sidebar-link">
          <i className="fa-solid fa-table-columns"></i>
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/appointments" className="sidebar-link">
          <i className="fa-solid fa-calendar-days"></i>
          <span>Appointments</span>
        </NavLink>

        <NavLink to="/find-doctor" className="sidebar-link">
          <i className="fa-solid fa-user-doctor"></i>
          <span>Find Doctor</span>
        </NavLink>

        <NavLink to="/find-clinic" className="sidebar-link">
          <i className="fa-solid fa-hospital"></i>
          <span>Find Clinic</span>
        </NavLink>

        <NavLink to="/chat" className="sidebar-link">
          <i className="fa-solid fa-comments"></i>
          <span>Chat</span>
        </NavLink>

        <NavLink to="/find-marketplace" className="sidebar-link">
          <i className="fa-solid fa-store"></i>
          <span>Find Marketplace</span>
        </NavLink>

        <NavLink to="/find-pharmacy" className="sidebar-link">
          <i className="fa-solid fa-pills"></i>
          <span>Find Pharmacy</span>
        </NavLink>

        <NavLink to="/dependents" className="sidebar-link">
          <i className="fa-solid fa-clipboard-list"></i>
          <span>My Dependents</span>
        </NavLink>

        <NavLink to="/account" className="sidebar-link">
          <i className="fa-solid fa-user-gear"></i>
          <span>My Account</span>
        </NavLink>

        <NavLink to="/settings" className="sidebar-link">
          <i className="fa-solid fa-screwdriver-wrench"></i>
          <span>Settings</span>
        </NavLink>
      </nav>

      {/* HELP */}
      <div className="help">
        <div className="help-icon">
          <i className="fa-solid fa-question"></i>
        </div>

        <div className="help-text">
          <strong>Need help?</strong>
          <small>We're here for you</small>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
