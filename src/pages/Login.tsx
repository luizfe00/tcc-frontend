import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ENDPOINT } from "../constants/Endpoints";
import { useUserStore } from "../user/user.store";
import { User } from "../interfaces";
import axiosInstace from "../services/axios";
import Logo from "../assets/logo.svg?react";
import LoginForm from "@/components/LoginForm/LoginForm";

export default function LoginPage() {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const payload = sessionStorage.getItem("tcc_user_token");
    const getUserFromStorage = async (token: string) => {
      try {
        const { data } = await axiosInstace.get<User>(`/${ENDPOINT.ME}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(data);
        navigate("/home");
      } catch (error) {
        console.log(error);
      }
    };
    if (payload) {
      getUserFromStorage(payload);
    }
  }, [navigate, setUser]);

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <Logo />
      <LoginForm />
    </div>
  );
}
