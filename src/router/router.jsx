import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import MainLayout from "../layouts/MainLayout";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Error from "../pages/Error";
import AllServices from "../components/services/AllServices";
import AuthLayout from "../layouts/AuthLayout";
import PrivateRoute from "./PrivateRouter";
import AddService from "../components/services/AddService";
import MyServices from "../components/services/MyServices";
import MyReview from "../components/services/MyReview";

import ServiceDetails from "../components/services/ServiceDetails";

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
      },
      {
        path:'/allServices',
        element: <AllServices/>
      },
      {
        path:'/services/:id',
        element: <ServiceDetails/>
      },
      {
        
      }
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout/>,
    children:[
      {
        path:'/auth/addServices',
        element:(
          <PrivateRoute>
            <AddService/>
          </PrivateRoute>
        ),
      },
      {
        path: '/auth/myServices',
        element:(
          <PrivateRoute>
            <MyServices/>
          </PrivateRoute>
        ),
      },
      {
        path:'/auth/myReview',
        element:(
          <PrivateRoute>
            <MyReview/>
          </PrivateRoute>
        )
      }
    ]
  }
]);

export default router;
