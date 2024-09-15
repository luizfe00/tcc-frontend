import { Link } from "react-router-dom";

interface SidebarItemProps {
  name: string;
  path: string;
  icon: React.ReactNode;
  pathname: string;
}

export const SidebarItem = ({
  name,
  path,
  icon,
  pathname,
}: SidebarItemProps) => {
  return (
    <Link to={path}>
      <div
        className={`flex items-center gap-2 p-2 rounded-md ${
          pathname === path
            ? "bg-blue-900 text-white cursor-default"
            : "hover:bg-blue-100"
        }`}
      >
        {icon}
        <span>{name}</span>
      </div>
    </Link>
  );
};
