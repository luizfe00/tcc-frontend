import { useUserStore } from "@/user/user.store";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const user = useUserStore((state) => state.user);

  if (!user) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export const CoordinatorRoute = () => {
  const user = useUserStore((state) => state.user);

  if (!user || user.role !== "COORDINATOR") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};
