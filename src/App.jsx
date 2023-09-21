import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Chat from "./pages/Chat/Chat";
import EditProduct from "./pages/Edit/EditProduct";
import Login from "./pages/Login/Login";
import NewProduct from "./pages/New/NewProduct";
import Products from "./pages/Products/Products";
import Quantity from "./pages/Quantity/Quantity";
import Users from "./pages/Users/Users";
import Root from "./pages/Root/Root";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import { AuthContextProvider } from "./context/AuthContext";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Root></Root>,
      children: [
        {
          index: true,
          element: <Home></Home>,
        },
        {
          path: "chat",
          element: <Chat></Chat>,
        },
        {
          path: "users",
          element: <Users></Users>,
        },
        {
          path: "products",
          element: <Products></Products>,
        },
        {
          path: "quantity",
          element: <Quantity></Quantity>,
        },
        {
          path: "new",
          element: <NewProduct></NewProduct>,
        },
        {
          path: "edit/:productId",
          element: <EditProduct></EditProduct>,
        },
      ],
    },
    {
      path: "login",
      element: (
        <AuthContextProvider>
          <Login></Login>
        </AuthContextProvider>
      ),
    },
    {
      path: "signup",
      element: <Signup></Signup>,
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}
