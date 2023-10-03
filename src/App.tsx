import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthenticatedRoute from './authentication/AuthenticatedRoute';
import Customer from "./pages/Customer/Customer";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import NewProduct from "./pages/New/NewProduct";
import Products from "./pages/Products/Products";
import Root from "./components/Root/Root";
import Signup from "./pages/Signup/Signup";
import Users from "./pages/Users/Users";
import './global.scss';

export default function App() {

  const router = createBrowserRouter([
    {
      path: "",
      element: <Root />,
      children: [
        {
          path: "",
          element: <AuthenticatedRoute />,
          children: [
            {
              index: true,
              element: <Home />,
            },
            {
              path: "customer",
              element: <Customer />,
            },
            {
              path: "users",
              element: <Users />,
            },
            {
              path: "products",
              element: <Products />,
            },
            {
              path: "product/new",
              element: <NewProduct />,
            },
            {
              path: "product/:id",
              element: <NewProduct />,
            },
          ]
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "signup",
          element: <Signup />,
        },
      ],
    }
  ]);
  return <RouterProvider router={router} />;
}
