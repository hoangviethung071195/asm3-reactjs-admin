import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

function Menu(props) {
  const ctx = useContext(AuthContext);
  return (
    <aside className="left-sidebar" data-sidebarbg="skin6">
      <div className="scroll-sidebar" data-sidebarbg="skin6">
        <nav className="sidebar-nav">
          <ul id="sidebarnav">
            {!!(ctx.currentUser.role === 1) && (
              <>
                <NavLink
                  className={({ isActive }) =>
                    "sidebar-item " + (isActive ? "selected" : "")
                  }
                  to="/"
                >
                  <div className="sidebar-link sidebar-link">
                    <i data-feather="home" className="feather-icon"></i>
                    <span className="hide-menu">Dashboard</span>
                  </div>
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    "sidebar-item " + (isActive ? "selected" : "")
                  }
                  to="/new"
                >
                  <div className="sidebar-link">
                    <i data-feather="settings" className="feather-icon"></i>
                    <span className="hide-menu">New Product</span>
                  </div>
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    "sidebar-item " + (isActive ? "selected" : "")
                  }
                  to="/users"
                >
                  <div className="sidebar-link ">
                    <i
                      data-feather="message-square"
                      className="feather-icon"
                    ></i>
                    <span className="hide-menu">Users</span>
                  </div>
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    "sidebar-item " + (isActive ? "selected" : "")
                  }
                  to="/products"
                >
                  <div className="sidebar-link ">
                    <i
                      data-feather="message-square"
                      className="feather-icon"
                    ></i>
                    <span className="hide-menu">Products</span>
                  </div>
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    "sidebar-item " + (isActive ? "selected" : "")
                  }
                  to="/quantity"
                >
                  <div className="sidebar-link ">
                    <i
                      data-feather="message-square"
                      className="feather-icon"
                    ></i>
                    <span className="hide-menu">Quantity</span>
                  </div>
                </NavLink>
              </>
            )}
            <NavLink
              className={({ isActive }) =>
                "sidebar-item " + (isActive ? "selected" : "")
              }
              to="/chat"
            >
              <div className="sidebar-link sidebar-link">
                <i data-feather="message-square" className="feather-icon"></i>
                <span className="hide-menu">Customer</span>
              </div>
            </NavLink>
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default Menu;
