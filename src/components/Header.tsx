import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logout } from "../services/AuthServices";

function Header() {
  const { user, userData ,loading } = useAuth();
  //  loading ? "loading " : console.log(userData.role);
  return (
    <>
      <header className="navbar">
        <div className="container nav-container">
          <div className="logo">
           <Link to="/"> <i className="ri-briefcase-4-fill"></i> Job<span>Cy</span></Link>
          </div>

          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/jobs">Jobs</Link>
            <Link to="/companies">Companies</Link>
            <Link to="/about">About</Link>
             
            {
            
            loading ? <p>loading....</p> : 
            user && userData ? userData.role == "candidate" ? (
              <div className="butn">
                <span>
                 <i className="ri-user-line"></i>
                </span>
                 
                <ul className="dropdown">
                  <li>
                    <Link to="/candidate-profile">Profile</Link>
                  </li>
                  <li>
                    <Link to="/my-jobs">My Jobs</Link>
                  </li>
                  <li>
                    <Link to="" onClick={()=>logout()} >Logout</Link>
                  </li>
                </ul>
              </div>
            ): ( <div className="butn">
                <span>
                 <i className="ri-user-line"></i>
                </span>
                 
                <ul className="dropdown">
                  <li>
                    <Link to="/employer-profile">Profile</Link>
                  </li>
                  <li>
                    <Link to="/my-jobs">My Jobs</Link>
                  </li>
                  <li>
                    <Link to="/post-job">Post a Job</Link>
                  </li>
                  <li>
                    <Link to="" onClick={()=>logout()} >Logout</Link>
                  </li>
                </ul>
              </div>) : (
              <Link to="/signin" className="btn primary-btn">
                Sign In
              </Link>
            )}
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
