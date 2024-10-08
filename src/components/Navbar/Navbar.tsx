import { useUserStore } from "@/stores/user/user.store";
import { getUserFirstName } from "@/utils/StringUtil";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo-sm.svg?react";
import { LogOutIcon } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);

  const hideTccLink = user?.role === "STUDENT" && !user.orienteePaper;
  const hideHomeLink = user?.role === "STUDENT" && user.orienteePaper;

  const handleLogout = () => {
    sessionStorage.removeItem('tcc_user_token')
    window.location.pathname = '/'
  }

  return (
    <div
      id="navbar"
      className="w-full flex justify-between p-4 items-center shadow-md"
    >
      <div className="flex gap-x-2 items-center grow">
        <div className="flex items-center gap-x-2">
          <img src="/escudo-ufcg.png" alt="Logo UFCG" className="w-8 h-8" />
          <Logo className="w-20 h-10" />
        </div>
        {!hideHomeLink && (
          <Button variant="link" onClick={() => navigate("/home")}>
            Home
          </Button>
        )}
        {!hideTccLink && (
          <Button variant="link" onClick={() => navigate("/papers")}>
            TCC
          </Button>
        )}
      </div>
      <div className="flex items-center gap-x-2">
        <span>Bem vindo,</span>
        <span>{getUserFirstName(user?.name)}</span>
        <Button variant="ghost" size="icon" onClick={handleLogout}>
          <LogOutIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
