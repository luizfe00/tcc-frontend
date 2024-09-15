import { RouteObject } from "react-router-dom";
import LoginPage from "../pages/Login";
import { DashboardPage } from "@/pages/Dashboard";
import HomePage from "@/pages/Home";
import { PapersPage } from "@/pages/Papers";
import { CoordinatorRoute, PrivateRoute } from "./PrivateRoute";
import { ProfessorsPage } from "@/pages/Professors";
import { ProfessorDetails } from "@/pages/ProfessorDetails";
import { StudentsPage } from "@/pages/Students";
import { CategoriesPage } from "@/pages/Categories";
import { ThemesPage } from "@/pages/Themes";
import { PapersListPage } from "@/pages/PapersList";

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
          {
            path: "/dashboard/professors",
            element: <ProfessorsPage />,
          },
          {
            path: "/professor",
            element: <ProfessorDetails />,
          },
          {
            path: "/dashboard/students",
            element: <StudentsPage />,
          },
          {
            path: "/dashboard/categories",
            element: <CategoriesPage />,
          },
          {
            path: "/dashboard/themes",
            element: <ThemesPage />,
          },
          {
            path: "/dashboard/papers",
            element: <PapersListPage />,
          },
        ],
      },
    ],
  },
];
