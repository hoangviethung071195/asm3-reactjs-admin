import './global.scss';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthenticatedRoute from 'authentication/authenticatedRoute';
import Root from 'components/root/root';
import Home from 'pages/home/home';
import Customer from 'pages/customer/customer';
import Users from 'pages/users/users';
import Products from 'pages/products/products';
import NewProduct from 'pages/new/newProduct';
import SignIn from 'pages/login/login';
import SignUp from 'pages/signup/signup';

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
