import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";

function Header({ toggleSidebar, isDarkMode, toggleTheme }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Search states
  const [searchText, setSearchText] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Notification states
  const [showNotifications, setShowNotifications] = useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "Welcome to MyPatientHUB!",
      read: false,
    },
    {
      id: 2,
      message: "Explore doctors and clinics on MyPatientHUB.",
      read: false,
    },
    {
      id: 3,
      message: "You can manage your profile in Account Settings.",
      read: false,
    },
  ]);

  // All searchable pages
  const pages = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Appointments", path: "/appointments" },
    { name: "Find Doctor", path: "/find-doctor" },
    { name: "Find Clinic", path: "/find-clinic" },
    { name: "Find Pharmacy", path: "/find-pharmacy" },
    { name: "Marketplace", path: "/find-marketplace" },
    { name: "My Dependents", path: "/dependents" },
    { name: "Chat", path: "/chat" },
    { name: "My Account", path: "/account" },
    { name: "Settings", path: "/settings" },
  ];

  // Current page title
  let pageName = "Dashboard";

  const currentPage = pages.find((page) => page.path === location.pathname);

  if (currentPage) {
    pageName = currentPage.name;
  }

  // Filter search results
  const searchResults = pages.filter((page) =>
    page.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  // Navigate to a selected page
  function handleSelectPage(path) {
    navigate(path);
    setSearchText("");
    setShowSuggestions(false);
  }

  // Search when Enter is pressed
  function handleSearch(event) {
    event.preventDefault();

    if (searchText.trim() === "") {
      return;
    }

    if (searchResults.length > 0) {
      handleSelectPage(searchResults[0].path);
    }
  }

  // Open or close notifications
  function toggleNotifications() {
    setShowNotifications(!showNotifications);
    setShowSuggestions(false);
  }

  // Mark all notifications as read
  function markAllAsRead() {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      read: true,
    }));

    setNotifications(updatedNotifications);
  }

  // Count unread notifications
  const unreadCount = notifications.filter(
    (notification) => !notification.read,
  ).length;

  return (
    <header className="header">
      {/* LEFT SIDE */}

      <div className="header-title">
        <div className="breadcrumb">
          <i className="fa-solid fa-house"></i>
          <span>/</span>
          <span>{pageName}</span>

          <button
            type="button"
            className="mobile-menu"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>

        <h2>{pageName}</h2>
      </div>

      {/* RIGHT SIDE */}

      <div className="header-right">
        {/* SEARCH BAR */}

        <div className="header-search-container">
          <form className="header-search" onSubmit={handleSearch}>
            <i className="fa-solid fa-magnifying-glass"></i>

            <input
              type="text"
              placeholder="Search pages..."
              value={searchText}
              onChange={(event) => {
                setSearchText(event.target.value);
                setShowSuggestions(true);
                setShowNotifications(false);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => {
                setTimeout(() => {
                  setShowSuggestions(false);
                }, 150);
              }}
              aria-label="Search pages"
            />
          </form>

          {showSuggestions && searchText.trim() !== "" && (
            <div className="search-suggestions">
              {searchResults.length > 0 ? (
                searchResults.map((page) => (
                  <button
                    type="button"
                    key={page.path}
                    className="search-suggestion-item"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => handleSelectPage(page.path)}
                  >
                    <i className="fa-solid fa-magnifying-glass"></i>
                    {page.name}
                  </button>
                ))
              ) : (
                <p className="no-search-results">No matching page found</p>
              )}
            </div>
          )}
        </div>

        {/* DARK MODE BUTTON */}

        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          title={isDarkMode ? "Light Mode" : "Dark Mode"}
          aria-label={
            isDarkMode ? "Switch to light mode" : "Switch to dark mode"
          }
          aria-pressed={isDarkMode}
        >
          <i
            className={isDarkMode ? "fa-solid fa-sun" : "fa-solid fa-moon"}
          ></i>
        </button>

        {/* LOG OUT */}

        <Link to="/login" className="logout">
          <i className="fa-solid fa-circle-user"></i>
          Log out
        </Link>

        {/* SETTINGS ICON */}

        <Link
          to="/settings"
          className="header-icon-button"
          title="Account Settings"
          aria-label="Open account settings"
        >
          <i className="fa-solid fa-gear header-icon"></i>
        </Link>

        {/* NOTIFICATIONS */}

        <div className="notification-container">
          <button
            type="button"
            className="header-icon-button"
            onClick={toggleNotifications}
            title="Notifications"
            aria-label="Notifications"
            aria-expanded={showNotifications}
          >
            <i className="fa-solid fa-bell header-icon"></i>

            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
          </button>

          {showNotifications && (
            <div className="notification-dropdown">
              <div className="notification-header">
                <h3>Notifications</h3>

                <button
                  type="button"
                  onClick={markAllAsRead}
                  disabled={unreadCount === 0}
                >
                  Mark all as read
                </button>
              </div>

              <div className="notification-list">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={
                      notification.read
                        ? "notification-item"
                        : "notification-item unread"
                    }
                  >
                    <i className="fa-solid fa-circle-info"></i>

                    <p>{notification.message}</p>

                    {!notification.read && <span className="unread-dot"></span>}
                  </div>
                ))}
              </div>

              {unreadCount === 0 && (
                <p className="all-read-message">You're all caught up!</p>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
