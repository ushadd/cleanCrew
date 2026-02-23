import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import logo from "../assets/img.png";
import AdminDashboard from "../pages/AdminDashboard.jsx";

// Service data for search autocomplete
const allServices = [
  { id: 1, name: "Home Cleaning", value: "Cleaning", description: "Comprehensive sanitation for living spaces" },
  { id: 2, name: "Commercial Cleaning", value: "Commercial Clean", description: "Professional workspace maintenance" },
  { id: 3, name: "Deep Cleaning", value: "Deep Clean", description: "Intensive top-to-bottom scrub" },
  { id: 4, name: "House Cleaning", value: "Cleaning", description: "Complete house cleaning services" },
  { id: 5, name: "Office Cleaning", value: "Commercial Clean", description: "Office and workspace cleaning" },
  { id: 6, name: "Home Services", value: "Cleaning", description: "All home cleaning solutions" },
  { id: 7, name: "House Services", value: "Cleaning", description: "Professional house cleaning" }
];

function Header() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const searchRef = useRef(null);

  // User state
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Update user state when localStorage changes
  useEffect(() => {
    const updateUserState = () => {
      setUserId(localStorage.getItem("userId"));
      setUserRole(localStorage.getItem("userRole"));
      setUserName(localStorage.getItem("userName"));
    };

    // Listen for storage events (when user logs in/out)
    window.addEventListener('storage', updateUserState);

    // Also check on mount
    updateUserState();

    return () => window.removeEventListener('storage', updateUserState);
  }, []);

  // Handle input change - show all services when user types anything
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setSelectedService(null);
    // Show dropdown if there's any input
    if (query.length > 0) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  // Handle service selection from dropdown
  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setSearchQuery(service.name);
    setShowDropdown(false);
  };

  // Handle search button click
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // If a service is selected, navigate to staff selection
    if (selectedService) {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        // Navigate to login first, then to staff selection
        navigate('/login', { state: { selectedService: selectedService.value, redirectTo: '/staff-selection' } });
      } else {
        navigate('/staff-selection', { state: { selectedService: selectedService.value } });
      }
    } else if (searchQuery) {
      // If user typed something but didn't select from dropdown, show all services
      const userId = localStorage.getItem("userId");
      if (!userId) {
        navigate('/login', { state: { selectedService: "Cleaning", redirectTo: '/staff-selection' } });
      } else {
        navigate('/staff-selection', { state: { selectedService: "Cleaning" } });
      }
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    setUserId(null);
    setUserRole(null);
    setUserName(null);
    navigate("/");
    setShowUserMenu(false);
  };

  // Handle user menu click
  const handleUserMenuClick = (path) => {
    navigate(path);
    setShowUserMenu(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
      <div className="container">

        {/* LEFT: Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={logo}
            alt="CleanCrew Logo"
            width="40"
            height="40"
            className="me-2"
          />
          <span className="fw-bold">CleanCrew</span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">

          {/* CENTER: Search Bar with Autocomplete */}
          <div className="mx-auto search-container" ref={searchRef}>
            <form className="d-flex search-form" onSubmit={handleSearchSubmit}>
              <div className="search-input-wrapper">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search services (e.g., home, house, cleaning...)"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => searchQuery && setShowDropdown(true)}
                />
              </div>
              <button className="btn btn-light" type="submit">
                Search
              </button>
            </form>
            {/* Autocomplete Dropdown - rendered outside form to prevent header expansion */}
            {showDropdown && (
              <div className="search-dropdown">
                {allServices.map((service) => (
                  <div
                    key={service.id}
                    className="search-dropdown-item"
                    onClick={() => handleServiceSelect(service)}
                  >
                    <div className="service-name">{service.name}</div>
                    <div className="service-description">{service.description}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Navigation Links */}
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/services">Services</Link>
            </li>

            {/* Show different links based on login status */}
            {userId ? (
              <>
                {/* Booking History - visible to all logged in users */}
                <li className="nav-item">
                  <Link className="nav-link" to="/my-bookings">My Bookings</Link>
                </li>

                {/* Admin link - only for admin */}
                {userRole === "Admin" && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin">Admin</Link>
                  </li>
                )}

                {/* User menu dropdown */}
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="userMenu"
                    role="button"
                    data-bs-toggle="dropdown"
                    onClick={(e) => { e.preventDefault(); setShowUserMenu(!showUserMenu); }}
                  >
                    {userName || "Account"}
                  </a>
                  <ul className={`dropdown-menu ${showUserMenu ? 'show' : ''}`} aria-labelledby="userMenu">
                    <li>
                      <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); handleUserMenuClick("/my-bookings"); }}>
                        My Bookings
                      </a>
                    </li>
                    {userRole === "Staff" && (
                      <li>
                        <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); handleUserMenuClick("/booking"); }}>
                          My Assignments
                        </a>
                      </li>
                    )}
                    {userRole === "Admin" && (
                      <li>
                        <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); handleUserMenuClick("/admin"); }}>
                          Admin Dashboard
                        </a>
                      </li>
                    )}
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}>
                        Logout
                      </a>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            )}
          </ul>

        </div>
      </div>
    </nav>
  );
}

export default Header;
