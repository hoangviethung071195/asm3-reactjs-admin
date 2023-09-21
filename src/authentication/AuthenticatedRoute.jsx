import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Header from "../components/Header/Header";
import Menu from '../components/Menu/Menu';

const AuthenticatedRoute = ({ children }) => {
  const ctx = useContext(AuthContext);
  console.log("ctx", ctx.currentUser);
  if (ctx?.isAuthenticated) {
    if (ctx.currentUser.role > 1) {
      return (
        <>
          <Header />
          <Menu />
          <Navigate to="/chat" />
        </>
      );
    }
    return children;
  }
  return <Navigate to="/login" />;
};

export default AuthenticatedRoute;
