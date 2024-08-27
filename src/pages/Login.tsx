import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ENDPOINT } from "../constants/Endpoints";
import { useUserStore } from "../user/user.store";
import { User } from "../interfaces";
import axiosInstace from "../services/axios";
import Logo from "../assets/logo.svg?react";
import LoginForm from "@/components/LoginForm/LoginForm";
import { toast } from "@/components/ui/use-toast";

export default function LoginPage() {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (user) return;
    const payload = sessionStorage.getItem("tcc_user_token");
    const getUserFromStorage = async (token: string) => {
      try {
        const { data } = await axiosInstace.get<User>(`/${ENDPOINT.ME}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(data);
        if (data.role === "COORDINATOR") {
          navigate("/dashboard");
        } else {
          navigate("/home");
        }
      } catch (error) {
        console.log(error);
        sessionStorage.removeItem("tcc_user_token");
        toast({
          title: "Erro ao realizar login",
          description: "Verifique suas credenciais e tente novamente.",
          variant: "destructive",
        });
      }
    };
    if (payload) {
      getUserFromStorage(payload);
    }
  }, [navigate, setUser, user]);

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <Logo />
      <LoginForm />
    </div>
  );
}
