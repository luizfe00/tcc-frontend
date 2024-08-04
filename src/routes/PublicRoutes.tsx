import { RouteObject } from "react-router-dom";
import LoginPage from "../pages/Login";
import HomePage from "../pages/Home";

export const PublicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
];
