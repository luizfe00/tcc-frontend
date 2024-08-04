import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PublicRoutes } from "./PublicRoutes";

const router = createBrowserRouter(PublicRoutes);

export const AppRouteProvider = <RouterProvider router={router} />;
