import { useUserStore } from "@/user/user.store";
import { getUserFirstName } from "@/utils/StringUtil";

const Navbar = () => {
  const user = useUserStore((state) => state.user);

  return (
    <div
      id="navbar"
      className="w-full flex justify-between p-4 items-center shadow-md"
    >
      <span>TCC match</span>
      <div className="flex items-center gap-x-2">
        <span>Bem vindo,</span>
        <span>{getUserFirstName(user?.name)}</span>
      </div>
    </div>
  );
};

export default Navbar;
