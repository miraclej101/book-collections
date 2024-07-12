import { Link } from "react-router-dom";
import { useAuth } from "../contexts/authentication";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top"
      id="mainNav"
    >
      <div className="container px-4">
        <Link className="navbar-brand" to={"/"}>
          Personal Book Collection Manangement
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {
          isAuthenticated ? 
          (
            <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/collection"}>
                  My collection
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/collection/add"}>
                  Add a book
                </Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-danger" onClick={logout} >
                  Sign out
                </button>
              </li>
            </ul>
          </div>
          ) :
          (
            <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/register"} >
                  Sign up
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/login"} >
                  Sign in
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" >
                  Contact
                </Link>
              </li>
            </ul>
            </div>
          )
        }
      </div>
    </nav>
  );
}
