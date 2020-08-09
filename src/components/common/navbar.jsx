import React from "react";
import { NavLink, Link } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        Vidly
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <NavLink to="/movies" className="nav-item nav-link">
            Movies
          </NavLink>

          <NavLink to="/rentals" className="nav-item nav-link">
            Rentals
          </NavLink>

          <NavLink to="/counter" className="nav-item nav-link">
            Counter
          </NavLink>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          {!user && (
            <React.Fragment>
              <NavLink
                to="/login"
                className="btn btn-outline-success m-2 my-sm-0"
              >
                 <i
                  style={{ cursor: "pointer"}}
                  className="fa fa-sign-in mr-2"
                  aria-hidden="true"
                ></i>
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="btn btn-outline-info m-2 my-sm-0"
              >
                 <i
                  style={{ cursor: "pointer"}}
                  className="fa fa-user-plus mr-2"
                  aria-hidden="true"
                ></i>
                Register
              </NavLink>
            </React.Fragment>
          )}

          {user && (
            <React.Fragment>
              <NavLink to="/profile" className="btn btn-outline-success m-2">
                <i
                  style={{ cursor: "pointer" }}
                  className="fa fa-user mr-2"
                  aria-hidden="true"
                ></i>
                {user.name}
              </NavLink>

              <NavLink to="/logout" className="btn btn-outline-danger m-2">
              <i
                  style={{ cursor: "pointer"}}
                  className="fa fa-sign-out mr-2"
                  aria-hidden="true"
                ></i>
                Logout
              </NavLink>
            </React.Fragment>
          )}
        </form>
      </div>
    </nav>
  );
};

export default NavBar;
