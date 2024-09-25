import {
  BookUserIcon,
  LayoutDashboardIcon,
  LayoutListIcon,
  LogOutIcon,
  ScrollTextIcon,
  UserIcon,
} from "lucide-react";
import { SidebarItem } from "./SidebarItem";
import { useLocation } from "react-router-dom";

const routes = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <LayoutDashboardIcon className="w-4 h-4" />,
  },
  {
    name: "Professores",
    path: "/dashboard/professors",
    icon: <UserIcon className="w-4 h-4" />,
  },
  {
    name: "Alunos",
    path: "/dashboard/students",
    icon: <BookUserIcon className="w-4 h-4" />,
  },
  {
    name: "Trabalhos",
    path: "/dashboard/papers",
    icon: <ScrollTextIcon className="w-4 h-4" />,
  },
  {
    name: "Temas",
    path: "/dashboard/themes",
    icon: <LayoutListIcon className="w-4 h-4" />,
  },
];

export const Sidebar = () => {
  const { pathname } = useLocation();
  return (
    <aside className="w-[250px] shadow-sm bg-white pt-8 pb-2 px-2 sticky top-0 h-[100vh] flex flex-col">
      <div className="flex flex-col gap-2 flex-1">
        {routes.map((route) => (
          <SidebarItem
            key={route.path}
            name={route.name}
            path={route.path}
            icon={route.icon}
            pathname={pathname}
          />
        ))}
      </div>
      <footer className="flex flex-col gap-2 mb-0 w-full">
        <SidebarItem
          icon={<LogOutIcon className="w-4 h-4" />}
          name="Sair"
          path="/"
          pathname="/logout"
          onClick={() => {
            sessionStorage.removeItem('tcc_user_token')
            window.location.pathname = '/'
          }}
        />
        <span className="text-xs text-muted-foreground">Versão 0.0.1</span>
      </footer>
    </aside>
  );
};
