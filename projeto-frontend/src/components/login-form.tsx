import { useState } from "react";
import { login } from "@/lib/api"; // Certifique-se que essa função está criada
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logo from "../../public/Logos.png"

export function LoginForm({
  className,
  onClick,
  ...props
}: React.ComponentProps<"form"> & { onClick: () => void }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await login(email, senha);

      if (response.token) {
        console.log("Login bem-sucedido:", response);
        localStorage.setItem("token", response.token);
        alert("Login realizado com sucesso!");
        // Aqui você pode redirecionar ou mostrar a dashboard
      } else {
        alert("E-mail ou senha inválidos.");
      }
    } catch (error) {
      console.error("Erro ao logar:", error);
      alert("Erro ao realizar login.");
    }
  };

  return (
    <div className="bg-black/40  rounded-2xl p-6">
      <div className="rounded-2xl p-6 flex flex-col md:flex-row border-r-2 bg-white">
        <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6 w-full md:w-1/2 border-b-2 md:border-b-0 md:border-r-2 border-gray-300", className)} {...props}>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex flex-row items-center justify-around w-[250px] md:w-[400]">
              <h1 className="text-2xl md:text-3xl font-bold">Entrar na conta</h1>
              <div className="flex flex-row">
                <a href="#">
                  <img src={logo} alt="Logo" className="w-[100px] h-[100px] object-contain" />
                </a>
              </div>
            </div>
            <p className="text-muted-foreground items-center text-balance text-base md:text-sm w-full md:w-80">
              Acesse sua conta com seu e-mail e senha
            </p>
          </div>
          <div className="flex flex-col gap-6 p-2 items-center">
            <div className="gap-3 w-[80%]">
              <Label className="pb-2" htmlFor="email">Email</Label>
              <Input
                className="w-full"
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="gap-3 w-[80%]">
              <Label htmlFor="password">Senha</Label>
              <Input
                className="w-full"
                id="password"
                type="password"
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>

            <Button type="submit" className="w-[80%]">
              Entrar
            </Button>
          </div>
          <div className="flex m-auto gap-1 text-center text-sm">
            Ainda não tem conta?
            <a
              href="#"
              className="underline underline-offset-4"
              onClick={onClick}
            >
              Criar agora
            </a>
          </div>
        </form>
        <div className="w-full md:w-1/2 flex flex-col p-6 items-center text-justify gap-10 justify-center">
          <h1 className="top-1.5 text-2xl md:text-3xl font-bold">SOBRE</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non orci et nisl laoreet sollicitudin. Quisque tortor purus, tincidunt eu risus vel, tristique molestie turpis. Pellentesque vitae justo elit. Sed molestie ligula ut velit sollicitudin, et tincidunt lorem vehicula. Nulla et orci eu ligula tempor tempor vel quis est. Nulla vitae laoreet nibh, eu eleifend nibh. Donec nisl libero, dignissim faucibus facilisis a, ultrices ac massa. Sed non nunc condimentum, interdum risus a, ultrices dolor.
          </p>
        </div>
      </div>
    </div>
  );
}
