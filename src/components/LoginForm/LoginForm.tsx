import { Card } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axiosInstace from "@/services/axios";
import { ENDPOINT } from "@/constants/Endpoints";
import { useUserStore } from "@/user/user.store";
import { useNavigate } from "react-router-dom";

export interface LoginFormPayload {
  username: string;
  password: string;
}

const formSchema = z.object({
  username: z
    .string({ required_error: "Informe uma matrícula válida." })
    .regex(/^\d+$/, "Matrícula deve conter apenas números."),
  password: z
    .string({ required_error: "Informe uma senha." })
    .min(5, "Senha deve conter ao menos 5 caracteres."),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const payload = await axiosInstace.post(`/${ENDPOINT.SIGN_IN}`, values);
      sessionStorage.setItem("tcc_user_token", payload.data.token);
      setUser(payload.data);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card className="p-4 w-1/4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 flex flex-col justify-center"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Matricula</FormLabel>
                <FormControl>
                  <Input placeholder="Informe sua matricula..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Informe sua senha..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-sm" type="submit">
            Entrar
          </Button>
        </form>
      </Form>
    </Card>
  );
};

export default LoginForm;
