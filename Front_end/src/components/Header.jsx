import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import logo from "../assets/img.png";
import "./Header.css"; // Ensure you create this CSS file

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
  const searchRef = useRef(null);

  // User state
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Filter services based on input
  const filteredServices = allServices.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setShowDropdown(query.length > 0);
  };

  const handleServiceSelect = (service) => {
    setSearchQuery(service.name);
    setShowDropdown(false);
    const uid = localStorage.getItem("userId");
    if (!uid) {
      navigate('/login', { state: { selectedService: service.value, redirectTo: '/staff-selection' } });
    } else {
      navigate('/staff-selection', { state: { selectedService: service.value } });
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (filteredServices.length > 0) {
      handleServiceSelect(filteredServices[0]);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setUserId(null);
    setUserRole(null);
    setUserName(null);
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
      <div className="container">
        {/* LEFT: Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="Logo" width="40" height="40" className="me-2" />
          <span className="fw-bold">CleanCrew</span>
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">

          {/* CENTER: Corrected Search Bar */}
          <div className="mx-auto search-wrapper" ref={searchRef}>
            <form className="d-flex" onSubmit={handleSearchSubmit}>
              <input
                className="form-control search-input"
                type="search"
                placeholder="Search services..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => searchQuery.length > 0 && setShowDropdown(true)}
              />
              <button className="btn btn-search-submit" type="submit">Search</button>
            </form>

            {showDropdown && filteredServices.length > 0 && (
              <div className="search-dropdown">
                {filteredServices.map((service) => (
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

          {/* RIGHT: Links */}
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/services">Services</Link></li>

            {userId ? (
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle btn btn-link"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  {userName || "Account"}
                </button>
                <ul className={`dropdown-menu ${showUserMenu ? 'show' : ''} dropdown-menu-end`}>
                  <li><Link className="dropdown-item" to="/my-bookings">My Bookings</Link></li>
                  {userRole === "Admin" && <li><Link className="dropdown-item" to="/admin">Dashboard</Link></li>}
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                </ul>
              </li>
            ) : (
              <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;