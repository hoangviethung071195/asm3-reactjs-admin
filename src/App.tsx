import './global.scss';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthenticatedRoute from 'authentication/AuthenticatedRoute';
import Root from 'components/root/Root';
import Home from 'pages/home/Home';
import Customer from 'pages/customer/Customer';
import Users from 'pages/users/Users';
import Products from 'pages/products/Products';
import NewProduct from 'pages/new/NewProduct';
import SignIn from 'pages/login/Login';
import SignUp from 'pages/signup/Signup';

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
          element: <SignIn />,
        },
        {
          path: "signup",
          element: <SignUp />,
        },
      ],
    }
  ]);
  return <RouterProvider router={router} />;
}
