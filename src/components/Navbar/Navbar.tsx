import { useUserStore } from "@/user/user.store";
import { getUserFirstName } from "@/utils/StringUtil";
import { Button } from "../ui/button";
import { BellIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);

  return (
    <div
      id="navbar"
      className="w-full flex justify-between p-4 items-center shadow-md"
    >
      <div className="flex gap-x-2 items-center grow">
        <Button variant="link" onClick={() => navigate("/home")}>
          Home
        </Button>
        <Button variant="link" onClick={() => navigate("/papers")}>
          TCC
        </Button>
      </div>
      <div className="flex items-center gap-x-2">
        <span>Bem vindo,</span>
        <span>{getUserFirstName(user?.name)}</span>
        <Button variant="ghost" size="icon">
          <BellIcon className="w-5" />
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
