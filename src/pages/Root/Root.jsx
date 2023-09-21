import React, { useState } from "react";
import AuthenticatedRoute from "../../authentication/AuthenticatedRoute";
import Header from "../../components/Header/Header";
import { Outlet } from "react-router-dom";
import { AuthContextProvider } from "../../context/AuthContext";
import Menu from '../../components/Menu/Menu';

export default function Root(props) {
  const [products, setProducts] = useState([]);

  return (
    <div className="App">
      <div
        id="main-wrapper"
        data-theme="light"
        data-layout="vertical"
        data-navbarbg="skin6"
        data-sidebartype="full"
        data-sidebar-position="fixed"
        data-header-position="fixed"
        data-boxed-layout="full"
      >
        <AuthContextProvider>
          <AuthenticatedRoute>
            <Header></Header>
            <Menu></Menu>
            <Outlet></Outlet>
          </AuthenticatedRoute>
        </AuthContextProvider>
      </div>
    </div>
  );
}
