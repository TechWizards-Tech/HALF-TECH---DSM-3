import { useState } from "react";
import { login } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

export function LoginForm({
  className,
  onClick,
  ...props
}: React.ComponentProps<"form"> & { onClick: () => void }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate(); // Hook de navegação do React Router

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await login(email, senha);

      if (response.token) {
        console.log("Login bem-sucedido:", response);
        localStorage.setItem("token", response.token);
        alert("Login realizado com sucesso!");
        navigate("/"); // Navega para a página de dashboard
      } else {
        alert("E-mail ou senha inválidos.");
      }
    } catch (error) {
      console.error("Erro ao logar:", error);
      alert("Erro ao realizar login.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Entrar na conta</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Acesse sua conta com seu e-mail e senha
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            type="password"
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-full">
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
  );
}
