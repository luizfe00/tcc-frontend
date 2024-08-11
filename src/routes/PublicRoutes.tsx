import { RouteObject } from "react-router-dom";
import LoginPage from "../pages/Login";
import HomePage from "../pages/Home";
import { PapersPage } from "@/pages/Papers";
import { DashboardPage } from "@/pages/Dashboard";

export const PublicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <LoginPage />,
  },
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
];
