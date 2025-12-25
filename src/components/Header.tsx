import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logout } from "../services/AuthServices";
import { useState } from "react";

function Header() {
  const { user, userData, loading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="container nav-container">
        <div className="logo">
          <Link to="/">
            <i className="ri-briefcase-4-fill"></i> Job<span>Cy</span>
          </Link>
        </div>

        {/* Mobile toggle */}
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          <i className={menuOpen ? "ri-close-line" : "ri-menu-line"}></i>
        </div>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/jobs" onClick={() => setMenuOpen(false)}>Jobs</Link>
          <Link to="/companies" onClick={() => setMenuOpen(false)}>Companies</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>

          {loading ? (
            <p>Loading...</p>
          ) : user && userData ? (
            <div className="butn">
              <span>
                <i className="ri-user-line"></i>
              </span>
              <ul className="dropdown">
                {userData.role === "candidate" ? (
                  <>
                    <li><Link to="/candidate-profile">Profile</Link></li>
                    <li><Link to="/my-jobs">My Jobs</Link></li>
                  </>
                ) : (
                  <>
                    <li><Link to="/employer-profile">Profile</Link></li>
                    <li><Link to="/employer-my-jobs">My Jobs</Link></li>
                    <li><Link to="/post-job">Post a Job</Link></li>
                  </>
                )}
                <li><Link to="" onClick={logout}>Logout</Link></li>
              </ul>
            </div>
          ) : (
            <Link to="/signin" className="btn primary-btn">
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
