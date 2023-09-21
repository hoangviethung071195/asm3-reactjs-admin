import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

function Header(props) {
  const { user } = useContext(AuthContext);
  const ctx = useContext(AuthContext);

  const handleLogout = () => {
    ctx.onLogout();
  };

  return (
    <header className="topbar" data-navbarbg="skin6">
      <nav className="navbar top-navbar navbar-expand-md">
        <div className="navbar-header" data-logobg="skin6">
          <a
            className="nav-toggler waves-effect waves-light d-block d-md-none"
            href="#"
          >
            <i className="ti-menu ti-close"></i>
          </a>
          <div className="navbar-brand">
            <Link to="/">
              <span className="logo-text">
                <span>Admin Page</span>
              </span>
            </Link>
          </div>
        </div>
        <div className="navbar-collapse collapse" id="navbarSupportedContent">
          <ul className="navbar-nav float-left mr-auto ml-3 pl-1">
            <li className="nav-item dropdown">
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">
                  Action
                </a>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </li>
          </ul>
          <ul className="navbar-nav float-right">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                style={{ color: "#1c2d41" }}
              >
                <span className="ml-2 d-none d-lg-inline-block">
                  {ctx.currentUser.fullName && (
                    <span>Hello, {ctx.currentUser.fullName}</span>
                  )}
                  <span className="">{user ? user.email : ""}</span>{" "}
                  <i data-feather="chevron-down" className="svg-icon"></i>
                </span>
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                onClick={handleLogout}
                style={{ cursor: "pointer" }}
              >
                (Logout)
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
