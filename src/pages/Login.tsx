import { useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

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

  if (user) {
    return (
      <Navigate
        to={user.role === "COORDINATOR" ? "/dashboard" : "/home"}
        replace
      />
    );
  }

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <div className="flex items-center gap-2 mb-6">
        <img src="/escudo-ufcg.png" alt="Logo UFCG" />
        <Logo />
      </div>
      <LoginForm />
      <div className="text-xs text-gray-500 mt-4 cursor-default">
        <span>
          Powered by{" "}
          <Link to="https://eureca.sti.ufcg.edu.br/" target="_blank">
            <span className="font-bold">Eureca</span>
          </Link>
        </span>
      </div>
    </div>
  );
}
