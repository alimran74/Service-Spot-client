import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import MainLayout from "../layouts/MainLayout";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Error from "../pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <Error/> ,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: '/register',
        Component: Register,
      },
      {
        path:'/login',
        Component: Login,
      }
    ],
  },
]);

export default router;
