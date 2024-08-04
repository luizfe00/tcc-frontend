import { RouteObject } from "react-router-dom";
import LoginPage from "../pages/Login";
import HomePage from "../pages/Home";
import { PapersPage } from "@/pages/Papers";

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
];
