import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { loadGlobalSettings } from '../service/global.service';
import Layout from 'Layout/Layout';

const AuthenticatedRoute = () => {
  const ctx = useContext(AuthContext);
  console.log("ctx", ctx.currentUser);
  if (ctx.isAuthenticated) {
    loadGlobalSettings();
    return (
      <Layout>
        <Outlet />
      </Layout>
    );
  }
  return <Navigate to="/login" />;
};

export default AuthenticatedRoute;
