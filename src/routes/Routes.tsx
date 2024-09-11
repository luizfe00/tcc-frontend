import { RouteObject } from "react-router-dom";
import LoginPage from "../pages/Login";
import { DashboardPage } from "@/pages/Dashboard";
import HomePage from "@/pages/Home";
import { PapersPage } from "@/pages/Papers";
import { CoordinatorRoute, PrivateRoute } from "./PrivateRoute";

export const PublicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/papers",
        element: <PapersPage />,
      },
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        element: <CoordinatorRoute />,
        children: [
          {
            path: "/dashboard",
            element: <DashboardPage />,
          },
        ],
      },
    ],
  },
];
